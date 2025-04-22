const supertest = require("supertest");
const db = require("../db/connection");
const app = require("../app");

/* Set up your beforeEach & afterAll functions here */

// beforeEach(() => {
//     return seed(data);
//   });
// console.log("db is: ", db);

afterAll(async () => {
  await db.end();
});

describe("POST /register", () => {
  test("201: Responds with newly created user object", () => {
    return supertest(app)
      .post("/register")
      .send({
        firstname: "Ian",
        lastname: "Smith",
        email: "ian.smith@gmail.com",
        password: "abc123",
        postcode: "N17 8LR",
        address: "1 Acacia Avenue",
        city: "London",
        avatar_url:
          "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
        about_me: "I am a new user of the brilliant Handy app.",
        longitude: "-0.08448",
        latitude: "51.605674",
      })
      .expect(201)
      .then(({ body: user }) => {
        expect(user).toHaveProperty("user_id");
        expect(user.firstname).toBe("Ian");
        expect(user.lastname).toBe("Smith");
        expect(user.email).toBe("ian.smith@gmail.com");
        expect(user.password).toBe("abc123");
        expect(user.postcode).toBe("N17 8LR");
        expect(user.address).toBe("1 Acacia Avenue");
        expect(user.avatar_url).toBe("https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp")
        expect(user.location_wkt).toBe('POINT(-0.08448 51.605674)');
      });
  });
  test("409: email already exists", () => {
    return supertest(app)
      .post("/register")
      .send({
        firstname: "Ian",
        lastname: "Smith",
        email: "alice@ukmail.com",
        password: "abc123",
        postcode: "NG1 4QZ",
        address: "1 Acacia Avenue",
        city: "London",
        avatar_url:
          "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
        about_me: "I am a new user of the brilliant Handy app.",
      })
      .expect(409)
      .then(({ body: error }) => {
        expect(error.message).toBe("Email address already exists");
      });
  });
  test("400: Missing required fields", () => {
    return supertest(app)
      .post("/register")
      .send({
        firstname: "Ian",
        lastname: "Smith",
        password: "abc123",
        postcode: "NG1 4QZ",
        address: "1 Acacia Avenue",
        city: "London",
        avatar_url:
          "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&q=70&fm=webp",
        about_me: "I am a new user of the brilliant Handy app.",
      })
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.status).toBe(400);
        expect(body.message).toBe("Missing required fields");
      });
  });
});
describe("POST /login", () => {
  test("200: Successful login", () => {
    return supertest(app)
      .post("/login")
      .send({ email: "ben@ukmail.com", password: "hashedpw2" })
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body).toHaveProperty("user_id");
        expect(body.firstname).toBe("Ben");
        expect(body.lastname).toBe("Taylor");
        expect(body.email).toBe("ben@ukmail.com");
        expect(body.is_provider).toBe(false);
        expect(body).toHaveProperty("avatar_url");
      });
  });
  test("401: email address no found", () => {
    return supertest(app)
      .post("/login")
      .send({ email: "invalid@nomail.com", password: "hashedpw2" })
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe("Invalid email or password");
      });
  });
  test("401: invalid password", () => {
    return supertest(app)
      .post("/login")
      .send({ email: "ben@ukmail.com", password: "badpassowrd" })
      .expect(401)
      .then((response) => {
        const { body } = response;
        expect(body.message).toBe("Invalid email or password");
      });
  });
});
describe("PATCH: /users/:user_id", () => {
  test("Returns user object with updated provider_status (true)", () => {
      return supertest(app)
      .patch("/users/2")
      .send({isProvider : true})
      .expect(200)
      .then(response => {
          const { body } = response;
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
          expect(body.user_id).toBe(42)
          expect(body.is_provider).toBe(false)
      })
  })
  test("Returns 404 when user does not exist", () => {
      return supertest(app)
      .patch("/users/62")
      .send({isProvider : true})
      .expect(404)
      .then(response => {
          const { body } = response;
          expect(body.message).toBe("User Not found")
      })
  })
})