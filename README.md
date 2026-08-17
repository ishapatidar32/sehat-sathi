# 🩺 Sehat Sathi

**Sehat Sathi** is a MERN-stack telemedicine platform that connects **patients** with **verified doctors**. It uses a single OTP-based email flow for both login and signup, and adds an **admin approval workflow** so that every doctor account is manually verified before they can start practicing on the platform.

---

## ✨ Features

- **Unified OTP authentication** — one `request-otp` → `verify-otp` flow handles both login and registration. The frontend doesn't need to know in advance whether an email belongs to an existing user.
- **Role-based accounts** — built on a single `User` model with Mongoose discriminators for `Patient`, `Doctor`, and `Admin`, each with role-specific fields.
- **Patient profiles** — blood group, height/weight, allergies, existing conditions, current medications, past surgeries, family medical history, and emergency contact details.
- **Doctor onboarding & verification** — doctors submit registration number, qualification, specialization, experience, hospital affiliation, fee, languages spoken, and supporting document URLs (degree, registration certificate, government ID). New doctor accounts stay in a `pending` state and **cannot log in until an admin approves them**.
- **Admin dashboard** — separate admin login, with endpoints to list pending doctors, view a doctor's details, and approve or reject applications (with an optional rejection reason).
- **JWT-based session management** — short-lived access tokens plus refresh tokens (stored as a hash and delivered via an HTTP-only cookie) with dedicated refresh and logout endpoints.
- **Email OTP delivery** via Nodemailer/SMTP.

---

## 🏗️ Tech Stack

**Frontend**
- React 19 + React Router
- Axios for API calls
- Tailwind CSS

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose (discriminator-based user model)
- JSON Web Tokens (`jsonwebtoken`) for access/refresh/registration tickets
- bcryptjs for password hashing (admin accounts)
- Nodemailer for OTP emails
- dotenv + `config` for environment configuration

---

## 📁 Project Structure

```
sehat-sathi/
├── backend/
│   ├── config/          # env validation, DB connection
│   ├── controllers/     # auth & admin business logic
│   ├── middleware/       # JWT authentication & role guard
│   ├── model/            # User / Doctor / Patient / Admin schemas
│   ├── router/            # /api/auth and /api/admin routes
│   ├── scripts/           # one-off scripts (e.g. create an admin)
│   ├── utils/              # JWT, OTP, mail helpers
│   └── server.js
└── frontend/
    ├── public/
    └── src/
        ├── admin/          # Admin login, dashboard, protected route
        ├── api/             # Axios instance
        ├── components/       # Navbar, Footer
        ├── landingpage/       # Home page, unified Auth form (login/signup)
        └── style/
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An SMTP-capable email account (e.g. Gmail with an app password) for sending OTPs

### 1. Clone the repository

```bash
git clone https://github.com/ishapatidar32/sehat-sathi.git
cd sehat-sathi
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:

```env
MONGO_URL=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REGISTRATION_SECRET=your_registration_ticket_secret
SMTP_EMAIL=your_smtp_email@example.com
SMTP_PASSWORD=your_smtp_email_app_password
NODE_ENV=development
```

Run the server:

```bash
npm start
```

The API will be available at `http://localhost:8000`.

> **Optional — create an admin account:** the backend does not auto-seed an admin. Update the credentials in `backend/scripts/createAdmin.js` and run:
> ```bash
> node scripts/createAdmin.js
> ```

### 3. Frontend setup

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`.

---

## 🔌 API Overview

### Auth — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/request-otp` | Sends an OTP to the given email (works for both new and existing users) |
| POST | `/verify-otp` | Verifies the OTP; logs the user in if the account exists, or returns a registration ticket for new users |
| POST | `/registration` | Completes signup (patient or doctor) using a valid registration ticket |
| POST | `/refresh` | Issues a new access token using the refresh token cookie |
| POST | `/logout` | Clears the refresh token / logs the user out |
| GET | `/me` | Returns the authenticated user's profile *(requires Bearer token)* |

### Admin — `/api/admin`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | Admin login (email + password) |
| GET | `/doctors/pending` | List doctors awaiting verification *(Admin only)* |
| GET | `/doctors/:id` | Get a specific doctor's application details *(Admin only)* |
| PATCH | `/doctors/:id/approve` | Approve a doctor's application *(Admin only)* |
| PATCH | `/doctors/:id/reject` | Reject a doctor's application, with an optional reason *(Admin only)* |

---

## 🗺️ How the auth flow works

1. User enters their email → `POST /request-otp` sends a 6-digit OTP and tells the frontend whether the account already exists.
2. User submits the OTP → `POST /verify-otp`:
   - **Existing user:** logs them in directly and returns access/refresh tokens (doctors must already be `approved`).
   - **New user:** returns a short-lived `registrationTicket` instead of logging in.
3. New users complete their profile (`name`, `role`, and role-specific fields) → `POST /registration`, using the ticket so the email can never be spoofed.
4. If the role is `doctor`, the account is created with `verificationStatus: "pending"` and cannot log in until an admin approves it via the admin dashboard.
