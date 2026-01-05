# Mode Tracker - Setup Guide

This guide will help you set up both the frontend and backend of the Mode Tracker application.

## Project Structure

```
mode-tracker/
├── backend/              # Express + MongoDB backend
│   ├── src/
│   ├── package.json
│   └── README.md         # Backend documentation
├── src/                  # React frontend
├── package.json          # Frontend dependencies
└── SETUP_GUIDE.md       # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **npm** (comes with Node.js) or **yarn**

## Quick Start

### 1. Install Dependencies

#### Frontend
```bash
# In the root directory
npm install
```

#### Backend
```bash
# Navigate to backend directory
cd backend
npm install
```

### 2. Configure Environment Variables

#### Frontend (.env in root)
Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Backend (backend/.env)
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mode-tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

**Important Security Notes:**
- Change the JWT secrets to secure random strings in production
- Never commit the `.env` file to version control
- Use environment-specific values for production deployments

### 3. Start MongoDB

#### Option A: Local MongoDB
```bash
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `backend/.env` with your Atlas connection string

Example Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mode-tracker?retryWrites=true&w=majority
```

### 4. Start the Application

You'll need two terminal windows:

#### Terminal 1: Start Backend
```bash
cd backend
npm run dev
```

The backend server will start on http://localhost:5000

#### Terminal 2: Start Frontend
```bash
# In the root directory
npm run dev
```

The frontend will start on http://localhost:5173

### 5. Test the Setup

1. Open your browser and navigate to http://localhost:5173
2. You should see the Mode Tracker application
3. Try signing up for a new account
4. If successful, you'll be redirected to the home page

## Available Scripts

### Frontend (Root Directory)

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend (backend/ Directory)

```bash
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm start          # Run production build
npm run lint       # Run ESLint
```

## API Endpoints

Once the backend is running, you can test the endpoints:

### Authentication

- **POST** `/api/auth/signup` - Create a new account
- **POST** `/api/auth/login` - Login to existing account
- **GET** `/api/auth/me` - Get current user (protected)
- **PUT** `/api/auth/profile` - Update profile (protected)
- **POST** `/api/auth/refresh` - Refresh access token
- **POST** `/api/auth/logout` - Logout (protected)

### Health Check

- **GET** `/health` - Check if server is running

For detailed API documentation, see [backend/README.md](backend/README.md)

## Troubleshooting

### Backend won't start

**Error: "MongoDB connection failed"**
- Ensure MongoDB is running
- Check your `MONGODB_URI` in `backend/.env`
- Verify network connectivity if using MongoDB Atlas

**Error: "Port 5000 is already in use"**
- Change the `PORT` in `backend/.env` to another port (e.g., 5001)
- Update `VITE_API_URL` in frontend `.env` accordingly

### Frontend won't connect to backend

**Error: "Failed to fetch" or "Network error"**
- Ensure the backend is running
- Check that `VITE_API_URL` in `.env` matches your backend URL
- Verify CORS settings in `backend/src/server.ts`

**Error: "CORS policy blocked"**
- Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Default is `http://localhost:5173`

### Authentication Issues

**Error: "Invalid token"**
- Clear browser localStorage and try logging in again
- Check that JWT secrets are set in `backend/.env`

**Error: "User already exists"**
- This email is already registered
- Try logging in instead or use a different email

## Production Deployment

### Backend Deployment (e.g., Heroku, Railway, Render)

1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` to your production frontend URL
3. Update `NODE_ENV` to `production`
4. Use a production MongoDB instance (MongoDB Atlas recommended)
5. Generate strong, unique JWT secrets

### Frontend Deployment (e.g., Vercel, Netlify)

1. Set `VITE_API_URL` to your production backend URL
2. Build the frontend: `npm run build`
3. Deploy the `dist` directory

## Technology Stack

### Frontend
- React 19
- TypeScript
- React Router
- Zustand (state management)
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)

## Project Features

✅ User authentication with JWT tokens  
✅ Secure password hashing  
✅ Input validation  
✅ Error handling  
✅ CORS configuration  
✅ TypeScript throughout  
✅ Hot reload in development  

## Next Steps

After successful setup:

1. Explore the codebase
2. Read the [backend README](backend/README.md) for API details
3. Start building your mood tracking features
4. Add more API endpoints as needed
5. Implement protected routes in the frontend

## Support

If you encounter issues not covered in this guide:

1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that MongoDB is accessible

## License

ISC


