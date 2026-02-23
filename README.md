Express-Rest

A simple RESTful API built with Node.js, Express.js, and MongoDB (Mongoose) — designed to be scalable, organized, and easy to extend.

This project demonstrates core backend fundamentals and clean architecture for building APIs.

🧠 What It’s For

This backend provides:

CRUD operations

Pagination

Filtering & sorting

Environment configuration handling

Centralized error handling

A scalable folder structure you can build on

🛠 Tech Stack

Node.js

Express.js

MongoDB

Mongoose

🚀 Setup & Run

Clone the repo

git clone https://github.com/gosag/Express-Rest.git
cd Express-Rest


Install dependencies

npm install


Create a .env file in project root with:

PORT=8000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development


Start dev server

npm run dev


Visit:

http://localhost:8000


📁 Folder Structure
Express-Rest/
├── controllers/        # business logic
├── routes/             # API route definitions
├── models/             # Mongoose schemas
├── middlewares/        # custom middlewares (errors, auth, etc.)
├── config/             # database connection setup
├── public/             # static assets
├── server.js           # entry point
├── .env                # config (not committed)
├── package.json
└── README.md


📡 API Endpoints
Method	Endpoint	Action
GET	/posts	Get all posts
GET	/posts/:id	Get one post
POST	/posts	Create a new post
PUT	/posts/:id	Update a post
DELETE	/posts/:id	Remove a post
📊 Pagination, Filtering & Sorting
Pagination

Use query params:

GET /posts?page=2&limit=10


Response includes:

{
  currentPage,
  totalItems,
  totalPages,
  posts: [...]
}


Filtering

Filter fields in query:

GET /posts?author=123&category=tech


Sorting

Sort results:

GET /posts?sortBy=createdAt&order=desc


Allowed sort fields only.

⚠️ Environment Variables
Key	Purpose
PORT	Server port
MONGO_URI	MongoDB connection string

🛡 Error Handling

Centralized error middleware

Proper HTTP status codes

JSON error responses

Handles bad IDs & DB errors gracefully

🔮 Future Ideas

This project is a strong base. You can add:

JWT Authentication

Role-based access control

Input validation (Joi/Zod)

Swagger docs

Rate limiting

Tests (unit + integration)

📄 License

Open-source — free to use and modify

Found a bug or want to improve something? Contributions and suggestions are welcome!