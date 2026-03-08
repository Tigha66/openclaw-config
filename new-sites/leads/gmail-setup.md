# Gmail Integration Setup

## Option 1: Use Maton Gateway (Requires API Key)

### Get Maton API Key
1. Go to https://maton.ai
2. Sign up / Sign in
3. Go to Settings → API Keys
4. Copy your API key

### Set Environment Variable
```bash
export MATON_API_KEY="your_api_key_here"
```

### Test Connection
```bash
curl -H "Authorization: Bearer $MATON_API_KEY" \
  https://gateway.maton.ai/google-mail/gmail/v1/users/me/profile
```

---

## Option 2: Manual Gmail (OAuth)

### Setup Google Cloud Project
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Gmail API
4. Create OAuth credentials (Desktop App)
5. Download credentials.json

### Send Email with Python
```python
import os
import base64
from email.mime.text import MIMEText
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

# Using OAuth flow
SCOPES = ['https://www.googleapis.com/auth/gmail.send']
creds = Credentials.from_authorized_user_file('token.json', SCOPES)

service = build('gmail', 'v1', credentials=creds)

def send_email(to, subject, body):
    message = MIMEText(body)
    message['to'] = to
    message['subject'] = subject
    raw = base64.urlsafe_b64encode(message.as_bytes()).decode()
    
    service.users().messages().send(
        userId='me',
        body={'raw': raw}
    ).execute()

# Usage
send_email(
    to="info@company.co.uk",
    subject="Quick question about your leads",
    body="Hey,\n\nQuick question..."
)
```

---

## Option 3: Simple SMTP (No API Needed)

### Send Email with Python
```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Your Gmail settings
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL = "your_email@gmail.com"
APP_PASSWORD = "your_16char_app_password"  # Generate at Google Account → Security → 2FA → App Passwords

def send_email(to, subject, body):
    msg = MIMEMultipart()
    msg['From'] = EMAIL
    msg['To'] = to
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))
    
    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(EMAIL, APP_PASSWORD)
        server.sendmail(EMAIL, to, msg.as_string())

# Usage
send_email(
    to="info@rperkins.co.uk",
    subject="Quick question about your leads",
    body="Hey,\n\nQuick question — how fast does your team respond..."
)
```

### Get App Password
1. Go to Google Account → Security
2. Enable 2-Factor Authentication
3. Go to App Passwords (search in settings)
4. Generate new app password for "Mail"
5. Use that 16-character password

---

## Quick Send Script

```python
#!/usr/bin/env python3
"""Send outreach emails to leads"""

import smtplib
from email.mime.text import MIMEText
import csv

SMTP_SERVER = "smtps.googlemail.com"
SMTP_PORT = 587
EMAIL = "your_email@gmail.com"
APP_PASSWORD = "xxxx xxxx xxxx xxxx"

LEADS = [
    {"name": "R Perkins", "email": "info@rperkins.co.uk"},
    {"name": "Mountair", "email": "info@mountair.co.uk"},
    {"name": "London City Roofing", "email": "info@londoncityroofing.co.uk"},
]

SUBJECT = "Quick question about your leads at {company}"

BODY = """Hey,

Quick question — how fast does your team respond to new inquiries?

Most companies we talk to are losing 30-50% of leads because responses take too long.

We build AI systems that:
- Respond to leads instantly (even at 2am)
- Qualify customers and book appointments automatically
- Send SMS confirmations and reminders

Would you be open to a 5-minute call to see if this could help?

Best,
Abdelhak
07525 XXX XXXX
"""

def send_email(to, subject, body):
    msg = MIMEText(body)
    msg['From'] = EMAIL
    msg['To'] = to
    msg['Subject'] = subject
    
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL, APP_PASSWORD)
            server.sendmail(EMAIL, to, msg.as_string())
        print(f"✓ Sent to {to}")
    except Exception as e:
        print(f"✗ Failed {to}: {e}")

if __name__ == "__main__":
    for lead in LEADS:
        subject = SUBJECT.format(company=lead['name'])
        send_email(lead['email'], subject, BODY)
```

---

## Current Status

| Step | Status |
|------|--------|
| Get API Key | ⬜ Pending |
| Configure Env | ⬜ Pending |
| Test Send | ⬜ Pending |
| Send First Batch | ⬜ Pending |

---

## Next Steps

1. Choose option above (Option 3 is easiest)
2. Get credentials
3. Update script with your details
4. Run first outreach batch
