# Windows Setup Guide

Complete step-by-step guide for setting up the Voice Receptionist on Windows.

## 📋 Prerequisites

1. **Python 3.8 or higher**
   - Download from: https://www.python.org/downloads/
   - ⚠️ **Important**: Check "Add Python to PATH" during installation
   - Verify installation: Open Command Prompt and run `python --version`

2. **Git for Windows** (if cloning the repository)
   - Download from: https://git-scm.com/download/win
   - Use default settings during installation

3. **ElevenLabs API Key**
   - Sign up at: https://elevenlabs.io
   - Get your API key from the dashboard
   - Agent ID: `agent_4401k9ybxkm3fvbtdhnj8s57fb53`

## 🚀 Installation Steps

### Step 1: Clone or Download the Repository

**Option A: Using Git (Recommended)**
```cmd
git clone https://github.com/Hrutin-Suriya-Kotni/AI_Voice_Receptionist.git
cd AI_Voice_Receptionist
```

**Option B: Download ZIP**
1. Go to: https://github.com/Hrutin-Suriya-Kotni/AI_Voice_Receptionist
2. Click "Code" → "Download ZIP"
3. Extract the ZIP file
4. Open Command Prompt in the extracted folder

### Step 2: Create Virtual Environment

Open **Command Prompt** or **PowerShell** in the project folder:

```cmd
python -m venv venv
```

### Step 3: Activate Virtual Environment

**In Command Prompt:**
```cmd
venv\Scripts\activate
```

**In PowerShell:**
```powershell
venv\Scripts\Activate.ps1
```

If you get an execution policy error in PowerShell, run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

You should see `(venv)` at the beginning of your command prompt.

### Step 4: Install Dependencies

```cmd
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 5: Configure Environment Variables

Create a `.env` file in the project root folder:

**Method 1: Using Notepad**
1. Open Notepad
2. Copy and paste this content:
   ```env
   ELEVENLABS_API_KEY=your_api_key_here
   ELEVENLABS_AGENT_ID=agent_4401k9ybxkm3fvbtdhnj8s57fb53
   PORT=5000
   DEBUG=True
   ```
3. Replace `your_api_key_here` with your actual ElevenLabs API key
4. Save as `.env` (make sure to select "All Files" in the save dialog, not "Text Documents")

**Method 2: Using Command Prompt**
```cmd
echo ELEVENLABS_API_KEY=your_api_key_here > .env
echo ELEVENLABS_AGENT_ID=agent_4401k9ybxkm3fvbtdhnj8s57fb53 >> .env
echo PORT=5000 >> .env
echo DEBUG=True >> .env
```

Then edit `.env` with Notepad to add your actual API key.

## ▶️ Running the Application

### Start the Server

Make sure your virtual environment is activated (you should see `(venv)` in your prompt):

```cmd
python app.py
```

You should see:
```
INFO:app:🚀 Starting Voice Receptionist Server on port 5000
INFO:app:🎙️  Agent ID: agent_4401k9ybxkm3fvbtdhnj8s57fb53
 * Running on http://0.0.0.0:5000
```

### Open in Browser

1. Open your web browser (Chrome, Edge, Firefox)
2. Navigate to: `http://localhost:5000`
3. Click the microphone button
4. Allow microphone access when prompted
5. Start speaking!

## 🛠️ Troubleshooting

### "python is not recognized"
- Python is not in your PATH
- Solution: Reinstall Python and check "Add Python to PATH"
- Or use `py` instead of `python`: `py -m venv venv`

### "pip is not recognized"
- Solution: Use `python -m pip` instead of `pip`
- Example: `python -m pip install -r requirements.txt`

### Virtual Environment Activation Issues

**Command Prompt:**
```cmd
venv\Scripts\activate.bat
```

**PowerShell Execution Policy Error:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
venv\Scripts\Activate.ps1
```

### Port Already in Use

If port 5000 is busy, change it in `.env`:
```env
PORT=8000
```

Then access at: `http://localhost:8000`

### Module Not Found Errors

Make sure virtual environment is activated and dependencies are installed:
```cmd
venv\Scripts\activate
pip install -r requirements.txt
```

### Microphone Not Working

1. Check Windows Privacy Settings:
   - Settings → Privacy → Microphone
   - Enable "Allow apps to access your microphone"
   - Enable "Allow desktop apps to access your microphone"

2. Check Browser Permissions:
   - Chrome: Settings → Privacy and Security → Site Settings → Microphone
   - Edge: Settings → Cookies and Site Permissions → Microphone

3. Test microphone in other applications first

## 📝 Quick Reference Commands

```cmd
# Navigate to project folder
cd AI_Voice_Receptionist

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the application
python app.py

# Deactivate virtual environment (when done)
deactivate
```

## 🎯 Next Steps

After setup:
1. ✅ Server is running
2. ✅ Browser is open at `http://localhost:5000`
3. ✅ Microphone permissions granted
4. 🎤 Click the microphone button and start talking!

## 💡 Tips

- **Keep the Command Prompt window open** while the server is running
- Press `Ctrl+C` in the Command Prompt to stop the server
- Use **headphones** to prevent audio feedback
- The `.env` file is already in the repository, so you just need to update it with your API key

## 🆘 Need Help?

If you encounter issues:
1. Check that Python is installed: `python --version`
2. Verify virtual environment is activated: Should see `(venv)` in prompt
3. Check `.env` file exists and has correct API key
4. Review error messages in Command Prompt
5. Check browser console (F12) for JavaScript errors

---

**Happy coding! 🚀**

