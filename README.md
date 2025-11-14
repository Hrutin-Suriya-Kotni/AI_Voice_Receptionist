# Voice Receptionist

A modern, professional voice receptionist application powered by ElevenLabs Conversational AI. Features a beautiful, state-of-the-art UI with glassmorphism design, smooth animations, and seamless voice interaction.

## 🎨 Features

- **Modern UI Design**: Glassmorphism effects, gradient backgrounds, and smooth animations
- **Voice Interaction**: Real-time voice conversation using ElevenLabs Conversational AI
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Status**: Visual feedback for connection, listening, speaking, and processing states
- **Conversation Logging**: Automatic saving of conversation transcripts
- **Professional Animations**: Smooth transitions and micro-interactions

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- ElevenLabs API key
- ElevenLabs Agent ID: `agent_4401k9ybxkm3fvbtdhnj8s57fb53`

### Installation

#### For Windows Users 👉 [See Detailed Windows Setup Guide](WINDOWS_SETUP.md)

**Quick Windows Setup:**
1. Double-click `setup_windows.bat` to run automated setup
2. Edit `.env` file and add your `ELEVENLABS_API_KEY`
3. Double-click `run_windows.bat` to start the application

#### For Mac/Linux Users

1. **Clone or navigate to the repository:**
   ```bash
   git clone https://github.com/Hrutin-Suriya-Kotni/AI_Voice_Receptionist.git
   cd AI_Voice_Receptionist
   ```

2. **Create a virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure `.env` file:**
   The `.env` file is already included. Just edit it and add your `ELEVENLABS_API_KEY`:
   ```env
   ELEVENLABS_API_KEY=your_api_key_here
   ELEVENLABS_AGENT_ID=agent_4401k9ybxkm3fvbtdhnj8s57fb53
   PORT=5000
   DEBUG=True
   ```

### Running the Application

**Windows:**
- Double-click `run_windows.bat` OR
- Open Command Prompt, activate venv: `venv\Scripts\activate`, then run: `python app.py`

**Mac/Linux:**
```bash
source venv/bin/activate
python app.py
```

Then open your browser to `http://localhost:5000` and click the microphone button!

## 📁 Project Structure

```
Voice_receptionist/
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── WINDOWS_SETUP.md      # Detailed Windows setup guide
├── setup_windows.bat     # Windows automated setup script
├── run_windows.bat       # Windows quick start script
├── .env                  # Environment variables (already included)
├── templates/
│   └── index.html        # Main HTML template
└── static/
    ├── css/
    │   └── style.css     # Modern CSS styles
    └── js/
        └── app.js        # Frontend JavaScript logic
```

## 🎯 Usage

1. **Starting a Conversation:**
   - Click the large circular microphone button
   - Grant microphone permissions when prompted
   - Wait for the "Listening" status
   - Speak naturally to the voice assistant

2. **During Conversation:**
   - The conversation panel will show your messages and the agent's responses
   - Status indicators show the current state (Listening, Speaking, Processing)
   - The microphone button pulses when actively listening

3. **Ending a Conversation:**
   - Click the microphone button again to end the session
   - The conversation will be automatically saved
   - You can start a new conversation by clicking the button again

## 🎨 Design Features

- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Gradient Backgrounds**: Animated gradient orbs for visual appeal
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Layout**: Adapts to different screen sizes
- **Modern Typography**: Inter font family for clean readability
- **Color Scheme**: Professional purple/indigo gradient theme

## 🔧 Configuration

### Environment Variables

- `ELEVENLABS_API_KEY`: Your ElevenLabs API key (required)
- `ELEVENLABS_AGENT_ID`: Your ElevenLabs agent ID (default: `agent_4401k9ybxkm3fvbtdhnj8s57fb53`)
- `PORT`: Server port (default: 5000)
- `DEBUG`: Enable debug mode (default: True)

### Customization

You can customize the design by modifying `static/css/style.css`:
- Color scheme: Update CSS variables in `:root`
- Animations: Adjust timing and easing functions
- Layout: Modify spacing and sizing variables

## 🐛 Troubleshooting

### Microphone Permission Issues
- Ensure your browser has microphone permissions enabled
- Check browser settings for site permissions
- Try refreshing the page and granting permissions again

### Connection Errors
- Verify your `ELEVENLABS_API_KEY` is correct in `.env`
- Check your internet connection
- Ensure the ElevenLabs API is accessible

### Audio Issues
- Use headphones to prevent feedback
- Check your system audio settings
- Ensure microphone is working in other applications

## 📝 API Endpoints

- `GET /`: Main application page
- `POST /api/conversation-token`: Get ElevenLabs conversation token
- `POST /api/save-conversation`: Save conversation log
- `GET /api/health`: Health check endpoint

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Keep your ElevenLabs API key secure
- Use HTTPS in production environments

## 📄 License

This project is provided as-is for use with ElevenLabs Conversational AI.

## 🤝 Support

For issues related to:
- **ElevenLabs API**: Contact ElevenLabs support
- **Application bugs**: Check the browser console for error messages
- **Setup issues**: Verify all dependencies are installed correctly

---

**Built with ❤️ using Flask, ElevenLabs, and modern web technologies**

