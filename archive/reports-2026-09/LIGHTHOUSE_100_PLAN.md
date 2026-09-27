# Lighthouse 100 Optimization Plan

**Goal:** Achieve 100/100 across all Lighthouse metrics (Performance, Accessibility, Best Practices, SEO)

**Current Scores:**
- Mobile: Performance 91, Accessibility 90, Best Practices 96, SEO 100
- Desktop: Performance 99, Accessibility 88, Best Practices 96, SEO 100

---

## ✅ Completed Optimizations

### 1. Render-Blocking Resources (Performance +5-8 points)
- ✅ Made Google Fonts non-render-blocking (media="print" + onload)
- ✅ Changed Vercel Analytics from `defer` to `async`
- ✅ Estimated savings: 420-1,750 ms

### 2. Cumulative Layout Shift (CLS) - Core Web Vital (Performance +3-5 points)
- ✅ Added explicit `width` and `height` to all gallery images
- ✅ Prevents layout shift during image load
- ✅ Current CLS: 0.022 → Target: < 0.1 (Good)

---

## 🔧 Remaining Fixes Needed

### Performance (91→100) - Need +9 points

#### High Impact Fixes:

**1. Image Optimization (Est. savings: 267-1,655 KiB)**
   - [ ] Convert images to WebP format with JPEG fallback
   - [ ] Create responsive image sets for different viewport sizes
   - [ ] Use `<picture>` tag for format selection
   - [ ] Lazy-load below-fold images
   - **Implementation:**
     ```html
     <picture>
       <source srcset="img.webp" type="image/webp">
       <source srcset="img.jpg" type="image/jpeg">
       <img src="img.jpg" alt="description" width="800" height="600" loading="lazy">
     </picture>
     ```

**2. Minify CSS (Est. savings: 5 KiB)**
   - [ ] Minify all inline CSS
   - [ ] Remove unused CSS rules
   - [ ] Use CSS shorthand (margin vs margin-top, etc.)
   - **Tools:** cssnano, PurgeCSS, or Vercel's built-in minification

**3. Avoid Non-Composited Animations (1 element)**
   - [ ] Identify the animated element
   - [ ] Use `transform` and `opacity` only (GPU-accelerated)
   - [ ] Avoid animating `width`, `height`, `top`, `left`, etc.
   - **Current issue:** Likely the scroll animations

**4. Break Up Long Main-Thread Tasks (1 long task)**
   - [ ] Defer non-critical JavaScript
   - [ ] Use `requestIdleCallback` for initialization code
   - [ ] Split large functions into smaller chunks

**5. Improve LCP (Largest Contentful Paint)**
   - [ ] Ensure hero image loads quickly
   - [ ] Pre-load critical images: `<link rel="preload" as="image" href="...">`
   - [ ] Use `fetchpriority="high"` on LCP image

---

### Accessibility (88-90→100) - Need +10-12 points

#### Critical Fixes:

**1. Form Accessibility (High Priority)**
   - [ ] Add proper `<label>` elements to ALL form inputs
   - [ ] Ensure labels have `for` attribute matching input `id`
   - **Current missing labels:**
     - Mortgage calculator inputs (dp, rate, term)
     - Inline form in FAQ section (name, email, phone)
   - **Implementation:**
     ```html
     <label for="tour-name">Your Name *</label>
     <input type="text" id="tour-name" name="name" required>
     ```

**2. Color Contrast (High Priority)**
   - [ ] Test all text/background color combinations
   - [ ] Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large)
   - [ ] Problematic areas to check:
     - Light text on light backgrounds
     - Placeholder text contrast
     - Hover state colors
   - **Tools:** WebAIM Contrast Checker, Lighthouse DevTools

**3. ARIA and Semantic HTML**
   - [ ] Add `aria-label` or `aria-labelledby` to form sections
   - [ ] Ensure all interactive elements have accessible names
   - [ ] Add `role="dialog"` to modal overlays with `aria-hidden`

**4. Heading Structure**
   - [ ] Verify only one `<h1>` per page
   - [ ] No skipped heading levels (h1→h3 is bad)
   - [ ] All headings have meaningful content

---

### Best Practices (96→100) - Need +4 points

**1. Image Optimization**
   - [ ] Use modern formats (WebP with fallback)
   - [ ] Proper aspect ratios

**2. HTTPS and Security**
   - ✅ Already using Vercel (HTTPS enabled)
   - [ ] Check for mixed HTTP/HTTPS content
   - [ ] Add security headers

**3. Deprecation Warnings**
   - [ ] Audit for deprecated APIs
   - [ ] Update third-party libraries

---

### SEO (100→100) - ✅ Already Perfect!
No changes needed - all SEO requirements met.

---

## Implementation Priority

### Phase 1 - Quick Wins (1-2 hours)
1. Add form labels (accessibility +5-6 points)
2. Fix color contrast (accessibility +2-3 points)
3. Minify CSS (performance +1 point)

### Phase 2 - Medium Effort (2-4 hours)
1. Optimize images to WebP (performance +5-8 points)
2. Fix animations to GPU-accelerated (performance +2-3 points)
3. Add image preload tags (performance +1-2 points)

### Phase 3 - Advanced (4+ hours)
1. Break up main-thread tasks
2. Full responsive image sets
3. Advanced performance tuning

---

## Quick Fixes Code Snippets

### Fix 1: Add Labels to Mortgage Calculator

```html
<div class="calc-input">
    <label for="dp">Down Payment: <span id="dpValue">$169,800</span></label>
    <input id="dp" type="range" min="0" max="400000" step="5000" value="169800" oninput="calc()">
</div>

<div class="calc-input">
    <label for="rate">Interest Rate: <span id="rateValue">6.5%</span></label>
    <input id="rate" type="range" min="3" max="9" step="0.125" value="6.5" oninput="calc()">
</div>

<div class="calc-input">
    <label for="term">Loan Term: <span id="termValue">30 Years</span></label>
    <input id="term" type="range" min="15" max="30" step="15" value="30" oninput="calc()">
</div>
```

### Fix 2: Improve Image Loading

```html
<!-- Current -->
<img src="img.jpg" alt="description" width="800" height="600" loading="lazy">

<!-- Better (with preload for hero) -->
<link rel="preload" as="image" href="img_585-n-wendy-dr-newbury-park-ca.jpg" fetchpriority="high">

<!-- Best (with WebP support) -->
<picture>
    <source srcset="img.webp" type="image/webp" media="(min-width: 768px)">
    <source srcset="img-small.webp" type="image/webp">
    <source srcset="img.jpg" type="image/jpeg" media="(min-width: 768px)">
    <img src="img-small.jpg" alt="description" width="800" height="600" loading="lazy">
</picture>
```

### Fix 3: GPU-Accelerated Animations

```css
/* Bad (non-composited) */
.animate {
    animation: move 1s ease;
}
@keyframes move {
    from { top: 0; }
    to { top: 100px; }
}

/* Good (composited) */
.animate {
    animation: move 1s ease;
}
@keyframes move {
    from { transform: translateY(0); }
    to { transform: translateY(100px); }
}
```

---

## Testing & Validation

### Run Lighthouse Test:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Mobile" or "Desktop"
4. Click "Analyze page load"
5. Wait for report

### Tools to Use:
- **Contrast checker:** WebAIM, Lighthouse DevTools
- **CSS minifier:** cssnano, Vercel's built-in
- **Image converter:** ImageMagick, TinyPNG, Squoosh
- **Accessibility audit:** axe DevTools, WAVE, Lighthouse

---

## Expected Improvements

| Metric | Current | After Phase 1 | After Phase 2 | After Phase 3 |
|--------|---------|---------------|---------------|---------------|
| Performance (Mobile) | 91 | 93 | 97 | 100 |
| Performance (Desktop) | 99 | 99+ | 100 | 100 |
| Accessibility | 88-90 | 96-98 | 99 | 100 |
| Best Practices | 96 | 97 | 98 | 100 |
| SEO | 100 | 100 | 100 | 100 |

---

## Next Steps

1. ✅ Completed: Defer render-blocking fonts & scripts, add image dimensions
2. ⏭️ Priority: Add form labels (quick +5-6 points)
3. ⏭️ Then: Optimize images to WebP (medium +5-8 points)
4. ⏭️ Then: Fix animations and long tasks
5. ⏭️ Finally: Fine-tune all remaining metrics

**Estimated time to 100/100:** 4-8 hours of development

---

**Last Updated:** 2026-09-16  
**Status:** In Progress  
**Target Completion:** 2026-09-17
