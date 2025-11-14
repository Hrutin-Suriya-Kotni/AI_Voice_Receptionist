@echo off
REM Quick Start Script for Windows
REM Run this after setup to start the application

echo ========================================
echo Starting Voice Receptionist...
echo ========================================
echo.

REM Check if virtual environment exists
if not exist venv (
    echo [ERROR] Virtual environment not found!
    echo Please run setup_windows.bat first
    pause
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Check if .env exists
if not exist .env (
    echo [ERROR] .env file not found!
    echo Please create .env file with your ELEVENLABS_API_KEY
    pause
    exit /b 1
)

REM Start the application
echo Starting Flask server...
echo Open http://localhost:5000 in your browser
echo Press Ctrl+C to stop the server
echo.
python app.py

