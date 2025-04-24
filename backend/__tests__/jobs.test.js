const supertest = require("supertest");
const db = require("../db/connection");
const app = require("../app");
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
describe("GET /jobs/provider/provider_id", () => {
    test("200: Returns jobs within default distance, nearest first", () => {
      return supertest(app)
        .get("/jobs/provider/41") // Quinn
        .expect(200)
        .then(response => {
            const {jobs}=response.body
            expect(jobs.length).toBe(16)
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
        .get("/jobs/provider/42?status=open&distance=5") // Rachel
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
          .get("/jobs/provider/41?distance=0.01")
          .expect(200)
          .then(response => {
            expect(response.body.jobs).toEqual([]);
          });
      });

    test("404: Rejects invalid user_id", () => {
      return supertest(app)
        .get("/jobs/provider/9999")
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe( "User ID not found");
            expect(body.status).toBe(404);
        });
    });
  
    test("404: Rejects user_id that is not a provider", () => {
      return supertest(app)
        .get("/jobs/provider/1") // Adam (not a provider)
        .expect(404)
        .then(response => {
            const { body } = response;
            expect(body.message).toBe( "User is not a provider" );
            expect(body.status).toBe( 404 );
        });
    });
  
    test("400: Rejects invalid status", () => {
      return supertest(app)
        .get("/jobs/provider/41?status=invalid")
        .expect(400)
        .then(response => {
          const { body } = response;
          expect(body.message).toBe( "Invalid status value" );
          expect(body.status).toBe( 400 );

        });
    });
  
    test("400: Rejects invalid distance", () => {
      return supertest(app)
        .get("/jobs/provider/41?distance=-5")
        .expect(400)
        .then(response => {
          const { body } = response;
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
describe("POST /jobs", ()=>{
  test("200: Successfully add a job", ()=>{
    return supertest(app)
    .post("/jobs/create")
    .send({
      "created_by": 1,
      "summary": "My new task",
      "job_detail": "Details about my new task",
      "category": "Plumbing",
      "target_date": "2025-04-30",
      "photo_url": "https://supabase.co/storage/v1/object/public/jobs/tap.jpg",
      "postcode": "E1 6AN"
    })
    .expect(200)
    .then(response=>{
      const job=response.body
      expect(job).toHaveProperty("job_id");
      expect(job.status).toBe("open")
      expect(job.accepted_bid).toBe(null);
      expect(job).toHaveProperty("date_posted")
      expect(job).toHaveProperty("location")
      expect(job.created_by).toBe(1)
      expect(job.summary).toBe("My new task")
      expect(job.job_detail).toBe("Details about my new task")
      expect(job.category).toBe("Plumbing")
      expect(job.target_date).toBe("2025-04-30")
      expect(job.location_wkt).toBe('POINT(-2.241 53.474)');
      expect(job.photo_url).toBe("https://supabase.co/storage/v1/object/public/jobs/tap.jpg")
    })

  })
  test("400: Required fields missing from request body",() =>{
    return supertest(app)
    .post("/jobs/create")
    .send({
      "missing_required_fields": 1,
    })
    .expect(400)
    .then(response=>{
      body=response.body
      expect(body.status).toBe(400)
      expect(body.message).toBe("Required paramaters missing from body")
      })  
  })

  test("404: user_id not found or location not set",() =>{
    return supertest(app)
    .post("/jobs/create")
    .send({
      "created_by": 9999,
      "summary": "No such user",
      "job_detail": "Details about my new task",
      "category": "Plumbing",
      "target_date": "2025-04-30",
      "photo_url": "https://supabase.co/storage/v1/object/public/jobs/tap.jpg",
      "postcode": "E1 6AN"
    })
    .expect(404)
    .then(response=>{
      body=response.body
      expect(body.status).toBe(404)
      expect(body.message).toBe("User not found or no location set")
      })  
  })

})
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
      .patch("/jobs/22/complete")
      .expect(404)
      .then(response => {
          const { body } = response;
          expect(body.message).toBe("Job Not found")
      })
  })
})

describe("PATCH: /jobs/:job_id/accept/:bid_id", () => {
  test("200: Responds with array of updated bids and updates jobs table", () => {
      return supertest(app)
          .patch("/jobs/4/accept/7")
          .expect(200)
          .then(response => {
              const { body: bids } = response;

              // Verify bids array
              expect(bids).toBeInstanceOf(Array);
              expect(bids.length).toBe(2); // Job 4 has 2 bids in seed data

              // Verify accepted bid
              const acceptedBid = bids.find(bid => bid.bid_id === 7);
              expect(acceptedBid).toBeDefined();
              expect(acceptedBid.job_id).toBe(4);
              expect(acceptedBid.status).toBe("accepted");
              expect(acceptedBid).toHaveProperty("amount");
              expect(acceptedBid).toHaveProperty("provider_id");
              expect(acceptedBid).toHaveProperty("created_at");

              // Verify rejected bid
              const rejectedBid = bids.find(bid => bid.bid_id !== 7);
              expect(rejectedBid).toBeDefined();
              expect(rejectedBid.job_id).toBe(4);
              expect(rejectedBid.status).toBe("rejected");

              // Verify jobs table update
              return db.query("SELECT * FROM jobs WHERE job_id = $1", [4])
                  .then(jobQuery => {
                      const job = jobQuery.rows[0];
                      expect(job).toBeDefined();
                      expect(job.status).toBe("accepted");
                      expect(job.accepted_bid).toBe(7);
                  });
          });
  });
// describe("PATCH: /jobs/:job_id/accept/:bid_id", () => {
//   test("200: Respond with array containing the accepted bid object", () => {
//       return supertest(app)
//       .patch("/jobs/4/accept/7")
//       .expect(200)
//       .then(response => {
//           const { body } = response;
//           expect(body.length).toBe(2)
//           const acceptedBid = body[0]
//           expect(acceptedBid.bid_id).toBe(7)
//           expect(acceptedBid.job_id).toBe(4)
//           expect(acceptedBid).toHaveProperty("amount")
//           expect(acceptedBid).toHaveProperty("provider_id")
//           expect(acceptedBid.status).toBe("accepted")
//           expect(acceptedBid).toHaveProperty("created_at")
//       })
//   })
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

describe("GET /jobs/:job_id", ()=>{
  test("200: return all details for a specific job", ()=>{
    return supertest(app)
    .get("/jobs/1")
    .expect(200)
    .then(response => {
      const job = response.body
      expect(job.job_id).toBe(1)
      expect(job.summary).toBe("Fix kitchen sink")
      expect(job.job_detail).toBe("Leaking pipe under kitchen sink needs repair.")
      expect(job.category).toBe("Plumbing")
      expect(job.created_by).toBe(1)
      expect(job.status).toBe("open")
      expect(job.target_date).toBe("2025-04-25")
      expect(job.photo_url).toBe("https://example.com/photos/sink.jpg")
      expect(job.location_wkt).toBe("POINT(-2.241 53.474)")
    })
  } )
  test("404: job not found", ()=>{
    return supertest(app)
    .get("/jobs/9999")
    .expect(404)
    .then(response => {
      const error = response.body
      expect(error.status).toBe(404)
      expect(error.message).toBe("Job_id not found")
    })
  } )
})


describe("POST /jobs/:job_id/bid", ()=>{
  test("200: Creates a bid and returns it", ()=>{
    return supertest(app)
    .post("/jobs/2/bid")
    .send({
      "provider_id": 42,
      "amount": 45.00
    })
    .expect(200)
    .then(response => {
      const bid=response.body
      expect(bid).toHaveProperty("bid_id")
      expect(bid).toHaveProperty("created_at")
      expect(bid.job_id).toBe(2)
      expect(bid.provider_id).toBe(42)
      expect(bid.amount).toBe(45.00)
      expect(bid.status).toBe("pending")
    })
  })
  test("400: Inavlid body parameters", ()=>{
    return supertest(app)
    .post("/jobs/2/bid")
    .send({
      "not_a_user": 42,
      "money": 45.00
    })
    .expect(400)
    .then(response => {
      const error=response.body
      expect(error.status).toBe(400)
      expect(error.message).toBe("Missing required parameters {amount:, provider_id:}")
    })
  })
  test("404: Non-existant job_id", ()=>{
    return supertest(app)
    .post("/jobs/9999/bid")
    .send({
      "provider_id": 42,
      "amount": 45.00
    })
    .expect(404)
    .then(response => {
      const bid=response.body
      const error=response.body
      expect(error.status).toBe(404)
      expect(error.message).toBe("Not found")
    })
  })
})