const supertest = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const Test = require("supertest/lib/test");

afterAll(async () => {
    await db.end();
});

describe ("GET /bids/:job_id", () => {
    test("200: return a list of bids for a job_id", () => {
        return supertest(app)
        .get("/bids/15")
        .expect(200)
        .then(({body: {bids}})=>{
            expect(bids.length).toBe(3)
            bids.forEach((bid)=>{
                expect(bid).toHaveProperty("bid_id")
                expect(bid).toHaveProperty("provider_id")
                expect(bid).toHaveProperty("amount")
                expect(bid).toHaveProperty("status")
                expect(bid).toHaveProperty("pr_firstname")
                expect(bid).toHaveProperty("pr_lastname")
                expect(bid).toHaveProperty("avatar_url")
                expect(bid).toHaveProperty("created_at")
            })
        })
    })
    test("200: return an empty array when there are no bids for a job", () => {
        db.query(`DELETE FROM bids WHERE job_id = 4;`)
        return supertest(app)
        .get("/bids/4")
        .expect(200)
        .then(({body : {bids}})=>{
            expect(bids.length).toBe(0)
        })
    })
    test("404: return 'Not Found' error when job_id doesn't exist", () => {
        db.query(`DELETE FROM bids WHERE job_id = 4;`)
        db.query(`DELETE FROM jobs WHERE job_id = 4;`)
        return supertest(app)
        .get("/bids/9999")
        .expect(404)
        .then((response)=>{
            const {body}=response
            expect(body.status).toBe(404)
            expect(body.message).toBe("JobId not found")
        })
    })
})

