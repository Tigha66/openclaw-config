/**
 * WPPConnect WhatsApp Sender
 * Free, open-source WhatsApp automation
 * 
 * How it works:
 * 1. Run the script
 * 2. Scan QR code with your WhatsApp
 * 3. Messages send automatically
 */

const WPP = require('@wppconnect-team/wppconnect');
const fs = require('fs');

// Message template
const messageTemplate = (businessName) => `Hi ${businessName}!

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

// Load business list
const businesses = [
    {name:"Englands Plumber",phone:"447405881006"},
    {name:"Tubbs Plumbing",phone:"442086959165"},
    {name:"Fast Plumber London",phone:"442078711956"},
    {name:"National Plumbers",phone:"447760244444"},
    {name:"MC Plumber",phone:"442079460194"},
    {name:"East London Plumbing",phone:"442039848457"},
    {name:"Bens Plumbing",phone:"442086946618"},
    {name:"Plumbing Circle",phone:"447867850846"},
    // Add more from your list...
];

let client;
let sessionReady = false;

// Start WhatsApp session
async function startSession() {
    console.log('🚀 Starting WPPConnect...\n');
    
    client = await WPP.create({
        session: 'whatsapp-sender',
        multidevice: true,
        qrTimeoutMs: 60000,
    });
    
    // Wait for login
    client.onStateChange((state) => {
        console.log('State:', state);
        if (state === 'CONNECTED') {
            sessionReady = true;
            console.log('✅ WhatsApp Connected!\n');
        }
    });
    
    // Wait until connected
    console.log('📱 Please scan QR code with WhatsApp...');
    console.log('   Open WhatsApp -> Settings -> Linked Devices\n');
    
    await new Promise(resolve => {
        const check = setInterval(() => {
            if (sessionReady) {
                clearInterval(check);
                resolve();
            }
        }, 1000);
    });
    
    return client;
}

// Send single message
async function sendMessage(phone, name) {
    if (!sessionReady) {
        console.log('❌ WhatsApp not connected yet');
        return false;
    }
    
    // Format phone
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (!formattedPhone.startsWith('44')) formattedPhone = '44' + formattedPhone;
    
    const message = messageTemplate(name);
    
    try {
        await client.sendText(formattedPhone + '@c.us', message);
        console.log(`✅ Sent to ${name} (${formattedPhone})`);
        return true;
    } catch (error) {
        console.log(`❌ Failed ${name}:`, error.message);
        return false;
    }
}

// Send to all businesses
async function sendBatch(delayMs = 5000) {
    console.log(`\n📤 Starting batch send to ${businesses.length} businesses...\n`);
    
    let success = 0;
    let failed = 0;
    
    for (const biz of businesses) {
        if (biz.phone) {
            const ok = await sendMessage(biz.phone, biz.name);
            if (ok) success++;
            else failed++;
            
            // Wait between messages (avoid rate limiting)
            await new Promise(r => setTimeout(r, delayMs));
        } else {
            console.log(`⏭️  Skipped ${biz.name} (no phone)`);
            failed++;
        }
    }
    
    console.log(`\n📊 BATCH COMPLETE`);
    console.log(`   Success: ${success}`);
    console.log(`   Failed: ${failed}`);
}

// Main
(async () => {
    await startSession();
    
    // Small delay before sending
    await new Promise(r => setTimeout(r, 2000));
    
    // Send batch (5 second delay between messages)
    await sendBatch(5000);
    
    console.log('\n✨ All done! You can close this (Ctrl+C)');
})();
