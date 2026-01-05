# Environment Variables Setup

## Frontend Environment Variables

Create a `.env` file in the **root directory** with:

```env
VITE_API_URL=http://localhost:5000/api
```

## Backend Environment Variables

Create a `.env` file in the **backend/** directory with:

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

## Important Notes

1. **Never commit `.env` files** to version control
2. **Change JWT secrets** to secure random strings in production
3. **MongoDB URI**: Use local MongoDB or get a connection string from MongoDB Atlas
4. The PORT and FRONTEND_URL should match your actual setup

## Quick Copy Templates

### For Local Development (copy these as-is):

**Root .env:**
```
VITE_API_URL=http://localhost:5000/api
```

**backend/.env:**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mode-tracker
JWT_SECRET=dev-secret-key-change-in-production-12345
JWT_REFRESH_SECRET=dev-refresh-secret-key-change-in-production-67890
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
FRONTEND_URL=http://localhost:5173
```

## Generating Secure Secrets (for production)

You can generate secure random strings for JWT secrets using:

```bash
# In Node.js (run in terminal)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this command twice to get two different secrets for `JWT_SECRET` and `JWT_REFRESH_SECRET`.


