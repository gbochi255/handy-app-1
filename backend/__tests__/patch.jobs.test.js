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