@echo off
REM Movie Recommendation Platform - Local Development Startup Script for Windows

echo.
echo ========================================
echo   Movie Recommendation Platform
echo   Local Development Startup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js is not installed
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%
echo.

REM Navigate to Backend directory
cd /d "%~dp0Backend"

echo ========================================
echo Starting Backend Server on http://localhost:3000
echo ========================================
echo.

REM Check if .env file exists
if not exist ".env" (
    echo X .env file not found in Backend folder
    echo Please configure your .env file using .env.example as a template
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

REM Start backend in a new window
echo Starting backend server...
start cmd /k npm run dev
timeout /t 3

REM Navigate back and go to Frontend
cd /d "%~dp0Frontend"

echo.
echo ========================================
echo Starting Frontend Server on http://localhost:5173
echo ========================================
echo.

REM Check if .env.local file exists
if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo VITE_API_BASE_URL=http://localhost:3000/api
    ) > .env.local
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
)

REM Start frontend in a new window
echo Starting frontend server...
start cmd /k npm run dev

echo.
echo ========================================
echo SUCCESS! Both servers are starting...
echo ========================================
echo.
echo Browser URLs:
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo   API:      http://localhost:3000/api
echo.
echo Two new command windows have been opened for each server.
echo Press Ctrl+C in each window to stop the respective server.
echo.
pause
