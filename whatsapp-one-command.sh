#!/bin/bash
# WhatsApp Bulk Sender - One Command Setup & Run
# Run this on your LOCAL machine (not VPS)

echo "🚀 Installing WhatsApp Sender..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi

# Create folder
mkdir -p ~/whatsapp-sender
cd ~/whatsapp-sender

# Install WPPConnect
npm init -y > /dev/null 2>&1
npm install @wppconnect-team/wppconnect > /dev/null 2>&1

# Create sender script
cat > index.js << 'EOF'
const WPP = require('@wppconnect-team/wppconnect');

const messageTemplate = (name) => `Hi ${name}!

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

// Add your businesses HERE:
const businesses = [
    {name:"Englands Plumber",phone:"447405881006"},
    {name:"Tubbs Plumbing",phone:"442086959165"},
    {name:"Fast Plumber London",phone:"442078711956"},
    {name:"National Plumbers",phone:"447760244444"},
    {name:"MC Plumber",phone:"442079460194"},
    {name:"East London Plumbing",phone:"442039848457"},
    {name:"Bens Plumbing",phone:"442086946618"},
    {name:"Plumbing Circle",phone:"447867850846"},
];

(async () => {
    console.log('🚀 Starting WhatsApp...\n');
    
    const client = await WPP.create({
        session: 'sender',
        multidevice: true,
        qrTimeoutMs: 60000,
    });
    
    client.onStateChange(s => {
        if (s === 'CONNECTED') console.log('✅ Connected!\n');
    });
    
    console.log('📱 Scan QR with WhatsApp (Settings → Linked Devices)\n');
    
    await new Promise(r => setTimeout(r, 3000));
    
    console.log(`📤 Sending to ${businesses.length} businesses...\n`);
    
    for (const b of businesses) {
        try {
            let phone = b.phone.replace(/\D/g, '');
            if (!phone.startsWith('44')) phone = '44' + phone;
            await client.sendText(phone + '@c.us', messageTemplate(b.name));
            console.log(`✅ ${b.name}`);
        } catch (e) {
            console.log(`❌ ${b.name}: ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 5000)); // 5 sec delay
    }
    
    console.log('\n✨ Done!');
})();
EOF

echo "✅ Installed!"
echo ""
echo "📱 Now run:"
echo "   cd ~/whatsapp-sender"
echo "   node index.js"
echo ""
echo "Then scan QR code with WhatsApp..."
