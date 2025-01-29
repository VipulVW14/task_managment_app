# Task Management Web App

## Overview
This is a full-stack **Task Management Web Application** built with **React.js (Vite), Node.js (Express), PostgreSQL, and Docker**. It includes **JWT authentication with refresh tokens**, **task CRUD operations**, and **Dockerized deployment**.

## Features
- **User Authentication** (JWT + Refresh Tokens)
- **Task Management** (Create, Read, Update, Delete)
- **React Frontend** with Redux Toolkit & Tailwind CSS
- **Node.js Backend** with Prisma ORM & PostgreSQL
- **Dockerized Setup** for easy deployment

---

## Tech Stack
### **Frontend**
- React.js (Vite)
- Redux Toolkit
- Axios
- Tailwind CSS
- React Router

### **Backend**
- Node.js (Express.js)
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT) for authentication

### **Deployment**
- Docker
- Docker Compose

---

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/task-management-app.git
cd task-management-app
```

### 2. Setup Backend
```sh
cd backend
npm install
npx prisma migrate dev --name init
```

#### Create a `.env` file in `backend/`
```sh
DATABASE_URL="postgresql://postgres:password@db:5432/taskdb"
JWT_SECRET="your_secret_key"
REFRESH_SECRET="your_refresh_secret"
PORT=5000
```

### Run Backend
```sh
npm run dev
```

---

### 3. Setup Frontend
```sh
cd ../frontend
npm install
```

#### Create a `.env` file in `frontend/`
```sh
VITE_API_URL="http://localhost:5000"
```

### Run Frontend
```sh
npm run dev
```

---

## API Endpoints
### **Authentication**
- `POST /api/auth/register` → Register a new user
- `POST /api/auth/login` → Login and receive access & refresh tokens
- `POST /api/auth/refresh` → Get a new access token using refresh token

### **Task Management**
- `GET /api/tasks` → Get all tasks
- `POST /api/tasks` → Create a task
- `PUT /api/tasks/:id` → Update a task
- `DELETE /api/tasks/:id` → Delete a task

---

## Running with Docker
Ensure **Docker** and **Docker Compose** are installed.

### 1. Build and Run Containers
```sh
docker-compose up --build
```

### 2. Access the App
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- PostgreSQL: `postgres://postgres:password@localhost:5432/taskdb`

### 3. Stop Containers
```sh
docker-compose down
```
