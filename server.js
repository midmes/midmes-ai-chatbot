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
        message: 'MIDMES Chatbot is running!',
        timestamp: new Date().toISOString()
    });
});

// Simple Chat Endpoint
app.post('/api/chat', (req, res) => {
    console.log('💬 Chat request:', req.body);
    
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.json({
                success: false,
                response: "Please type a message about our digital marketing services!"
            });
        }

        // Simple response that always works
        const response = `Hello! Thanks for your message: "${message}". I'm MIDMES Digital Marketing assistant. I specialize in web design, SEO, social media, and digital advertising. Contact us: +251 979 029 768 or email: contactmidmes@gmail.com`;
        
        res.json({
            success: true,
            response: response
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.json({
            success: false,
            response: "I'm here to help with digital marketing! Contact MIDMES directly: +251 979 029 768"
        });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES Chatbot successfully started on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
