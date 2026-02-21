import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js'; // Adjust path to your Express app entry point

// 1. CLEAN START: The Minimalist Connection
beforeAll(async () => {
  const url = "mongodb://127.0.0.1:27017/testdb";
  // REMOVED: useNewUrlParser and useUnifiedTopology (the "Legacy Luggage")
  await mongoose.connect(url);
});
// 2. THE TEST: Your actual logic
describe('/GET /api/users', () => {
  test('check if it returns the data', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200)
  });
});
describe("POST /api/users/register",()=>{
  test('registers a new user', async () => {
  const res = await request(app)
    .post('/api/users/register')
    .send({
      userName: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('token');
});
})
// 3. CLEAN EXIT: The "Zombie Killer"
// This prevents the "Jest did not exit" warning by killing the connection
afterAll(async () => {
  // Check if we actually have a connection before trying to drop/close
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
});
