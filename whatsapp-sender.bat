@echo off
echo Installing WhatsApp Sender...

cd /d "%~dp0"

npm init -y >nul 2>&1
npm install @wppconnect-team/wppconnect --loglevel=error >nul 2>&1

echo Creating script...
echo const WPP = require('@wppconnect-team/wppconnect'); > index.js
echo. >> index.js
echo const messageTemplate = (name) =^> ^`Hi ${name}! >> index.js
echo. >> index.js
echo I've built a FREE professional website for your business! >> index.js
echo. >> index.js
echo 📺 VIEW SAMPLE: https://tigha66.github.io/openclaw-config/ >> index.js
echo. >> index.js
echo 💰 PRICES: From £397 one-time or £39/month >> index.js
echo. >> index.js
echo 🚀 What's included: >> index.js
echo • Mobile-friendly design >> index.js
echo • Online booking/contact forms >> index.js
echo • SEO optimization >> index.js
echo. >> index.js
echo Check out more: https://tigha66.github.io/openclaw-config/ >> index.js
echo. >> index.js
echo Interested? Reply to this message! >> index.js
echo. >> index.js
echo Cheers, >> index.js
echo Abdelhak >> index.js
echo 📧 tigha66@gmail.com >> index.js
echo 🌐 autoAIwebsolutions.com^`; >> index.js
echo. >> index.js
echo const businesses = [ >> index.js
echo     {name:"Englands Plumber",phone:"447405881006"}, >> index.js
echo     {name:"National Plumbers",phone:"447760244444"}, >> index.js
echo     {name:"Plumbing Circle",phone:"447867850846"}, >> index.js
echo ]; >> index.js
echo. >> index.js
echo (async () =^> { >> index.js
echo     console.log('Starting WhatsApp...'); >> index.js
echo     const client = await WPP.create({session:'sender',multidevice:true}); >> index.js
echo     console.log('Scan QR with WhatsApp'); >> index.js
echo     await new Promise(r =^> setTimeout(r, 3000)); >> index.js
echo     for (const b of businesses) { >> index.js
echo         try { await client.sendText(b.phone + '@c.us', messageTemplate(b.name)); console.log('Sent to ' + b.name); } >> index.js
echo         catch (e) { console.log('Failed: ' + e.message); } >> index.js
echo         await new Promise(r =^> setTimeout(r, 5000)); >> index.js
echo     } >> index.js
echo     console.log('Done!'); >> index.js
echo })(); >> index.js

echo.
echo ✅ Installed!
echo.
echo Run: node index.js
pause
