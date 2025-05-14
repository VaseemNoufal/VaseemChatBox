(function () {
    const SUPABASE_URL = 'https://ixqmzlvcrxwkeratqpwr.supabase.co'; // 🔁 Replace this
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4cW16bHZjcnh3a2VyYXRxcHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDA4NDksImV4cCI6MjA2MTkxNjg0OX0.htpU4OontlKLHv6sjwebMsoT8v-bjyChlI3PRZUEckI'; // 🔁 Replace this
    const OPENROUTER_API_KEY = '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'; // 🔁 Replace this
    const businessContext = "We are Build Care, a company specializing in building maintenance services. We only work from 1 to 2 am.";
    const clientId = window.location.hostname;

    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
        * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}

:root {
    --primary-color: #2563eb;
    --primary-hover: #1d4ed8;
    --bg-color: #f8fafc;
    --chat-bg: #ffffff;
    --text-primary: #1e293b;
    --text-secondary: #64748b;
    --border-color: #e2e8f0;
    --user-msg-bg: #2563eb;
    --bot-msg-bg: #f1f5f9;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    --chat-width: 380px;
    --chat-height: 80vh;
}

body {
    background-color: var(--bg-color);
    min-height: 100vh;
    color: var(--text-primary);
}

/* Chat Toggle Button */
.chat-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    box-shadow: var(--shadow-lg);
    transition: all 0.3s ease;
    z-index: 1000;
}

.chat-toggle:hover {
    background-color: var(--primary-hover);
    transform: scale(1.05);
}

.notification-badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background-color: #ef4444;
    border-radius: 50%;
    border: 2px solid white;
    display: none;
}

.notification-badge.active {
    display: block;
}

/* App Container */
.app-container {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: var(--chat-width);
    height: var(--chat-height);
    z-index: 999;
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
}

.app-container.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.chat-container {
    width: 100%;
    height: 100%;
    background-color: var(--chat-bg);
    border-radius: 1rem;
    box-shadow: var(--shadow-lg);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    padding: 1rem 1.5rem;
    background-color: var(--chat-bg);
    border-bottom: 1px solid var(--border-color);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.minimize-button {
    width: 32px;
    height: 32px;
    background-color: #f1f5f9;
    border: none;
    border-radius: 0.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.minimize-button:hover {
    background-color: #e2e8f0;
    color: var(--text-primary);
}

.bot-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.bot-avatar {
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
}

.bot-status h1 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.status-indicator {
    font-size: 0.875rem;
    color: var(--text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.status-indicator.online::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #22c55e;
    border-radius: 50%;
}

.clear-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #f1f5f9;
    border: none;
    border-radius: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.clear-button:hover {
    background-color: #e2e8f0;
    color: var(--text-primary);
}

.chat-messages {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--bg-color);
    background-image: 
        linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
}

.message {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    padding: 0.5rem;
    border-radius: 1rem;
    animation: wevvv .7s ease;
}
@keyframes wevvv{
    0%{
        opacity: 0;
        transform: translateX(-10px);
    }
    100%{
        opacity: 1;
        transform: translateX(0);
    }
}

.message.user {
    align-self: flex-end;
    background-color: rgba(37, 99, 235, 0.05);
    border: 1px solid rgba(37, 99, 235, 0.1);
}

.message.bot {
    align-self: flex-start;
    background-color: rgba(241, 245, 249, 0.5);
    border: 1px solid rgba(226, 232, 240, 0.5);
}

.message-content {
    padding: 1rem;
    border-radius: 1rem;
    font-size: 0.95rem;
    line-height: 1.5;
    position: relative;
}

.user .message-content {
    background-color: var(--user-msg-bg);
    color: white;
    border-bottom-right-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.1);
}

.bot .message-content {
    background-color: var(--bot-msg-bg);
    color: var(--text-primary);
    border-bottom-left-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.welcome-message {
    background-color: rgba(37, 99, 235, 0.05);
    border: 1px solid rgba(37, 99, 235, 0.1);
}

.welcome-message .message-content {
    background-color: var(--bot-msg-bg);
    color: var(--text-primary);
    box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);
}

/* Add message timestamps */
.message::after {
    content: attr(data-time);
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
    align-self: flex-end;
}

.user::after {
    margin-right: 0.5rem;
}

.bot::after {
    margin-left: 0.5rem;
}

/* Add message indicators */
.message::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 0.75rem;
}

.user::before {
    right: -4px;
    background-color: var(--user-msg-bg);
    border: 2px solid white;
}

.bot::before {
    left: -4px;
    background-color: var(--bot-msg-bg);
    border: 2px solid var(--bg-color);
}

/* Improve chat messages container */
.chat-messages {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--bg-color);
    background-image: 
        linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px);
    background-size: 20px 20px;
}

/* Add hover effects */
.message:hover {
    transform: translateY(-1px);
    transition: transform 0.2s ease;
}

.user:hover {
    background-color: rgba(37, 99, 235, 0.08);
}

.bot:hover {
    background-color: rgba(241, 245, 249, 0.8);
}

.chat-input-container {
    padding: 1rem 1.5rem;
    background-color: var(--chat-bg);
    border-top: 1px solid var(--border-color);
}

.input-wrapper {
    display: flex;
    gap: 0.75rem;
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    padding: 0.5rem;
}

.chat-input {
    flex: 1;
    border: none;
    background: none;
    padding: 0.5rem;
    font-size: 0.95rem;
    color: var(--text-primary);
    resize: none;
    max-height: 120px;
    outline: none;
}

.chat-input::placeholder {
    color: var(--text-secondary);
}

.send-button {
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
}

.send-button:hover {
    background-color: var(--primary-hover);
}

.send-button:disabled {
    background-color: var(--text-secondary);
    cursor: not-allowed;
}

.input-footer {
    margin-top: 0.5rem;
    text-align: center;
}

.input-hint {
    font-size: 0.75rem;
    color: var(--text-secondary);
}

.typing-indicator {
    display: flex;
    gap: 0.3rem;
    padding: 0.8rem 1rem;
    background-color: var(--bot-msg-bg);
    border-radius: 1rem;
    width: fit-content;
    margin: 0.5rem 0;
}

.typing-dot {
    width: 8px;
    height: 8px;
    background-color: var(--text-secondary);
    border-radius: 50%;
    animation: typing 1s infinite ease-in-out;
}

.typing-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typing {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-5px);
    }
}

@media (max-width: 480px) {
    :root {
        --chat-width: 100%;
        --chat-height: 100%;
    }

    .app-container {
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    .chat-container {
        border-radius: 0;
    }

    .chat-toggle {
        bottom: 15px;
        right: 15px;
        width: 50px;
        height: 50px;
        font-size: 1.25rem;
    }

    .header-actions {
        gap: 0.25rem;
    }

    .clear-button span {
        display: none;
    }

    .clear-button {
        padding: 0.5rem;
    }
} 
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.innerHTML = `
        <button id="chatToggle" class="chat-toggle"><i class="fas fa-comments"></i><span class="notification-badge"></span></button>
        <div class="app-container">
        <div class="chat-container">
            <div class="chat-header">
                <div class="header-content">
                    <div class="bot-info">
                        <div class="bot-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="bot-status">
                            <h1>AI Assistant</h1>
                            <span class="status-indicator online">Online</span>
                        </div>
                    </div>
                    <div class="header-actions">
                        <button id="minimizeChatb" class="minimize-button" title="Minimize Chat">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button id="clearChat" class="clear-button" title="Clear chat history">
                            <i class="fas fa-trash"></i>
                            <span>Clear Chat</span>
                        </button>
                    </div>
                </div>
            </div>

            <div class="chat-messages" id="chatMessages">
                <!-- Welcome message -->
                <div class="message bot welcome-message">
                    <div class="message-content">
                        <p>👋 Hi! I'm your AI assistant. How can I help you today?</p>
                    </div>
                </div>
            </div>

            <div class="chat-input-container">
                <div class="input-wrapper">
                    <textarea 
                        id="userInput" 
                        placeholder="Type your message here..." 
                        rows="1"
                        class="chat-input"
                    ></textarea>
                    <button id="sendButton" class="send-button" title="Send message">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                <div class="input-footer">
                    <span class="input-hint">Press Enter to send, Shift + Enter for new line</span>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.appendChild(container);

    const chatToggle = document.getElementById('chatToggle');
    const appContainer = document.querySelector('.app-container');
    const notificationBadge = document.querySelector('.notification-badge');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const minimizeButton = document.getElementById('minimizeChatb');
    const clearButton = document.getElementById('clearChat');
    let isChatOpen = false;

    chatToggle.addEventListener('click', () => {
        isChatOpen = !isChatOpen;
        appContainer.classList.toggle('active', isChatOpen);
        if (isChatOpen) notificationBadge.classList.remove('active');
    });

    clearButton.addEventListener('click', () => {
        if (chatMessages) {
            chatMessages.innerHTML = `
            <div class="message bot welcome-message"><div class="message-content"><p>👋 Hi! I'm your AIassistant. How can I help you today?</p></div></div>`; // ✅ Clears all children
        }
    });
    document.addEventListener('click', (e) => {
        if (isChatOpen && !appContainer.contains(e.target) && !chatToggle.contains(e.target)) {
            appContainer.classList.remove('active');
            isChatOpen = false;
        }
    });
    minimizeButton.addEventListener("click", () =>{
        isChatOpen = false;
        appContainer.classList.remove('active');
    })
    userInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });

    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = `message ${isUser ? 'user' : 'bot'}`;
        div.innerHTML = `<div class="message-content">${text}</div>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        chatMessages.appendChild(indicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return indicator;
    }

    function removeTypingIndicator(indicator) {
        if (indicator && indicator.remove) indicator.remove();
    }

    async function storeMessage(sender, message) {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    client_id: clientId,
                    sender,
                    message
                })
            });
        } catch (err) {
            console.error('Supabase error:', err);
        }
    }

    async function getAIResponse(userText) {
        const messages = [
            { role: "system", content: `You are an assistant for: ${businessContext}` },
            { role: "user", content: userText }
        ];
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'AI Chatbot'
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo',
                messages
            })
        });
        const data = await response.json();
        return data?.choices?.[0]?.message?.content || "Sorry, I couldn’t understand that.";
    }

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        addMessage(text, true);
        await storeMessage('user', text);
        userInput.value = '';
        userInput.style.height = 'auto';

        const indicator = showTypingIndicator();
        const reply = await getAIResponse(text);
        removeTypingIndicator(indicator);
        addMessage(reply, false);
        await storeMessage('ai', reply);
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
})();
