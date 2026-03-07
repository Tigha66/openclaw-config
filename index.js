const WPP = require('@wppconnect-team/wppconnect');

const messageTemplate = (name, siteUrl) => `Hi ${name}!

I've built a FREE professional website for your business!

📺 VIEW SITE: ${siteUrl}

💰 PRICES: From £397 one-time or £39/month

🚀 What's included:
• Mobile-friendly design
• Online booking/contact forms  
• SEO optimization

Check out more: https://tigha66.github.io/openclaw-config/

Interested? Reply to this message!

Cheers,
Abdelhak
📧 tigha66@gmail.com
🌐 autoAIwebsolutions.com`;

// Map business to their specific site
const businesses = [
    {name:"Englands Plumber",phone:"447405881006",site:"https://tigha66.github.io/openclaw-config/new-sites/englands-plumber/"},
    {name:"Tubbs Plumbing",phone:"442086959165",site:"https://tigha66.github.io/openclaw-config/new-sites/tubbs-plumbing/"},
    {name:"Fast Plumber London",phone:"442078711956",site:"https://tigha66.github.io/openclaw-config/new-sites/fast-plumber-london/"},
    {name:"National Plumbers",phone:"447760244444",site:"https://tigha66.github.io/openclaw-config/new-sites/national-plumbers/"},
    {name:"MC Plumber",phone:"442079460194",site:"https://tigha66.github.io/openclaw-config/new-sites/mc-plumber/"},
    {name:"East London Plumbing",phone:"442039848457",site:"https://tigha66.github.io/openclaw-config/new-sites/east-london-plumbing/"},
    {name:"Bens Plumbing",phone:"442086946618",site:"https://tigha66.github.io/openclaw-config/new-sites/bens-plumbing/"},
    {name:"Plumbing Circle",phone:"447867850846",site:"https://tigha66.github.io/openclaw-config/new-sites/plumbing-circle/"},
];

(async () => {
    console.log('Starting WhatsApp...');
    const client = await WPP.create({session:'sender',multidevice:true});
    console.log('Scan QR with WhatsApp (Settings > Linked Devices)');
    console.log('');
    
    for (const b of businesses) {
        console.log(`Sending to ${b.name}...`);
        try {
            await client.sendText(b.phone + '@c.us', messageTemplate(b.name, b.site));
            console.log(`✅ Sent to ${b.name}`);
            console.log(`   Site: ${b.site}`);
        } catch (e) { 
            console.log(`❌ Failed ${b.name}: ${e.message}`); 
        }
        await new Promise(r => setTimeout(r, 5000));
    }
    console.log('\n✅ All done!');
})();
