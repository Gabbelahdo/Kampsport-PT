# Kampsport-PT

A membership website for a private Thai boxing (Muay Thai) personal trainer. Visitors can read about the service and pricing, create an account, and once logged in access member-only training articles and submit a PT application form that is emailed to the trainer.

Full-stack project: React frontend, Express and MySQL backend with JWT authentication, deployed on AWS Elastic Beanstalk.

## Features

* **Public landing page** with the trainer intro, session pricing and a call to register.
* **Registration and login** with bcrypt-hashed passwords and JWT sessions (one-hour expiry).
* **Protected routes.** Articles and the application form are gated behind a valid token; unauthenticated users are redirected to login.
* **Member articles** served from the API to logged-in users.
* **PT application form** that validates input and emails the applicant's details to the trainer via Nodemailer.

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router 7, Axios |
| Backend | Node.js, Express 5 |
| Database | MySQL (mysql2), Prisma for schema and migrations |
| Auth | JWT (jsonwebtoken), bcrypt |
| Email | Nodemailer (Gmail) |
| Infra | AWS Elastic Beanstalk, Amazon RDS (MySQL) |

## Getting started

### Backend

```bash
cd backend
npm install
# create a .env file (see variables below)
npm start          # runs node server.js on port 5000
```

### Frontend

```bash
cd frontend
npm install
# set VITE_API_URL in a .env file at the frontend root
npm run dev
```

The frontend reads `VITE_API_URL` and attaches the stored JWT to every request through an Axios interceptor.

## Environment variables

**Backend** (`backend/.env`)

| Variable | Description |
| --- | --- |
| `RDS_HOSTNAME` | MySQL host |
| `RDS_USERNAME` | MySQL user |
| `RDS_PASSWORD` | MySQL password |
| `RDS_DB_NAME` | Database name |
| `RDS_PORT` | MySQL port |
| `JWT_SECRET` | Secret used to sign tokens |
| `EMAIL_USER` | Gmail address that sends application emails |
| `EMAIL_PASS` | Gmail app password |
| `PORT` | Server port (defaults to 5000) |

**Frontend** (`frontend/.env`)

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API |

## API reference

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/` | No | Health check string |
| `POST` | `/auth/register` | No | Create a user (username and password) |
| `POST` | `/auth/login` | No | Log in and receive a JWT |
| `GET` | `/articles` | JWT | Return member articles |
| `POST` | `/signup` | No | Submit a PT application; emails the trainer |

## Database

A single `User` table holds the account (`id`, unique `username`, hashed `password`). The schema and its initial migration live under `backend/prisma`.

## Deployment

The backend runs on AWS Elastic Beanstalk with an Amazon RDS MySQL instance. The frontend is built with Vite and points at the Elastic Beanstalk API URL through `VITE_API_URL`.
