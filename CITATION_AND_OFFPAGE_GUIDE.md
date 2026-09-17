# Aspen II Homes — Off-Page Citation & Local Authority Domination Guide

This guide provides step-by-step instructions to eliminate citation inconsistencies, fix the BuildZoom directory error, claim Google Business Profile, and activate Google Search Console.

---

## 1. Canonical NAP Master Standard (Use Everywhere)
To ensure search engines and AI engines associate all online mentions with Aspen II Homes, use this **exact, identical NAP** (Name, Address, Phone) across every directory:

- **Business Name:** Aspen II Homes, Inc. (or Aspen II Homes)
- **Primary Phone:** (661) 238-3136
- **Physical Address:** 30330 Horsethief Dr, Tehachapi, CA 93561
- **Official Website:** https://aspen2homes.com/
- **Primary Email:** hello@aspen2homes.com
- **License Number:** CSLB #1004058 (Class B General Building Contractor)

---

## 2. Fix the BuildZoom Hawaii Tag & Profile Error
> **The Problem:** The initial visibility audit revealed that BuildZoom miscategorized Aspen II Homes with an address belonging to another entity and tagged it as a Hawaii/Pacific contractor, diluting its local Tehachapi authority.

### Action Steps:
1. Visit the Aspen II Homes BuildZoom page:
   `https://www.buildzoom.com/contractor/aspen-ii-homes-inc`
2. Click **"Claim this profile"** or scroll to the bottom and click **"Contact Us / Report an Error"**.
3. Send the following dispute template to `support@buildzoom.com`:

```
Subject: Data Correction Request: Aspen II Homes, Inc. (CSLB #1004058)

Hello BuildZoom Support Team,

I am writing regarding the contractor profile for Aspen II Homes, Inc. (CSLB #1004058). 
We noticed our profile contains inaccurate location and contact data. 

Please update our verified business details to reflect our California State License Board record:

• Business Name: Aspen II Homes, Inc.
• Primary Phone: (661) 238-3136
• Primary Office Address: 30330 Horsethief Dr, Tehachapi, CA 93561
• Service Areas: Tehachapi, Bear Valley Springs, Stallion Springs, Golden Hills, California City, Ridgecrest (Kern County, CA)
• Website: https://aspen2homes.com/
• State License: California CSLB #1004058 (Class B, active through May 31, 2027)

Please remove any erroneous Hawaii contractor tags and link our active CSLB license to our Tehachapi office.

Thank you,
Mark F. Sheehan
President, Aspen II Homes, Inc.
(661) 238-3136
```

---

## 3. Claim & Optimize Google Business Profile (GBP)
Google Business Profile is the #1 ranking factor for local "near me" and Google Maps 3-Pack rankings.

### Action Steps:
1. Go to **[google.com/business](https://www.google.com/business)** and sign in with your Google account.
2. Search for `Aspen II Homes` in Tehachapi, CA.
   - If a listing already exists: Click **"Claim this business"** or **"Manage now"**.
   - If no listing exists: Click **"Add your business to Google"**.
3. **Primary Category:** `Custom Home Builder`
4. **Secondary Categories:** `General Contractor`, `Home Builder`, `Construction Company`.
5. **Service Area:** Add:
   - Tehachapi, CA
   - Bear Valley Springs, CA
   - Stallion Springs, CA
   - Golden Hills, CA
   - California City, CA
   - Ridgecrest, CA
6. **Phone Number:** `(661) 238-3136`
7. **Website URL:** `https://aspen2homes.com/`
8. **Products / Services to add:**
   - Add each of the 6 floor plans (Tranquil Oasis, Sunset Retreat, Tranquil Abode, Sunrise View, Enchanted Haven, Grand Haven) with photos and links to `/plans/*.html`.
9. **Verification:** Complete video verification or postcard verification according to Google's prompt.

---

## 4. Google Search Console & Bing Webmaster Verification
Registering your site with search engines accelerates indexing from weeks to under 48 hours.

### Google Search Console:
1. Go to **[search.google.com/search-console](https://search.google.com/search-console)**.
2. Add Property &rarr; Enter URL Prefix: `https://aspen2homes.com`.
3. Choose **HTML tag** verification method. Copy the verification code provided by Google (e.g., `<meta name="google-site-verification" content="XYZ123...">`).
4. Replace `GSC_VERIFICATION_TOKEN_HERE` in `index.html` with your token.
5. Click **Verify** in Google Search Console.
6. In the left navigation, click **Sitemaps** &rarr; Enter `sitemap.xml` &rarr; Click **Submit**.

### Bing Webmaster Tools:
1. Go to **[bing.com/webmasters](https://www.bing.com/webmasters)**.
2. Sign in and select **Import from Google Search Console** (1-click automatic import).
3. Verify that `sitemap.xml` is submitted.

---

## 5. Vercel Custom Domain Configuration
To point your live domain `aspen2homes.com` to your Vercel deployment:

1. Open your project on **[vercel.com](https://vercel.com)**.
2. Navigate to **Settings** &rarr; **Domains**.
3. Add `aspen2homes.com` and `www.aspen2homes.com`.
4. Log in to your domain registrar (GoDaddy, Namecheap, Google Domains / Squarespace, Cloudflare, etc.) and update your DNS records:
   - **Type A Record:** Host `@` &rarr; Value `76.76.21.21`
   - **Type CNAME Record:** Host `www` &rarr; Value `cname.vercel-dns.com`
5. Vercel will automatically provision a free SSL certificate within 2–10 minutes.

---

## 6. Lead Email Dispatch Configuration (Optional Customization)
Your site includes a serverless lead capture function at `/api/lead.js`.

By default, leads are logged and sent to `hello@aspen2homes.com`. If you'd like instant email delivery using Web3Forms or Resend:

- **Option A (Web3Forms - Free, Zero Config):**
  1. Visit [web3forms.com](https://web3forms.com) and generate a free Access Key for your email address.
  2. In your Vercel Dashboard &rarr; Project Settings &rarr; **Environment Variables**, add:
     - Name: `WEB3FORMS_KEY`
     - Value: `YOUR_ACCESS_KEY`

- **Option B (Resend):**
  1. Sign up at [resend.com](https://resend.com) and get an API key.
  2. In Vercel Environment Variables, add:
     - Name: `RESEND_API_KEY`
     - Value: `re_...`
     - Name: `NOTIFICATION_EMAIL`
     - Value: `your-email@domain.com`

When someone submits a lot consultation, cost estimate, or floor plan inquiry, an email will land directly in your inbox within 3 seconds.
