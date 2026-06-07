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
        message: 'MIDMES Digital Marketing Chatbot - AI Powered',
        timestamp: new Date().toISOString(),
        version: '3.0'
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
                response: "Hi! I'm MIDMES AI. Ask me about web design, SEO, social media marketing, digital ads, or branding!"
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
            response: "🚀 I'm here to help with digital marketing! Contact us directly: +251 979 029 768"
        });
    }
});

// ========== MODERN DIGITAL MARKETING RESPONSES ==========
function getDigitalMarketingResponse(message, language = 'en') {
    const lowerMessage = message.toLowerCase().trim();
    
    if (language === 'am') {
        return getAmharicDigitalResponse(lowerMessage);
    }
    
    return getEnglishDigitalResponse(lowerMessage);
}

// ========== ENGLISH RESPONSES (NO PRICING) ==========
function getEnglishDigitalResponse(message) {
    
    // ===== GREETINGS =====
    if (message.match(/^(hi|hello|hey|good morning|good afternoon|greetings|sup|hola)$/)) {
        return `👋 **Hello! I'm MIDMES AI Assistant**

Welcome to MIDMES Digital Marketing! I'm here to help you with:

🌐 **Web Design & Development** - Beautiful, high-converting websites
🔍 **SEO & Google Ranking** - Get to page one and stay there
📱 **Social Media Management** - Grow your brand on Facebook, Instagram, TikTok
📢 **Digital Advertising** - Targeted ads that bring real customers
🎨 **Branding & Identity** - Make your brand unforgettable

What would you like to know about our services?`;
    }

    // ===== WEB DESIGN & DEVELOPMENT =====
    if (message.includes('web') || message.includes('website') || message.includes('site') || 
        message.includes('design') || message.includes('development') || message.includes('landing page')) {
        return `🌐 **Web Design & Development Services**

We build websites that don't just look good — they convert visitors into customers.

**What We Offer:**
• **Custom Website Design** - Unique designs that capture your brand essence
• **E-commerce Development** - Online stores with smooth checkout experiences
• **Responsive Design** - Perfect on desktop, tablet, and mobile devices
• **Speed Optimization** - Fast-loading pages that Google loves
• **SEO-Ready Architecture** - Built to rank right from the start
• **CMS Integration** - Easy-to-manage WordPress or custom solutions

**Our Process:**
1. **Discovery & Planning** - Understanding your goals and audience
2. **Design & Prototyping** - Creating visual concepts for your approval
3. **Development & Testing** - Building and refining every detail
4. **Launch & Training** - Going live with confidence
5. **Ongoing Support** - Keeping your site optimized and secure

**Why Choose MIDMES:**
✅ Mobile-first, responsive designs
✅ Fast loading speeds (under 2 seconds)
✅ SEO-optimized from day one
✅ Easy content management system
✅ Dedicated support team

**What Our Clients Say:**
*"MIDMES created a website that truly represents our brand. The team was professional and delivered on time!"*

💬 **Ready to start your website journey?** Contact us for a free consultation: +251 979 029 768`;
    }

    // ===== SEO SERVICES =====
    if (message.includes('seo') || message.includes('search engine') || message.includes('google') || 
        message.includes('ranking') || message.includes('rank') || message.includes('organic traffic')) {
        return `🔍 **SEO (Search Engine Optimization) Services**

Get found by customers actively searching for your products or services.

**Our SEO Solutions:**

**Local SEO**
• Google Business Profile optimization
• Local directory listings and citations
• Review generation and management
• Local keyword targeting for Ethiopian market

**Standard SEO**
• On-page optimization (meta tags, headings, content)
• Comprehensive keyword research & strategy
• Quality content creation and optimization
• Ethical link building from reputable sources
• Monthly performance reports

**Enterprise SEO**
• Technical SEO audit and fixes
• Competitor analysis and gap identification
• Advanced link building strategies
• AI-powered content strategy
• Weekly strategy consultations

**Why Choose Our SEO:**
✅ White-hat techniques only (no risk of penalties)
✅ Transparent monthly reporting
✅ Focus on conversions, not just traffic
✅ Ethiopian market expertise
✅ Guaranteed improvement commitment

**Expected Results Timeline:**
• Months 1-3: Foundation building and initial improvements
• Months 3-6: First page rankings for local keywords
• Months 6-12: Significant traffic growth (100-300% increase)
• 12+ months: Dominant market position

📈 **Ready to dominate Google search?** Contact us: +251 979 029 768`;
    }

    // ===== SOCIAL MEDIA MANAGEMENT =====
    if (message.includes('social media') || message.includes('facebook') || message.includes('instagram') || 
        message.includes('tiktok') || message.includes('linkedin') || message.includes('twitter') ||
        message.includes('content') || message.includes('post')) {
        return `📱 **Social Media Management Services**

Turn followers into loyal customers with strategic social media marketing.

**Platforms We Manage:**
• **Facebook** - Community building and engagement
• **Instagram** - Visual storytelling, reels, and stories
• **TikTok** - Viral short-form content for younger audiences
• **LinkedIn** - B2B lead generation and professional networking
• **Twitter/X** - Real-time engagement and brand voice

**Our Social Media Packages:**

**Basic Package**
• Regular posting schedule (3 platforms)
• High-quality graphics and captions
• Basic community engagement
• Monthly performance reporting

**Pro Package**
• Frequent posting (4 platforms)
• Story and reel creation
• Daily engagement with followers
• Ad campaign management support
• Weekly detailed reports

**Agency Package**
• Daily posting (all major platforms)
• Professional video editing
• 24/7 community management
• Full ad strategy and management
• Influencer outreach coordination
• Real-time analytics dashboard

**What You Get:**
🎨 Custom graphics and videos
📝 Engaging captions with strategic hashtags
💬 Prompt community response management
📊 Performance tracking and continuous optimization
🎯 Targeted growth strategies for your industry

**Sample Results from Our Clients:**
• 200-500% engagement increase within 3 months
• Thousands of new organic followers
• Direct sales conversions from social traffic
• Improved brand recognition and trust

📱 **Ready to grow your social presence?** Contact us: +251 979 029 768`;
    }

    // ===== DIGITAL ADVERTISING =====
    if (message.includes('ad') || message.includes('ads') || message.includes('advertising') || 
        message.includes('campaign') || message.includes('ppc') || message.includes('google ads') || 
        message.includes('facebook ads') || message.includes('budget') || message.includes('roi')) {
        return `📢 **Digital Advertising Services**

Get instant visibility and measurable results with targeted online advertising.

**Ad Platforms We Master:**

**Google Ads**
• **Search Ads** - Appear when people search for your products
• **Display Ads** - Reach across millions of websites
• **Shopping Ads** - Showcase products with images and prices
• **YouTube Ads** - Video pre-roll and in-stream advertising
• **Performance Max** - AI-powered cross-platform campaigns

**Social Media Ads**
• **Facebook & Instagram Ads** - Detailed targeting options
• **TikTok Ads** - Reach younger, engaged audiences
• **LinkedIn Ads** - Precise B2B targeting
• **Twitter/X Ads** - Real-time promotion and trend engagement

**Our Advertising Process:**
1. **Strategy Session** - Define goals and target audience
2. **Ad Creation** - Compelling creative and copywriting
3. **Campaign Setup** - Optimized bidding and targeting
4. **Launch** - Go live with professional execution
5. **Daily Monitoring** - Track performance metrics
6. **Continuous Optimization** - A/B testing and budget allocation
7. **Scaling** - Expand what's working best

**What Makes Our Ads Effective:**
✅ Audience targeting that reaches ideal customers
✅ Compelling ad creative that stops the scroll
✅ Landing pages designed for conversion
✅ Real-time performance tracking
✅ Data-driven optimization decisions

**Expected Outcomes:**
• Immediate increase in website traffic
• Quality leads and conversions
• Measurable return on ad spend
• Valuable audience insights for future campaigns

🎯 **Ready to get more customers through advertising?** Contact us: +251 979 029 768`;
    }

    // ===== BRANDING & IDENTITY =====
    if (message.includes('brand') || message.includes('branding') || message.includes('logo') || 
        message.includes('identity') || message.includes('visual') || message.includes('style guide')) {
        return `🎨 **Branding & Identity Services**

Create a memorable brand that stands out from competitors and resonates with your audience.

**Complete Branding Package Includes:**

**Logo Design**
• Primary logo (main brand mark)
• Secondary logo (alternative layouts)
• Icon version (for small spaces)
• All file formats (print, web, transparent)

**Color Palette**
• Primary colors (brand recognition)
• Secondary colors (flexibility)
• Accent colors (calls to action)
• Color usage guidelines

**Typography**
• Brand fonts (primary and secondary)
• Font usage rules (headings, body text)
• Web-safe alternatives

**Brand Guidelines Document**
• 20+ page comprehensive PDF
• Logo usage rules and examples
• Color specifications and codes
• Typography system
• Brand voice and messaging
• Application examples

**Additional Assets**
• Business card design
• Letterhead and envelopes
• Email signature template
• Social media kit (profile images, covers, templates)
• Brand patterns and textures

**Why Professional Branding Matters:**
✅ Consistent branding = 3x more brand recognition
✅ Professional appearance = higher perceived value
✅ Clear guidelines = easier marketing execution
✅ Memorable identity = customer loyalty and trust

**Our Branding Process:**
1. **Discovery** - Learn about your business, audience, and goals
2. **Research** - Analyze competitors and market trends
3. **Mood Board** - Share visual direction concepts
4. **Logo Concepts** - Present multiple initial options
5. **Refinement** - Revise based on your feedback
6. **Delivery** - Provide all final files and brand guide

✨ **Ready to build a brand people remember and trust?** Contact us: +251 979 029 768`;
    }

    // ===== FAQ / GENERAL QUESTIONS =====
    if (message.includes('faq') || message.includes('question') || message.includes('how long') || 
        message.includes('timeline') || message.includes('process') || message.includes('work')) {
        return `❓ **Frequently Asked Questions**

**Q: How long does a website take to build?**
A: Basic websites typically take 2-4 weeks. E-commerce sites take 4-8 weeks. Complex custom projects take 8-12 weeks. We'll provide a specific timeline during consultation.

**Q: When will I see SEO results?**
A: You'll see initial improvements in 1-3 months. Significant ranking gains typically appear in 3-6 months. SEO is a long-term investment that continues to grow.

**Q: Do you offer ongoing support after project completion?**
A: Yes! We offer ongoing support and maintenance packages to keep your website secure, updated, and performing optimally.

**Q: What industries do you work with?**
A: All industries! We have experience with retail, hospitality, healthcare, technology, education, real estate, non-profits, and more.

**Q: Where is MIDMES located?**
A: Our main office is in Addis Ababa, Ethiopia. We serve clients locally and globally.

**Q: Do you offer payment plans?**
A: Yes, we offer flexible payment options for larger projects. Contact us to discuss.

**Q: Can I see examples of your work?**
A: Absolutely! Contact us to request our portfolio and case studies.

**Q: Do you offer free consultations?**
A: Yes! We offer a free 30-minute strategy session to discuss your goals and how we can help.

**Got more questions?** Chat with us directly or contact us at +251 979 029 768`;
    }

    // ===== CONTACT INFORMATION =====
    if (message.includes('contact') || message.includes('call') || message.includes('email') || 
        message.includes('reach') || message.includes('location') || message.includes('office')) {
        return `📞 **Contact MIDMES Digital Marketing**

**Direct Contact:**
📱 **Phone / WhatsApp:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com
📍 **Location:** Addis Ababa, Ethiopia

**Business Hours:**
Monday - Friday: 9:00 AM - 6:00 PM
Saturday: 10:00 AM - 2:00 PM
Sunday: Closed (emergency support available)

**Follow Us on Social Media:**
📘 Facebook: @midmes
📸 Instagram: @midmes9
📱 TikTok: @midmes
💬 Telegram: @midmes

**Free Consultation:**
We offer a free 30-minute strategy session to discuss your business goals and how digital marketing can help you achieve them.

📅 **Book your consultation today!** Call or email us.

*"Your digital success starts with a conversation"*

We look forward to hearing from you!`;
    }

    // ===== THANK YOU / CLOSING =====
    if (message.includes('thank') || message.includes('thanks') || message.includes('goodbye') || 
        message.includes('bye') || message.includes('appreciate')) {
        return `🙏 **Thank you for reaching out to MIDMES!**

I'm glad I could help answer your digital marketing questions.

**Next Steps:**
• **Ready to work with us?** Contact us at +251 979 029 768
• **Need more information?** Just ask me anything else
• **Want to see our work?** Request our portfolio

**Stay Connected:**
Follow us on social media for digital marketing tips, industry news, and special offers!

📘 Facebook | 📸 Instagram | 📱 TikTok | 💬 Telegram

**Remember:** Your success is our mission. We're here to help your business grow online.

Have a great day! 🚀

*"Let's build something great together"*`;
    }

    // ===== HELP / SUPPORT =====
    if (message.includes('help') || message.includes('support') || message.includes('what can you do') || 
        message.includes('capabilities')) {
        return `🆘 **How Can I Help You Today?**

I'm your MIDMES AI Assistant, specialized in digital marketing. Ask me about:

**🌐 Web Design & Development**
- Custom websites, e-commerce stores, landing pages
- Timeline, features, and our design process

**🔍 SEO (Search Engine Optimization)**
- Google rankings, keyword strategy, local SEO
- How we get results and expected timeline

**📱 Social Media Management**
- Content creation, posting schedules, engagement strategies
- Platform-specific approaches for Facebook, Instagram, TikTok

**📢 Digital Advertising**
- Google Ads, Facebook/TikTok ads, retargeting campaigns
- How we target the right audience for maximum results

**🎨 Branding & Identity**
- Logo design, brand guidelines, visual identity
- Complete branding process and deliverables

**📞 Contact & Support**
- Phone, email, location, business hours
- How to schedule a free consultation

**❓ FAQ & Process**
- How long things take, what to expect, our approach

**Just type your question naturally!** For example:
- "Tell me about your web design services"
- "How does SEO work?"
- "What social media platforms do you manage?"
- "How can I contact MIDMES?"

What would you like to know about our digital marketing services?`;
    }

    // ===== DEFAULT RESPONSE (NOT RECOGNIZED) =====
    return `🤖 **I specialize in digital marketing!**

I can help you with:

🌐 **Web Design & Development** - Custom websites, e-commerce, landing pages
🔍 **SEO & Google Ranking** - Get to page one, more organic traffic
📱 **Social Media Management** - Facebook, Instagram, TikTok, LinkedIn
📢 **Digital Advertising** - Google Ads, social ads, retargeting
🎨 **Branding & Identity** - Logos, brand guidelines, visual identity
❓ **FAQ & Process** - Timeline, approach, what to expect
📞 **Contact Information** - Phone, email, location, hours

**Just type your question naturally!** Examples:
• "Tell me about your web design services"
• "How does SEO work?"
• "What social media services do you offer?"
• "How can I contact MIDMES?"

**Or contact us directly:**
📞 **Phone:** +251 979 029 768
📧 **Email:** contactmidmes@gmail.com

How can I help with your digital marketing needs today?`;
}

// ========== AMHARIC RESPONSES (NO PRICING) ==========
function getAmharicDigitalResponse(message) {
    
    if (message.includes('ሰላም') || message.includes('hello') || message.includes('hi')) {
        return `👋 **ሰላም! እኔ MIDMES ዲጂታል ግብይት ረዳት ነኝ።**

ንግድዎን ለማሳደግ በእነዚህ አገልግሎቶች እረዳለሁ፡

🌐 **ድር ጣቢያ ንድፍ እና ልማት** - ሙያዊ፣ ውጤታማ ድር ጣቢያዎች
🔍 **SEO እና በጉግል ላይ መድረስ** - በፍለጋ ውጤቶች ላይ ቀዳሚ ይሁኑ
📱 **ማህበራዊ ሚዲያ አስተዳደር** - ፌስቡክ፣ ኢንስታግራም፣ ቲክቶክ
📢 **ዲጂታል ማስታወቂያ** - ዒላማ ያደረጉ ማስታወቂያዎች
🎨 **ብሬንዲንግ እና ምስል** - ማርካት የማይቻል የንግድ ምስል

ስለእነዚህ አገልግሎቶች ማንኛውም ጥያቄ ካለዎት ልጠይቁኝ ደስ ይለኛል!

📞 **አግኙን፡** +251 979 029 768`;
    }

    if (message.includes('ድር') || message.includes('website') || message.includes('web') || message.includes('ዲዛይን')) {
        return `🌐 **ድር ጣቢያ ንድፍ እና ልማት**

ንግድዎን የሚያሳድጉ ሙያዊ ድር ጣቢያዎችን እንገነባለን፡

**አገልግሎቶቻችን፡**
• **ብጁ ድር ጣቢያ** - ለንግድዎ ብቻ የሚሆን ዲዛይን
• **ኢ-ንግድ መደብር** - በመስመር ላይ ምርቶችዎን ይሸጡ
• **ለሞባይል ተስማሚ** - በሁሉም መሳሪያዎች የሚሰራ
• **ፈጣን መጫኛ ጊዜ** - ደንበኞችዎ አይበሳጩም
• **ለGoogle ተመቻችቷል** - በፍለጋ ውጤቶች ላይ ይታያል

**ለምን MIDMES ን መምረጥ አለብዎት:**
✅ ለሞባይል የተመቻቹ ዲዛይኖች
✅ ፈጣን የመጫኛ ጊዜ
✅ ከቀን አንድ ለSEO ተመቻችቷል
✅ ለደንበኞች ምቹ የአስተዳደር ስርዓት
✅ የማያቋርጥ የድጋፍ ቡድን

**የደንበኞቻችን አስተያየት:**
*"MIDMES ንግዳችንን በሚወክል አስደናቂ ድር ጣቢያ አቀረበልን። ቡድናቸው ሙያዊ እና በጊዜ ሰርቷል!"*

💬 **ድር ጣቢያ ለመጀመር ያግኙን፡** +251 979 029 768`;
    }

    if (message.includes('seo') || message.includes('google') || message.includes('ፍለጋ')) {
        return `🔍 **SEO (በጉግል ላይ መድረስ) አገልግሎት**

ንግድዎ በጉግል የፍለጋ ውጤቶች ላይ ከፍተኛ ደረጃ ላይ እንዲገኝ እናደርጋለን።

**የእኛ አገልግሎቶች፡**
• **በአካባቢ ፍለጋ (Local SEO)** - በኢትዮጵያ ውስጥ ይታወቁ
• **ቁልፍ ቃላት ምርምር** - ደንበኞችዎ የሚፈልጓቸውን ቃላት ያነጣጥሩ
• **የይዘት አፃፃፍ** - ለጉግል ተስማሚ ይዘቶች
• **ወርሃዊ ሪፖርት** - እድገትዎን ይከታተሉ

**ለምን MIDMES SEO ን መምረጥ አለብዎት:**
✅ ደህንነታቸው የተጠበቁ ቴክኒኮች
✅ ግልጽ የሆነ ወርሃዊ ሪፖርት
✅ ከጉብኝት ይልቅ ሽያጭ ላይ ትኩረት
✅ የኢትዮጵያ ገበያ እውቀት

**የሚጠበቁ ውጤቶች:**
• ከ3-6 ወራት: ለአካባቢ ቁልፍ ቃላት የመጀመሪያ ገፅ
• ከ6-12 ወራት: ከፍተኛ የጉብኝት እድገት
• ከ12+ ወራት: የገበያ በላይነት

📈 **በጉግል ላይ ለመታወቅ ያግኙን፡** +251 979 029 768`;
    }

    if (message.includes('አግኙን') || message.includes('contact') || message.includes('ስልክ')) {
        return `📞 **አግኙን**

📱 **ስልክ / ዋትሳፕ:** +251 979 029 768
📧 **ኢሜይል:** contactmidmes@gmail.com
📍 **አድራሻ:** አዲስ አበባ፣ ኢትዮጵያ

**የስራ ሰአታት:**
ከሰኞ - አርብ: 9:00 - 6:00
ቅዳሜ: 10:00 - 2:00
እሁድ: ዝግ ነው (አስቸኳይ ድጋፍ ይገኛል)

**ማህበራዊ ሚዲያ:**
📘 ፌስቡክ: @midmes
📸 ኢንስታግራም: @midmes9
📱 ቲክቶክ: @midmes
💬 ተሌግራም: @midmes

**ነጻ ምክክር:**
የንግድዎን ግቦች ለመወያየት ነጻ የ30 ደቂቃ ስትራቴጂ ክፍለ ጊዜ እናቀርባለን።

📅 **ዛሬ ቀጠሮ ይያዙ!** በስልክ ወይም በኢሜይል ያግኙን።

*"የእርስዎ ስኬት የኛ ተልዕኮ ነው"*`;
    }

    // Default Amharic response
    return `🤖 **MIDMES ዲጂታል ግብይት ረዳት**

ስለእነዚህ አገልግሎቶቻችን መጠየቅ ይችላሉ:

🌐 **ድር ጣቢያ ንድፍ** - ሙያዊ ድር ጣቢያዎች
🔍 **SEO** - በጉግል ከፍተኛ ደረጃ ላይ መድረስ
📱 **ማህበራዊ ሚዲያ** - ፌስቡክ፣ ኢንስታግራም፣ ቲክቶክ
📢 **ዲጂታል ማስታወቂያ** - ዒላማ ያደረጉ ማስታወቂያዎች
🎨 **ብሬንዲንግ** - ማርካት የማይቻል የንግድ ምስል

**ለምን MIDMES ን መምረጥ አለብዎት:**
✅ ከ10 ዓመት በላይ ልምድ
✅ ከ100 በላይ ደስተኛ ደንበኞች
✅ የተረጋገጡ ውጤቶች
✅ ቀጣይነት ያለው ድጋፍ

**ጥያቄ ካለዎት ልጠይቁኝ ደስ ይለኛል!**

📞 **ስልክ:** +251 979 029 768
📧 **ኢሜይል:** contactmidmes@gmail.com

*"ንግድዎን ወደ ቀጣይ ደረጃ ለማሳደግ ዝግጁ ነን!"*`;
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ MIDMES Digital Marketing Chatbot running on port ${PORT}`);
    console.log(`🎯 Focus: Web Design, SEO, Social Media, Digital Ads, Branding`);
    console.log(`🌍 Languages: English & Amharic`);
    console.log(`💬 No pricing information - Focus on services and value`);
});
