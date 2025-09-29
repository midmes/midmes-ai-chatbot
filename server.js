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
        ai_provider: process.env.GEMINI_API_KEY ? 'Google Gemini' : 'Enhanced Responses'
    });
});

app.get('/test', (req, res) => {
    res.json({
        message: "API test successful!",
        status: "working",
        ai_ready: !!process.env.GEMINI_API_KEY
    });
});

// Gemini AI Chat Endpoint
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
        
        if (geminiApiKey) {
            // Use REAL Gemini AI
            console.log('🤖 Using Gemini AI...');
            const aiResponse = await callGeminiAI(message, language, geminiApiKey);
            
            res.json({
                success: true,
                response: aiResponse,
                source: 'gemini-ai'
            });
            
        } else {
            // Use enhanced fallback
            console.log('🔄 Using enhanced responses...');
            const fallbackResponse = getEnhancedResponse(message, language);
            
            res.json({
                success: true,
                response: fallbackResponse,
                source: 'enhanced',
                note: 'Add GEMINI_API_KEY for AI responses'
            });
        }

    } catch (error) {
        console.error('❌ Chat error:', error);
        
        // Ultimate fallback
        const fallbackResponse = getEnhancedResponse(req.body?.message, req.body?.language);
        
        res.json({
            success: true,
            response: fallbackResponse,
            source: 'fallback',
            error: error.message
        });
    }
});

// REAL Google Gemini AI Integration
async function callGeminiAI(message, language, apiKey) {
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        
        const prompt = `You are MIDMES AI assistant - a professional digital marketing agency based in Addis Ababa, Ethiopia.

MIDMES Services:
- Web Design & Development
- SEO Optimization  
- Branding & Identity
- Digital Advertising
- Social Media Management
- Analytics & Reporting

Contact Information:
- Phone: +251 979 029 768
- Email: contactmidmes@gmail.com
- Location: Addis Ababa, Ethiopia

Important Instructions:
- Respond in ${language} language
- Be helpful, professional, and conversational
- Provide accurate information about MIDMES services
- If asked about pricing, explain it's customized based on project needs
- Encourage users to contact for free consultations
- Keep responses informative but not too long
- Be friendly and approachable
- Always represent MIDMES professionally

User Question: ${message}

Assistant Response:`;

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
            timeout: 30000
        });

        console.log('✅ Gemini AI response received');
        
        if (response.data.candidates && response.data.candidates[0].content.parts[0].text) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response from Gemini AI');
        }

    } catch (error) {
        console.error('❌ Gemini AI error:', error.response?.data || error.message);
        throw new Error('AI service temporarily unavailable');
    }
}

// Enhanced fallback responses (better than before)
function getEnhancedResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
        en: {
            'hello': "👋 Hello! I'm MIDMES AI assistant powered by Google Gemini. I can help you with web design, SEO, branding, digital marketing, and much more! What would you like to know?",
            'hi': "👋 Hi there! I'm your AI assistant from MIDMES Digital Marketing Agency. How can I help you grow your business today?",
            'service': `🚀 **MIDMES Digital Marketing Services:**

🎨 **Web Design & Development**
- Custom, responsive websites
- E-commerce solutions
- Website maintenance & hosting

🔍 **SEO Optimization** 
- Google ranking improvement
- Local SEO strategies
- Technical SEO audits
- Content optimization

📱 **Social Media Management**
- Content strategy & creation
- Community management
- Paid social advertising
- Analytics & reporting

📢 **Digital Advertising**
- Google Ads campaigns
- Social media ads
- Retargeting strategies
- Conversion optimization

💼 **Branding & Identity**
- Logo design & brand guides
- Marketing materials
- Brand strategy development
- Visual identity systems

📊 **Analytics & Reporting**
- Performance tracking
- ROI analysis
- Custom dashboards
- Monthly reports

Which service are you most interested in? I can provide more details!`,
            'price': "💵 **Pricing Information:**\n\nOur services are completely customized based on your specific business needs, goals, and project scope. We offer competitive packages for:\n\n• Startups & small businesses\n• Medium-sized enterprises  \n• Large corporations\n\nWe provide transparent pricing with no hidden costs. Would you like to share more about your project so I can give you accurate pricing information?",
            'cost': "💵 **Service Costs:**\n\nWe believe in value-based pricing that matches your budget and goals. Our approach:\n\n• **Web Design:** From basic sites to complex e-commerce\n• **SEO:** Monthly packages based on competition\n• **Social Media:** Content packages or full management\n• **Advertising:** Budget-based campaign management\n\nLet's discuss your specific needs for a tailored quote!",
            'contact': `📞 **Contact MIDMES Today!**

**Direct Contact:**
📍 **Office:** Addis Ababa, Ethiopia
📞 **Phone:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com
🌐 **Website:** Coming soon!

**Business Hours:**
Monday - Friday: 8:30 AM - 5:30 PM  
Saturday: 9:00 AM - 1:00 PM

**Free Consultation:**
We offer complimentary initial consultations to discuss your project needs and provide tailored recommendations.

Would you like to schedule a call or meeting?`,
            'website': "🌐 **Web Design Services:**\n\nWe create stunning, high-performance websites that not only look great but also drive business results. Our web design process includes:\n\n• **Strategy:** Understanding your business goals\n• **Design:** Modern, user-friendly interfaces\n• **Development:** Fast, responsive coding\n• **Optimization:** SEO and performance tuning\n• **Support:** Ongoing maintenance and updates\n\nWhat type of website are you looking to build?",
            'seo': "🔍 **SEO Services:**\n\nWe help businesses dominate search results and drive qualified organic traffic. Our SEO approach includes:\n\n• **Technical SEO:** Site structure and performance\n• **Content Strategy:** Keyword optimization and content creation\n• **Local SEO:** Google Business Profile optimization\n• **Link Building:** Authority and reputation building\n• **Analytics:** Performance tracking and reporting\n\nWhat's your current website or business focus?",
            'social': "📱 **Social Media Management:**\n\nWe transform your social media presence into a powerful marketing channel. Our services include:\n\n• **Content Creation:** Engaging posts and visuals\n• **Strategy Development:** Platform-specific approaches\n• **Community Management:** Audience engagement\n• **Advertising:** Targeted social media campaigns\n• **Analytics:** Performance measurement and optimization\n\nWhich platforms are most important for your business?",
            'branding': "🎨 **Branding & Identity:**\n\nWe build memorable brands that connect with your audience and drive loyalty. Our branding services:\n\n• **Logo Design:** Unique and meaningful logos\n• **Brand Guidelines:** Consistent visual identity\n• **Marketing Materials:** Business cards, brochures, etc.\n• **Brand Strategy:** Positioning and messaging\n• **Visual Identity:** Colors, typography, and imagery\n\nTell me about your business and branding goals!",
            'default': "Thanks for your message! I'm MIDMES AI assistant, powered by Google's latest AI technology. I can help you with:\n\n• Website design and development\n• SEO and digital marketing strategies\n• Social media management\n• Branding and visual identity\n• Digital advertising campaigns\n• Analytics and performance tracking\n\nWhat would you like to know more about? I'm here to provide detailed, helpful information about all our services!"
        },
        am: {
            'hello': "ሰላም! 👋 እኔ MIDMES AI ረዳት ነኝ፣ በጉግል ጄምኒ AI የተጎላበት። በድር ንድፍ፣ SEO፣ ብሬንዲንግ፣ ዲጂታል ግብይት እና ሌሎችም ልርዳችሁ እችላለሁ! ምን ማወቅ ትፈልጋለህ?",
            'service': `🚀 **የMIDMES ዲጂታል ግብይት አገልግሎቶች:**

🎨 **ድር ጣቢያ ንድፍ እና ልማት**
- ብጁ ድር ጣቢያዎች
- የኢ-ንግድ መፍትሄዎች
- ድር ጣቢያ እርዳታ እና ማስተናገድ

🔍 **SEO ማመቻቸት**
- በጉግል ላይ የተሻለ ስፍራ
- አካባቢያዊ SEO ስትራቴጂ
- ቴክኒካል SEO ኦዲት
- የይዘት ማመቻቸት

📱 **ማህበራዊ ሚዲያ አስተዳደር**
- የይዘት ስትራቴጂ እና ፍጠር
- ማህበረሰብ አስተዳደር
- የተከፈለ ማህበራዊ ሚዲያ ማስታወቂያ
- የውጤት ትንተና እና ሪፖርት

የትኛው አገልግሎት በተለይ ያስተውሎታል? ተጨማሪ ዝርዝር ልስጥዎት እችላለሁ!`,
            'default': "ለMIDMES ፍላጎት አመሰግናለሁ! እኔ AI ረዳትዎ ነኝ እና በዲጂታል ግብይት ፍላጎትዎ ልርዳችሁ እፈልጋለሁ። ስለ ድር ንድፍ፣ SEO፣ ማህበራዊ ሚዲያ፣ ዲጂታል ማስታወቂያ ወይም ሌላ ነገር ሊጠይቁኝ ይችላሉ!"
        }
    };

    const langResponses = responses[language] || responses.en;
    
    // Smart keyword matching
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('ሰላም')) {
        return langResponses.hello;
    } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer') || lowerMessage.includes('አገልግሎት')) {
        return langResponses.service;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('ዋጋ')) {
        return langResponses.price || responses.en.price;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('አንግል')) {
        return langResponses.contact || responses.en.contact;
    } else if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('site') || lowerMessage.includes('ድር')) {
        return langResponses.website || responses.en.website;
    } else if (lowerMessage.includes('seo') || lowerMessage.includes('search') || lowerMessage.includes('google')) {
        return langResponses.seo || responses.en.seo;
    } else if (lowerMessage.includes('social') || lowerMessage.includes('facebook') || lowerMessage.includes('instagram')) {
        return langResponses.social || responses.en.social;
    } else if (lowerMessage.includes('brand') || lowerMessage.includes('logo') || lowerMessage.includes('identity') || lowerMessage.includes('ብሬንድ')) {
        return langResponses.branding || responses.en.branding;
    }

    return langResponses.default;
}

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Endpoint not found',
        available_endpoints: ['GET /', 'GET /health', 'GET /test', 'POST /api/chat']
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES AI Chatbot with Gemini started on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/health`);
    console.log(`🤖 AI Status: ${process.env.GEMINI_API_KEY ? 'Gemini AI Ready' : 'Enhanced Mode'}`);
});
