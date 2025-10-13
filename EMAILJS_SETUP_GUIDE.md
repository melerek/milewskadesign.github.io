# EmailJS Setup Guide - Milewska Design

This guide will help you set up EmailJS so your contact form sends real emails to `kontakt@milewskadesign.pl`.

**Time required:** 5-10 minutes  
**Cost:** FREE (200 emails/month)

---

## 📋 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up Free"**
3. Sign up using your Google account (kontakt@milewskadesign.pl) or email
4. Verify your email if needed

---

### Step 2: Add Email Service

1. Once logged in, go to **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with `kontakt@milewskadesign.pl`
6. Give it a **Service ID** (or use the auto-generated one)
   - Example: `service_abc123`
7. **Copy this Service ID** - you'll need it later!
8. Click **"Create Service"**

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. Set up the template:

**Template Settings:**
```
Template Name: Contact Form - Milewska Design
```

**Email Template Content:**

**Subject:**
```
Nowe zapytanie z formularza - {{from_name}}
```

**Content (Body):**
```
Otrzymałeś nowe zapytanie z formularza kontaktowego na milewskadesign.github.io

===========================================
DANE KONTAKTOWE:
===========================================

Imię: {{from_name}}
Email: {{from_email}}
Telefon: {{phone}}

===========================================
SZCZEGÓŁY PROJEKTU:
===========================================

Typ projektu: {{project_type}}
Budżet: {{budget}}

Wiadomość:
{{message}}

===========================================

Odpowiedz klientowi na: {{from_email}}
```

4. **To Email:** Leave as `{{to_email}}` (it will use kontakt@milewskadesign.pl from the code)
5. **From Name:** `{{from_name}}`
6. **From Email:** Leave default (service@emailjs.com)
7. **Reply To:** `{{from_email}}` (so you can reply directly to the customer)
8. Click **"Save"**
9. **Copy the Template ID** (looks like `template_abc123`)

---

### Step 4: Get Your Public Key

1. Go to **"Account"** (left sidebar)
2. Click **"General"** tab
3. Find your **"Public Key"** 
   - It looks like: `Abc123XyZ456`
4. **Copy this Public Key**

---

### Step 5: Add Credentials to Your Website

Now you need to update `script.js` with your EmailJS credentials.

**Open `script.js` and find these lines (around line 1202):**

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',  
    SERVICE_ID: 'YOUR_SERVICE_ID_HERE',  
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID_HERE'
};
```

**Replace with your actual values:**

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'Abc123XyZ456',           // Your Public Key from Step 4
    SERVICE_ID: 'service_abc123',         // Your Service ID from Step 2
    TEMPLATE_ID: 'template_abc123'        // Your Template ID from Step 3
};
```

**Save the file!**

---

### Step 6: Test Your Form

1. **Deploy your changes** to GitHub Pages (commit and push)
2. Wait 1-2 minutes for GitHub to deploy
3. Open your website: https://milewskadesign.github.io
4. Go to the contact form
5. Fill it out with test data
6. Submit!
7. Check `kontakt@milewskadesign.pl` inbox - you should receive an email!

---

## ✅ What You Should See

### When Form is Submitted Successfully:
- ✅ Loading spinner appears on button
- ✅ Green success message: "Dziękujemy! Skontaktujemy się z Tobą wkrótce."
- ✅ Form resets after 3 seconds
- ✅ Email arrives in your Gmail inbox

### If There's an Error:
- ❌ Red error message with instructions
- ❌ Check browser console (F12) for error details
- ❌ Verify your credentials are correct

---

## 🔍 Troubleshooting

### Problem: "EmailJS not configured yet" in console
**Solution:** Make sure you replaced ALL THREE values in `EMAILJS_CONFIG` (no `YOUR_` text remaining)

### Problem: Email not arriving
**Solution:** 
1. Check spam/junk folder
2. Verify Gmail service is connected in EmailJS dashboard
3. Check EmailJS dashboard → "Email Log" to see if email was sent
4. Make sure you're under the free tier limit (200 emails/month)

### Problem: "Invalid public key" error
**Solution:** 
1. Double-check you copied the Public Key correctly (no extra spaces)
2. Make sure it's from Account → General → Public Key section

### Problem: "Service not found"
**Solution:**
1. Verify Service ID matches exactly (case-sensitive)
2. Check EmailJS dashboard → Email Services → Your service ID

---

## 📧 Email Template Variables

These variables are automatically filled from the form:

| Variable | Source | Example |
|----------|--------|---------|
| `{{from_name}}` | Name field | "Jan Kowalski" |
| `{{from_email}}` | Email field | "jan@example.com" |
| `{{phone}}` | Phone field | "+48 123 456 789" |
| `{{project_type}}` | Project Type select | "Projekt Mieszkaniowy" |
| `{{budget}}` | Budget select | "5 000 - 10 000 zł" |
| `{{message}}` | Message textarea | User's message |

---

## 💰 Pricing & Limits

**FREE Tier:**
- ✅ 200 emails per month
- ✅ Unlimited templates
- ✅ All features included

**Paid Plans:**
- If you need more than 200 emails/month
- Starts at $7/month for 1,000 emails
- https://www.emailjs.com/pricing

For a portfolio website, 200/month is usually plenty!

---

## 🔒 Security Notes

- ✅ Your Public Key is safe to expose (it's called "public" for a reason)
- ✅ EmailJS has built-in spam protection
- ✅ Rate limiting prevents abuse
- ⚠️ Never share your Private Key (not used in this setup)

---

## 📊 Monitoring

**To see email statistics:**
1. Log into EmailJS dashboard
2. Go to **"Email Log"**
3. See all sent emails, success/failure rates, etc.

---

## 🎉 You're All Set!

Once you complete these steps:
- ✅ Your form will send real emails
- ✅ You'll get notified of new inquiries instantly
- ✅ You can reply directly from Gmail
- ✅ All form data is included in the email

**Need help?** Check:
- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

## 📝 Quick Reference

**After setup, you need:**
1. Public Key (from Account → General)
2. Service ID (from Email Services)
3. Template ID (from Email Templates)

**Add these to `script.js` lines 1202-1206**

That's it! Your form will now send emails automatically. 🎊
