# Mode Tracker - Project Structure

## Complete Directory Structure

```
mode-tracker/
│
├── backend/                          # Backend API (Express + MongoDB)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts           # MongoDB connection setup
│   │   │
│   │   ├── controllers/
│   │   │   └── authController.ts     # Authentication business logic
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts               # JWT verification middleware
│   │   │   ├── errorHandler.ts       # Global error handling
│   │   │   └── validate.ts           # Input validation rules
│   │   │
│   │   ├── models/
│   │   │   └── User.ts               # User schema with password hashing
│   │   │
│   │   ├── routes/
│   │   │   └── authRoutes.ts         # Authentication API routes
│   │   │
│   │   ├── types/
│   │   │   └── express.d.ts          # TypeScript type definitions
│   │   │
│   │   ├── utils/
│   │   │   └── jwt.ts                # JWT token utilities
│   │   │
│   │   └── server.ts                 # Express app entry point
│   │
│   ├── .env                          # Environment variables (CREATE THIS)
│   ├── .env.example                  # Environment template
│   ├── .eslintrc.json                # ESLint configuration
│   ├── .gitignore                    # Git ignore rules
│   ├── ENV_TEMPLATE.txt              # Quick env setup
│   ├── package.json                  # Backend dependencies
│   ├── QUICK_START.md                # Quick setup guide
│   ├── README.md                     # API documentation
│   └── tsconfig.json                 # TypeScript configuration
│
├── src/                              # Frontend (React + TypeScript)
│   ├── assets/
│   │   ├── data.json
│   │   ├── fonts/
│   │   └── images/
│   │
│   ├── components/                   # Reusable components
│   │
│   ├── context/
│   │   └── authContext.tsx           # ✅ UPDATED - Backend integration
│   │
│   ├── features/                     # Feature modules
│   │
│   ├── hooks/                        # Custom React hooks
│   │
│   ├── layouts/                      # Layout components
│   │
│   ├── routes/
│   │   ├── HomePage.tsx              # Home page
│   │   ├── Login.tsx                 # ✅ UPDATED - Backend integration
│   │   └── SignUp.tsx                # ✅ UPDATED - Backend integration
│   │
│   ├── store/                        # State management
│   │
│   ├── types/                        # TypeScript types
│   │
│   ├── utils/
│   │   └── api.ts                    # ✅ NEW - API client
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── public/
│   └── vite.svg
│
├── .env                              # Frontend env vars (CREATE THIS)
├── .env.example                      # Frontend env template
├── .gitignore                        # ✅ UPDATED - Ignore .env files
├── ENV_SETUP_INSTRUCTIONS.md         # ✅ NEW - Env setup guide
├── eslint.config.js
├── IMPLEMENTATION_COMPLETE.md        # ✅ NEW - Implementation summary
├── index.html
├── package.json                      # Frontend dependencies
├── postcss.config.js
├── PROJECT_STRUCTURE.md              # ✅ NEW - This file
├── README.md                         # Original project README
├── SETUP_GUIDE.md                    # ✅ NEW - Complete setup guide
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## Key Files Explained

### Backend Files

| File | Purpose |
|------|---------|
| `src/server.ts` | Main Express application entry point |
| `src/config/database.ts` | MongoDB connection configuration |
| `src/models/User.ts` | User data model with password hashing |
| `src/controllers/authController.ts` | Authentication logic (signup, login, etc.) |
| `src/routes/authRoutes.ts` | API endpoint definitions |
| `src/middleware/auth.ts` | JWT token verification |
| `src/middleware/errorHandler.ts` | Global error handling |
| `src/middleware/validate.ts` | Input validation rules |
| `src/utils/jwt.ts` | JWT token generation/validation |
| `src/types/express.d.ts` | TypeScript type extensions |

### Frontend Files

| File | Purpose |
|------|---------|
| `src/utils/api.ts` | API client for backend communication |
| `src/context/authContext.tsx` | Authentication state management |
| `src/routes/Login.tsx` | Login page component |
| `src/routes/SignUp.tsx` | Signup page component |

### Configuration Files

| File | Purpose |
|------|---------|
| `backend/.env` | Backend environment variables (YOU CREATE) |
| `.env` | Frontend environment variables (YOU CREATE) |
| `backend/tsconfig.json` | Backend TypeScript configuration |
| `tsconfig.json` | Frontend TypeScript configuration |
| `backend/package.json` | Backend dependencies |
| `package.json` | Frontend dependencies |

### Documentation Files

| File | Purpose |
|------|---------|
| `IMPLEMENTATION_COMPLETE.md` | Complete implementation summary |
| `SETUP_GUIDE.md` | Full setup instructions |
| `ENV_SETUP_INSTRUCTIONS.md` | Environment variable setup |
| `backend/README.md` | Backend API documentation |
| `backend/QUICK_START.md` | Quick backend setup |
| `PROJECT_STRUCTURE.md` | This file |

## Request Flow

```
User Browser
    ↓
React Frontend (http://localhost:5173)
    ↓
src/utils/api.ts (API Client)
    ↓
Express Backend (http://localhost:5000)
    ↓
Routes (authRoutes.ts)
    ↓
Middleware (auth.ts, validate.ts)
    ↓
Controllers (authController.ts)
    ↓
Models (User.ts)
    ↓
MongoDB Database
```

## Authentication Flow

```
1. User submits login/signup form
   ↓
2. Frontend calls API (src/utils/api.ts)
   ↓
3. Backend validates input (validate.ts)
   ↓
4. Controller processes request (authController.ts)
   ↓
5. User model interacts with MongoDB (User.ts)
   ↓
6. JWT tokens generated (jwt.ts)
   ↓
7. Tokens sent to frontend
   ↓
8. Frontend stores tokens in localStorage
   ↓
9. Future requests include token in header
   ↓
10. Backend verifies token (auth.ts middleware)
```

## Environment Variables

### Backend (`backend/.env`)
```
PORT                   - Server port (5000)
NODE_ENV              - Environment (development/production)
MONGODB_URI           - MongoDB connection string
JWT_SECRET            - Secret for access tokens
JWT_REFRESH_SECRET    - Secret for refresh tokens
JWT_ACCESS_EXPIRY     - Access token lifetime (15m)
JWT_REFRESH_EXPIRY    - Refresh token lifetime (7d)
FRONTEND_URL          - Frontend URL for CORS
```

### Frontend (`.env`)
```
VITE_API_URL          - Backend API URL
```

## API Endpoints Summary

| Method | Endpoint | Protected | Purpose |
|--------|----------|-----------|---------|
| POST | `/api/auth/signup` | No | Create account |
| POST | `/api/auth/login` | No | Login |
| POST | `/api/auth/refresh` | No | Refresh token |
| GET | `/api/auth/me` | Yes | Get current user |
| PUT | `/api/auth/profile` | Yes | Update profile |
| POST | `/api/auth/logout` | Yes | Logout |
| GET | `/health` | No | Health check |

## Dependencies

### Backend Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **express-validator** - Input validation

### Frontend Dependencies (existing)
- **react** - UI library
- **react-dom** - React DOM renderer
- **react-router-dom** - Routing
- **zustand** - State management

## Getting Started

1. **Install all dependencies:**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd backend && npm install
   ```

2. **Create environment files:**
   - `backend/.env` (see ENV_SETUP_INSTRUCTIONS.md)
   - `.env` (see ENV_SETUP_INSTRUCTIONS.md)

3. **Start MongoDB:**
   ```bash
   mongod
   ```

4. **Run both servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:5173
   ```

## Next Steps

Now that the backend is set up, you can:

1. Add more API endpoints for mood tracking
2. Create mood entry models
3. Build analytics features
4. Add data visualization
5. Implement additional authentication features (password reset, etc.)

See `IMPLEMENTATION_COMPLETE.md` for full details!


