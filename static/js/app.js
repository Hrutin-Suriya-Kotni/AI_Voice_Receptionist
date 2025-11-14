/**
 * Voice Receptionist - Main Application Logic
 * Modern voice interface using ElevenLabs Conversational AI
 */

import { Conversation } from 'https://cdn.jsdelivr.net/npm/@elevenlabs/client@0.6.2/+esm';

// DOM Elements
const app = document.getElementById('app');
const voiceButton = document.getElementById('voice-button');
const voiceLabel = document.getElementById('voice-label');
const heroTitle = document.getElementById('hero-title');
const heroSubtitle = document.getElementById('hero-subtitle');
const heroIcon = document.getElementById('hero-icon');
const statusBadge = document.getElementById('status-badge');
const conversationPanel = document.getElementById('conversation-panel');
const conversationMessages = document.getElementById('conversation-messages');
const loadingIndicator = document.getElementById('loading-indicator');
const loadingText = document.getElementById('loading-text');
const panelClose = document.getElementById('panel-close');
const micIcon = voiceButton.querySelector('.mic-icon');
const stopIcon = voiceButton.querySelector('.stop-icon');

// State Management
let conversation = null;
let conversationLog = [];
let isActive = false;

/**
 * Update UI state
 */
function updateState(state, title = null, subtitle = null) {
    // Update app state class
    app.className = `app state-${state}`;
    
    // Update status badge
    const statusDot = statusBadge.querySelector('.status-dot');
    const statusText = statusBadge.querySelector('.status-text');
    
    switch(state) {
        case 'idle':
            statusDot.style.background = 'var(--success)';
            statusText.textContent = 'Ready';
            voiceButton.className = 'voice-button';
            voiceLabel.textContent = 'Tap to Start';
            micIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            break;
        case 'connecting':
            statusDot.style.background = 'var(--warning)';
            statusText.textContent = 'Connecting';
            voiceButton.className = 'voice-button processing';
            voiceLabel.textContent = 'Connecting...';
            micIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            break;
        case 'listening':
            statusDot.style.background = 'var(--success)';
            statusText.textContent = 'Listening';
            voiceButton.className = 'voice-button listening';
            voiceLabel.textContent = 'Listening...';
            micIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            break;
        case 'speaking':
            statusDot.style.background = 'var(--primary)';
            statusText.textContent = 'Speaking';
            voiceButton.className = 'voice-button';
            voiceLabel.textContent = 'Agent Speaking...';
            micIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            break;
        case 'processing':
            statusDot.style.background = 'var(--warning)';
            statusText.textContent = 'Processing';
            voiceButton.className = 'voice-button processing';
            voiceLabel.textContent = 'Processing...';
            micIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            break;
        case 'complete':
            statusDot.style.background = 'var(--primary)';
            statusText.textContent = 'Complete';
            voiceButton.className = 'voice-button';
            voiceLabel.textContent = 'Tap to Restart';
            micIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            break;
    }
    
    // Update titles if provided
    if (title) heroTitle.textContent = title;
    if (subtitle) heroSubtitle.textContent = subtitle;
}

/**
 * Add message to conversation display
 */
function addMessage(role, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'U' : 'A';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    const messageText = document.createElement('p');
    messageText.className = 'message-text';
    messageText.textContent = content;
    
    messageContent.appendChild(messageText);
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    conversationMessages.appendChild(messageDiv);
    conversationMessages.scrollTop = conversationMessages.scrollHeight;
}

/**
 * Show conversation panel
 */
function showConversation() {
    conversationPanel.style.display = 'flex';
}

/**
 * Hide conversation panel
 */
function hideConversation() {
    conversationPanel.style.display = 'none';
    conversationMessages.innerHTML = '';
    conversationLog = [];
}

/**
 * Show loading indicator
 */
function showLoading(text = 'Connecting...') {
    loadingText.textContent = text;
    loadingIndicator.style.display = 'flex';
}

/**
 * Hide loading indicator
 */
function hideLoading() {
    loadingIndicator.style.display = 'none';
}

/**
 * Request microphone permission
 */
async function requestMicrophonePermission() {
    try {
        console.log('🎤 Requesting microphone permission...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Microphone permission granted');
        stream.getTracks().forEach(track => track.stop());
        return true;
    } catch (error) {
        console.error('❌ Microphone permission denied:', error);
        updateState('idle', 'Microphone Permission Required', 'Please allow microphone access to continue');
        return false;
    }
}

/**
 * Start voice conversation
 */
async function startConversation() {
    if (conversation || isActive) {
        console.log('⚠️ Conversation already active');
        return;
    }
    
    // Request microphone permission
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;
    
    isActive = true;
    
    // Update UI
    updateState('connecting', 'Connecting...', 'Please wait while we connect you');
    showLoading('Connecting to voice assistant...');
    
    try {
        // Get conversation token from backend
        console.log('🔑 Requesting conversation token...');
        const response = await fetch('/api/conversation-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            let details = '';
            try {
                const err = await response.json();
                details = err?.details ? ` (details: ${JSON.stringify(err.details)})` : (err?.error ? ` (${err.error})` : '');
            } catch {}
            throw new Error(`Failed to get conversation token: ${response.status}${details}`);
        }
        
        const data = await response.json();
        console.log('✅ Conversation token received');
        
        // Initialize conversation
        conversation = await Conversation.startSession({
            conversationToken: data.conversationToken,
            connectionType: 'webrtc',
            
            onConnect: () => {
                console.log('✅ Connected to voice assistant');
                updateState('listening', 'Voice Assistant Active', 'Speak naturally to start the conversation');
                hideLoading();
                showConversation();
                conversationLog = [];
            },
            
            onDisconnect: (reason) => {
                console.log('🔌 Disconnected:', reason);
                if (conversation) {
                    endConversation();
                }
            },
            
            onError: (error) => {
                console.error('❌ Conversation error:', error);
                updateState('idle', 'Connection Error', error.message || 'Please try again');
                hideLoading();
                conversation = null;
                isActive = false;
            },
            
            onModeChange: (mode) => {
                if (!conversation) return;
                
                console.log('🔄 Mode changed:', mode?.mode);
                
                if (mode?.mode === 'listening') {
                    updateState('listening', 'Voice Assistant Listening', 'Speak now...');
                } else if (mode?.mode === 'speaking') {
                    updateState('speaking', 'Voice Assistant Speaking', 'Listening to response...');
                } else if (mode?.mode === 'processing') {
                    updateState('processing', 'Processing', 'Please wait...');
                }
            },
            
            onMessage: (message) => {
                console.log('📨 Message received:', message);
                
                // Extract message content
                let messageText = '';
                let messageFrom = 'agent';
                
                if (message && typeof message === 'object') {
                    messageText = message.message || message.text || message.content || JSON.stringify(message);
                    messageFrom = message.source || message.from || message.role || 'agent';
                } else if (typeof message === 'string') {
                    messageText = message;
                }
                
                // Add to conversation log
                conversationLog.push({
                    role: messageFrom,
                    content: messageText,
                    timestamp: new Date().toISOString()
                });
                
                // Display message
                addMessage(messageFrom === 'user' ? 'user' : 'agent', messageText);
            },
            
            onUserTranscript: (transcript) => {
                console.log('👤 User transcript:', transcript);
                if (transcript) {
                    conversationLog.push({
                        role: 'user',
                        content: transcript,
                        timestamp: new Date().toISOString()
                    });
                    addMessage('user', transcript);
                }
            },
            
            onAgentResponse: (response) => {
                console.log('🤖 Agent response:', response);
                if (response) {
                    conversationLog.push({
                        role: 'agent',
                        content: response,
                        timestamp: new Date().toISOString()
                    });
                    addMessage('agent', response);
                }
            }
        });
        
    } catch (error) {
        console.error('❌ Failed to start conversation:', error);
        updateState('idle', 'Connection Failed', error.message || 'Please try again');
        hideLoading();
        conversation = null;
        isActive = false;
    }
}

/**
 * End voice conversation
 */
async function endConversation() {
    if (!conversation && !isActive) return;
    
    try {
        if (conversation) {
            conversation.endSession?.();
        }
    } catch (e) {
        console.warn('Failed to end session:', e);
    }
    
    conversation = null;
    isActive = false;
    
    // Save conversation log
    if (conversationLog.length > 0) {
        try {
            console.log('💾 Saving conversation log...');
            
            const response = await fetch('/api/save-conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    log: conversationLog
                })
            });
            
            const result = await response.json();
            console.log('✅ Conversation saved:', result);
            
            updateState('complete', 'Conversation Complete!', 'Your conversation has been saved');
            
            // Reset after 3 seconds
            setTimeout(() => {
                updateState('idle', 'Welcome', 'Click the button below to start your conversation');
                hideConversation();
            }, 3000);
            
        } catch (error) {
            console.error('❌ Failed to save conversation:', error);
            updateState('idle', 'Ready', 'Click the button to start');
            hideConversation();
        }
    } else {
        updateState('idle', 'Welcome', 'Click the button below to start your conversation');
        hideConversation();
    }
    
    hideLoading();
}

/**
 * Event Listeners
 */

// Voice button click
voiceButton.addEventListener('click', () => {
    if (!conversation && !isActive) {
        console.log('🎤 Starting conversation...');
        startConversation();
    } else {
        console.log('🛑 Ending conversation...');
        endConversation();
    }
});

// Close conversation panel
panelClose.addEventListener('click', () => {
    if (conversation || isActive) {
        endConversation();
    } else {
        hideConversation();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (conversation) {
        try {
            conversation.endSession?.();
        } catch (e) {
            console.warn('Failed to cleanup:', e);
        }
    }
});

// Handle visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden && conversation) {
        console.log('📱 Page hidden, ending conversation');
        endConversation();
    }
});

// Initialize
console.log('✅ Voice Receptionist initialized');
updateState('idle', 'Welcome', 'Click the button below to start your conversation');

