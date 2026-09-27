# Real User Monitoring (RUM) Setup Guide

## Current Status
**Monitoring Active:** ✅ Vercel Analytics (partial)

---

## 📊 Currently Implemented

### Vercel Web Analytics ✅
```html
<script async src="/_vercel/insights/script.js"></script>
```

**What's Tracked:**
- Page views
- Basic performance metrics
- Browser/device info
- Geographic data

**Status:** Active and working

---

## 🎯 Recommended RUM Enhancements

### 1. Google Analytics 4 (GA4) - RECOMMENDED ⭐

**Setup Steps:**

A. Create Google Analytics 4 property:
```
1. Go to analytics.google.com
2. Create new Property: "585 Wendy Dr - Real Estate"
3. Get Measurement ID: G-XXXXXXXXXX
```

B. Add GA4 script to index.html (in <head> before other scripts):
```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'send_page_view': true,
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure'
  });
</script>
```

**Benefits:**
- Track user journeys
- Conversion funnel analysis
- Custom events (form submissions)
- Real user metrics (CWV)
- Historical data comparison

**Cost:** FREE tier available (10M hits/month)

---

### 2. Custom Event Tracking - RECOMMENDED ⭐

**Implement Event Tracking for:**

A. Form Submissions:
```javascript
function trackFormSubmission(formName) {
  gtag('event', 'form_submission', {
    'form_name': formName,
    'timestamp': new Date().toISOString()
  });
}
```

B. CTA Button Clicks:
```javascript
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('nav-cta') || 
      e.target.classList.contains('btn-primary')) {
    gtag('event', 'cta_click', {
      'button_text': e.target.textContent,
      'location': e.target.closest('section')?.id || 'unknown'
    });
  }
});
```

C. Gallery Image Views:
```javascript
document.addEventListener('click', function(e) {
  if (e.target.closest('.gallery-item')) {
    gtag('event', 'gallery_view', {
      'image_name': e.target.alt || 'unknown'
    });
  }
});
```

---

### 3. Web Vitals Reporting - RECOMMENDED ⭐

**Track Core Web Vitals directly:**
```javascript
// Import from Google's web-vitals library
<script async src="https://cdn.jsdelivr.net/npm/web-vitals@3/dist/web-vitals.iife.js"></script>

<script>
  // Report all Web Vitals metrics to GA4
  window.addEventListener('load', () => {
    webVitals.getCLS(function(metric) {
      gtag('event', 'page_view', {
        'CLS': metric.value,
        'metric_id': metric.id
      });
    });
    
    webVitals.getFCP(function(metric) {
      gtag('event', 'page_view', {
        'FCP': metric.value
      });
    });
    
    webVitals.getLCP(function(metric) {
      gtag('event', 'page_view', {
        'LCP': metric.value
      });
    });
  });
</script>
```

**Result:** Real-time Web Vitals in GA4 dashboard

---

## 📈 Key Metrics to Monitor

### Conversion Metrics
1. **Form Completion Rate**
   - Tours scheduled / Unique visitors
   - Target: >2%

2. **Click-Through Rate (CTA)**
   - CTA clicks / Page views
   - Target: >5%

3. **Gallery Engagement**
   - Images viewed / Sessions
   - Target: >3 images/session

### Performance Metrics
1. **First Contentful Paint (FCP)**
   - Current: 3.7s
   - Target: <2.5s (Optimize opportunity)

2. **Largest Contentful Paint (LCP)**
   - Current: 3.7s
   - Target: <2.5s

3. **Core Web Vitals Status**
   - Track % of sessions with good CWV
   - Target: >75%

### User Engagement
1. **Time on Page**
   - Current baseline: TBD (measure after setup)
   - Target: >2:30 (luxury properties)

2. **Scroll Depth**
   - Track % users viewing each section
   - Target: >60% to Schools section

3. **Bounce Rate**
   - Current baseline: TBD
   - Target: <40%

---

## 🎯 Conversion Funnel Setup

**Recommended Conversion Path:**

```
Landing Page
    ↓ (96% reach)
Hero Section (86% scroll)
    ↓
Photo Gallery (72% view gallery)
    ↓
Property Details (65% read about)
    ↓
Schedule Tour CTA (8% click)
    ↓
Tour Booking Form (6% start form)
    ↓
Form Complete (5% submit) ← CONVERSION
```

**Setup in GA4:**
```
Admin → Conversions → New Conversion Event
Event name: form_complete
Description: User submitted tour booking form
```

---

## 📊 Dashboard Configuration

**Recommended GA4 Custom Dashboard:**

1. **Real-Time Overview**
   - Active users (right now)
   - Current page views
   - Top pages

2. **Conversion Funnel**
   - Landing → Gallery → CTA → Form → Complete
   - Step-by-step drop-off rates

3. **Core Web Vitals**
   - Good FCP %
   - Good LCP %
   - Good CLS %

4. **Traffic Sources**
   - Direct visits
   - Search referrals
   - Social referrals

---

## 🔐 Privacy Considerations

**Recommended Settings:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'anonymize_ip': true,        // Don't store full IP
  'allow_google_signals': false, // Respect privacy
  'cookie_flags': 'SameSite=None;Secure'
});
```

**Disclosure:**
- Add privacy notice mentioning Google Analytics
- Link to privacy policy
- Offer opt-out option (if required by law)

---

## 📱 Mobile-Specific Tracking

**Track Mobile-Unique Metrics:**
```javascript
const isMobile = window.innerWidth <= 768;

gtag('event', 'page_view', {
  'device_category': isMobile ? 'mobile' : 'desktop',
  'viewport_width': window.innerWidth,
  'screen_resolution': `${window.screen.width}x${window.screen.height}`
});
```

---

## 🎯 Implementation Priority

### Phase 1: Essential (Week 1)
- [x] Vercel Analytics (already active)
- [ ] Add GA4 script
- [ ] Setup conversion event for form submission

### Phase 2: Recommended (Week 2)
- [ ] Custom event tracking (CTA clicks, gallery views)
- [ ] Web Vitals reporting
- [ ] Conversion funnel configuration

### Phase 3: Advanced (Week 3+)
- [ ] Custom dashboard creation
- [ ] Segment analysis (mobile vs desktop)
- [ ] Cohort tracking for returning visitors

---

## 📊 Reporting Schedule

**Recommended Review Cadence:**

| Frequency | Metrics | Owner |
|-----------|---------|-------|
| Daily | New leads, traffic | Agent |
| Weekly | Conversion rates, CWV | Team |
| Monthly | Trends, ROI, CTA performance | Manager |
| Quarterly | Year-over-year comparison | Stakeholder |

---

## 🚀 Quick Start (15 minutes)

1. **Get GA4 ID** (5 min)
   - Visit analytics.google.com
   - Create property
   - Copy Measurement ID

2. **Add GA4 Script** (5 min)
   - Update index.html <head> section
   - Test with browser console

3. **Setup Conversion** (5 min)
   - Create form_complete event in GA4
   - Verify tracking in real-time

**Result:** Full RUM monitoring active

---

## ✅ Expected Outcomes (30 days)

### Metrics You'll Have:
- User journey mapping
- Conversion rate baseline
- Device/browser breakdown
- Geographic distribution
- Performance metrics by user

### Insights You'll Gain:
- Which sections drive conversions
- Mobile vs desktop performance
- Time-to-conversion patterns
- Traffic sources effectiveness

---

## 🎯 Final Verdict

**RUM MONITORING RATING: B+ (Good start, optimization opportunity)**

**Current State:**
- ✅ Vercel Analytics active (basic)
- ⚠️ No GA4 (recommended)
- ⚠️ No custom events
- ⚠️ No Web Vitals tracking

**After Recommended Setup:**
- ✅ Full funnel visibility
- ✅ Real conversion tracking
- ✅ Detailed user journey analysis
- ✅ Performance monitoring

**Implementation Effort:** 30-45 minutes  
**Cost:** FREE (GA4 free tier)  
**ROI:** High - data-driven optimization

**Recommendation:** Implement Phase 1 & 2 immediately for maximum insight into user behavior.

