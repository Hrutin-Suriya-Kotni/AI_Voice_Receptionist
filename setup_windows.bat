@echo off
REM Windows Setup Script for Voice Receptionist
REM This script automates the setup process for Windows users

echo ========================================
echo Voice Receptionist - Windows Setup
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

echo [OK] Python is installed
python --version
echo.

REM Create virtual environment
echo [1/4] Creating virtual environment...
if exist venv (
    echo Virtual environment already exists, skipping...
) else (
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Failed to create virtual environment
        pause
        exit /b 1
    )
    echo [OK] Virtual environment created
)
echo.

REM Activate virtual environment and upgrade pip
echo [2/4] Activating virtual environment and upgrading pip...
call venv\Scripts\activate.bat
python -m pip install --upgrade pip
echo.

REM Install dependencies
echo [3/4] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

REM Check if .env file exists
echo [4/4] Checking environment configuration...
if exist .env (
    echo [OK] .env file exists
    echo Please make sure your ELEVENLABS_API_KEY is set in .env
) else (
    echo [WARNING] .env file not found
    echo Creating .env file template...
    (
        echo ELEVENLABS_API_KEY=your_api_key_here
        echo ELEVENLABS_AGENT_ID=agent_4401k9ybxkm3fvbtdhnj8s57fb53
        echo PORT=5000
        echo DEBUG=True
    ) > .env
    echo [OK] .env file created
    echo [IMPORTANT] Please edit .env and add your ElevenLabs API key!
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env file and add your ELEVENLABS_API_KEY
echo 2. Run: venv\Scripts\activate
echo 3. Run: python app.py
echo 4. Open browser to http://localhost:5000
echo.
pause

