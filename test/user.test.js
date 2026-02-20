import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"
describe("POST api/users/register",()=>{
    test("given username, password and email",async()=>{
        const response=await request(app)
       .post('/api/users/register')
       .send({
            userName:"gossati",
            password:"pass12354",
            email:"gosagirma1111@gmail.com"
        })
        expect(response.status).toBe(201)
        /* expect(response.body).toHaveProperty("tokens")
        expect(response.body).toHaveProperty("email") */
    })
})
afterAll(async () => {
  await mongoose.connection.close()
})