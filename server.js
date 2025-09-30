const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

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
    const hasGeminiKey = !!process.env.GEMINI_API_KEY;
    res.json({ 
        status: 'OK', 
        ai_enabled: hasGeminiKey,
        message: hasGeminiKey ? 'Gemini AI Ready' : 'Using Enhanced Mode'
    });
});

// MAIN CHAT ENDPOINT
app.post('/api/chat', async (req, res) => {
    console.log('📨 Received message:', req.body?.message);
    
    try {
        const { message, language = 'en' } = req.body;
        
        if (!message || message.trim() === '') {
            return res.json({
                success: false,
                response: "Please type a message so I can help you!"
            });
        }

        const geminiApiKey = process.env.GEMINI_API_KEY;
        
        // TRY GEMINI AI FIRST
        if (geminiApiKey && geminiApiKey.startsWith('AIza')) {
            console.log('🤖 Using Gemini AI...');
            try {
                const aiResponse = await callGeminiAI(message, language, geminiApiKey);
                return res.json({
                    success: true,
                    response: aiResponse,
                    source: 'gemini-ai'
                });
            } catch (aiError) {
                console.log('❌ Gemini AI failed:', aiError.message);
                // Fall through to enhanced responses
            }
        }

        // ENHANCED RESPONSES
        const enhancedResponse = getEnhancedResponse(message, language);
        res.json({
            success: true,
            response: enhancedResponse,
            source: 'enhanced'
        });

    } catch (error) {
        console.error('❌ Chat error:', error);
        res.json({
            success: true,
            response: "I'm here to help! Contact MIDMES: +251 979 029 768 or email: contactmidmes@gmail.com",
            source: 'fallback'
        });
    }
});

// IMPROVED GEMINI AI FUNCTION
async function callGeminiAI(message, language, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const prompt = `You are MIDMES AI assistant - a professional digital marketing agency in Addis Ababa, Ethiopia.

Services: Web Design, SEO, Branding, Digital Marketing, Social Media
Contact: +251 979 029 768, contactmidmes@gmail.com

Respond in ${language}. Be helpful and professional.

User: ${message}

Assistant:`;

    const response = await axios.post(url, {
        contents: [{
            parts: [{
                text: prompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
        }
    }, {
        timeout: 15000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Check response structure
    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return response.data.candidates[0].content.parts[0].text;
    } else {
        console.log('Unexpected Gemini response:', JSON.stringify(response.data));
        throw new Error('Invalid response from Gemini API');
    }
}

// Enhanced responses
function getEnhancedResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase();
    
    if (language === 'am') {
        return "ሰላም! እኔ MIDMES AI ረዳት ነኝ። በድር ንድፍ፣ SEO፣ ዲጂታል ግብይት እንረዳለን። ለበለጠ መረጃ፡ +251 979 029 768";
    }
    
    // Smart responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "👋 Hello! I'm MIDMES AI assistant. We specialize in web design, SEO, and digital marketing. How can I help you today?";
    }
    if (lowerMessage.includes('service')) {
        return "🚀 We offer: Web Design, SEO, Social Media, Digital Ads, Branding. Which service interests you?";
    }
    if (lowerMessage.includes('price')) {
        return "💵 Pricing is customized based on your project. Contact us for a free quote! 📞 +251 979 029 768";
    }
    if (lowerMessage.includes('contact')) {
        return "📞 Contact MIDMES: +251 979 029 768 ✉️ contactmidmes@gmail.com 📍 Addis Ababa";
    }
    
    return "Thanks for your message! I'm MIDMES AI assistant. How can I help with your digital marketing needs? Contact: +251 979 029 768";
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES Chatbot running on port ${PORT}`);
    console.log(`🔑 API Key Present: ${!!process.env.GEMINI_API_KEY}`);
});
