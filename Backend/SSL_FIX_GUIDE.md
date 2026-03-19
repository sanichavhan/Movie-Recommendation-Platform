# SSL/TLS Login Error - Solution Guide

## Error Description
```
C04C0000:error:0A000438:SSL routines:ssl3_read_bytes:tlsv1 alert internal error
```

This error occurs when your backend tries to connect to MongoDB Atlas but the SSL/TLS handshake fails.

## What I Fixed

### 1. **Database Connection Configuration** (database.js)
Added SSL/TLS options:
```javascript
ssl: true,
tlsAllowInvalidCertificates: true,
authSource: 'admin',
connectTimeoutMS: 10000
```

### 2. **Enhanced Error Handling** (server.js)
- Added unhandledRejection listener
- Added uncaughtException listener
- Better error logging

### 3. **Improved Auth Controller** (auth.controller.js)
- Better SSL error detection
- Specific error messages for SSL/TLS issues
- Timeout handling
- Full error logging to console

## MongoDB Atlas Configuration Checklist

Before restarting your backend, ensure:

### ✅ Step 1: Verify Network Access
1. Go to **MongoDB Atlas Dashboard**
2. Click **Network Access** in the left menu
3. Check **IP Whitelist**
4. Make sure your current IP is whitelisted
5. For local development, you can add `0.0.0.0/0` (Not recommended for production)

### ✅ Step 2: Verify Connection String
1. Go to **Databases** → Click **Connect**
2. Choose **Drivers**
3. Select **Node.js** version
4. Copy the connection string
5. Your connection string should look like:
```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

### ✅ Step 3: Verify .env Variables
Your `.env` should have:
```
MONGO_URI=mongodb+srv://chavhansani365_db_user:4JCHv9f4VZ0eoGq7@cluster0.iurqbqy.mongodb.net/Movie-app
JWT_SECRET=your_secret_key
TMDB_API_KEY=your_api_key
```

### ✅ Step 4: Check Node.js & npm
```bash
node -v        # Should be v14 or higher
npm -v         # Should be v6 or higher
```

## Steps to Fix the Issue

### **Option 1: Restart Backend (Quick Fix)**
```bash
cd Backend
npm run dev
```
The enhanced error logging will show what's happening.

### **Option 2: If SSL Still Fails**
Edit `src/config/database.js` and change:
```javascript
tlsAllowInvalidCertificates: true,  // Allow invalid certs (dev only)
```

### **Option 3: Add Node.js SSL Config**
Create a `.env.local` file in Backend folder:
```
NODE_TLS_REJECT_UNAUTHORIZED=0
```
Then start:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev
```

## Troubleshooting Steps

1. **Check if MongoDB is up** (MongoDB Atlas status page)
2. **Verify credentials** in MONGO_URI
3. **Check IP whitelist** on MongoDB Atlas
4. **Try connecting with MongoDB Compass** to test the connection
5. **Check your network** - firewall or proxy issues
6. **Restart both backend and frontend** after changes

## Test Login Flow

1. Start backend: `npm run dev` (in Backend folder)
2. Wait for "Connected to DB" message
3. Start frontend: `npm run dev` (in Frontend folder)
4. Try registering a new user first
5. Then try logging in

## Expected Console Output (Backend)

When the fix works:
```
Connected to DB
Server is running on port 3000
GET /api/auth/login 200 ...
```

If still having issues:
```
Error Connecting to DB: SSL error...
Full error: ...
```

## Alternative: Use Local MongoDB

If MongoDB Atlas continues to have issues, you can use local MongoDB:

1. Install MongoDB locally (Windows Installer)
2. Update MONGO_URI:
```
MONGO_URI=mongodb://localhost:27017/Movie-app
```
3. No SSL options needed for local MongoDB

## Need More Help?

Check the backend console logs:
```bash
npm run dev 2>&1 | tee debug.log
```

This will save all output to `debug.log` file.
