# 🎬 Movie Recommendation Platform

Welcome! This is your go-to movie discovery application where you can explore thousands of movies, find recommendations, and build your personal movie library.

Built with modern web technologies (**React** + **Express.js**), powered by the **TMDB Movie Database**, and featuring secure user authentication so you can save your favorite movies and searches.

## ✨ What Can You Do?

- 🔐 **Create Your Account** - Sign up and log in securely with passwords encrypted using bcrypt
- 🎬 **Browse Movies** - Explore trending, popular, and discover new movies every day
- 🔍 **Search Everything** - Find movies, TV shows, actors, and more with a powerful search engine
- ⭐ **See Movie Details** - View ratings, descriptions, cast, and recommendations
- 📚 **Save Your History** - Your search history is automatically saved (for logged-in users)
- 🎯 **Get Recommendations** - Discover movies similar to ones you love
- 🌙 **Light/Dark Mode** - Switch themes based on your preference

## �‍💻 Before You Start

You'll need a few things installed. Don't worry, they're all free!

### Essential Requirements
- **Node.js** (v16+) - [Download here](https://nodejs.org) - This runs JavaScript on your computer
- **A MongoDB Account** - [Free tier](https://www.mongodb.com/cloud/atlas) - This stores all your data
- **TMDB API Key** - [Get one free](https://www.themoviedb.org/settings/api) - This gives us access to movie data

### Optional (But Nice to Have)
- **Redis** - [Free tier available](https://redis.com/try-free/) - Makes the app faster by caching data

## � Project Structure (Don't Worry, It's Simple!)

```
Movie-Recommendation-Platform/
│
├── Backend/               👈 The server (Express.js)
│   ├── src/
│   │   ├── controllers/   - Handles business logic
│   │   ├── routes/        - API endpoints
│   │   ├── models/        - Database schemas
│   │   ├── services/      - Talks to TMDB API
│   │   └── config/        - Database & cache setup
│   └── .env              - Your secret API keys (KEEP PRIVATE!)
│
├── Frontend/              👈 What you see (React + Vite)
│   ├── src/
│   │   ├── pages/         - Full page components
│   │   ├── components/    - Reusable UI pieces
│   │   ├── context/       - Global state (Auth, Theme)
│   │   ├── hooks/         - Custom React hooks
│   │   ├── api/           - API communication
│   │   └── styles/        - CSS styling
│   └── .env.local        - Frontend settings
│
├── start.bat              - Click to run everything (Windows)
├── README.md              - You are here! 📍
├── QUICKSTART.md          - Get running in 5 minutes
└── TROUBLESHOOTING.md     - Fix problems fast
```

## � Getting Started (Super Simple!)

### Step 1️⃣: Get Your API Keys

Before you start, grab these free keys (takes 5 minutes):

**MongoDB Connection String:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (it's free!)
4. Get your connection string (looks like: `mongodb+srv://...`)

**TMDB API Key:**
1. Go to [TMDB](https://www.themoviedb.org/settings/api)
2. Sign up (free)
3. Copy your API key

### Step 2️⃣: Set Up Configuration

Navigate to the Backend folder and open `.env` (or copy from `.env.example`):

```bash
cd Backend
```

Edit `.env` and add your keys:
```env
MONGO_URI = mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/Movie-app
JWT_SECRET = supersecretkey123456789abcdefghijk  # Can be any long random string
TMDB_API_KEY = your_tmdb_key_here
FRONTEND_URL = http://localhost:5173
PORT = 3000
NODE_ENV = development
```

### Step 3️⃣: Install Everything

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd Backend
npm install
npm run dev
```

You should see: ✅ **Server is running on http://localhost:3000**

**Terminal 2 - Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

You should see: ✅ **Local: http://localhost:5173/**

### Step 4️⃣: Open Your Browser

Paste this in your address bar:
```
http://localhost:5173
```

🎉 **Boom! You should see the Movie App!**

## 💨 Quick Start

### Option 1: Use Startup Scripts (Windows)

```bash
# Run this from the project root
start.bat
```

This will open two new command windows - one for the backend and one for the frontend.

### Option 2: Use Startup Scripts (macOS/Linux)

```bash
chmod +x start.sh
./start.sh
```

### Option 3: Manual Startup (Two Terminal Windows)

**Terminal 1 - Backend:**
```bash
cd Backend
npm run dev
```🎮 How to Use the App

### Create Your Account
1. Click **"Register"**
2. Enter a username, email, and password
3. Click **"Sign Up"**
4. You're in! 🎉

### Browse Movies
- **Home Page**: See what's trending right now
- **Discover**: Find new movies by genre
- **Trending**: What everyone's watching this week
- **Popular**: All-time favorites
- **TV Shows**: Binge-worthy series

### Search for Movies
1. T� API Endpoints (For Developers)

Our backend has lots of cool endpoints you can use:

### Authentication
```
POST   /api/auth/register       - Create new account
POST   /api/auth/login          - Login to your account
GET    /api/auth/getme          - Get your profile info
GET    /api/auth/logout         - Logout
```

### Movies
```
GET    /api/movies/trending     - What's hot right now
GET    /api/movies/popular      - Most popular all-time
GET    /api/movies/search?q=    - Search by name
GET    /api/movies/:id          - Get movie details
```

### TV Shows
```
GET    /api/tv/trending         - Trending TV shows
GET    /api/tv/popular          - Popular TV series
```

### People (Actors/Directors)
```
GET    Tech Stack (What Powers This?)

### Frontend (What You See)
- **React** - UI library for building interactive interfaces
- **Vite** - Super fast build tool
- **React Router** - Navigate between pages
- **Tailwind CSS** - Beautiful styling with utility classes
- **Axios** - Talk to the backend API
- **React Query** - Smart data fetching

### Backend (The Brain)
- **Node.js & Express.js** - Server that powers everything
- **MongoDB** - Database for storing users and data
- **Mongoose** - Makes talking to MongoDB easier
- **JWT** - Secure login tokens
- *🆘 Something Not Working?

### The App Shows a Blank Page
1. Open **Developer Tools** (Press `F12`)
2. Look at the **Console** tab (red error messages)
3. Check **TROUBLESHOOTING.md** - we've probably seen this before!

### Can't Login or Create Account
- Check if MongoDB connection works (look at backend terminal)
- Verify your MONGO_URI is correct in `.env`
- Make sure your password is at least 6 characters

### Movies Not Loading
- Check your TMDB API key is in `.env`
- Verify the API key is active (check TMDB website)
- Backend terminal should show it's connecting to TMDB

### Port Already in Use
Close whatever's using the port:
```powershell
# Windows: See what's using port 3000
netstat -ano | findstr :3000

# Then kill it
taskkill /PID <NUMBER> /F
```

**Still stuck?** See **TROUBLESHOOTING.md** - it has 30+ solutions!
- Verify `FRONTEND_URL` in Backend `.env` matches your frontend URL
- Check `VITE_API_BASE_URL` in Frontend `.env.local` matches your backend URL

### API Key Issues

- Verify your TMDB API key is correct
- Check your API key has the correct permissions
- Ensure you haven't exceeded your API rate limits

## 📱 Features Breakdown

### Authentication System
- Se� More Help

We've got detailed guides to help:

| Document | What's In It |
|----------|------------|
| **QUICKSTART.md** | Get running in 5 minutes ⚡ |
| **TROUBLESHOOTING.md** | Fix any problem 🔧 |
| **START_HERE.md** | Overview & next steps 📍 |

## 🚀 Ready to Deploy? (For Advanced Users)

Once you're happy with your app, you can run it on the internet!

**For Backend:**
- Deploy to Heroku, Render, Railway, or AWS
- Set your environment variables on the hosting service
- MongoDB Atlas handles the database

**For Frontend:**
- Deploy to Vercel, Netlify, or Firebase Hosting
- These services "build" your app automatically
- Just connect your GitHub repo!

## 👋 Questions?

1. **Check the docs** - README.md, QUICKSTART.md, TROUBLESHOOTING.md
2. **Look at error messages** - They usually tell you what's wrong
3. **Check browser console** (F12) - Frontend errors show up there
4. **Check terminal output** - Backend errors show in terminal

## 📝 Environment Variables Reference

These are the settings you need to configure:

| Variable | Where | Example | Required? |
|----------|-------|---------|-----------|
| `MONGO_URI` | Backend .env | `mongodb+srv://...` | ✅ Yes |
| `JWT_SECRET` | Backend .env | Any long string | ✅ Yes |
| `TMDB_API_KEY` | Backend .env | `abc123xyz` | ✅ Yes |
| `FRONTEND_URL` | Backend .env | `http://localhost:5173` | ✅ Yes |
| `PORT` | Backend .env | `3000` | ❌ Optional |
| `REDIS_HOST` | Backend .env | `localhost` | ❌ Optional |
| `VITE_API_BASE_URL` | Frontend .env.local | `http://localhost:3000/api` | ✅ Yes |
This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Happy Coding! 🎉**
� License

This project is free to use and modify. Go build something cool!

## 🙏 Thanks For Using This!

We built this to make movie discovery fun and easy. Hope you enjoy it!

If you find bugs or have ideas to make it better, you can:
- Open an issue on GitHub
- Suggest features
- Make improvements yourself!

---

**Enjoy exploring movies!** 🍿🎬

Made with ❤️ for movie lovers everywhere