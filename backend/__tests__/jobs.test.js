const supertest = require("supertest");
const db = require("../db/connection");
const app = require("../app");
// require("jest-sorted");

afterAll(async () => {
    await db.end();
});

describe("GET: /jobs", () => {
    test("200: Respond with an array of all job objects", () => {
        return supertest(app)
            .get("/jobs")
            .expect(200)
            .then(({ body: { jobs } }) => {
                expect(jobs.length).toBe(5)
                jobs.forEach((job) => {
                    expect(job).toHaveProperty("job_id")
                    expect(job).toHaveProperty("summary")
                    expect(job).toHaveProperty("job_detail")
                    expect(job).toHaveProperty("category")
                    expect(job).toHaveProperty("created_by")
                    expect(job).toHaveProperty("status")
                    expect(job).toHaveProperty("photo_url")
                    expect(job).toHaveProperty("target_date")
                    expect(job).toHaveProperty("location")
                });
            })
    })
    test("200: Respond with an array of jobs filtered by status - open", () => {
        return supertest(app)
        .get("/jobs?status=open")
        .expect(200)
        .then(({ body: { jobs } }) => {
            expect(jobs.length).toBe(4)
            jobs.forEach((job) => {
                expect(job).toHaveProperty("job_id")
                expect(job).toHaveProperty("summary")
                expect(job).toHaveProperty("job_detail")
                expect(job).toHaveProperty("category")
                expect(job).toHaveProperty("created_by")
                expect(job.status).toBe("open")
                expect(job).toHaveProperty("photo_url")
                expect(job).toHaveProperty("target_date")
                expect(job).toHaveProperty("location")
            })
        })
    })
    test("200: Respond with an array of jobs filtered by created_by", () => {
        return supertest(app)
        .get("/jobs?created_by=2")
        .expect(200)
        .then(({ body: { jobs } }) => {
            expect(jobs.length).toBe(1)
            const job = jobs[0]
            expect(job).toHaveProperty("job_id")
            expect(job).toHaveProperty("summary")
            expect(job).toHaveProperty("job_detail")
            expect(job).toHaveProperty("category")
            expect(job.created_by).toBe(2)
            expect(job).toHaveProperty("status")
            expect(job).toHaveProperty("photo_url")
            expect(job).toHaveProperty("target_date")
            expect(job).toHaveProperty("location")
        })
    })
    test("200: Respond with an array of jobs filtered by created_by and status", () => {
        return supertest(app)
        .get("/jobs?created_by=2&status=open")
        .expect(200)
        .then(({ body: { jobs } }) => {
            expect(jobs.length).toBe(1)
            const job = jobs[0]
            expect(job).toHaveProperty("job_id")
            expect(job).toHaveProperty("summary")
            expect(job).toHaveProperty("job_detail")
            expect(job).toHaveProperty("category")
            expect(job.created_by).toBe(2)
            expect(job.status).toBe("open")
            expect(job).toHaveProperty("photo_url")
            expect(job).toHaveProperty("target_date")
            expect(job).toHaveProperty("location")
        })
    })
})