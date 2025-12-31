Running CloudText Locally

Follow these steps to run the application on your local machine.

Prerequisites

Make sure you have the following installed:

Node.js (v16 or higher recommended)

npm

MongoDB (local instance or MongoDB Atlas)

Installation Steps

Clone the repository

git clone https://github.com/SaswatGit/cloudtext-webapp.git
cd cloudtext-webapp

Install dependencies

npm install

Set up environment variables

Create a .env.local file in the root directory and add:

MONGODB_URL=your_mongodb_connection_string
APP_URL=http://localhost:3000
TEST_MODE=1

Run the application

npm run dev

Open in browser

http://localhost:3000

🗄️ Persistence Layer

CloudText uses MongoDB as the persistence layer with Mongoose as the ODM (Object Data Modeling) library.

MongoDB is used to store uploaded text content.

Mongoose helps define schemas, validate data, and manage database interactions efficiently.

Each text upload is stored as a document and accessed via a unique URL identifier.

🧠 Important Design Decisions

Pastebin-like Architecture
Each text entry is stored once and retrieved using a unique URL, keeping the application simple and fast.

MongoDB + Mongoose
Chosen for flexibility, scalability, and ease of handling unstructured text data.

Development Mode with npm run dev
Enables faster development with hot reloading and better debugging.

Minimal UI & API Logic
The focus is on performance, simplicity, and easy content sharing without unnecessary complexity.

Separation of Concerns
Clear separation between routes, database models, and business logic for maintainability.
