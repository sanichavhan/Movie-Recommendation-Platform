# Deployment Configuration Guide

## Problem
Your application works locally but fails after deployment because:
1. **CORS is blocked** - Backend only accepts requests from `localhost:5173`
2. **Hardcoded API URLs** - Frontend had hardcoded backend URL
3. **Missing environment variables** - Production URLs not configured

## Solution

### ✅ Changes Made:
1. Backend CORS now uses `FRONTEND_URL` environment variable
2. Frontend API uses `VITE_API_BASE_URL` environment variable
3. Created `.env.development`, `.env.production`, and `.env.example` files

---

## Deployment Steps

### Backend Deployment (Render, Vercel, etc.)

1. **Set Environment Variables** in your hosting platform:
   ```
   MONGO_URI=your-mongodb-url
   JWT_SECRET=your-jwt-secret
   REDIS_HOST=your-redis-host
   REDIS_PORT=your-redis-port
   REDIS_PASSWORD=your-redis-password
   IMAGEKIT_PRIVATE_KEY=your-imagekit-key
   TMDB_API_KEY=your-tmdb-api-key
   TMDB_BASE_URL=https://api.themoviedb.org/3
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Important**: Replace `your-frontend-domain.com` with your actual deployed frontend URL (e.g., `https://myapp.vercel.app`)

---

### Frontend Deployment (Vercel, Netlify, etc.)

1. **Update `.env.production`**:
   ```
   VITE_API_BASE_URL=https://your-backend-domain.com/api
   ```
   > Replace `your-backend-domain.com` with your deployed backend URL (e.g., `https://myapp.onrender.com`)

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Deploy the `dist/` folder**

---

## Environment Variables Explained

### Backend (.env)
- `FRONTEND_URL` → Allowed domain for CORS (your deployed frontend URL)
- `TMDB_API_KEY` → Movie database API key (already configured)
- `MONGO_URI` → MongoDB connection string (already configured)

### Frontend (.env.production)
- `VITE_API_BASE_URL` → Backend API endpoint (your deployed backend URL)

---

## Testing After Deployment

1. Check **network requests** in browser DevTools (F12 → Network)
2. Look for errors like:
   - `CORS error` → Update `FRONTEND_URL` in backend
   - `API not found` → Update `VITE_API_BASE_URL` in frontend
   - `401 Unauthorized` → Check JWT token/API key

3. Test login → Register → Fetch movies to ensure full flow works

---

## Quick Reference

| Scenario | Fix |
|----------|-----|
| CORS error when frontend calls API | Update `FRONTEND_URL` on backend |
| API 404 / Network Error | Update `VITE_API_BASE_URL` on frontend |
| API Key not working | Check `TMDB_API_KEY` is correct |
| Login fails | Check `JWT_SECRET` is same across deployments |

