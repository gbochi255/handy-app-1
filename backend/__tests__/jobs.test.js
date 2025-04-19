const supertest = require("supertest");
const db = require("../db/connection");
const app = require("../app");
// require("jest-sorted");

afterAll(async () => {
    await db.end();
});

describe("GET: /jobs", () => {
    test("200: Respond with an array of all job records", () => {
        return supertest(app)
            .get("/jobs")
            .expect(200)
            .then(({ body: { jobs } }) => {
                expect(jobs.length).toBe(20)
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
            expect(jobs.length).toBe(13)
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
            expect(jobs.length).toBe(2)
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
describe ("GET: /jobs/client - client view jobs endpoint", ()=>{
    test("200: Returns all jobs with with bid info", () => {
        return supertest(app)
            .get("/jobs/client")
            .expect(200)
            .then(({ body: { jobs } }) => {
                expect(jobs.length).toBe(20)
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
                    expect(job).toHaveProperty("bid_count")
                    expect(job).toHaveProperty("best_bid")

                });
            })
    })
    test("200: Returns all jobs with with status 'open'", () => {
        return supertest(app)
            .get("/jobs/client?status=open")
            .expect(200)
            .then(({ body: { jobs } }) => {
                expect(jobs.length).toBe(13)
            })
    })
    test("200: Returns all jobs with with client_id 2", () => {
        return supertest(app)
            .get("/jobs/client?client_id=2")
            .expect(200)
            .then(({ body: { jobs } }) => {
                expect(jobs.length).toBe(2)
            })
    })
    test("200: Returns all jobs with both client_id AND status", () => {
        return supertest(app)
            .get("/jobs/client?client_id=2&status=completed")
            .expect(200)
            .then(({ body: { jobs } }) => {
                expect(jobs.length).toBe(1)
            })
    })
    test("400: Rejects invalid status", () => {
        return supertest(app)
          .get("/jobs/client?client_id=1&status=invalid")
          .expect(400)
          .then((response) => {
          const { body } = response;
          expect(body.status).toBe(400);
          expect(body.message).toBe("Bad request");
          });
      });
    test("404: User doesn't exist", () => {
        return supertest(app)
          .get("/jobs/client?client_id=9999")
          .expect(404)
          .then((response) => {
          const { body } = response;
          expect(body.status).toBe(404);
          expect(body.message).toBe("User ID not found");
          });
      });
})
describe("GET /jobs/provider", () => {
    test("200: Returns jobs within default distance", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=41") // Quinn
        .expect(200)
        .then(response => {
            console.log(response.body)
          response.body.jobs.forEach(job => {
            expect(job).toHaveProperty("job_id");
            expect(job).toHaveProperty("summary");
            expect(job).toHaveProperty("category");
            expect(job).toHaveProperty("distance");
            expect(job.distance).toBeLessThanOrEqual(10); // Default distance
          });
        });
    });
  
    test("200: Filters jobs by status and custom distance", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=42&status=open&distance=5") // Rachel
        .expect(200)
        .then(response => {
          response.body.jobs.forEach(job => {
            expect(job.status).toBe("open");
            expect(job.distance).toBeLessThanOrEqual(5);
          });
        });
    });
  
    test("400: Rejects missing user_id", () => {
      return supertest(app)
        .get("/jobs/provider")
        .expect(400)
        .then(response => {
            const { body } = response;
            console.log(body)
            expect(body.message).toBe( "User ID is required" );
            expect(body.status).toBe( 400 );
        });
    });
  
    test("404: Rejects invalid user_id", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=9999")
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe( "Provider ID not found");
            expect(body.status).toBe(404);
        });
    });
  
    test("404: Rejects user_id that is not a provider", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=1") // Adam (not a provider)
        .expect(404)
        .then(response => {
            const { body } = response;
            console.log(body)
            expect(body.message).toBe( "User is not a provider" );
            expect(body.status).toBe( 404 );
        });
    });
  
    test("400: Rejects invalid status", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=41&status=invalid")
        .expect(400)
        .then(response => {
          const { body } = response;
          console.log(body)
          expect(body.message).toBe( "Invalid status value" );
          expect(body.status).toBe( 400 );

        });
    });
  
    test("400: Rejects invalid distance", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=41&distance=-5")
        .expect(400)
        .then(response => {
          const { body } = response;
          console.log(body)
          expect(body.message).toBe( "Distance must be a positive number" );
          expect(body.status).toBe( 400 );
        });
    });
  });