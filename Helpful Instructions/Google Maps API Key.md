# Google Maps API Key Setup Guide

To display Google Maps on your website, Google requires an API key connected to an **active billing account**.

> **Important:** Google Maps Platform pricing changed March 1, 2025. The old **$200/month credit** was replaced by **free monthly usage caps** and a **tiered model** (Essentials / Pro / Enterprise), plus optional subscription plans.  
Review current pricing here: https://developers.google.com/maps/billing-and-pricing/pricing

---

### Step 1: Visit Google Maps Platform
Go to: https://developers.google.com/maps  
Click **Get Started** and sign in with your Google account.

---

### Step 2: Create or Select a Project
- Create a **new project** (recommended), or  
- Select an existing project

Use a clear name such as: **Your Company Website Maps**

---

### Step 3: Enable Billing (Required)
Billing is required for Maps to function.

1. In Google Cloud Console, open **Billing**
2. Create/select a billing account and **link it to the Maps project**
3. Add a payment method (credit card)

> Without billing enabled, map services won’t load and requests will fail.

---

### Step 4: Enable Required APIs
The “Get Started” flow often enables core APIs automatically, but we still need to confirm these are enabled for your project:

Enable the following APIs in **APIs & Services → Library**:

- **Maps JavaScript API** (for the interactive map on the website)
- **Places API** (commonly used for place details, autocomplete, etc.)
- **Geocoding API** (required to convert an address into latitude/longitude for map markers)

---

### Step 5: Create an API Key
1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → API Key**
3. Copy the generated key

---

### Step 6: Restrict the API Key (Recommended)
For security, restrict how the key can be used.

### Application Restrictions
- Choose **HTTP referrers (websites)**
- Add your domain(s), for example:
```
https://yourwebsite.com/*
https://www.yourwebsite.com/*
https://*.smarttouchreview.com/* (for review sites on our server)
https://{staging-subdomain}.wpengine{powered}.com/* (for review sites on WP Engine)
```
- For WP Engine, use your actual staging url, do not add `{staging-subdomain}` and `{powered}`.

#### API Restrictions
Restrict the key to ONLY the APIs you enabled:
- Maps JavaScript API
- Places API
- Geocoding API

Save changes.

---

### Step 7: Share the API Key
Send us:
- The API key

We do **not** need access to your Google account.  We would be happy to jump on a Zoom meeting to walk you through it if you need assistance.

---

### Notes on Billing & Cost Control (Optional but Helpful)
- Google uses a usage-based model with **free monthly usage caps per SKU** (and optional subscriptions).
- You can set up **budgets and alerts** in Google Cloud Billing to avoid surprises, but for typical client websites billing will be free or minimal.
- Review current pricing anytime here: https://developers.google.com/maps/billing-and-pricing/pricing
