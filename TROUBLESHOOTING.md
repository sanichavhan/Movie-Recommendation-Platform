# 🔧 Troubleshooting Guide

This guide covers common issues and how to fix them.

## Backend Issues

### 1. Server Won't Start

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```powershell
# Windows: Find and kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port in .env
PORT=3001
```

### 2. MongoDB Connection Failed

**Error:** `Error Connecting to DB: connect ECONNREFUSED`

**Solution:**
- Check your `MONGO_URI` is correct in `.env`
- Verify MongoDB Atlas credentials
- Make sure your IP is whitelisted in MongoDB Atlas:
  1. Go to MongoDB Atlas Dashboard
  2. Click "Network Access"
  3. Add your current IP or allow from anywhere (development only)

**Error:** `auth failed`

**Solution:**
- Verify username and password in MONGO_URI
- Special characters in password need URL encoding:
  - `@` → `%40`
  - `#` → `%23`
  - `:` → `%3A`
  - `/` → `%2F`

### 3. Redis Connection Issues

**Error:** `redis connection warning`

**Solution:**
- Redis is optional for local development
- If you don't have Redis running, the app still works (without caching)
- To use Redis:
  1. Install Redis from https://redis.io/download
  2. Or use Redis Cloud free tier: https://redis.com/try-free/
  3. Update `.env` with your Redis credentials

### 4. ENV Variables Not Being Loaded

**Error:** Variables in `.env` are undefined (undefined connection string)

**Solution:**
```bash
# Make sure .env file exists in the Backend folder
ls Backend/.env

# Delete node_modules and reinstall
rm -r node_modules package-lock.json
npm install

# Restart the server
npm run dev
```

### 5. Express Middleware Errors

**Error:** `TypeError: cors is not a function`

**Solution:**
```bash
# Reinstall dependencies
npm install

# Delete package-lock.json and reinstall
rm package-lock.json
npm install
```

## Frontend Issues

### 1. Port 5173 Already in Use

**Error:** `Error: EADDRINUSE: address already in use :::5173`

**Solution:**
```powershell
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3001
```

### 2. API Requests Failing (Network Error)

**Error:** `Failed to fetch` or `Network Error` when loading movies

**Solutions:**

1. **Check if backend is running:**
   ```bash
   # Test backend health
   curl http://localhost:3000/health
   ```

2. **Verify API URL in frontend:**
   - Check `.env.local` has: `VITE_API_BASE_URL=http://localhost:3000/api`
   - Restart frontend: `npm run dev`

3. **Check CORS configuration:**
   - Verify `FRONTEND_URL` in Backend `.env` is `http://localhost:5173`
   - Restart backend

### 3. CORS Error in Browser

**Error:** `Access to XMLHttpRequest at 'http://localhost:3000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution:**

Update Backend `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

Restart backend server.

### 4. Blank Page or Build Errors

**Error:** Page isn't loading or showing errors

**Solution:**

1. **Clear cache and reinstall:**
   ```bash
   cd Frontend
   rm -r node_modules package-lock.json
   npm install
   npm run dev
   ```

2. **Check browser console (F12)** for specific errors

3. **Look for TypeScript or build errors** in terminal output

### 5. SCSS/CSS Not Loading

**Error:** Page loads but styles are missing

**Solution:**
```bash
# Make sure Sass is installed
npm list sass

# If not, install it
npm install sass
```

## API/Authentication Issues

### 1. Register/Login Failing

**Error:** `400 Bad Request` when registering

**Solutions:**

1. **Missing fields:**
   - Make sure you're sending `username`, `email`, and `password`

2. **User already exists:**
   - Try a different email or username

3. **Database disconnected:**
   - Check MongoDB connection
   - See MongoDB Connection Failed section above

### 2. Getting "Invalid Credentials" on Login

**Possible causes:**
- Username or email doesn't exist in database
- Password is incorrect
- Database is disconnected

**Solution:**
- Register a new account first
- Check MongoDB is connected (look for ✅ message in backend logs)

### 3. Authorization Token Issues

**Error:** `401 Unauthorized`

**Solution:**
- Make sure you're logged in
- Clear browser cookies and login again
- Check that backend is running

## Performance Issues

### 1. Slow Page Load

**Solutions:**

1. **Check network requests (F12 Network tab):**
   - See which requests are taking too long
   - Verify TMDB API is responding quickly

2. **Clear browser cache:**
   - Ctrl+Shift+Delete in Chrome
   - Cmd+Shift+Delete in Firefox

3. **Check for Redis:**
   - If Redis is not running, API calls are slower
   - Either install Redis or expect slower responses

### 2. Movie Data Not Loading

**Error:** Movies section is blank

**Solutions:**

1. **Check TMDB API key:**
   ```bash
   # Make sure TMDB_API_KEY is set in Backend .env
   ```

2. **Check TMDB API is working:**
   ```bash
   # Replace YOUR_KEY with actual key
   curl "https://api.themoviedb.org/3/trending/movie/week?api_key=YOUR_KEY"
   ```

3. **Check rate limiting:**
   - TMDB has rate limits for free accounts
   - Wait a moment and try again

## Development Tools

### Check Server is Running

```bash
# Test backend health
curl http://localhost:3000/health

# Should return JSON with status: "healthy"
```

### View all Environment Variables

**Backend:**
```bash
cd Backend
node -e "require('dotenv').config(); console.log(process.env)"
```

### Check What's Using a Port

```powershell
# Windows
netstat -ano | findstr :{PORT}

# macOS/Linux
lsof -i :{PORT}
```

### Clear npm Cache

```bash
npm cache clean --force
```

### Fix npm Permission Issues

```bash
npm cache clean --force
rm -r node_modules
npm install
```

## Still Having Issues?

1. **Read the full documentation:** [README.md](./README.md)
2. **Check the terminal output** - error messages usually explain what's wrong
3. **Check the browser console** (F12 → Console tab)
4. **Verify all prerequisites:**
   - Node.js installed
   - MongoDB connection working
   - TMDB API key valid
   - No port conflicts
5. **Restart everything:**
   - Kill all node processes
   - Close all terminals
   - Start fresh with `start.bat` or manual startup

## Helpful Commands

```bash
# Kill all Node processes (Windows)
taskkill /F /IM node.exe

# Kill all Node processes (macOS/Linux)
killall node

# Check Node version
node --version

# Check npm version
npm --version

# List all global packages
npm -g list

# Update npm
npm install -g npm@latest

# Check disk space
# Windows: dir C:\ shows usage
# macOS/Linux: df -h shows usage
```

Good luck! 🚀
