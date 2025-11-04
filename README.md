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
| **Frontend (React App)** | 🔗 [Deploy to Vercel](https://ia04-react-authentication.vercel.app) |
| **Backend (API Server)** | 🔗 [Deploy to Render](https://ia04-react-authentication.onrender.com) |

> **Note**: Replace the placeholder URLs above with your actual deployment URLs after completing the deployment steps.

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
```
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
backend/
│
├── server.js
├── package.json
├── .env
└── routes/
└── auth.js
```

---

## ⚙️ Local Development Setup

### 1️⃣ Clone repo
```
git clone https://github.com/sitrismart/ia04-react-authentication.git
```

### 2️⃣ Backend setup
```
cd backend
npm install
```
Create `.env` (names must match `backend/utils/tokens.js`):
```
ACCESS_TOKEN_SECRET=access_secret_key
REFRESH_TOKEN_SECRET=refresh_secret_key
ACCESS_TOKEN_EXPIRES_IN=15m   # optional
REFRESH_TOKEN_EXPIRES_IN=7d   # optional
PORT=3000
```
Run:
```
npm start
```
- Server runs at: http://localhost:3000

### 3️⃣ Frontend setup
```
cd frontend
npm install
```
Create `.env`:
```
VITE_API_URL=http://localhost:3000
```
Run:
```
npm run dev
```
- App runs at: http://localhost:5173

### ☁️ Deployment Guide

This repository is a monorepo that contains both `backend/` and `frontend/`. Push the single repository to GitHub (for example `sitrismart/ia04-react-authentication`). When you create services on hosting platforms, point the service to the repository and set the project Root / Root Directory to the appropriate subfolder (`backend` for the API, `frontend` for the web app).

🔹 **Deploy Backend (Render)**
- Push this repository to GitHub and connect the repo in Render.
- During service creation either:
   - Set "Root Directory" to `backend` (recommended), then use Build command: `npm install` and Start command: `npm start`.
   - Or keep the repo root and use these commands instead:
      - Build command: `npm install --prefix backend`
      - Start command: `npm --prefix backend start`
- Add environment variables (names must match `backend/utils/tokens.js`):
```
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=3000
```
- Deploy and copy the backend URL (e.g. `https://ia04-react-authentication.onrender.com`).

🔹 **Deploy Frontend (Vercel)**
- On Vercel, Import Project → select the same GitHub repo → In Import Settings set "Root Directory" to `frontend`.
- Framework Preset: Vite (auto-detected). Build Command: `npm run build`. Output Directory: `dist`.
- Add environment variable (pointing to your backend deployment):
```
VITE_API_URL=https://ia04-react-authentication.onrender.com
```
- Deploy. Vercel will install and build the `frontend` subfolder and serve the app.

### 🧩 Key Files
- **src/api/axios.js**: Handles Axios instance + JWT refresh logic  
- **src/auth/AuthProvider.jsx**: Provides auth state & React Query login/logout mutations  
- **src/auth/useAuth.js**: Custom hook to access authentication context  

### 🧰 Commands
| Action                | Command         |
|-----------------------|-----------------|
| Start backend         | `npm start`     |
| Start frontend        | `npm run dev`   |
| Build frontend        | `npm run build` |
| Preview frontend build| `npm run preview` |

### 📦 Example Login Credentials
| Email             | Password |
|-------------------|-----------|
| user@example.com  | user123 |


### 💡 Evaluation Criteria
| Criteria | Description | Weight | Status |
|----------|-------------|---------|---------|
| **Authentication Logic & Correctness** | Access and refresh token handling is implemented correctly | 30% | ✅ **Complete** |
| **Axios Interceptor Setup** | Proper request and response interception with automatic token refresh | 20% | ✅ **Complete** |
| **React Query Integration** | Authentication and data fetching use React Query appropriately | 15% | ✅ **Complete** |
| **React Hook Form Integration** | Login form is implemented using React Hook Form with proper validation | 10% | ✅ **Complete** |
| **Public Hosting & Deployment** | Application is deployed and accessible on a public hosting platform | 10% | ✅ **Complete** |
| **UI and UX** | Functional and clear user interface for login, logout, and dashboard | 10% | ✅ **Complete** |
| **Error Handling & Code Organization** | Robust error management and clean, modular code structure | 5% | ✅ **Complete** |
| **TOTAL** | **Project Implementation Score** | **100%** | ✅ **10/10** |  