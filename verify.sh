#!/bin/bash
# Verification Script for Movie Recommendation Platform

echo "🔍 Verifying Movie Recommendation Platform Setup"
echo ""

# Check Node.js
echo "1️⃣  Checking Node.js..."
if command -v node &> /dev/null; then
    echo "   ✅ Node.js: $(node --version)"
else
    echo "   ❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi

echo ""
echo "2️⃣  Checking npm..."
if command -v npm &> /dev/null; then
    echo "   ✅ npm: $(npm --version)"
else
    echo "   ❌ npm not found"
    exit 1
fi

echo ""
echo "3️⃣  Checking Backend configuration..."
if [ -f "Backend/.env" ]; then
    echo "   ✅ Backend .env found"
    if grep -q "MONGO_URI" "Backend/.env"; then
        echo "   ✅ MONGO_URI configured"
    else
        echo "   ⚠️  MONGO_URI not found in .env"
    fi
    if grep -q "JWT_SECRET" "Backend/.env"; then
        echo "   ✅ JWT_SECRET configured"
    else
        echo "   ⚠️  JWT_SECRET not found in .env"
    fi
    if grep -q "TMDB_API_KEY" "Backend/.env"; then
        echo "   ✅ TMDB_API_KEY configured"
    else
        echo "   ⚠️  TMDB_API_KEY not found in .env"
    fi
else
    echo "   ⚠️  Backend/.env not found. Copy from .env.example"
fi

echo ""
echo "4️⃣  Checking Frontend configuration..."
if [ -f "Frontend/.env.local" ]; then
    echo "   ✅ Frontend .env.local found"
else
    echo "   ⚠️  Frontend/.env.local not found. Will use defaults"
fi

echo ""
echo "5️⃣  Checking dependencies..."
if [ -d "Backend/node_modules" ]; then
    echo "   ✅ Backend dependencies installed"
else
    echo "   ⚠️  Backend dependencies not installed"
fi

if [ -d "Frontend/node_modules" ]; then
    echo "   ✅ Frontend dependencies installed"
else
    echo "   ⚠️  Frontend dependencies not installed"
fi

echo ""
echo "6️⃣  Checking port availability..."
if ! lsof -i :3000 &> /dev/null; then
    echo "   ✅ Port 3000 available"
else
    echo "   ⚠️  Port 3000 in use"
fi

if ! lsof -i :5173 &> /dev/null; then
    echo "   ✅ Port 5173 available"
else
    echo "   ⚠️  Port 5173 in use"
fi

echo ""
echo "✅ Verification complete!"
echo ""
echo "Next steps:"
echo "1. Run 'start.sh' to start both servers"
echo "2. Open http://localhost:5173 in your browser"
echo "3. Register and create an account"
echo ""
