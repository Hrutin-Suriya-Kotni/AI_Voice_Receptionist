#!/usr/bin/env python3
"""
Voice Receptionist Application
A modern voice interface using ElevenLabs Conversational AI
"""

from flask import Flask, render_template, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ElevenLabs configuration
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_AGENT_ID = os.getenv("ELEVENLABS_AGENT_ID", "agent_4401k9ybxkm3fvbtdhnj8s57fb53")

# Initialize ElevenLabs client
try:
    eleven_client = ElevenLabs(api_key=ELEVENLABS_API_KEY) if ELEVENLABS_API_KEY else None
    logger.info(f"✅ ElevenLabs client initialized with agent: {ELEVENLABS_AGENT_ID}")
except Exception as e:
    logger.error(f"❌ Failed to initialize ElevenLabs client: {e}")
    eleven_client = None


@app.route('/')
def index():
    """Serve the main voice interface"""
    return render_template('index.html')


@app.route('/favicon.ico')
def favicon():
    """Provide a minimal empty favicon to avoid 404 noise in console."""
    try:
        return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico')
    except Exception:
        return ('', 204)


@app.route('/api/conversation-token', methods=['POST'])
def get_conversation_token():
    """
    Get a conversation token from ElevenLabs API
    This endpoint is called by the frontend to start a conversation
    """
    try:
        if not ELEVENLABS_API_KEY:
            return jsonify({
                "error": "ELEVENLABS_API_KEY not configured",
                "status": "error"
            }), 500

        # Call ElevenLabs HTTP API for WebRTC conversation token
        url = f"https://api.elevenlabs.io/v1/convai/conversation/token?agent_id={ELEVENLABS_AGENT_ID}"
        headers = {
            "xi-api-key": ELEVENLABS_API_KEY,
            "accept": "application/json"
        }
        resp = requests.get(url, headers=headers, timeout=15)

        if resp.status_code != 200:
            logger.error(
                "❌ ElevenLabs token request failed: %s %s", resp.status_code, resp.text[:500]
            )
            return jsonify({
                "error": "Failed to get conversation token from ElevenLabs",
                "status": "error",
                "details": {
                    "status_code": resp.status_code,
                    "response": resp.text
                }
            }), 500

        data = resp.json()
        token = data.get("token") or data.get("conversationToken")
        if not token:
            logger.error("❌ ElevenLabs response missing token: %s", data)
            return jsonify({
                "error": "Token missing in ElevenLabs response",
                "status": "error"
            }), 500

        logger.info("✅ Conversation token generated for agent: %s", ELEVENLABS_AGENT_ID)
        return jsonify({
            "conversationToken": token,
            "agentId": ELEVENLABS_AGENT_ID,
            "status": "success"
        })

    except requests.RequestException as e:
        logger.exception("❌ Network error contacting ElevenLabs: %s", e)
        return jsonify({
            "error": "Network error contacting ElevenLabs",
            "status": "error"
        }), 500
    except Exception as e:
        logger.exception("❌ Unexpected error fetching conversation token: %s", e)
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500


@app.route('/api/save-conversation', methods=['POST'])
def save_conversation():
    """
    Save conversation log from voice session
    """
    try:
        data = request.json
        conversation_log = data.get('log', [])
        
        logger.info(f"📝 Received conversation log with {len(conversation_log)} messages")
        
        return jsonify({
            "status": "success",
            "conversation_log": conversation_log,
            "message": "Conversation saved successfully"
        })
        
    except Exception as e:
        logger.error(f"❌ Failed to save conversation: {e}")
        return jsonify({
            "error": str(e),
            "status": "error"
        }), 500


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "agent_id": ELEVENLABS_AGENT_ID,
        "elevenlabs_client": "initialized" if eleven_client else "not initialized"
    })


if __name__ == '__main__':
    port = int(os.getenv('PORT', 9000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    logger.info(f"🚀 Starting Voice Receptionist Server on port {port}")
    logger.info(f"🎙️  Agent ID: {ELEVENLABS_AGENT_ID}")
    
    app.run(host='0.0.0.0', port=port, debug=debug)

