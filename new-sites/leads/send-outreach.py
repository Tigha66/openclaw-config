#!/usr/bin/env python3
"""
Outreach Email Sender
Sends personalized cold emails to leads
"""

import smtplib
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import csv

# ============== CONFIG ==============
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
YOUR_EMAIL = "your_email@gmail.com"
YOUR_APP_PASSWORD = "xxxx xxxx xxxx xxxx"  # Generate from Google Account
YOUR_NAME = "Abdelhak"
YOUR_PHONE = "07525 XXX XXXX"
# ====================================

# Email templates by niche
TEMPLATES = {
    "hvac": {
        "subject": "Quick question about your leads at {company}",
        "body": """Hey,

Quick question — how fast does your team respond to new inquiries?

Most HVAC companies we talk to are losing 30-50% of leads because responses take too long.

We build AI systems that:
- Respond to leads instantly (even at 2am)
- Qualify customers and book appointments automatically
- Send SMS confirmations and reminders

Would you be open to a 5-minute call to see if this could help?

Best,
{name}
{phone}
"""
    },
    "medspa": {
        "subject": "Quick question about bookings at {company}",
        "body": """Hey,

Quick question — how are you handling booking inquiries at the moment?

We work with aesthetic clinics to automate their customer interactions — answers to pricing questions, treatment info, appointment bookings — all handled by AI 24/7.

Many clinics we work with are booking 30% more appointments because they never miss a lead.

Would you be open to a quick chat?

Best,
{name}
{phone}
"""
    },
    "plumbing": {
        "subject": "Quick question about your emergency calls",
        "body": """Hey,

Quick question — what happens when someone calls outside hours?

We build AI systems for plumbing companies that handle:
- Emergency call handling 24/7
- Booking jobs directly to your calendar
- Sending job details to your team

Would you be open to a 5-minute call to chat?

Best,
{name}
{phone}
"""
    },
    "roofing": {
        "subject": "Quick question about your quotes at {company}",
        "body": """Hey,

Quick question — how fast are you responding to quote requests?

Most roofing companies we talk to are losing 30-50% of leads because they can't respond quickly enough.

We build AI systems that:
- Answer inquiries instantly (even overnight)
- Qualify leads and book site visits
- Send quotes and follow-ups automatically

Would you be open to a 5-minute call?

Best,
{name}
{phone}
"""
    },
    "dental": {
        "subject": "Quick question about patient bookings at {company}",
        "body": """Hey,

Quick question — how are you handling patient inquiries right now?

We work with dental clinics to automate bookings — answering questions about treatments, availability, pricing — all handled by AI 24/7.

Clinics we work with are booking 30% more appointments because they never miss a call or form submission.

Would you be open to a quick chat?

Best,
{name}
{phone}
"""
    },
    "realestate": {
        "subject": "Quick question about your leads at {company}",
        "body": """Hey,

Quick question — how fast does your team contact new leads?

Most estate agents we talk to are losing leads because they can't respond fast enough. Research shows speed to lead massively impacts conversions.

We build AI systems that:
- Respond to inquiries instantly
- Qualify buyers/sellers
- Schedule viewings automatically

Would you be open to a 5-minute call?

Best,
{name}
{phone}
"""
    },
    "electrician": {
        "subject": "Quick question about your call handling at {company}",
        "body": """Hey,

Quick question — what happens when someone calls with an electrical emergency?

We build AI systems for electrical companies that:
- Answer calls 24/7 (even outside hours)
- Book jobs directly to your calendar
- Send job details to your team instantly

Would you be open to a 5-minute call?

Best,
{name}
{phone}
"""
    },
    "default": {
        "subject": "Quick question about your customer inquiries",
        "body": """Hey,

Quick question — how fast does your team respond to customer inquiries?

Most businesses we talk to are losing leads because responses are too slow.

We build AI systems that respond instantly, qualify leads, and book appointments automatically.

Would you be open to a 5-minute call?

Best,
{name}
{phone}
"""
    }
}

# Lead database - add your leads here
LEADS = [
    # HVAC
    {"company": "R Perkins & Sons", "email": "info@rperkins.co.uk", "niche": "hvac"},
    {"company": "Mountair Ltd", "email": "info@mountair.co.uk", "niche": "hvac"},
    {"company": "London City Roofing", "email": "info@londoncityroofing.co.uk", "niche": "roofing"},
    {"company": "McDonald Roofing", "email": "enquiries@mcdonaldroofing.co.uk", "niche": "roofing"},
    {"company": "Environ Roofing", "email": "info@environroofingservices.co.uk", "niche": "roofing"},
    
    # Med Spas
    {"company": "SPA Clinique", "email": "reception@medicalspaclinique.info", "niche": "medspa"},
    {"company": "MedSpa Beauty", "email": "info@medspa.co.uk", "niche": "medspa"},
    
    # Plumbing
    {"company": "Staunch & Flow", "email": "info@staunchandflow.co.uk", "niche": "plumbing"},
    
    # Dental
    {"company": "Dental Clinic London", "email": "info@dentalclinic.london", "niche": "dental"},
    {"company": "Harley Street Dental", "email": "info@hsdc.net", "niche": "dental"},
    {"company": "Sonria Dental", "email": "info@sonriadentalclinic.com", "niche": "dental"},
    {"company": "Chelsea Dental", "email": "info@chelseadentalclinic.co.uk", "niche": "dental"},
    
    # Real Estate
    {"company": "Real Estates", "email": "info@realestates-wsp.co.uk", "niche": "realestate"},
    {"company": "V-Matrix Real Estate", "email": "info@v-matrixrealestate.co.uk", "niche": "realestate"},
    
    # Electricians
    {"company": "Contact Electrician", "email": "info@contactelectrician.co.uk", "niche": "electrician"},
    {"company": "Excel Electrician", "email": "info@excelelectrician.co.uk", "niche": "electrician"},
    {"company": "London Electricians Direct", "email": "info@londonelectriciansdirect.co.uk", "niche": "electrician"},
]

def get_template(niche):
    """Get template for niche"""
    return TEMPLATES.get(niche, TEMPLATES["default"])

def send_email(lead):
    """Send email to a single lead"""
    template = get_template(lead.get("niche", "default"))
    
    subject = template["subject"].format(company=lead["company"])
    body = template["body"].format(
        company=lead["company"],
        name=YOUR_NAME,
        phone=YOUR_PHONE
    )
    
    msg = MIMEMultipart()
    msg['From'] = YOUR_EMAIL
    msg['To'] = lead["email"]
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(YOUR_EMAIL, YOUR_APP_PASSWORD)
            server.sendmail(YOUR_EMAIL, lead["email"], msg.as_string())
        print(f"✓ Sent to {lead['company']} ({lead['email']})")
        return True
    except Exception as e:
        print(f"✗ Failed {lead['company']}: {e}")
        return False

def send_batch(leads, delay=30):
    """Send emails with delay between each"""
    print(f"\n🚀 Starting outreach to {len(leads)} leads...\n")
    
    sent = 0
    failed = 0
    
    for i, lead in enumerate(leads):
        print(f"[{i+1}/{len(leads)}] ", end="")
        
        if send_email(lead):
            sent += 1
        else:
            failed += 1
        
        # Delay between emails to avoid spam
        if i < len(leads) - 1:
            time.sleep(delay)
    
    print(f"\n📊 Results: {sent} sent, {failed} failed")
    return sent, failed

def main():
    """Main function"""
    print("""
╔══════════════════════════════════════════╗
║     Outreach Email Sender               ║
║     by Abdelhak                         ║
╚══════════════════════════════════════════╝
    """)
    
    # Filter leads with valid emails
    valid_leads = [l for l in LEADS if l.get("email")]
    print(f"Loaded {len(valid_leads)} leads with valid emails\n")
    
    # Show leads
    print("Leads to contact:")
    for lead in valid_leads:
        print(f"  - {lead['company']} ({lead['niche']}) - {lead['email']}")
    
    print("\n" + "="*50)
    
    # Confirm before sending
    confirm = input(f"\nSend {len(valid_leads)} emails? (y/n): ")
    if confirm.lower() != 'y':
        print("Cancelled.")
        return
    
    # Send emails
    send_batch(valid_leads, delay=30)
    
    print("\n✅ Outreach complete!")

if __name__ == "__main__":
    main()
