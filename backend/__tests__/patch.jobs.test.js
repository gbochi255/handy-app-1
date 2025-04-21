const supertest = require("supertest");
const db = require ("../db/connection");
const app = require("../app")


afterAll(async () => {
    await db.end();
});

describe("PATCH: /jobs/:job_id/complete", () => {
    test("200: Respond with updated job object", () => {
        return supertest(app)
        .patch("/jobs/3/complete")
        .expect(200)
        .then(response => {
            const { body } = response;
            expect(body.job_id).toBe(3)
            expect(body).toHaveProperty("summary")
            expect(body).toHaveProperty("job_detail")
            expect(body).toHaveProperty("category")
            expect(body).toHaveProperty("created_by")
            expect(body.status).toBe("completed")
            expect(body.completion_date).not.toBe(null)
            expect(body).toHaveProperty("photo_url")
            expect(body).toHaveProperty("target_date")
            expect(body).toHaveProperty("location")
        })
    })
    test("404: Respond 404 if job does not exist", () => {
        return supertest(app)
        .patch("/jobs/21/complete")
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe("Job Not found")
        })
    })
})

describe("PATCH: /jobs/:job_id/accept/:bid_id", () => {
    test("200: Respond with array containing the accepted bid object", () => {
        return supertest(app)
        .patch("/jobs/4/accept/7")
        .expect(200)
        .then(response => {
            const { body } = response;
            expect(body.length).toBe(2)
            const acceptedBid = body[0]
            expect(acceptedBid.bid_id).toBe(7)
            expect(acceptedBid.job_id).toBe(4)
            expect(acceptedBid).toHaveProperty("amount")
            expect(acceptedBid).toHaveProperty("provider_id")
            expect(acceptedBid.status).toBe("accepted")
            expect(acceptedBid).toHaveProperty("created_at")
        })
    })
    test("200: Respond with array containing the the other rejected bid objects", () => {
        return supertest(app)
        .patch("/jobs/4/accept/7")
        .expect(200)
        .then(response => {
            const { body } = response;
            expect(body.length).toBe(2)
            const rejectedBid = body[1]
            expect(rejectedBid.bid_id).toBe(8)
            expect(rejectedBid.job_id).toBe(4)
            expect(rejectedBid).toHaveProperty("amount")
            expect(rejectedBid).toHaveProperty("provider_id")
            expect(rejectedBid.status).toBe("rejected")
            expect(rejectedBid).toHaveProperty("created_at")
        })
    })
    test("404: Respond 404 if job does not exist", () => {
        return supertest(app)
        .patch("/jobs/21/accept/1")
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe("Job Not found")
        })
    })
    test("404: Respond 404 if bid does not exist", () => {
        return supertest(app)
        .patch("/jobs/4/accept/9")
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe("Bid Not found")
        })
    })
})

describe("PATCH: /users/:user_id", () => {
    test("Returns user object with updated provider_status (true)", () => {
        return supertest(app)
        .patch("/users/2")
        .send({isProvider : true})
        .expect(200)
        .then(response => {
            const { body } = response;
            console.log(body)
            expect(body.user_id).toBe(2)
            expect(body.is_provider).toBe(true)
        })
    })
    test("Returns user object with updated provider_status (false)", () => {
        return supertest(app)
        .patch("/users/42")
        .send({isProvider : false})
        .expect(200)
        .then(response => {
            const { body } = response;
            console.log(body)
            expect(body.user_id).toBe(42)
            expect(body.is_provider).toBe(false)
        })
    })
    test("Returns 404 when user does not exist", () => {
        return supertest(app)
        .patch("/users/61")
        .send({isProvider : true})
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe("User Not found")
        })
    })
})