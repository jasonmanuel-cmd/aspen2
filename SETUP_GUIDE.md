# 585 N Wendy Dr — Website Setup & Deployment Guide

## ✅ Completed Updates

All your requested changes have been made to the website:

### 1. **Year Updated** ✓
- Changed "fully renovated 2025" → "fully renovated 2026"
- Updated across all sections

### 2. **Video Tour Removed** ✓
- Entire "Video Walkthrough" section deleted

### 3. **3D Tour Removed** ✓
- Entire "3D Virtual Tour" section deleted

### 4. **Before/After Slider Replaced** ✓
- Replaced with a compelling "Market Position" panel showing:
  - Entry Point Value
  - Mature Neighborhood benefits
  - Work is Done (renovation complete)
  - Location Efficiency
  - Seller Support (buydown, credits, warranty)

### 5. **Price Updated** ✓
- Price set to $849,000 throughout the site
- Updated in hero, FAQ, calculator, and all references

### 6. **Agent Photo Added** ✓
- Replaced emoji placeholder with actual photo (nathanael-harbison.jpg)
- Photo displays at bottom of page in agent section

### 7. **Open House QR Code Added** ✓
- New "Open House" section added before footer
- QR code automatically generated that links to openhouse.html
- Registration form with name, email/phone validation
- Data submitted to CRM (see CRM setup below)

---

## 🚀 Next Steps: CRM Integration & Deployment

### **Step 1: Configure CRM API Endpoint**

The open house forms are set up to submit data to your CRM at:
```
http://harbisonstandard.com/hq/api/openhouse
```

**You need to:**
1. Create an API endpoint that accepts POST requests with this JSON structure:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-123-4567",
  "property": "585 N Wendy Dr, Newbury Park, CA 91320",
  "source": "open_house_qr"
}
```

2. If the endpoint isn't ready yet, the form falls back to Formspree (currently working)
   - You can monitor submissions in formspree.io account

### **Step 2: Test the QR Code**

Before the open house:
1. Open `index.html` in a browser
2. Scroll to "Open House Tomorrow" section
3. A QR code will display automatically
4. Scan with your phone to test the `openhouse.html` page
5. Verify the form submits and shows success message

### **Step 3: Deploy to Vercel**

1. **Push to GitHub** (you already have the repo):
   ```bash
   git add .
   git commit -m "Update: year to 2026, remove video/3D tours, add open house QR code"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to vercel.com
   - Click "New Project"
   - Import from GitHub: `jasonmanuel-cmd/hshomeshub.site.git`
   - Deploy (it will auto-detect Next.js or static files)

3. **Set up a custom domain** (optional):
   - In Vercel project settings, add your domain
   - Point DNS to Vercel

### **Step 4: Generate QR Code**

Once deployed to Vercel, update the QR code to point to your live domain:

**Find this line in index.html (around line 3280):**
```javascript
text: window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/openhouse.html',
```

**Replace with:**
```javascript
text: 'https://your-domain.com/openhouse.html',
```

Then regenerate the QR code by reloading the page.

---

## 📱 Open House Day Setup

### **iPad/Tablet Setup:**
1. Place iPad at the open house entrance
2. Open `index.html` in Safari or Chrome
3. Scroll to "Open House Tomorrow" section
4. QR code will be visible and scannable
5. Visitors scan → form loads → they register → data goes to CRM

### **Two Ways People Can Register:**

**Option A: Scan QR Code** (on iPad)
- Takes them to dedicated `openhouse.html` form
- Clean, focused experience

**Option B: Form on Main Page**
- Visitors on desktop can scroll to "Open House Tomorrow"
- Fill out right there
- Same validation and CRM submission

---

## 🔧 File Structure

```
585 n wendy dr/
├── index.html                      (Main landing page)
├── openhouse.html                  (Separate form for QR code)
├── nathanael-harbison.jpg          (Agent photo)
├── floorplan.png                   (Floor plan)
├── img_*.jpg                       (Gallery images)
├── SETUP_GUIDE.md                  (This file)
└── [folder] extra_photos/          (Additional images)
```

---

## ⚡ Key Features Implemented

✅ **Renovation year**: Updated to 2026  
✅ **Video/3D tours**: Removed  
✅ **Before/After slider**: Replaced with value proposition  
✅ **Price**: $849,000 throughout  
✅ **Agent photo**: nathanael-harbison.jpg  
✅ **QR Code**: Auto-generated for open house  
✅ **Form validation**: Email OR phone required (not both)  
✅ **CRM fallback**: Formspree if API endpoint unavailable  
✅ **Mobile responsive**: Works on all devices  
✅ **Navigation**: Open House added to menu  

---

## 📝 Notes

- The mortgage calculator is already set to $849,000
- All image references are correct
- Mobile navigation updated with Open House link
- Footer links include Open House section
- Form submission provides nice user feedback

---

## ❓ Questions?

If you need to:
- **Modify CRM endpoint**: Update the fetch URL in index.html line ~3290 and openhouse.html
- **Change QR code link**: Update the `text:` parameter in the QR code generator
- **Adjust form fields**: Edit the form in both `index.html` (#openHouseForm) and `openhouse.html`
- **Customize styling**: All CSS is in the `<style>` tag at the top of each HTML file

Ready to deploy! 🎉
