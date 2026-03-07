const WPP = require('@wppconnect-team/wppconnect');

const messageTemplate = (name, siteUrl) => `Hi ${name}!

I've built a professional website for your business!

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

// All businesses with sites
const businesses = [
    // Existing plumbers
    {name:"Englands Plumber",phone:"447405881006",site:"https://tigha66.github.io/openclaw-config/new-sites/englands-plumber/"},
    {name:"Tubbs Plumbing",phone:"442086959165",site:"https://tigha66.github.io/openclaw-config/new-sites/tubbs-plumbing/"},
    {name:"Fast Plumber London",phone:"442078711956",site:"https://tigha66.github.io/openclaw-config/new-sites/fast-plumber-london/"},
    {name:"National Plumbers",phone:"447760244444",site:"https://tigha66.github.io/openclaw-config/new-sites/national-plumbers/"},
    {name:"MC Plumber",phone:"442079460194",site:"https://tigha66.github.io/openclaw-config/new-sites/mc-plumber/"},
    {name:"East London Plumbing",phone:"442039848457",site:"https://tigha66.github.io/openclaw-config/new-sites/east-london-plumbing/"},
    {name:"Bens Plumbing",phone:"442086946618",site:"https://tigha66.github.io/openclaw-config/new-sites/bens-plumbing/"},
    {name:"Plumbing Circle",phone:"447867850846",site:"https://tigha66.github.io/openclaw-config/new-sites/plumbing-circle/"},
    // User list plumbers
    {name:"Dulwich Plumber",phone:"447521853507",site:"https://tigha66.github.io/openclaw-config/new-sites/dulwich-plumber/"},
    {name:"Ponty Plumbing",phone:"447714003900",site:"https://tigha66.github.io/openclaw-config/new-sites/ponty-plumbing/"},
    {name:"London Local Plumber",phone:"447736710750",site:"https://tigha66.github.io/openclaw-config/new-sites/london-local-plumber/"},
    {name:"Arcas Plumbing",phone:"447723651551",site:"https://tigha66.github.io/openclaw-config/new-sites/arcas-plumbing/"},
    {name:"London Plumbing Hobs",phone:"447506605605",site:"https://tigha66.github.io/openclaw-config/new-sites/london-plumbing-hobs/"},
    {name:"My Local Plumber",phone:"447950478383",site:"https://tigha66.github.io/openclaw-config/new-sites/my-local-plumber/"},
    {name:"AP UK Plumbing",phone:"447849424718",site:"https://tigha66.github.io/openclaw-config/new-sites/ap-uk-plumbing/"},
    {name:"Near Me Plumbers",phone:"447521305976",site:"https://tigha66.github.io/openclaw-config/new-sites/near-me-plumbers/"},
    // NEW - C.LANE Salon
    {name:"C.LANE Coffee & Hair",phone:"442074875767",site:"https://tigha66.github.io/openclaw-config/new-sites/clane-salon/"},
    // NEW - Hair UK
    {name:"Hair UK",phone:"442077032323",site:"https://tigha66.github.io/openclaw-config/new-sites/hair-uk/"},
    // NEW - Other businesses
    {name:"Shed Removal London",phone:"",site:"https://tigha66.github.io/openclaw-config/new-sites/shed-removal/"},
    {name:"Business Waste Guru",phone:"",site:"https://tigha66.github.io/openclaw-config/new-sites/business-waste-guru/"},
    {name:"Kwiksweep",phone:"",site:"https://tigha66.github.io/openclaw-config/new-sites/kwiksweep/"},
    {name:"Talbot Designs",phone:"",site:"https://tigha66.github.io/openclaw-config/new-sites/talbot-designs/"},
    {name:"Retouche Studio",phone:"",site:"https://tigha66.github.io/openclaw-config/new-sites/retouche-studio/"},
];

(async () => {
    console.log('Starting WhatsApp...');
    const client = await WPP.create({session:'sender',multidevice:true});
    console.log('Scan QR with WhatsApp (Settings > Linked Devices)');
    console.log('');
    
    for (const b of businesses) {
        if (!b.phone) {
            console.log(`⏭️  Skipping ${b.name} (no phone)`);
            continue;
        }
        console.log(`Sending to ${b.name}...`);
        try {
            await client.sendText(b.phone + '@c.us', messageTemplate(b.name, b.site));
            console.log(`✅ Sent to ${b.name}`);
        } catch (e) { 
            console.log(`❌ Failed ${b.name}: ${e.message}`); 
        }
        await new Promise(r => setTimeout(r, 5000));
    }
    console.log('\n✅ All done!');
})();
