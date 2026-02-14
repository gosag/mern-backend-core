Express-Rest

A simple and scalable RESTful API built with Node.js, Express.js, and MongoDB (Mongoose).

This project focuses on backend fundamentals like:

Clean architecture

CRUD operations

Pagination

Filtering

Sorting

Environment variable management

Error handling

It is structured in a way that can scale into a production-ready backend.

🚀 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

dotenv

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/gosag/Express-Rest.git
cd Express-Rest
2️⃣ Install dependencies
npm install
3️⃣ Create .env file

Create a .env file in the root directory:

PORT=8000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development

Example (local database):

PORT=8000
MONGO_URI=mongodb://localhost:27017/express-rest
NODE_ENV=development
4️⃣ Run the server
npm run dev

Server will run on:

http://localhost:8000
📁 Project Structure
Express-Rest/
│
├── controllers/      # Business logic
├── routes/           # Route definitions
├── models/           # Mongoose schemas
├── middlewares/      # Custom middlewares (error handling, etc.)
├── config/           # Database connection setup
├── server.js         # Entry point
├── package.json
└── .env              # Environment variables (not committed)
🔥 API Endpoints
Method	Endpoint	Description
GET	/posts	Get all posts
GET	/posts/:id	Get single post
POST	/posts	Create post
PUT	/posts/:id	Update post
DELETE	/posts/:id	Delete post
📄 Pagination

Supports pagination via query parameters:

GET /posts?page=2&limit=10

Response includes:

{
  "currentPage": 2,
  "totalItems": 50,
  "totalPages": 5,
  "posts": [...]
}

Pagination is protected with:

Default limit

Maximum limit cap

Safe page validation

🔎 Filtering

Filter data using query parameters:

GET /posts?author=123
GET /posts?category=tech

Filtering happens before pagination for performance.

📊 Sorting

Sort results dynamically:

GET /posts?sortBy=createdAt&order=desc

asc → ascending

desc → descending

Only allowed fields are sortable to prevent misuse.

🌍 Environment Variables
Variable	Description
PORT	Server port
MONGO_URI	MongoDB connection string
NODE_ENV	Environment mode

⚠️ Never commit your .env file.

🛡 Error Handling

Centralized error middleware

Proper HTTP status codes

Structured JSON responses

Graceful handling of invalid IDs & database errors

📈 Scalability Considerations

Indexed fields for faster queries

Safe pagination

Controlled sorting

Modular architecture

Separation of config and logic

🧠 What This Project Demonstrates

This project shows understanding of:

REST architecture

Mongoose schema design

Query optimization (pagination, filtering, sorting)

Environment configuration

Clean backend structure

🔧 Future Improvements

JWT Authentication

Role-based access control

Input validation (Joi / Zod)

Rate limiting

Swagger documentation

Unit & integration tests

📜 License

Open-source. Free to use and modify.
