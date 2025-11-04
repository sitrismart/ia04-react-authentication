# 🔐 React Authentication with JWT (Access + Refresh)

This project demonstrates a **secure JWT authentication flow** using **React + Vite (Frontend)** and **Node.js + Express (Backend)**.  
The app uses **Access Tokens** (stored in memory) and **Refresh Tokens** (stored in localStorage) for persistent authentication.

---

## 🚀 Tech Stack

### 🖥 Frontend
- React 18 + Vite
- React Router DOM
- React Query (`@tanstack/react-query`)
- React Hook Form
- Axios (with token interceptors)
- TailwindCSS (optional for styling)

### 🧩 Backend
- Node.js + Express.js
- JSON Web Token (JWT)
- dotenv
- CORS

---

## 🌐 Live Demo

| Part | URL |
|------|-----|
| **Frontend (React App)** | 🔗 [https://jwt-auth-frontend.vercel.app](https://jwt-auth-frontend.vercel.app) |
| **Backend (API Server)** | 🔗 [https://jwt-auth-backend.onrender.com](https://jwt-auth-backend.onrender.com) |

---

## 🔄 Authentication Flow

1. **Login**
   - User enters email & password.
   - Backend returns:
     - `accessToken` → short-lived (e.g. 15 mins)
     - `refreshToken` → long-lived (e.g. 7 days)
   - `accessToken` stored in memory.
   - `refreshToken` stored in `localStorage`.

2. **Authenticated Requests**
   - Every protected request attaches `Authorization: Bearer <accessToken>` header via Axios interceptor.

3. **Token Refresh**
   - If a request gets `401 Unauthorized`, Axios automatically calls `/auth/refresh` using `refreshToken`.
   - If refresh succeeds → updates `accessToken` and retries the failed request.
   - If refresh fails → logs user out and redirects to `/login`.

4. **Logout**
   - Client removes both tokens.
   - Backend invalidates refresh token (in-memory array).

---

## 🧠 Folder Structure

### Frontend
frontend/
│
├── src/
│ ├── api/
│ │ └── axios.js
│ ├── auth/
│ │ ├── AuthContext.js
│ │ ├── AuthProvider.jsx
│ │ └── useAuth.js
│ ├── pages/
│ │ ├── Login.jsx
│ │ └── Dashboard.jsx
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .env
├── package.json
└── vite.config.js

shell
Sao chép mã

### Backend
backend/
│
├── server.js
├── package.json
├── .env
└── routes/
└── auth.js

yaml
Sao chép mã

---

## ⚙️ Local Development Setup

### 1️⃣ Clone repos
```bash
git clone https://github.com/<your-username>/jwt-auth-backend.git
git clone https://github.com/<your-username>/jwt-auth-frontend.git
2️⃣ Backend setup
bash
Sao chép mã
cd jwt-auth-backend
npm install
Create .env:

bash
Sao chép mã
ACCESS_SECRET=access_secret_key
REFRESH_SECRET=refresh_secret_key
PORT=5000
Run:

bash
Sao chép mã
npm start
➡ Server runs at: http://localhost:5000

3️⃣ Frontend setup
bash
Sao chép mã
cd jwt-auth-frontend
npm install
Create .env:

bash
Sao chép mã
VITE_API_URL=http://localhost:5000
Run:

bash
Sao chép mã
npm run dev
➡ App runs at: http://localhost:5173

☁️ Deployment Guide
🔹 Deploy Backend (Render)
Push backend to GitHub → jwt-auth-backend

Go to Render.com

Create New Web Service

Connect your repo

Build command: npm install

Start command: npm start

Add environment variables:

ini
Sao chép mã
ACCESS_SECRET=your_access_secret
REFRESH_SECRET=your_refresh_secret
Deploy → copy the deployed URL
e.g. https://jwt-auth-backend.onrender.com

🔹 Deploy Frontend (Vercel)
Push frontend to GitHub → jwt-auth-frontend

Go to Vercel

Import your frontend repo

Add Environment Variable:

ini
Sao chép mã
VITE_API_URL=https://jwt-auth-backend.onrender.com
Deploy — Vercel auto builds with npm run build

🧩 Key Files
src/api/axios.js
Handles Axios instance + JWT refresh logic.

src/auth/AuthProvider.jsx
Provides auth state & React Query login/logout mutations.

src/auth/useAuth.js
Custom hook to access authentication context.

🧰 Commands
Action	Command
Start backend	npm start
Start frontend	npm run dev
Build frontend	npm run build
Preview frontend build	npm run preview

📦 Example Login Credentials
Email	Password
test@example.com	123456

💡 Evaluation Checklist
✅ Access & Refresh token flow
✅ Axios interceptor with auto refresh
✅ React Query for data fetching & mutation
✅ React Hook Form for form validation
✅ Protected routes & logout
✅ Deployed to Render & Vercel
✅ Error handling & clean UI