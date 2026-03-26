# 🚀 Quick Start Guide

This guide will help you get the Movie Recommendation Platform running on your local machine in just a few minutes.

## ⚡ Fastest Setup (5 minutes)

### Step 1: Install Node.js

Make sure you have Node.js installed. If not, download it from https://nodejs.org

```bash
node --version
```

### Step 2: Configure Environment Variables

Go to the `Backend` folder and rename `.env.example` to `.env`:

```bash
cd Backend
copy .env.example .env
```

The `.env` file should already have your API keys configured. If not, add:
- `MONGO_URI` from MongoDB Atlas
- `TMDB_API_KEY` from TMDB
- `JWT_SECRET` (any long random string)

### Step 3: Install Dependencies

```bash
# In Backend folder
npm install

# In Frontend folder
cd ../Frontend
npm install
```

### Step 4: Start the Servers

**Option A: Single Command (Windows)**
```bash
cd ..
start.bat
```

**Option B: Manual (Two Terminal Windows)**

Terminal 1:
```bash
cd Backend
npm run dev
```

Terminal 2:
```bash
cd Frontend  
npm run dev
```

### Step 5: Open Your Browser

```
http://localhost:5173
```

## ✅ What to Expect

When everything is working, you should see:

### Backend Console Output:
```
> backend@1.0.0 dev
> nodemon server.js

✅ Server is running on http://localhost:3000

📌 Make sure Frontend is running on http://localhost:5173
📝 API Base URL: http://localhost:3000/api
```

### Frontend Console Output:
```
  VITE v7.3.1  ready in 426 ms  
  ➜  Local:   http://localhost:5173/
```

### Browser:
You should see the Movie Recommendation Platform homepage loading with:
- Navigation bar with Home, Discover, TV Shows, etc.
- Featured movies carousel
- Trending movies section

## 🐛 Common Issues & Solutions

### Port Already in Use

If you get "EADDRINUSE: address already in use:::3000":

```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with the process ID)
taskkill /PID <PID> /F
```

Or change the port in `.env`:
```env
PORT=3001
```

### MongoDB Connection Failed

**Error:** `Error Connecting to MongoDB`

**Solution:**
1. Verify your `MONGO_URI` in `.env`
2. Make sure your IP is whitelisted in MongoDB Atlas
3. Check your password doesn't have special characters (or URL-encode them)
4. Test the connection string directly in MongoDB Atlas

### Frontend Can't Reach Backend

**Error:** CORS errors or "Network Error" when loading data

**Solution:**
1. Make sure backend is running on port 3000
2. Check `.env.local` in Frontend folder has: `VITE_API_BASE_URL=http://localhost:3000/api`
3. Verify both `FRONTEND_URL` in Backend `.env` and API URL in Frontend `.env.local`

### API Key Issues

If movies/shows aren't loading:

1. Get a free TMDB API key from https://www.themoviedb.org/settings/api
2. Add it to Backend `.env`: `TMDB_API_KEY=your_key`
3. Restart the backend server

### Installation Stuck

If `npm install` is taking too long:

```bash
# Clear npm cache
npm cache clean --force

# Retry installation
npm install
```

## 🔌 Check Your Setup

To verify everything is working:

```bash
# Test backend
curl http://localhost:3000/health

# Should return:
# {"status":"healthy","timestamp":"2026-03-26T..."}

# Test that frontend is running
# Open browser to http://localhost:5173
```

## 📖 Next Steps

Once everything is running:

1. **Create an Account**: Click Register and create a new user account
2. **Explore Movies**: Browse trending and popular movies
3. **Search**: Use the search bar to find movies and shows
4. **View Details**: Click on any movie to see full details
5. **Check API Docs**: See [README.md](./README.md) for API endpoints

## 📞 Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review your `.env` configuration
- Make sure all ports are available (3000 and 5173)
- Check browser console (F12) for JavaScript errors
- Check terminal output for server errors

## 🎉 You're All Set!

Your Movie Recommendation Platform should now be running perfectly on your local machine!

Enjoy! 🍿
