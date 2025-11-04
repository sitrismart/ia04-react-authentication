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
```

### Backend
```
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
PORT=4000
```
Run:
```
npm start
```
- Server runs at: http://localhost:4000

### 3️⃣ Frontend setup
```
cd frontend
npm install
```
Create `.env`:
```
VITE_API_URL=http://localhost:4000
```
Run:
```
npm run dev
```
- App runs at: http://localhost:5173

### ☁️ Deployment Guide

This repository is a monorepo that contains both `backend/` and `frontend/`. Push the single repository to GitHub (for example `sitrismart/ia04-react-authentication`). When you create services on hosting platforms, point the service to the repository and set the project Root / Root Directory to the appropriate subfolder (`backend` for the API, `frontend` for the web app). If the platform doesn't support selecting a root directory, you can use prefix install/start commands shown below.

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
PORT=4000
```
- Deploy and copy the backend URL (e.g. `https://your-backend.onrender.com`).

🔹 **Deploy Frontend (Vercel)**
- On Vercel, Import Project → select the same GitHub repo → In Import Settings set "Root Directory" to `frontend`.
- Framework Preset: Vite (auto-detected). Build Command: `npm run build`. Output Directory: `dist`.
- Add environment variable (pointing to your backend deployment):
```
VITE_API_URL=https://your-backend.onrender.com
```
- Deploy. Vercel will install and build the `frontend` subfolder and serve the app.

Notes:
- If your hosting provider doesn't let you pick a subdirectory, using `--prefix <folder>` (npm) in build/start commands is a reliable alternative.
- For CI/CD you can also configure the pipeline to run only in the chosen subfolder.


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
| user@example.com  | password123 |

### 💡 Evaluation Checklist
- ✅ Access & Refresh token flow  
- ✅ Axios interceptor with auto refresh  
- ✅ React Query for data fetching & mutation  
- ✅ React Hook Form for form validation  
- ✅ Protected routes & logout  
- ✅ Deployed to Render & Vercel  
- ✅ Error handling & clean UI  
