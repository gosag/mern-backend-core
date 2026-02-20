import request from "supertest"
import app from "../app.js"
import mongoose from "mongoose"
import connectDB from "../config/db.js";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});
/* describe("POST api/users/register",()=>{
    test("given username, password and email",async()=>{
        const response=await request(app)
       .post('/api/users/register')
       .send({
            userName:"gossati",
            password:"pass12354",
            email:"gosagirma1111@gmail.com"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("tokens")
        expect(response.body).toHaveProperty("email") 
    })
})*/
describe("/GET /api/users",()=>{
    test("check if it returns the data ",async()=>{
        const res=await request(app).get("/api/users")
        expect(res.status).toBe(200)
    })  
})
