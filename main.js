/* ============================================================
   Aspen II Homes — shared site script
   Safe to include on every page; each block guards its targets.
   ============================================================ */
(function () {
  'use strict';

  // A once-per-tab opening film, with immediate keyboard-accessible entry.
  var opening = document.getElementById('openingScreen');
  var openingVideo = document.getElementById('openingVideo');
  var openingSkip = document.getElementById('openingSkip');
  var openingSeen = false;
  try { openingSeen = sessionStorage.getItem('aspen-opening-seen') === '1'; } catch (e) {}
  if (opening && openingVideo && !openingSeen &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var openingTimer;
    function finishOpening() {
      clearTimeout(openingTimer);
      openingVideo.pause();
      opening.close();
      document.body.classList.remove('opening-active');
    }
    try { sessionStorage.setItem('aspen-opening-seen', '1'); } catch (e) {}
    opening.showModal();
    document.body.classList.add('opening-active');
    openingSkip.focus();
    openingSkip.addEventListener('click', finishOpening);
    opening.addEventListener('cancel', function (event) {
      event.preventDefault();
      finishOpening();
    });
    openingVideo.addEventListener('ended', finishOpening);
    openingVideo.addEventListener('error', finishOpening);
    function playOpening() {
      if (!opening.open) return;
      openingVideo.src = 'media/aspen-website-open.mp4';
      openingTimer = setTimeout(finishOpening, 25000);
      var playback = openingVideo.play();
      if (playback) playback.catch(finishOpening);
    }
    if (document.readyState === 'complete') playOpening();
    else window.addEventListener('load', playOpening, { once: true });
    window.addEventListener('pagehide', finishOpening);
  }

  // Repeat the announcement visually for a seamless mobile marquee.
  document.querySelectorAll('.topbar-track').forEach(function (track) {
    var message = document.createElement('span');
    message.className = 'topbar-message';
    while (track.firstChild) message.appendChild(track.firstChild);
    track.appendChild(message);
    var repeat = message.cloneNode(true);
    repeat.classList.add('topbar-repeat');
    repeat.setAttribute('aria-hidden', 'true');
    track.appendChild(repeat);
    track.classList.add('topbar-marquee');
  });

  // Let the hero and fonts finish before fetching gallery photographs.
  // Smaller observer margins avoid native lazy-loading's large offscreen batch.
  function observePhotographs() {
    var photoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var photo = entry.target;
        if (photo.dataset.srcset) photo.srcset = photo.dataset.srcset;
        photo.src = photo.dataset.src;
        delete photo.dataset.src;
        photoObserver.unobserve(photo);
      });
    }, { rootMargin: '200px 0px' });
    document.querySelectorAll('img[data-src]').forEach(function (photo) {
      if (!photo.closest('.film-frame')) photoObserver.observe(photo);
    });
  }
  if (document.readyState === 'complete') observePhotographs();
  else window.addEventListener('load', observePhotographs, { once: true });

  // ── Nav scroll state ──
  var mainNav = document.getElementById('mainNav');
  if (mainNav) {
    // Interior pages request a permanently solid nav via data-nav="solid".
    if (mainNav.getAttribute('data-nav') === 'solid') {
      mainNav.classList.add('solid');
    } else {
      var navTick = false;
      window.addEventListener('scroll', function () {
        if (navTick) return;
        navTick = true;
        requestAnimationFrame(function () {
          mainNav.classList.toggle('scrolled', window.scrollY > 60);
          navTick = false;
        });
      }, { passive: true });
    }
  }

  // ── Hamburger / mobile nav ──
  var navToggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.classList.remove('open');
    mobileNav.inert = true;
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      mobileNav.inert = !isOpen;
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileNav);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileNav();
    });
  }
  window.closeMobileNav = closeMobileNav;

  // ── Scroll reveal ──
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  // ── Smooth scroll for same-page anchors ──
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var href = anchor.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(href);
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── FAQ accordion ──
  window.toggleFaq = function (btn) {
    var item = btn.closest('.faq-item');
    var answer = item.querySelector('.faq-answer');
    var isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function (fi) {
      fi.classList.remove('open');
      fi.querySelector('.faq-answer').style.maxHeight = '0';
    });
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  };

  // ── Animated counter ──
  var counterEl = document.getElementById('viewCounter');
  if (counterEl) {
    var target = parseInt(counterEl.getAttribute('data-target') || '1956', 10);
    var counterObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        var current = 0;
        var increment = target / 60;
        var timer = setInterval(function () {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          counterEl.textContent = Math.floor(current).toLocaleString() + '+';
        }, 20);
        counterObserver.disconnect();
      }
    });
    counterObserver.observe(counterEl);
  }

  // ── Gallery lightbox (uses window.galleryData if present) ──
  var lightbox = document.getElementById('lightbox');
  if (lightbox && Array.isArray(window.galleryData)) {
    var data = window.galleryData;
    var current = 0;
    var imgEl = document.getElementById('lightboxImg');
    var capEl = document.getElementById('lightboxCaption');
    var galleryTrigger;
    function render() {
      imgEl.src = data[current].src;
      imgEl.alt = data[current].caption;
      capEl.textContent = (current + 1) + ' / ' + data.length + ' — ' + data[current].caption;
    }
    window.openLightbox = function (i) {
      galleryTrigger = document.activeElement;
      current = i; render();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
      lightbox.querySelector('.lightbox-close').focus();
    };
    window.closeLightbox = function () {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (galleryTrigger) galleryTrigger.focus({ preventScroll: true });
    };
    window.navLightbox = function (dir) {
      current = (current + dir + data.length) % data.length; render();
    };
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Tab') {
        var controls = Array.from(lightbox.querySelectorAll('button'));
        var first = controls[0], last = controls[controls.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      if (e.key === 'Escape') window.closeLightbox();
      if (e.key === 'ArrowRight') window.navLightbox(1);
      if (e.key === 'ArrowLeft') window.navLightbox(-1);
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) window.closeLightbox();
    });
  }

  // ── Lead form helpers ──
  var CRM_URL = 'https://www.harbisonstandard.com/hq/api/openhouse';
  var CRM_LOG_URL = 'https://www.harbisonstandard.com/hq/api/openhouse-log';
  var FORMSPREE_URL = 'https://formspree.io/f/xqpkdwrp';
  var isValidEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };
  var isValidPhone = function (v) { return /^[\d\s\-\+\(\)]{10,}$/.test(v); };
  function nowStamp() {
    return new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  }
  function persistLead(name, email, phone, dt) {
    sessionStorage.setItem('lastSubmissionName', name);
    sessionStorage.setItem('lastSubmissionEmail', email);
    sessionStorage.setItem('lastSubmissionPhone', phone);
    sessionStorage.setItem('lastSubmissionTime', dt);
  }
  function goThankYou(name, email, phone, dt, delay) {
    setTimeout(function () {
      window.location.href = 'thank-you.html?name=' + encodeURIComponent(name) +
        '&email=' + encodeURIComponent(email) + '&phone=' + encodeURIComponent(phone) +
        '&time=' + encodeURIComponent(dt);
    }, delay);
  }

  // ── Tour / contact form ──
  var contactForm = document.getElementById('contactForm');
  if (contactForm) {
    var requestedModel = new URLSearchParams(window.location.search).get('model');
    var interestSelect = document.getElementById('tour-interest');
    if (requestedModel && interestSelect) {
      var matchingOption = Array.from(interestSelect.options).find(function (option) {
        return option.value === requestedModel || option.value === requestedModel + ' — Reserve & Customize';
      });
      if (matchingOption) interestSelect.value = matchingOption.value;
    }
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var name = (document.getElementById('tour-name').value || '').trim();
      var email = (document.getElementById('tour-email').value || '').trim();
      var phone = (document.getElementById('tour-phone').value || '').trim();
      var pref = document.getElementById('tour-contact-pref').value;
      if (!name) { alert('Please enter your name'); return; }
      if (!email && !phone) { alert('Please provide at least an email or phone number'); return; }
      if (email && !isValidEmail(email)) { alert('Please enter a valid email address'); return; }
      if (phone && !isValidPhone(phone)) { alert('Please enter a valid phone number'); return; }

      var btn = contactForm.querySelector('.form-submit');
      var label = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        var dt = nowStamp();
        var payload = {
          name: name, email: email, phone: phone, contact_preference: pref,
          preferred_time: (document.getElementById('tour-time') || {}).value || '',
          property: contactForm.getAttribute('data-property') || 'Aspen II Homes',
          location: contactForm.getAttribute('data-property') || 'Aspen II Homes',
          interest: (document.getElementById('tour-interest') || {}).value || '',
          source: 'Contact / Tour Form', date_time: dt, submission_date: new Date().toISOString()
        };
        var crmOk = false;
        try {
          var res = await fetch(CRM_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(20000) });
          var r = await res.json();
          if (res.ok && r.success === true) crmOk = true;
        } catch (err) { console.warn('[v0] CRM failed:', err.message); }
        var fsOk = false;
        try {
          var b = await fetch(FORMSPREE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({}, payload, { _subject: 'New Lead — Aspen II Homes', _replyto: email })), signal: AbortSignal.timeout(15000) });
          if (b.ok) fsOk = true;
        } catch (err) { console.error('[v0] Formspree failed:', err.message); }
        if (!crmOk && !fsOk) throw new Error('Request not received. Please try again.');

        var c = parseInt(localStorage.getItem('openHouseCount') || '0', 10);
        localStorage.setItem('openHouseCount', c + 1);
        persistLead(name, email, phone, dt);
        btn.textContent = 'Sent — Thank You';
        goThankYou(name, email, phone, dt, 800);
      } catch (err) {
        btn.textContent = label + ' — Try Again';
        btn.disabled = false;
        console.error('[v0] Form error:', err);
      }
    });
  }

  // ── Open house registration ──
  async function submitOpenHouse(payload) {
    try {
      var res = await fetch(CRM_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(20000) });
      var r = await res.json();
      if (res.ok && r.success === true) return r;
    } catch (err) { console.warn('[v0] CRM failed, trying Formspree:', err.message); }
    var backup = await fetch(FORMSPREE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(Object.assign({}, payload, { _subject: 'Open House Registration', _replyto: payload.email })), signal: AbortSignal.timeout(15000) });
    if (!backup.ok) throw new Error('Registration was not received. Please retry.');
    return { success: true, delivery: 'formspree' };
  }

  async function updateRegistrationCount() {
    var countEl = document.getElementById('registrationCount');
    if (!countEl) return;
    var localCount = parseInt(localStorage.getItem('openHouseCount') || '0', 10);
    countEl.textContent = localCount;
    try {
      var res = await fetch(CRM_LOG_URL, { method: 'GET', headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(8000) });
      var r = await res.json();
      if (r.success && r.registrations) countEl.textContent = Math.max(localCount, r.registrations.length);
    } catch (err) { console.warn('[v0] Could not fetch CRM count:', err.message); }
  }

  var openHouseForm = document.getElementById('openHouseForm');
  if (openHouseForm) {
    var countTarget = document.getElementById('registrationCount');
    if (countTarget) {
      countTarget.textContent = parseInt(localStorage.getItem('openHouseCount') || '0', 10);
      var countObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { updateRegistrationCount(); countObserver.disconnect(); }
      });
      countObserver.observe(countTarget);
    }
    openHouseForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      var name = (openHouseForm.querySelector('input[name="name"]').value || '').trim();
      var email = (openHouseForm.querySelector('input[name="email"]').value || '').trim();
      var phone = (openHouseForm.querySelector('input[name="phone"]').value || '').trim();
      if (!name) { alert('Please enter your name'); return; }
      if (!email && !phone) { alert('Please provide at least an email or phone number'); return; }
      if (email && !isValidEmail(email)) { alert('Please enter a valid email address'); return; }
      if (phone && !isValidPhone(phone)) { alert('Please enter a valid phone number'); return; }

      var btn = openHouseForm.querySelector('button[type="submit"]');
      btn.textContent = 'Registering…';
      btn.style.opacity = '0.7';
      btn.disabled = true;
      var dt = nowStamp();
      var payload = {
        name: name, email: email, phone: phone,
        property: openHouseForm.getAttribute('data-property') || 'Aspen II Homes',
        location: openHouseForm.getAttribute('data-property') || 'Aspen II Homes',
        source: 'Open House QR Code', date_time: dt, submission_date: new Date().toISOString()
      };
      try {
        await submitOpenHouse(payload);
        btn.textContent = 'Registered!';
        btn.style.background = 'linear-gradient(135deg,#2E554A,#1F3A32)';
        btn.style.color = '#fff';
        persistLead(name, email, phone, dt);
        var c = parseInt(localStorage.getItem('openHouseCount') || '0', 10);
        localStorage.setItem('openHouseCount', c + 1);
        updateRegistrationCount();
        goThankYou(name, email, phone, dt, 2000);
      } catch (err) {
        console.error('[v0] Error:', err);
        btn.textContent = 'Registration Error — Try Again';
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
  }

  // ── Cinematic scroll film ──
  // Drives frame crossfades + caption sync from the scroll progress of a tall
  // section whose inner stage is position:sticky. Zero dependencies.
  var film = document.getElementById('film');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (film) {
    var frames = [].slice.call(film.querySelectorAll('.film-frame'));
    var caps = [].slice.call(film.querySelectorAll('.film-cap'));
    var dots = [].slice.call(film.querySelectorAll('.film-dot'));
    var bar = film.querySelector('.film-progress');
    var n = Math.max(frames.length, caps.length);
    var filmTick = false;
    var filmInView = false;
    function loadFrame(index) {
      var frame = frames[index];
      var photo = frame && frame.querySelector('img');
      if (photo && photo.dataset.src) {
        if (photo.dataset.srcset) photo.srcset = photo.dataset.srcset;
        photo.src = photo.dataset.src;
        delete photo.dataset.src;
      }
    }
    var filmObserver = new IntersectionObserver(function (entries) {
      filmInView = entries[0].isIntersecting;
      if (filmInView) { loadFrame(0); renderFilm(); }
    }, { rootMargin: '0px' });
    filmObserver.observe(film);

    function renderFilm() {
      if (!filmInView) return;
      var rect = film.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = film.offsetHeight - vh;
      var p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      if (bar) bar.style.width = (p * 100) + '%';

      // Which chapter are we in?
      var idx = Math.min(n - 1, Math.floor(p * n));
      loadFrame(idx);
      loadFrame(Math.min(n - 1, idx + 1));
      // Local progress within the chapter (0..1) for subtle motion.
      var local = (p * n) - idx;

      frames.forEach(function (f, i) {
        var active = i === idx;
        f.style.opacity = active ? '1' : '0';
        // gentle parallax scale on the active frame
        f.style.transform = active ? ('scale(' + (1.04 + local * 0.06).toFixed(4) + ')') : 'scale(1.02)';
      });
      caps.forEach(function (c, i) { c.classList.toggle('on', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }

    if (reduceMotion) {
      // Show the first frame/caption statically.
      if (frames[0]) { frames[0].style.opacity = '1'; frames[0].style.transform = 'none'; }
      if (caps[0]) caps[0].classList.add('on');
      if (dots[0]) dots[0].classList.add('on');
    } else {
      window.addEventListener('scroll', function () {
        if (filmTick) return;
        filmTick = true;
        requestAnimationFrame(function () { renderFilm(); filmTick = false; });
      }, { passive: true });
      window.addEventListener('resize', renderFilm, { passive: true });
      // The observer starts rendering when the film approaches the viewport.
    }
  }

  // ── Release countdown ──
  var cd = document.getElementById('countdown');
  if (cd) {
    var targetAttr = cd.getAttribute('data-deadline');
    var deadline = targetAttr ? new Date(targetAttr).getTime() : (Date.now() + 1000 * 60 * 60 * 24 * 21);
    var elD = cd.querySelector('[data-cd="d"]');
    var elH = cd.querySelector('[data-cd="h"]');
    var elM = cd.querySelector('[data-cd="m"]');
    var elS = cd.querySelector('[data-cd="s"]');
    function pad(v) { return (v < 10 ? '0' : '') + v; }
    function tickCountdown() {
      var diff = Math.max(0, deadline - Date.now());
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      if (elD) elD.textContent = pad(d);
      if (elH) elH.textContent = pad(h);
      if (elM) elM.textContent = pad(m);
      if (elS) elS.textContent = pad(s);
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  // ── Magnetic buttons ──
  if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.mag').forEach(function (el) {
      var strength = 0.28;
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - (r.left + r.width / 2);
        var y = e.clientY - (r.top + r.height / 2);
        el.style.transform = 'translate(' + (x * strength) + 'px,' + (y * strength) + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = 'translate(0,0)'; });
    });
  }

  // ── Page transition curtain ──
  // Intercept same-site navigations for a quick cinematic wipe.
  var curtain = document.querySelector('.curtain');
  if (!reduceMotion && curtain) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' ||
          /^(mailto:|tel:|sms:|https?:\/\/)/i.test(href)) return;
      a.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        curtain.classList.add('down');
        setTimeout(function () { window.location.href = href; }, 460);
      });
    });
    // Restore if navigation is cancelled (e.g. back-forward cache).
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) curtain.classList.remove('down');
    });
  }

  // ── Service worker kill switch ──
  // The old single-page site shipped a cache-first service worker that served
  // stale HTML and broke navigation. Unregister any existing worker and purge
  // its caches so every visitor gets the live multi-page site.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (reg) { reg.unregister(); });
    }).catch(function () {});
    if (window.caches && caches.keys) {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) { caches.delete(k); });
      }).catch(function () {});
    }
  }
})();
