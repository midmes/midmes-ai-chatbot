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
        message: 'MIDMES Digital Marketing Chatbot',
        timestamp: new Date().toISOString()
    });
});

// Digital Marketing Chat Endpoint
app.post('/api/chat', (req, res) => {
    console.log('📱 Digital Marketing query:', req.body?.message);
    
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
            response: "I specialize in digital marketing services. Contact us: +251 979 029 768"
        });
    }
});

// DIGITAL MARKETING FOCUSED RESPONSES
function getDigitalMarketingResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase().trim();
    
    if (language === 'am') {
        return getAmharicDigitalResponse(lowerMessage);
    }
    
    return getEnglishDigitalResponse(lowerMessage);
}

function getEnglishDigitalResponse(message) {
    // ===== DIGITAL MARKETING KEYWORDS =====
    const digitalMarketingKeywords = [
        // Web Design & Development
        'web', 'website', 'site', 'design', 'development', 'ecommerce', 'e-commerce',
        'responsive', 'mobile', 'page', 'landing page', 'portfolio website',
        
        // SEO
        'seo', 'search engine', 'google', 'ranking', 'rank', 'organic', 'traffic',
        'keyword', 'optimization', 'backlink', 'technical seo', 'local seo',
        
        // Social Media
        'social media', 'facebook', 'instagram', 'tiktok', 'twitter', 'linkedin',
        'post', 'content', 'reels', 'story', 'follower', 'engagement',
        
        // Digital Advertising
        'ad', 'ads', 'advertising', 'campaign', 'ppc', 'google ads', 'facebook ads',
        'instagram ads', 'budget', 'conversion', 'lead', 'targeting',
        
        // Branding
        'brand', 'branding', 'logo', 'identity', 'visual', 'graphic', 'design',
        'color', 'typography', 'style guide',
        
        // Analytics
        'analytics', 'report', 'data', 'metric', 'performance', 'roi', 'conversion',
        
        // General Digital Marketing
        'digital', 'online', 'internet', 'marketing', 'strategy', 'campaign',
        'content', 'video', 'photo', 'email', 'newsletter'
    ];

    // ===== CHECK IF DIGITAL MARKETING RELATED =====
    const isDigitalMarketing = digitalMarketingKeywords.some(keyword => 
        message.includes(keyword)
    );

    // ===== SERVICE-SPECIFIC RESPONSES =====
    
    // Web Design
    if (message.includes('web') || message.includes('website') || message.includes('site') || message.includes('design')) {
        return `🌐 **Web Design & Development**

We create stunning, high-converting websites that work perfectly on all devices:

• **Custom Website Design** - Unique designs that reflect your brand
• **E-commerce Solutions** - Online stores with secure payment processing
• **Responsive Design** - Perfect on desktop, tablet, and mobile
• **Fast Loading** - Optimized for speed and performance
• **SEO-Friendly** - Built to rank well on Google

*"Your website is your digital storefront - we make it impressive!"*

💬 **Ready to build your website?** Contact: +251 979 029 768`;
    }

    // SEO
    if (message.includes('seo') || message.includes('search') || message.includes('google') || message.includes('ranking')) {
        return `🔍 **SEO Services**

We help you rank higher on Google and drive organic traffic:

• **Technical SEO** - Website structure and performance optimization
• **Content Strategy** - Keyword research and content creation
• **Local SEO** - Dominate local search results in Ethiopia
• **Link Building** - Authority-building backlink strategies
• **Analytics** - Track rankings and traffic growth

*"Get found by customers who are searching for your services!"*

📈 **Want better Google rankings?** Contact: +251 979 029 768`;
    }

    // Social Media
    if (message.includes('social') || message.includes('facebook') || message.includes('instagram') || message.includes('tiktok')) {
        return `📱 **Social Media Management**

We transform your social media into a powerful marketing channel:

• **Content Creation** - Engaging posts, reels, and stories
• **Strategy Development** - Platform-specific approaches
• **Community Management** - Respond to comments and messages
• **Paid Social Ads** - Targeted advertising campaigns
• **Performance Tracking** - Measure engagement and growth

*"Turn followers into customers with strategic social media!"*

👍 **Boost your social presence?** Contact: +251 979 029 768`;
    }

    // Digital Advertising
    if (message.includes('ad') || message.includes('campaign') || message.includes('ppc') || message.includes('targeting')) {
        return `📢 **Digital Advertising**

Drive immediate results with targeted online advertising:

• **Google Ads** - Appear at the top of search results
• **Social Media Ads** - Facebook, Instagram, TikTok campaigns
• **Retargeting** - Bring back visitors who didn't convert
• **Conversion Tracking** - Measure ROI and optimize performance
• **Audience Targeting** - Reach your ideal customers

*"Get instant visibility and leads with strategic advertising!"*

🎯 **Want more customers now?** Contact: +251 979 029 768`;
    }

    // Branding
    if (message.includes('brand') || message.includes('logo') || message.includes('identity')) {
        return `🎨 **Branding & Identity**

Create a memorable brand that stands out:

• **Logo Design** - Unique and meaningful logos
• **Brand Guidelines** - Consistent visual identity
• **Marketing Materials** - Business cards, brochures, banners
• **Brand Strategy** - Positioning and messaging
• **Visual Identity** - Colors, fonts, and imagery

*"Your brand is your promise - we help you keep it consistently!"*

✨ **Ready to build your brand?** Contact: +251 979 029 768`;
    }

    // Contact/General
    if (message.includes('contact') || message.includes('call') || message.includes('email') || message.includes('price') || message.includes('cost')) {
        return `📞 **Contact MIDMES Digital Marketing**

Let's discuss your digital marketing needs:

**Direct Contact:**
📍 **Phone:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com
🌍 **Location:** Addis Ababa, Ethiopia

**Our Digital Marketing Services:**
• Website Design & Development
• SEO & Google Ranking
• Social Media Management
• Digital Advertising
• Branding & Identity

**Free Consultation:**
We'll analyze your needs and provide a customized plan and pricing.

💼 **Ready to grow online?** Call us today!`;
    }

    // ===== NOT DIGITAL MARKETING RELATED =====
    if (!isDigitalMarketing) {
        return `🤖 **MIDMES Digital Marketing Assistant**

I specialize in helping with digital marketing services:

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

    // Default digital marketing response
    return `🚀 **MIDMES Digital Marketing**

Thanks for your interest in our digital marketing services!

We specialize in:
• **Website Design** - Beautiful, functional websites
• **SEO** - Higher Google rankings
• **Social Media** - Engaging content and growth
• **Digital Ads** - Targeted advertising campaigns
• **Branding** - Memorable visual identity

📞 **Get Started:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com

What specific service would you like to know more about?`;
}

function getAmharicDigitalResponse(message) {
    // Amharic digital marketing responses
    if (message.includes('ድር') || message.includes('website') || message.includes('web')) {
        return `🌐 **ድር ጣቢያ ንድፍ እና ልማት**

ከፍተኛ ውጤት የሚሰጡ የድር ጣቢያዎችን እንገነባለን፡

• **ብጁ ዲዛይን** - ንግድዎን የሚያንፀባርቅ ዲዛይን
• **ኢ-ንግድ መፍትሄ** - ደህንነቱ የተጠበቀ የመስመር ላይ መደብር
• **ለሁሉም መሳሪያ ተስማሚ** - በሞባይል፣ ታብሌት እና ኮምፒውተር በትክክል የሚሰራ
• **ፈጣን መጫን** - ለፍጥነት የተመቻቸ

*"ድር ጣቢያዎ የዲጂታል መደብርዎ ነው - አስደናቂ እንዲሆን እናደርገዋለን!"*

💬 **ድር ጣቢያ ለመገንባት ይጠይቁን፡** +251 979 029 768`;
    }

    if (message.includes('ሰላም') || message.includes('hello') || message.includes('hi')) {
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

    if (message.includes('አገልግሎት') || message.includes('service')) {
        return `🚀 **የMIDMES ዲጂታል ግብይት አገልግሎቶች**

🌐 **ድር ጣቢያ ንድፍ እና ልማት**
🔍 **SEO ማመቻቸት**
📱 **ማህበራዊ ሚዲያ አስተዳደር**
📢 **ዲጂታል ማስታወቂያ**
🎨 **ብሬንዲንግ እና ምስል**

የትኛው አገልግሎት ያስተውሎታል?`;
    }

    // Not digital marketing related in Amharic
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
