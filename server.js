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

// Health check - FIXED
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'MIDMES Chatbot is running!',
        timestamp: new Date().toISOString()
    });
});

// Test endpoint - FIXED
app.get('/test', (req, res) => {
    res.json({
        message: "API test successful!",
        status: "working",
        timestamp: new Date().toISOString()
    });
});

// Chat endpoint - FIXED (always responds)
app.post('/api/chat', (req, res) => {
    console.log('📨 Received message:', req.body);
    
    try {
        const { message, language = 'en' } = req.body;
        
        if (!message) {
            return res.json({
                success: false,
                response: "Please type a message"
            });
        }

        // SIMPLE RESPONSES THAT ALWAYS WORK
        const responses = {
            en: {
                'hello': "👋 Hello! I'm MIDMES AI assistant. We specialize in web design, SEO, branding, and digital marketing. How can I help you today?",
                'hi': "👋 Hi there! Welcome to MIDMES Digital Marketing Agency. What can I assist you with?",
                'service': `🚀 **Our Services:**

🌐 **Web Design & Development**
- Custom websites
- E-commerce solutions
- Responsive design

🔍 **SEO Optimization** 
- Google ranking improvement
- Local SEO
- Technical SEO

📱 **Social Media Management**
- Content creation
- Community management
- Paid advertising

🎨 **Branding & Identity**
- Logo design
- Brand guides
- Marketing materials

📢 **Digital Advertising**
- Google Ads
- Social media ads
- Retargeting

Which service interests you?`,
                'price': "💵 **Pricing:** Our services are customized based on your specific needs. We offer competitive packages for all business sizes. Contact us for a free quote!",
                'cost': "💵 **Cost:** We provide customized pricing based on your project scope. Let's discuss your requirements for an accurate quote.",
                'contact': `📞 **Contact MIDMES:**

**Phone:** +251 979 029 768
**Email:** contactmidmes@gmail.com
**Location:** Addis Ababa, Ethiopia

**Business Hours:**
Mon-Fri: 8:30 AM - 5:30 PM
Sat: 9:00 AM - 1:00 PM

Would you like to schedule a consultation?`,
                'website': "🌐 **Web Design:** We create stunning, high-performance websites that convert visitors into customers. Our process includes strategy, design, development, and ongoing optimization.",
                'seo': "🔍 **SEO Services:** We help businesses rank higher in search results through comprehensive SEO strategies including technical optimization, content creation, and link building.",
                'social media': "📱 **Social Media:** We manage your social media presence with engaging content, strategic campaigns, and community management to build brand loyalty.",
                'branding': "🎨 **Branding:** We develop memorable brand identities that resonate with your audience and differentiate you from competitors.",
                'thank': "You're welcome! 😊 Is there anything else I can help you with?",
                'bye': "Goodbye! 👋 Feel free to reach out if you have more questions. Have a great day!",
                'default': "Thanks for your message! I'm MIDMES AI assistant. I can help you with web design, SEO, branding, digital marketing, and more. What would you like to know?"
            },
            am: {
                'hello': "ሰላም! 👋 እኔ MIDMES AI ረዳት ነኝ። በድር ንድፍ፣ SEO፣ ብሬንዲንግ እና ዲጂታል ግብይት እንተገኝላለን። ዛሬ እንዴት ልርዳችሁ እችላለሁ?",
                'service': `🚀 **የኛ አገልግሎቶች:**

🌐 **ድር ጣቢያ ንድፍ እና ልማት**
- ብጁ ድር ጣቢያዎች
- የኢ-ንግድ መፍትሄዎች
- ለሁሉም መሳሪያ ተስማሚ ዲዛይን

🔍 **SEO ማመቻቸት**
- በጉግል ላይ የተሻለ ስፍራ
- አካባቢያዊ SEO
- ቴክኒካል SEO

📱 **ማህበራዊ ሚዲያ አስተዳደር**
- የይዘት ፍጠር
- ማህበረሰብ አስተዳደር
- የተከፈለ ማስታወቂያ

የትኛው አገልግሎት ያስተውሎታል?`,
                'contact': `📞 **MIDMES ያግኙ፡**

**ስልክ፡** +251 979 029 768
**ኢሜይል፡** contactmidmes@gmail.com
**አድራሻ፡** አዲስ አበባ፣ ኢትዮጵያ

**የስራ ሰዓት፡**
ሰኞ-አርብ፡ ከጠዋት 8፡30 - ከምሽቱ 5፡30
ቅዳሜ፡ ከጠዋት 9፡00 - ከምሽቱ 1፡00

ነፃ ውይይት ለማቅረብ ይፈልጋሉ?`,
                'default': "ለMIDMES ፍላጎት አመሰግናለሁ! በዲጂታል ግብይት ፍላጎትዎ ልርዳችሁ እፈልጋለሁ። ምን ማወቅ ትፈልጋለህ?"
            }
        };

        const langResponses = responses[language] || responses.en;
        const lowerMessage = message.toLowerCase();

        let response = langResponses.default;
        
        // Smart keyword matching
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('ሰላም')) {
            response = langResponses.hello;
        } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer') || lowerMessage.includes('አገልግሎት')) {
            response = langResponses.service;
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || lowerMessage.includes('ዋጋ')) {
            response = langResponses.price;
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('አንግል')) {
            response = langResponses.contact;
        } else if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('site') || lowerMessage.includes('ድር')) {
            response = langResponses.website;
        } else if (lowerMessage.includes('seo') || lowerMessage.includes('search') || lowerMessage.includes('google')) {
            response = langResponses.seo;
        } else if (lowerMessage.includes('social media') || lowerMessage.includes('facebook') || lowerMessage.includes('instagram')) {
            response = langResponses['social media'];
        } else if (lowerMessage.includes('brand') || lowerMessage.includes('logo') || lowerMessage.includes('identity') || lowerMessage.includes('ብሬንድ')) {
            response = langResponses.branding;
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            response = langResponses.thank;
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            response = langResponses.bye;
        }

        console.log('📤 Sending response:', response.substring(0, 50) + '...');

        res.json({
            success: true,
            response: response
        });

    } catch (error) {
        console.error('❌ Chat error:', error);
        res.json({
            success: true,
            response: "I'm here to help! Contact MIDMES directly: +251 979 029 768 or email: contactmidmes@gmail.com"
        });
    }
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Endpoint not found',
        available_endpoints: ['/', '/health', '/test', '/api/chat']
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES Chatbot successfully started on port ${PORT}`);
    console.log(`📍 Health: http://localhost:${PORT}/health`);
    console.log(`🧪 Test: http://localhost:${PORT}/test`);
    console.log(`🤖 Chat: http://localhost:${PORT}/api/chat`);
});
