const app = require("./server.js");
const request = require("supertest");


describe("POST /admin signin", () => {

    describe("Given Username and Password", () => {
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).post("/user/signin").send({
                username: "username",
                password: "password"
            })
            expect(response.statusCode).toBe(200);
        })
    })

})

