/**
 * WhatsApp Cloud API Sender
 * Meta WhatsApp Cloud API - Free tier: 1,000 conversations/month
 * 
 * Setup:
 * 1. Go to https://developers.facebook.com/
 * 2. Create app -> WhatsApp product
 * 3. Get PHONE_NUMBER_ID and ACCESS_TOKEN
 * 4. Add credentials below
 */

const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID'; // From Meta developers dashboard
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // From Meta developers dashboard
const RECIPIENT_PHONE = '447700000000'; // Format: 44...

const message = `Hi!

I've built a FREE professional website for your business!

📺 VIEW SAMPLE: https://tigha66.github.io/openclaw-config/

💰 PRICES: From £397 one-time or £39/month

🚀 What's included:
• Mobile-friendly design
• Online booking/contact forms  
• Google Maps listing
• SEO optimization
• Your domain email

Check out more: https://tigha66.github.io/openclaw-config/

Interested? Reply to this message!

Cheers,
Abdelhak
📧 tigha66@gmail.com
🌐 autoAIwebsolutions.com`;

async function sendWhatsApp(recipientPhone, messageText) {
    // Format: remove non-digits, ensure 44 prefix
    let phone = recipientPhone.replace(/[^0-9]/g, '');
    if (!phone.startsWith('44')) phone = '44' + phone;
    
    const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;
    
    const body = {
        messaging_product: 'whatsapp',
        to: phone,
        type: 'text',
        text: { body: messageText }
    };
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            console.log(`✅ Sent to ${phone}:`, data.messages?.[0]?.id);
            return { success: true, messageId: data.messages?.[0]?.id };
        } else {
            console.log(`❌ Failed for ${phone}:`, data);
            return { success: false, error: data };
        }
    } catch (error) {
        console.log(`❌ Error for ${phone}:`, error.message);
        return { success: false, error: error.message };
    }
}

// Batch send to multiple numbers
async function sendBatch(phoneNumbers) {
    console.log(`📤 Starting batch send to ${phoneNumbers.length} numbers...\n`);
    
    let success = 0;
    let failed = 0;
    
    for (const phone of phoneNumbers) {
        const result = await sendWhatsApp(phone, message);
        if (result.success) success++;
        else failed++;
        
        // Rate limit: wait 1 second between messages
        await new Promise(r => setTimeout(r, 1000));
    }
    
    console.log(`\n📊 Done! Success: ${success}, Failed: ${failed}`);
    return { success, failed };
}

// Example usage
// sendBatch(['447700000001', '447700000002', '447700000003']);

module.exports = { sendWhatsApp, sendBatch, message };
