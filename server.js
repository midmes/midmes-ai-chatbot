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
        message: 'MIDMES Digital Marketing Chatbot - Enhanced Mode',
        timestamp: new Date().toISOString()
    });
});

// Digital Marketing Chat Endpoint
app.post('/api/chat', (req, res) => {
    console.log('💼 Digital Marketing query:', req.body?.message);
    
    try {
        const { message, language = 'en' } = req.body;
        
        if (!message || message.trim() === '') {
            return res.json({
                success: false,
                response: "Please ask about our digital marketing services!"
            });
        }

        const response = getDigitalMarketingResponse(message, language);
        
        res.json({
            success: true,
            response: response
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.json({
            success: true,
            response: "I'm here to help with digital marketing! Contact us: +251 979 029 768 or email: contactmidmes@gmail.com"
        });
    }
});

// Enhanced Digital Marketing Responses
function getDigitalMarketingResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase().trim();
    
    if (language === 'am') {
        return getAmharicResponse(lowerMessage);
    }
    
    return getEnglishResponse(lowerMessage);
}

function getEnglishResponse(message) {
    // Digital Marketing Services Keywords
    const digitalMarketingKeywords = [
        'web', 'website', 'site', 'design', 'development', 'ecommerce',
        'seo', 'search', 'google', 'ranking', 'rank', 'organic',
        'social media', 'facebook', 'instagram', 'tiktok', 'twitter',
        'ad', 'ads', 'advertising', 'campaign', 'ppc', 'digital',
        'brand', 'branding', 'logo', 'identity', 'visual',
        'content', 'video', 'photo', 'marketing', 'strategy',
        'price', 'cost', 'how much', 'package', 'service'
    ];

    // Check if message is related to digital marketing
    const isDigitalMarketing = digitalMarketingKeywords.some(keyword => 
        message.includes(keyword)
    );

    // Web Design & Development
    if (message.includes('web') || message.includes('website') || message.includes('site') || message.includes('design')) {
        return `🌐 **Web Design & Development**

We create stunning, high-converting websites:

• **Custom Website Design** - Unique designs that reflect your brand
• **E-commerce Solutions** - Online stores with secure payments
• **Responsive Design** - Perfect on all devices
• **Fast Loading** - Optimized for speed and performance
• **SEO-Friendly** - Built to rank well on Google

*"Your website is your digital storefront - we make it impressive!"*

💬 **Ready to build your website? Contact: +251 979 029 768**`;
    }

    // SEO Services
    if (message.includes('seo') || message.includes('search') || message.includes('google') || message.includes('ranking')) {
        return `🔍 **SEO Services**

We help you rank higher on Google:

• **Technical SEO** - Website optimization
• **Content Strategy** - Keyword research and creation
• **Local SEO** - Dominate local search in Ethiopia
• **Link Building** - Authority-building strategies
• **Analytics** - Track rankings and growth

*"Get found by customers searching for your services!"*

📈 **Want better Google rankings? Contact: +251 979 029 768**`;
    }

    // Social Media
    if (message.includes('social') || message.includes('facebook') || message.includes('instagram') || message.includes('tiktok')) {
        return `📱 **Social Media Management**

We transform your social media:

• **Content Creation** - Engaging posts and reels
• **Strategy Development** - Platform-specific approaches
• **Community Management** - Respond to comments
• **Paid Social Ads** - Targeted advertising
• **Performance Tracking** - Measure engagement

*"Turn followers into customers!"*

👍 **Boost your social presence? Contact: +251 979 029 768**`;
    }

    // Digital Advertising
    if (message.includes('ad') || message.includes('campaign') || message.includes('ppc') || message.includes('digital ad')) {
        return `📢 **Digital Advertising**

Drive immediate results:

• **Google Ads** - Top of search results
• **Social Media Ads** - Facebook, Instagram campaigns
• **Retargeting** - Bring back visitors
• **Conversion Tracking** - Measure ROI
• **Audience Targeting** - Reach ideal customers

*"Get instant visibility and leads!"*

🎯 **Want more customers? Contact: +251 979 029 768**`;
    }

    // Branding
    if (message.includes('brand') || message.includes('logo') || message.includes('identity')) {
        return `🎨 **Branding & Identity**

Create a memorable brand:

• **Logo Design** - Unique and meaningful
• **Brand Guidelines** - Consistent visual identity
• **Marketing Materials** - Business cards, brochures
• **Brand Strategy** - Positioning and messaging

*"Your brand is your promise!"*

✨ **Build your brand? Contact: +251 979 029 768**`;
    }

    // Contact/Price
    if (message.includes('contact') || message.includes('call') || message.includes('email') || message.includes('price') || message.includes('cost')) {
        return `📞 **Contact MIDMES Digital Marketing**

**Direct Contact:**
📍 **Phone:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com
🌍 **Location:** Addis Ababa, Ethiopia

**Our Services:**
• Website Design & Development
• SEO & Google Ranking
• Social Media Management
• Digital Advertising
• Branding & Identity

**Free Consultation Available!**

💼 **Ready to grow online? Call us today!**`;
    }

    // Not digital marketing related
    if (!isDigitalMarketing) {
        return `🤖 **MIDMES Digital Marketing Assistant**

I specialize in digital marketing services:

🌐 **Web Design & Development**
🔍 **SEO & Search Ranking**
📱 **Social Media Management**
📢 **Digital Advertising**
🎨 **Branding & Identity**

Please ask me about these services, or contact us directly for other inquiries:

📞 **Phone:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com

How can I help with your digital marketing needs today?`;
    }

    // Default response
    return `🚀 **MIDMES Digital Marketing**

Thanks for your interest! I specialize in:

• **Website Design** - Beautiful, functional websites
• **SEO** - Higher Google rankings
• **Social Media** - Engaging content and growth
• **Digital Ads** - Targeted advertising campaigns
• **Branding** - Memorable visual identity

📞 **Get Started:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com

What specific service would you like to know more about?`;
}

function getAmharicResponse(message) {
    if (message.includes('ድር') || message.includes('website')) {
        return `🌐 **ድር ጣቢያ ንድፍ እና ልማት**

ከፍተኛ ውጤት የሚሰጡ ድር ጣቢያዎችን እንገነባለን፡

• **ብጁ ዲዛይን** - ንግድዎን የሚያንፀባርቅ
• **ኢ-ንግድ መፍትሄ** - ደህንነቱ የተጠበቀ መደብር
• **ለሁሉም መሳሪያ ተስማሚ** - በሞባይል፣ ታብሌት እና ኮምፒውተር
• **ፈጣን መጫን** - ለፍጥነት የተመቻቸ

*"ድር ጣቢያዎ የዲጂታል መደብርዎ ነው!"*

💬 **ድር ጣቢያ ለመገንባት፡ +251 979 029 768**`;
    }

    if (message.includes('ሰላም') || message.includes('hello')) {
        return `👋 **ሰላም! እኔ MIDMES ዲጂታል ግብይት ረዳት ነኝ።**

በዚህ ላይ ልርዳችሁ እችላለሁ፡
🌐 **ድር ጣቢያ ንድፍ**
🔍 **SEO እና በጉግል ላይ መድረስ**
📱 **ማህበራዊ ሚዲያ አስተዳደር**
📢 **ዲጂታል ማስታወቂያ**
🎨 **ብሬንዲንግ እና ምስል**

ለዲጂታል ግብይት አገልግሎቶቻችን ይጠይቁኝ።

📞 **አግኙን፡** +251 979 029 768`;
    }

    return `🤖 **MIDMES ዲጂታል ግብይት ረዳት**

እኔ ለዲጂታል ግብይት አገልግሎቶች ብቻ እረዳለሁ፡

🌐 **ድር ጣቢያ ንድፍ**
🔍 **SEO እና በጉግል ላይ መድረስ**
📱 **ማህበራዊ ሚዲያ**
📢 **ዲጂታል ማስታወቂያ**
🎨 **ብሬንዲንግ**

ለሌሎች ጥያቄዎች በቀጥታ ያግኙን፡

📞 **ስልክ፡** +251 979 029 768
📧 **ኢሜይል፡** contactmidmes@gmail.com

በዲጂታል ግብይት አገልግሎቶቻችን ላይ ልርዳችሁ እችላለሁ!`;
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES Digital Marketing Chatbot running on port ${PORT}`);
    console.log(`🎯 Focus: Web Design, SEO, Social Media, Digital Ads, Branding`);
});
