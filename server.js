const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'MIDMES Chatbot DEBUG Mode',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// DEBUG Chat Endpoint - SIMPLE RESPONSES
app.post('/api/chat', (req, res) => {
    console.log('📨 Received chat request:', req.body);
    
    try {
        const { message, language = 'en' } = req.body;
        
        if (!message) {
            return res.json({
                success: false,
                response: "Please provide a message",
                debug: "No message in request"
            });
        }

        // SIMPLE RESPONSES THAT ALWAYS WORK
        const responses = {
            en: {
                'hello': "Hello! I'm MIDMES AI assistant. We offer web design, SEO, branding, and digital marketing services. Contact us: +251 979 029 768",
                'hi': "Hi there! How can I help you with MIDMES services today?",
                'service': "We offer: 🌐 Web Design, 🔍 SEO, 🎨 Branding, 📢 Digital Ads, 📱 Social Media, 📊 Analytics",
                'price': "Our pricing is customized based on your project needs. Contact us for a free quote!",
                'contact': "📞 Call: +251 979 029 768\n📧 Email: contactmidmes@gmail.com\n📍 Addis Ababa, Ethiopia",
                'website': "We create beautiful, responsive websites that convert visitors into customers.",
                'default': "Thanks for your message! I'm MIDMES AI assistant. How can I help you today?"
            },
            am: {
                'hello': "ሰላም! እኔ MIDMES AI ረዳት ነኝ። ድር ንድፍ፣ SEO፣ ብሬንዲንግ እና ዲጂታል ግብይት አገልግሎቶችን እንሰጣለን። ያግኙን፡ +251 979 029 768",
                'default': "ለMIDMES ፍላጎት አመሰግናለሁ! እንዴት ልርዳችሁ እችላለሁ?"
            }
        };

        const langResponses = responses[language] || responses.en;
        const lowerMessage = message.toLowerCase();

        let response = langResponses.default;
        
        // Simple keyword matching
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            response = langResponses.hello || responses.en.hello;
        } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
            response = langResponses.service || responses.en.service;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            response = langResponses.price || responses.en.price;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('call')) {
            response = langResponses.contact || responses.en.contact;
        } else if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
            response = langResponses.website || responses.en.website;
        }

        console.log('📤 Sending response:', response);

        res.json({
            success: true,
            response: response,
            debug: {
                received: message,
                language: language,
                matched: true
            }
        });

    } catch (error) {
        console.error('❌ Chat error:', error);
        res.json({
            success: false,
            response: "I'm here to help! Contact MIDMES: +251 979 029 768",
            debug: {
                error: error.message,
                timestamp: new Date().toISOString()
            }
        });
    }
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: "API is working!",
        timestamp: new Date().toISOString(),
        status: "active"
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 MIDMES Chatbot DEBUG server running on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/health`);
    console.log(`🧪 Test: http://localhost:${PORT}/api/test`);
});
