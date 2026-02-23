MERN Backend Core 🚀

A scalable RESTful API backend built with Node.js, Express.js, and MongoDB (Mongoose) — designed for clarity, maintainability, and real-world use cases.

This repo offers a clean foundation for building production-ready APIs with features like CRUD operations, centralized error handling, pagination, filtering, and more.

🧠 Features

✔️ REST-style CRUD operations
✔️ Pagination, filtering & sorting support
✔️ Environment configuration via .env
✔️ Centralized error handling
✔️ Modular and scalable folder structure
✔️ Clean architecture ready to extend

📦 Tech Stack
Layer	Technology
Server	Node.js
Framework	Express.js
Database	MongoDB
ORM	Mongoose
Middleware	Custom error & utils
🚀 Getting Started
1. Clone the repository
git clone https://github.com/gosag/mern-backend-core.git
cd mern-backend-core
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file in the root with the following:

PORT=8000
MONGO_URI=<your MongoDB connection string>
NODE_ENV=development

Replace <your MongoDB connection string> with your actual URI.

4. Run the development server
npm run dev

Your API should now be running on 🎯 http://localhost:8000

🗂 Folder Structure
mern-backend-core/
├── controllers/      # Business logic
├── routes/           # API endpoints
├── models/           # Mongoose schemas
├── middlewares/      # Error handling & custom middleware
├── config/           # Database connection setup
├── public/           # Static assets
├── server.js         # Entry point
├── .env              # Local config (not committed)
├── package.json
└── README.md
📌 API Endpoints (Example)
Method	Endpoint	Description
GET	/posts	Get all posts
GET	/posts/:id	Get a post by ID
POST	/posts	Create a new post
PUT	/posts/:id	Update a post
DELETE	/posts/:id	Delete a post

Query examples for pagination, filtering, and sorting:

Pagination: /posts?page=2&limit=10

Filtering: /posts?author=123

Sorting: /posts?sortBy=createdAt&order=desc

🛠 Error Handling

The project uses centralized error middleware to return:

✔️ Proper HTTP status codes
✔️ JSON error responses
✔️ Graceful handling of invalid IDs and database errors

🌟 Extend This Project

This core backend is a solid starting point for many applications. Ideas for next steps:

Add JWT authentication

Role-based access control

Input validation (Joi / Zod)

API documentation (Swagger / OpenAPI)

Rate limiting / security hardening

Unit & integration tests

📜 License

This project is open-source and free to use or modify.

❤️ Contributing

Found a bug or want to improve something? Contributions and suggestions are welcome!