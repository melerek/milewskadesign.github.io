# 📊 Analytics Setup Guide

## ✅ What's Been Installed

Your website now has **dual analytics tracking** configured:
1. **Google Analytics 4 (GA4)** - Detailed traffic and conversion tracking
2. **Microsoft Clarity** - Heatmaps and session recordings

---

## 🔧 Setup Instructions

### **Step 1: Google Analytics 4 Setup** (10 minutes)

#### **1.1 Create GA4 Account**
1. Go to: **https://analytics.google.com/**
2. Click **"Start measuring"**
3. **Account Name:** `Milewska Design`
4. Check data sharing settings (optional)
5. Click **"Next"**

#### **1.2 Create GA4 Property**
1. **Property Name:** `Milewska Design Website`
2. **Time zone:** `(GMT+01:00) Warsaw`
3. **Currency:** `Polish Zloty (PLN)`
4. Click **"Next"**

#### **1.3 Business Information**
1. **Industry:** `Professional Services` or `Design & Architecture`
2. **Business size:** `Small (1-10 employees)`
3. **How you plan to use GA:** Check relevant options
4. Click **"Create"**
5. Accept Terms of Service

#### **1.4 Set Up Data Stream**
1. Select **"Web"**
2. **Website URL:** `https://milewskadesign.github.io`
3. **Stream name:** `Milewska Design Main Site`
4. Click **"Create stream"**

#### **1.5 Get Your Measurement ID**
1. You'll see your **Measurement ID** (looks like `G-XXXXXXXXXX`)
2. **Copy this ID**

#### **1.6 Update Your Website**
1. Open `index.html` in your editor
2. Find **line 8**: `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`
3. Replace **both occurrences** of `G-XXXXXXXXXX` with your actual Measurement ID
   - Line 8: `src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"`
   - Line 13: `gtag('config', 'YOUR_MEASUREMENT_ID', {`

4. Open `script.js` in your editor
5. Find **line 32**: `gtag('config', 'G-XXXXXXXXXX', {`
6. Replace `G-XXXXXXXXXX` with your actual Measurement ID

7. Find **line 1474**: `'send_to': 'G-XXXXXXXXXX/conversion',`
8. Replace `G-XXXXXXXXXX` with your actual Measurement ID

**Example:**
```javascript
// Before
gtag('config', 'G-XXXXXXXXXX', {

// After
gtag('config', 'G-ABC123XYZ', {
```

---

### **Step 2: Microsoft Clarity Setup** (5 minutes)

#### **2.1 Create Clarity Account**
1. Go to: **https://clarity.microsoft.com/**
2. Click **"Sign up"** (use Microsoft, Google, or Facebook account)
3. Accept terms and privacy policy

#### **2.2 Create New Project**
1. Click **"Add new project"**
2. **Project name:** `Milewska Design`
3. **Website URL:** `https://milewskadesign.github.io`
4. **Site category:** `Portfolio` or `Business`
5. Click **"Add new project"**

#### **2.3 Get Your Clarity ID**
1. You'll be taken to setup page
2. Select **"Install tracking code manually"**
3. You'll see a code snippet with your **Clarity ID** (looks like random letters/numbers)
4. **Copy the ID** from this line: `"clarity", "script", "YOUR_CLARITY_ID"`

#### **2.4 Update Your Website**
1. Open `index.html` in your editor
2. Find **line 28**: `})(window, document, "clarity", "script", "YOURCLARITYID");`
3. Replace `YOURCLARITYID` with your actual Clarity ID

**Example:**
```javascript
// Before
})(window, document, "clarity", "script", "YOURCLARITYID");

// After
})(window, document, "clarity", "script", "abc123xyz");
```

---

## 🧪 Testing Your Setup

### **Test Google Analytics 4:**
1. Save and upload your changes to GitHub Pages
2. Visit your website: `https://milewskadesign.github.io`
3. Go to GA4 Dashboard: **https://analytics.google.com/**
4. Click on **"Reports"** → **"Realtime"**
5. You should see **1 active user** (you!) within 30 seconds
6. ✅ If you see yourself, it's working!

### **Test Microsoft Clarity:**
1. Visit your website: `https://milewskadesign.github.io`
2. Click around, scroll, interact with portfolio
3. Go to Clarity Dashboard: **https://clarity.microsoft.com/**
4. Click on your project
5. Wait 2-3 minutes for data to process
6. Go to **"Recordings"** tab
7. You should see your session recorded
8. ✅ If you see a recording, it's working!

---

## 📊 What's Being Tracked

### **Automatic Tracking:**
- ✅ Page views
- ✅ Scroll depth (25%, 50%, 75%, 100%)
- ✅ Time on page (30s, 60s, 2min, 5min)
- ✅ Device type (mobile, desktop, tablet)
- ✅ Browser & OS
- ✅ Geographic location
- ✅ Traffic sources (Google, social media, direct)

### **Custom Events Tracked:**
1. **Portfolio View**
   - Tracks when someone opens a project in lightbox
   - Parameters: project name, category

2. **Form Submission**
   - Tracks successful contact form submissions
   - Parameters: project type, budget range
   - **Conversion event** for GA4

3. **Navigation Clicks**
   - Tracks menu item clicks
   - Parameters: link text, destination

4. **Scroll Depth**
   - Tracks how far users scroll
   - Parameters: 25%, 50%, 75%, 100%

5. **Time on Page**
   - Tracks engagement duration
   - Parameters: seconds spent

---

## 📈 Understanding Your Analytics

### **Google Analytics 4 - Key Metrics:**

#### **Dashboard → Realtime:**
- See who's on your site RIGHT NOW
- What pages they're viewing
- Where they're from

#### **Dashboard → Reports → Acquisition:**
- **How visitors find you:**
  - Organic Search (Google)
  - Direct (typing URL)
  - Social (Instagram, Facebook)
  - Referral (other websites)

#### **Dashboard → Reports → Engagement:**
- **Most popular pages**
- **Average time on page**
- **Events** (form submissions, portfolio views)

#### **Dashboard → Reports → Demographics:**
- **Countries** (where visitors are from)
- **Cities** (Warsaw, Kraków, etc.)
- **Devices** (mobile vs desktop)

### **Microsoft Clarity - Visual Insights:**

#### **Dashboard → Heatmaps:**
- **Click heatmaps:** See where people click
- **Scroll heatmaps:** See how far they scroll
- **Most engaged areas** on your pages

#### **Dashboard → Recordings:**
- **Watch real user sessions**
- See exactly how people navigate
- Identify usability issues
- **Rage clicks** (frustration indicators)
- **Dead clicks** (clicks that do nothing)

#### **Dashboard → Insights:**
- **JavaScript errors** (if any)
- **Excessive scrolling**
- **Quick backs** (people leaving fast)

---

## 🎯 Recommended Reports to Check Weekly

### **Week 1 Checklist:**
1. ✅ Verify tracking is working (Realtime report)
2. ✅ Check device breakdown (mobile vs desktop)
3. ✅ Review top pages
4. ✅ Watch 2-3 session recordings in Clarity

### **Ongoing Weekly Review:**
1. **Traffic:**
   - How many visitors this week?
   - Are numbers growing?
   - Where are they coming from?

2. **Engagement:**
   - Which portfolio projects are most popular?
   - How many people scroll to the bottom?
   - Average time on page?

3. **Conversions:**
   - How many contact form submissions?
   - What project types are most requested?
   - What budget ranges are common?

4. **Heatmaps (Clarity):**
   - Are people clicking the right things?
   - Do they see your CTA buttons?
   - Are portfolio items engaging?

5. **Recordings (Clarity):**
   - Watch 2-3 sessions per week
   - Look for confusion or frustration
   - Identify improvement opportunities

---

## 🔔 Setting Up Alerts (Optional)

### **GA4 Email Reports:**
1. In GA4, go to **"Library"**
2. Click **"Create Collection"**
3. Add useful reports
4. Click **"Share"** → **"Email"**
5. Schedule weekly reports

### **Clarity Notifications:**
1. In Clarity, go to **Settings** → **Notifications**
2. Enable alerts for:
   - JavaScript errors
   - Rage clicks
   - Dead clicks

---

## 🚀 Advanced Tracking (Optional)

### **Track Specific Portfolio Categories:**
Already implemented! Each portfolio view tracks:
- `residential` vs `competition` projects
- Individual project names

### **Set Up Conversion Goals (GA4):**
1. Go to **Admin** → **Events**
2. Click **"Create event"**
3. Create custom conversions:
   - Contact form submissions
   - Portfolio views (3+)
   - Time on site (5+ minutes)

### **Custom Dashboards:**
1. In GA4, go to **"Library"**
2. Click **"Create Collection"**
3. Add your favorite reports
4. Name it "Weekly Review"

---

## 🔒 Privacy & GDPR Compliance

### **Current Setup (Privacy-Friendly):**
✅ IP Anonymization enabled (`anonymize_ip: true`)
✅ Google Signals disabled
✅ Ad personalization disabled
✅ Microsoft Clarity is GDPR-compliant by default

### **Do You Need Cookie Consent?**

**In EU (Poland):** Technically yes, but:
- Many small businesses operate without it initially
- Both GA4 and Clarity are configured with privacy in mind
- You're not using data for advertising

**If you want to add a cookie banner:**
- Use **Cookiebot** (free for small sites)
- Or **Cookie Consent** by Osano
- Add it later when needed

---

## 📱 Mobile App (Optional)

Both GA4 and Clarity have mobile apps:
- **GA4 Mobile App:** Track stats on the go
- **Clarity Mobile App:** Watch recordings on your phone

---

## 💡 Pro Tips

1. **Check Analytics Every Monday**
   - Review last week's performance
   - Set goals for the new week

2. **Watch Session Recordings Weekly**
   - Learn how real people use your site
   - Spot issues you'd never find otherwise

3. **Track Your Instagram Traffic**
   - Use UTM parameters in your Instagram bio link
   - Example: `https://milewskadesign.github.io/?utm_source=instagram&utm_medium=bio`

4. **Benchmark Your Performance**
   - Week 1: Set baseline numbers
   - Month 2: Compare growth
   - Track improvements after changes

5. **Use Insights for Improvement**
   - Popular projects → Feature them more
   - High bounce rate → Improve that page
   - Low mobile engagement → Optimize mobile UX

---

## ❓ Troubleshooting

### **"I don't see any data in GA4"**
- Wait 24-48 hours for first data
- Check Realtime report (shows data immediately)
- Verify your Measurement ID is correct
- Clear browser cache and revisit site

### **"Clarity shows no recordings"**
- Wait 2-3 minutes after visiting
- Check that Clarity ID is correct
- Try in incognito mode
- Check browser console for errors

### **"Events aren't tracking"**
- Open browser console (F12)
- Look for `📊 Analytics Event:` logs
- If you see logs, events are firing
- GA4 may take 24 hours to show custom events

---

## 📚 Additional Resources

- **GA4 Learning:** https://analytics.google.com/analytics/academy/
- **Clarity Help:** https://docs.microsoft.com/en-us/clarity/
- **GA4 Dashboard:** https://analytics.google.com/
- **Clarity Dashboard:** https://clarity.microsoft.com/

---

## ✅ Next Steps

1. **Set up GA4** (get your Measurement ID)
2. **Set up Clarity** (get your Clarity ID)
3. **Update `index.html` and `script.js`** with your IDs
4. **Test** (visit your site, check Realtime in GA4)
5. **Check back in 1 week** to see your first insights!

---

## 📊 Summary of Files to Update

| File | Lines to Change | What to Replace |
|------|----------------|-----------------|
| `index.html` | Line 8 | `G-XXXXXXXXXX` → Your GA4 ID |
| `index.html` | Line 13 | `G-XXXXXXXXXX` → Your GA4 ID |
| `index.html` | Line 28 | `YOURCLARITYID` → Your Clarity ID |
| `script.js` | Line 32 | `G-XXXXXXXXXX` → Your GA4 ID |
| `script.js` | Line 1474 | `G-XXXXXXXXXX` → Your GA4 ID |

**Total changes needed: 5 lines across 2 files**

---

*Last Updated: October 5, 2025*
*Analytics Implementation: GA4 + Microsoft Clarity*

**Questions?** Check the troubleshooting section or open an issue!

🎉 **Happy tracking!**
