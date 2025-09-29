// MIDMES Chatbot Embed Script
(function() {
    const chatbotURL = 'https://YOUR-RENDER-URL.onrender.com';
    
    class MIDMESChatbotEmbed {
        constructor() {
            this.widget = document.getElementById('midmes-chatbot-widget');
            this.toggleBtn = document.getElementById('chatbot-toggle');
            this.messagesContainer = document.getElementById('chatbot-messages');
            this.input = document.getElementById('chatbot-input');
            this.sendBtn = document.getElementById('chatbot-send');
            this.closeBtn = document.getElementById('close-chatbot');
            this.isOpen = false;
            
            this.init();
        }
        
        init() {
            this.toggleBtn.addEventListener('click', () => this.toggleChatbot());
            this.closeBtn.addEventListener('click', () => this.closeChatbot());
            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
            
            this.addWelcomeMessage();
        }
        
        toggleChatbot() {
            this.isOpen = !this.isOpen;
            this.widget.style.display = this.isOpen ? 'flex' : 'none';
            this.toggleBtn.style.display = this.isOpen ? 'none' : 'flex';
            if (this.isOpen) this.input.focus();
        }
        
        closeChatbot() {
            this.isOpen = false;
            this.widget.style.display = 'none';
            this.toggleBtn.style.display = 'flex';
        }
        
        addWelcomeMessage() {
            this.addMessage('👋 Hello! I\'m MIDMES AI assistant. I can help you with web design, SEO, branding, digital marketing, and more!', 'bot');
        }
        
        async sendMessage() {
            const message = this.input.value.trim();
            if (!message) return;
            
            this.addMessage(message, 'user');
            this.input.value = '';
            this.showTyping();
            
            try {
                const response = await fetch(chatbotURL + '/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: message, language: 'en' })
                });
                
                const data = await response.json();
                this.hideTyping();
                this.addMessage(data.response, 'bot');
            } catch (error) {
                this.hideTyping();
                this.addMessage('Contact MIDMES: +251 979 029 768', 'bot');
            }
        }
        
        addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.style.display = 'flex';
            messageDiv.style.gap = '10px';
            messageDiv.style.alignSelf = sender === 'user' ? 'flex-end' : 'flex-start';
            if (sender === 'user') messageDiv.style.flexDirection = 'row-reverse';
            
            messageDiv.innerHTML = `
                <div style="width:35px;height:35px;border-radius:50%;background:${sender === 'user' ? '#e9ecef' : '#2d1bff'};color:${sender === 'user' ? '#495057' : 'white'};display:flex;align-items:center;justify-content:center;font-size:14px;">
                    ${sender === 'user' ? '👤' : '🤖'}
                </div>
                <div style="max-width:70%;padding:12px 16px;border-radius:18px;background:${sender === 'user' ? '#2d1bff' : 'white'};color:${sender === 'user' ? 'white' : 'inherit'};box-shadow:0 2px 8px rgba(0,0,0,0.1);">
                    <p style="margin:0;line-height:1.4;">${text}</p>
                    <span style="font-size:11px;opacity:0.7;display:block;margin-top:5px;">${new Date().toLocaleTimeString()}</span>
                </div>
            `;
            
            this.messagesContainer.appendChild(messageDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
        
        showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.style.display = 'flex';
            typingDiv.style.gap = '10px';
            typingDiv.style.alignSelf = 'flex-start';
            typingDiv.id = 'typing-indicator';
            
            typingDiv.innerHTML = `
                <div style="width:35px;height:35px;border-radius:50%;background:#2d1bff;color:white;display:flex;align-items:center;justify-content:center;">🤖</div>
                <div style="padding:12px 16px;background:white;border-radius:18px;box-shadow:0 2px 8px rgba(0,0,0,0.1);display:flex;gap:5px;">
                    <div style="width:8px;height:8px;background:#2d1bff;border-radius:50%;animation:typing 1.4s infinite ease-in-out;"></div>
                    <div style="width:8px;height:8px;background:#2d1bff;border-radius:50%;animation:typing 1.4s infinite ease-in-out;animation-delay:-0.16s;"></div>
                    <div style="width:8px;height:8px;background:#2d1bff;border-radius:50%;animation:typing 1.4s infinite ease-in-out;animation-delay:-0.32s;"></div>
                </div>
            `;
            
            // Add animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes typing {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            this.messagesContainer.appendChild(typingDiv);
            this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
        }
        
        hideTyping() {
            const typing = document.getElementById('typing-indicator');
            if (typing) typing.remove();
        }
    }
    
    // Initialize when loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new MIDMESChatbotEmbed());
    } else {
        new MIDMESChatbotEmbed();
    }
})();
