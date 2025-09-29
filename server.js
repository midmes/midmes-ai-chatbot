const express = require('express');
const path = require('path');

const app = express();

// Middleware
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

app.post('/api/chat', (req, res) => {
    try {
        const { message } = req.body;
        
        // Simple response
        const response = `Hello! Thanks for your message: "${message}". I'm MIDMES AI assistant. Contact us: +251 979 029 768 or email: contactmidmes@gmail.com`;
        
        res.json({
            success: true,
            response: response
        });
    } catch (error) {
        res.json({
            success: false,
            response: "Sorry, I'm having trouble right now. Please contact MIDMES directly: +251 979 029 768"
        });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES Chatbot successfully started on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
