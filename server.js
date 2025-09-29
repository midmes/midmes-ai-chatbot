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
        message: 'MIDMES AI Chatbot is running!',
        timestamp: new Date().toISOString(),
        ai_enabled: !!process.env.OPENAI_API_KEY
    });
});

// Real AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, language = 'en' } = req.body;
        
        // Get API key from environment
        const apiKey = process.env.OPENAI_API_KEY;
        
        if (apiKey) {
            // Use real OpenAI API
            const aiResponse = await callOpenAI(message, language, apiKey);
            res.json({
                success: true,
                response: aiResponse,
                source: 'openai'
            });
        } else {
            // Use enhanced fallback
            const fallbackResponse = getEnhancedResponse(message, language);
            res.json({
                success: true,
                response: fallbackResponse,
                source: 'enhanced'
            });
        }
        
    } catch (error) {
        console.error('Chat error:', error);
        const fallbackResponse = getEnhancedResponse(req.body?.message, req.body?.language);
        res.json({
            success: true,
            response: fallbackResponse,
            source: 'fallback'
        });
    }
});

// Real OpenAI Integration
async function callOpenAI(message, language, apiKey) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are MIDMES AI assistant - a professional digital marketing agency based in Addis Ababa, Ethiopia.

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
- Be helpful, professional, and friendly
- Provide accurate information about MIDMES
- If asked about pricing, explain it's customized
- Encourage consultations
- Keep responses conversational but professional`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        });

        return response.data.choices[0].message.content;
        
    } catch (error) {
        console.error('OpenAI API error:', error.response?.data || error.message);
        throw new Error('AI service unavailable');
    }
}

// Enhanced responses (much better than before)
function getEnhancedResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
        en: {
            greeting: "Hello! 👋 I'm MIDMES AI assistant. We're a digital marketing agency specializing in web design, SEO, branding, and digital advertising. How can I help you grow your business today?",
            services: `🚀 **MIDMES Digital Marketing Services:**

🎨 **Web Design & Development**
- Custom, responsive websites
- E-commerce solutions
- Website maintenance

🔍 **SEO Optimization** 
- Google ranking improvement
- Local SEO strategies
- Technical SEO audits

📱 **Social Media Management**
- Content strategy & creation
- Community management
- Paid social advertising

📢 **Digital Advertising**
- Google Ads campaigns
- Social media ads
- Retargeting strategies

💼 **Branding & Identity**
- Logo design & brand guides
- Marketing materials
- Brand strategy

Which service are you most interested in?`,
            pricing: "Our pricing is customized based on your specific business needs, goals, and project scope. We offer competitive packages for startups, SMEs, and enterprises. Would you like to share more about your project for accurate pricing?",
            contact: `📞 **Call Us:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com  
📍 **Location:** Addis Ababa, Ethiopia

**Business Hours:**
Monday - Friday: 8:30 AM - 5:30 PM
Saturday: 9:00 AM - 1:00 PM

Would you like to schedule a free consultation?`,
            website: "We create stunning, high-performance websites that convert visitors into customers. Our process includes strategy, design, development, and ongoing optimization to ensure your website drives real business results.",
            portfolio: "I'd be happy to show you our work! We've helped businesses across various industries achieve their digital goals. For specific case studies and portfolio examples, please contact our team directly.",
            default: "Thanks for your interest in MIDMES! I'd love to help you with your digital marketing needs. Could you tell me more about your business and what you're looking to achieve online?"
        },
        am: {
            greeting: "ሰላም! 👋 እኔ MIDMES AI ረዳት ነኝ። እኛ በድር ንድፍ፣ SEO፣ ብሬንዲንግ እና ዲጂታል ማስታወቂያ የምንተገኝለው ዲጂታል ግብይት ኤጀንሲ ነን። ዛሬ ንግድዎን እንዴት ልርዳችሁ እችላለሁ?",
            services: `🚀 **የMIDMES ዲጂታል ግብይት አገልግሎቶች:**

🎨 **ድር ጣቢያ ንድፍ እና ልማት**
- ብጁ ድር ጣቢያዎች
- የኢ-ንግድ መፍትሄዎች
- ድር ጣቢያ እርዳታ

🔍 **SEO ማመቻቸት**
- በጉግል ላይ የተሻለ ስፍራ
- አካባቢያዊ SEO ስትራቴጂ
- ቴክኒካል SEO ኦዲት

📱 **ማህበራዊ ሚዲያ አስተዳደር**
- የይዘት ስትራቴጂ እና ፍጠር
- ማህበረሰብ አስተዳደር
- የተከፈለ ማህበራዊ ሚዲያ ማስታወቂያ

📢 **ዲጂታል ማስታወቂያ**
- የጉግል ማስታወቂያ ዘመቻዎች
- ማህበራዊ ሚዲያ ማስታወቂያ
- ዳግም ማሰራጨት ስትራቴጂዎች

የትኛው አገልግሎት በተለይ ያስተውሎታል?`,
            contact: `📞 **ይደውሉልን:** +251 979 029 768
📧 **ኢሜይል:** contactmidmes@gmail.com  
📍 **አድራሻ:** አዲስ አበባ፣ ኢትዮጵያ

**የስራ ሰዓት:**
ሰኞ - አርብ፦ ከጠዋት 8፡30 - ከምሽቱ 5፡30
ቅዳሜ፦ ከጠዋት 9፡00 - ከምሽቱ 1፡00

ነፃ ውይይት ለማቅረብ ይፈልጋሉ?`,
            default: "ለMIDMES ፍላጎት አመሰግናለሁ! በዲጂታል ግብይት ፍላጎትዎ ልርዳችሁ እፈልጋለሁ። ስለ ንግድዎ እና በኦንላይን ማሳካት የሚፈልጉት ሊንገሩኝ ይችላሉ?"
        }
    };

    const langResponses = responses[language] || responses.en;
    
    // Smart response matching
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('ሰላም')) {
        return langResponses.greeting;
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('አገልግሎት')) {
        return langResponses.services;
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('ዋጋ')) {
        return langResponses.pricing;
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('አንግል')) {
        return langResponses.contact;
    }
    if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('site') || lowerMessage.includes('ድር')) {
        return langResponses.website || responses.en.website;
    }
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('example') || lowerMessage.includes('ስራ')) {
        return langResponses.portfolio || responses.en.portfolio;
    }

    return langResponses.default;
}

// Error handling
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ 
        success: false,
        error: 'Internal server error' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Endpoint not found' 
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES AI Chatbot successfully started on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/health`);
    console.log(`🤖 AI Status: ${process.env.OPENAI_API_KEY ? 'Enabled' : 'Enhanced Mode'}`);
});
