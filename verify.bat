@echo off
REM Verification Script for Movie Recommendation Platform - Windows

echo.
echo ===============================================
echo   Verifying Movie Recommendation Platform
echo ===============================================
echo.

REM Check Node.js
echo [1/6] Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo [OK] Node.js: %NODE_VERSION%
) else (
    echo [FAIL] Node.js not found. Install from https://nodejs.org
    exit /b 1
)

echo.
echo [2/6] Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo [OK] npm: %NPM_VERSION%
) else (
    echo [FAIL] npm not found
    exit /b 1
)

echo.
echo [3/6] Checking Backend configuration...
if exist "Backend\.env" (
    echo [OK] Backend .env found
    findstr /C:"MONGO_URI" "Backend\.env" >nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] MONGO_URI configured
    ) else (
        echo [WARN] MONGO_URI not found in .env
    )
    findstr /C:"JWT_SECRET" "Backend\.env" >nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] JWT_SECRET configured
    ) else (
        echo [WARN] JWT_SECRET not found in .env
    )
    findstr /C:"TMDB_API_KEY" "Backend\.env" >nul
    if %ERRORLEVEL% EQU 0 (
        echo [OK] TMDB_API_KEY configured
    ) else (
        echo [WARN] TMDB_API_KEY not found in .env
    )
) else (
    echo [WARN] Backend\.env not found. Copy from .env.example
)

echo.
echo [4/6] Checking Frontend configuration...
if exist "Frontend\.env.local" (
    echo [OK] Frontend .env.local found
) else (
    echo [WARN] Frontend\.env.local not found. Will use defaults
)

echo.
echo [5/6] Checking dependencies...
if exist "Backend\node_modules" (
    echo [OK] Backend dependencies installed
) else (
    echo [WARN] Backend dependencies not installed. Run: cd Backend && npm install
)

if exist "Frontend\node_modules" (
    echo [OK] Frontend dependencies installed
) else (
    echo [WARN] Frontend dependencies not installed. Run: cd Frontend && npm install
)

echo.
echo [6/6] Checking port availability...
netstat -ano | findstr :3000 >nul
if %ERRORLEVEL% EQU 0 (
    echo [WARN] Port 3000 in use
) else (
    echo [OK] Port 3000 available
)

netstat -ano | findstr :5173 >nul
if %ERRORLEVEL% EQU 0 (
    echo [WARN] Port 5173 in use
) else (
    echo [OK] Port 5173 available
)

echo.
echo ===============================================
echo   Verification Complete!
echo ===============================================
echo.
echo Next steps:
echo 1. Run 'start.bat' to start both servers
echo 2. Open http://localhost:5173 in your browser
echo 3. Register and create an account
echo.
pause
