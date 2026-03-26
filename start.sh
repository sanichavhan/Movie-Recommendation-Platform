#!/bin/bash

# Movie Recommendation Platform - Local Development Startup Script
# This script helps you start both the backend and frontend servers

echo "🚀 Starting Movie Recommendation Platform..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"
echo ""

# Navigate to Backend directory and start the backend server
echo -e "${YELLOW}📌 Starting Backend Server on http://localhost:3000${NC}"
cd "Backend"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found in Backend folder${NC}"
    echo "Please configure your .env file using .env.example as a template"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    npm install
fi

echo -e "${GREEN}✅ Starting backend in the background...${NC}"
npm run dev &
BACKEND_PID=$!

# Wait a moment for server to start
sleep 3

# Navigate to Frontend directory and start the frontend server
cd "../Frontend"
echo ""
echo -e "${YELLOW}📌 Starting Frontend Server on http://localhost:5173${NC}"

# Check if .env.local file exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found, creating it...${NC}"
    echo 'VITE_API_BASE_URL=http://localhost:3000/api' > .env.local
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    npm install
fi

echo -e "${GREEN}✅ Starting frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

# Handle cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup EXIT INT TERM

echo ""
echo -e "${GREEN}✅ Both servers are now running!${NC}"
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:3000"
echo "   API:      http://localhost:3000/api"
echo ""
echo "📝 Press Ctrl+C to stop both servers"
echo ""

# Keep the script running
wait
