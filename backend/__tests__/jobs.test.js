const supertest = require("supertest");
const db = require("../db/connection");
const app = require("../app");
const { response } = require("express");
require("jest-sorted");
// const seed = require("../db/seed/merged-seed.sql")


// beforeEach(()=>{
//    db.query("../db/seed/merged-seed.sql")
// })

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
            expect(jobs.length).toBe(10)
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
                expect(jobs.length).toBe(10)
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
            .get("/jobs/client?client_id=2&status=accepted")
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
    test("200: Returns jobs within default distance, nearest first", () => {
      return supertest(app)
        .get("/jobs/provider?user_id=41") // Quinn
        .expect(200)
        .then(response => {
            const {jobs}=response.body
            jobs.forEach(job => {
            expect(job).toHaveProperty("job_id");
            expect(job).toHaveProperty("summary");
            expect(job).toHaveProperty("category");
            expect(job).toHaveProperty("distance");
            expect(job.distance).toBeLessThanOrEqual(10); // Default distance
        });
            for (let i = 1; i < jobs.length; i++) {
                expect(jobs[i].distance).toBeGreaterThanOrEqual(jobs[i - 1].distance);
              }
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
  
    test("200: Returns empty array if no jobs within distance", () => {
        return supertest(app)
          .get("/jobs/provider?user_id=41&distance=0.01")
          .expect(200)
          .then(response => {
            expect(response.body.jobs).toEqual([]);
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
            expect(body.message).toBe( "User ID not found");
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

  describe("GET /jobs/provider/:provider_id/bids", () => {
    test("200: Returns waiting jobs (status 'open') the provider has bid on", () => {
      return supertest(app)
        .get("/jobs/provider/41/bids") // Quinn
        .expect(200)
        .then(response => {
          const jobs = response.body.jobs;
          console.log(jobs)
          const waitingJobs = jobs.filter(job => job.bid_status === "Waiting");
          expect(waitingJobs).toHaveLength(2); // job_id=1, 7 (both open)
          waitingJobs.forEach(job => {
            expect(job).toHaveProperty("job_id");
            expect(job).toHaveProperty("summary");
            expect(job).toHaveProperty("date_posted");
            expect(job).toHaveProperty("target_date");
            expect(job).toHaveProperty("distance");
            expect(job).toHaveProperty("bid_status");
            expect(job.bid_status).toBe("Waiting");
            expect(job.status).toBe("open");
          });
          // Verify ordering by date_posted DESC
          for (let i = 1; i < jobs.length; i++) {
            const currentDate = new Date(jobs[i].date_posted).getTime();
            const prevDate = new Date(jobs[i - 1].date_posted).getTime();
            expect(currentDate).toBeLessThanOrEqual(prevDate);
          }
        });
    });
    test("200: Returns lost jobs (status 'accepted' or 'completed', bid not accepted)", () => {
        return db.query(`
            UPDATE jobs SET status = 'accepted', accepted_bid = 1 WHERE job_id = 2;
            `)
            .then(() => {
                return supertest(app)
                .get("/jobs/provider/42/bids") // Rachel
                .expect(200)
                .then(response => {
                    expect(response.body.jobs).toBeInstanceOf(Array);
                    const jobs = response.body.jobs;
                    const lostJobs = jobs.filter(job => job.bid_status === "Lost");
            expect(lostJobs).toHaveLength(1);
            lostJobs.forEach(job => {
                expect(job.job_id).toBe(2);
                expect(job.bid_status).toBe("Lost");
                expect(job.status).toBe("accepted");
                expect(job.accepted_bid).toBe(1);
            });
        });
    });
});
    test("200: Returns empty array if provider has no waiting or lost bids", () => {
        return supertest(app)
          .get("/jobs/provider/43/bids")
          .expect(200)
          .then(response => {
            expect(response.body.jobs).toEqual([]);
          });
      });
      test("404: Rejects invalid provider_id", () => {
        return supertest(app)
          .get("/jobs/provider/999/bids")
          .expect(404)
          .then(response => {
            const body=response.body
            expect(body.message).toBe("User ID not found");
          });
      });
    
      test("404: Rejects provider_id that is not a provider", () => {
        return supertest(app)
          .get("/jobs/provider/1/bids")
          .expect(404)
          .then(response => {
            const body=response.body
            expect(body.message).toBe("User is not a provider");
          });
      });
    
      test("400: Rejects non-numeric provider_id", () => {
        return supertest(app)
          .get("/jobs/provider/abc/bids")
          .expect(400)
          .then(response => {
            const body=response.body
            console.log ("error: ",body)
            expect(body.message).toBe( "Bad request");
          });
      });
    });

    describe("GET /jobs/provider/:provider_id/won", () => {
      test("200: Returns both 'accepted' (Pending) and 'completed' (Done) jobs the provider has won", () => {
        return supertest(app)
          .get("/jobs/provider/60/won") // Jack
          .expect(200)
          .then(response => {
            const jobs = response.body.jobs;
            expect(jobs).toHaveLength(2); // job_id=14 (completed), job_id=12 (accepted)
            const pendingJobs = jobs.filter(job => job.job_progress === "Pending");
            const doneJobs = jobs.filter(job => job.job_progress === "Done");
            expect(pendingJobs).toHaveLength(1);
            expect(doneJobs).toHaveLength(1);
            pendingJobs.forEach(job => {
              expect(job.job_id).toBe(12);
              expect(job.status).toBe("accepted");
              expect(job.job_progress).toBe("Pending");
              expect(job.accepted_bid).toBe(25); // Jack's bid
            });
            doneJobs.forEach(job => {
              expect(job.job_id).toBe(14);
              expect(job.status).toBe("completed");
              expect(job.job_progress).toBe("Done");
              expect(job.accepted_bid).toBe(29); // Jacks's bid
            });
          }); 
      });
      
        test("200: Returns empty array if provider has no won jobs", () => {
          return supertest(app)
            .get("/jobs/provider/42/won")  // 
            .expect(200)
            .then(response => {
              expect(response.body.jobs).toEqual([]);
            });
        });
      
        test("404: Rejects invalid provider_id", () => {
          return supertest(app)
            .get("/jobs/provider/999/won")
            .expect(404)
            .then(response => {
                const body=response.body
                expect(body.message).toBe("User ID not found");    
                expect(body.status).toBe(404)
            });
            });
        
      
        test("404: Rejects provider_id that is not a provider", () => {
          return supertest(app)
            .get("/jobs/provider/1/won")
            .expect(404)
            .then(response => {
                const body=response.body
                expect(body.message).toBe("User is not a provider");    
                expect(body.status).toBe(404)
            });
            });
      
        test("400: Rejects non-numeric provider_id", () => {
          return supertest(app)
            .get("/jobs/provider/abc/won")
            .expect(400)
            .then(response => {
                const body=response.body
                expect(body.message).toBe("Bad request");    
                expect(body.status).toBe(400)
            });
      });
    });
