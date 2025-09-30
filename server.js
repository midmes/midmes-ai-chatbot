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
    res.json({ 
        status: 'OK', 
        message: 'MIDMES AI Chatbot with Gemini',
        timestamp: new Date().toISOString(),
        ai_enabled: !!process.env.GEMINI_API_KEY
    });
});

// MAIN CHAT ENDPOINT - PRIORITIZE GEMINI AI
app.post('/api/chat', async (req, res) => {
    console.log('📨 Received message:', req.body);
    
    try {
        const { message, language = 'en' } = req.body;
        
        if (!message || message.trim() === '') {
            return res.json({
                success: false,
                response: "Please type a message so I can help you!"
            });
        }

        const geminiApiKey = process.env.GEMINI_API_KEY;
        
        // ALWAYS TRY GEMINI FIRST IF API KEY EXISTS
        if (geminiApiKey) {
            console.log('🤖 Attempting Gemini AI...');
            try {
                const aiResponse = await callGeminiAI(message, language, geminiApiKey);
                console.log('✅ Gemini AI response successful');
                
                return res.json({
                    success: true,
                    response: aiResponse,
                    source: 'gemini-ai'
                });
            } catch (aiError) {
                console.log('❌ Gemini failed, using enhanced responses:', aiError.message);
                // Fall through to enhanced responses
            }
        }

        // Enhanced responses as fallback
        console.log('🔄 Using enhanced responses...');
        const enhancedResponse = getEnhancedResponse(message, language);
        
        res.json({
            success: true,
            response: enhancedResponse,
            source: 'enhanced'
        });

    } catch (error) {
        console.error('❌ Final fallback error:', error);
        
        res.json({
            success: true,
            response: "I'm here to help! Contact MIDMES: +251 979 029 768 or email: contactmidmes@gmail.com",
            source: 'ultimate-fallback'
        });
    }
});

// FIXED GEMINI AI FUNCTION
async function callGeminiAI(message, language, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    
    const prompt = `You are MIDMES AI assistant - a professional digital marketing agency based in Addis Ababa, Ethiopia.

IMPORTANT: You MUST respond in ${language} language.

About MIDMES:
- Digital Marketing Agency in Addis Ababa
- Services: Web Design, SEO, Branding, Digital Ads, Social Media
- Phone: +251 979 029 768
- Email: contactmidmes@gmail.com

Instructions:
- Be conversational and helpful
- Provide detailed, useful information
- If unsure about specifics, suggest contacting the team
- Keep responses professional but friendly
- Always represent MIDMES positively

User Question: "${message}"

Provide a helpful response:`;

    const response = await axios.post(url, {
        contents: [{
            parts: [{
                text: prompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            topP: 0.8,
            topK: 40
        }
    }, {
        timeout: 10000
    });

    if (response.data && 
        response.data.candidates && 
        response.data.candidates[0] && 
        response.data.candidates[0].content && 
        response.data.candidates[0].content.parts && 
        response.data.candidates[0].content.parts[0]) {
        return response.data.candidates[0].content.parts[0].text;
    } else {
        throw new Error('Invalid response format from Gemini');
    }
}

// Enhanced fallback responses
function getEnhancedResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase();
    
    if (language === 'am') {
        if (lowerMessage.includes('ሰላም') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "ሰላም! 👋 እኔ MIDMES AI ረዳት ነኝ። በድር ንድፍ፣ SEO፣ ብሬንዲንግ እና ዲጂታል ግብይት እንተገኝላለን። እንዴት ልርዳችሁ እችላለሁ? 📞 +251 979 029 768";
        }
        return "ለMIDMES ፍላጎት አመሰግናለሁ! በዲጂታል ግብይት ፍላጎትዎ ልርዳችሁ እፈልጋለሁ። ምን ማወቅ ትፈልጋለህ?";
    }
    
    // English responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return "👋 Hello! I'm MIDMES AI assistant. We specialize in web design, SEO, branding, and digital marketing. How can I help you today?";
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        return `🚀 **Our Services:**

• 🌐 Web Design & Development
• 🔍 SEO Optimization  
• 📱 Social Media Management
• 📢 Digital Advertising
• 🎨 Branding & Identity
• 📊 Analytics & Reporting

Which service are you interested in?`;
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return "💵 Our pricing is customized based on your project needs. We offer competitive packages for all business sizes. Contact us for a free quote! 📞 +251 979 029 768";
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
        return `📞 **Contact MIDMES:**
Phone: +251 979 029 768
Email: contactmidmes@gmail.com
Location: Addis Ababa, Ethiopia

We'd love to discuss your project!`;
    }
    if (lowerMessage.includes('website') || lowerMessage.includes('web')) {
        return "🌐 We create stunning, responsive websites that convert visitors into customers. Our process includes strategy, design, development, and ongoing optimization.";
    }

    return "Thanks for your message! I'm MIDMES AI assistant. I can help with web design, SEO, digital marketing, and more. What would you like to know?";
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES AI Chatbot running on port ${PORT}`);
    console.log(`🤖 AI Status: ${process.env.GEMINI_API_KEY ? 'Gemini AI ENABLED' : 'Enhanced Mode'}`);
    if (process.env.GEMINI_API_KEY) {
        console.log('🎯 Gemini AI will handle ALL responses');
    }
});
