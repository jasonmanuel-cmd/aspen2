// Vercel Serverless Function: /api/lead.js
// Handles consultation requests, lot feasibility reviews, and cost estimator quotes.

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const {
      name,
      phone,
      email = '',
      community = 'Tehachapi',
      timeline = 'Planning & Researching',
      notes = '',
      plan = '',
      source = 'Website Consultation Form',
      honeypot = ''
    } = data || {};

    // 1. Bot trap: If honeypot is filled, return fake success
    if (honeypot && honeypot.trim() !== '') {
      return res.status(200).json({ success: true, message: 'Received' });
    }

    // 2. Validate required inputs
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name and phone number are required.'
      });
    }

    const leadPayload = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      community,
      timeline,
      plan,
      notes: notes.trim(),
      source
    };

    console.log('[ASPEN II LEAD CAPTURED]:', JSON.stringify(leadPayload, null, 2));

    // 3. Dispatch to Web3Forms or Resend if environment variables are set
    const destinationEmail = process.env.NOTIFICATION_EMAIL || 'hello@aspen2homes.com';
    const web3formsKey = process.env.WEB3FORMS_KEY;
    const resendKey = process.env.RESEND_API_KEY;

    let emailSent = false;

    // Optional: Dispatch via Web3Forms if key exists
    if (web3formsKey) {
      try {
        const w3fRes = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `New Lead: ${name} (${community} - ${plan || 'Consultation'})`,
            from_name: 'Aspen II Homes Web Lead',
            to_email: destinationEmail,
            ...leadPayload
          })
        });
        if (w3fRes.ok) emailSent = true;
      } catch (err) {
        console.warn('Web3Forms dispatch error:', err.message);
      }
    }

    // Optional: Dispatch via Resend if key exists
    if (!emailSent && resendKey) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`
          },
          body: JSON.stringify({
            from: 'Aspen II Homes <leads@aspen2homes.com>',
            to: [destinationEmail],
            subject: `[New Lead] ${name} - ${community} (${plan || 'General Inquiry'})`,
            html: `
              <h2>New Build Consultation Lead</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              <p><strong>Email:</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : 'Not provided'}</p>
              <p><strong>Community:</strong> ${community}</p>
              <p><strong>Timeline:</strong> ${timeline}</p>
              <p><strong>Floor Plan:</strong> ${plan || 'None selected'}</p>
              <p><strong>Notes:</strong><br>${notes ? notes.replace(/\n/g, '<br>') : 'None'}</p>
              <hr>
              <small>Captured via ${source} at ${leadPayload.timestamp}</small>
            `
          })
        });
        if (resendRes.ok) emailSent = true;
      } catch (err) {
        console.warn('Resend dispatch error:', err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Consultation request received successfully.',
      lead: {
        name: leadPayload.name,
        community: leadPayload.community
      },
      emailDispatched: emailSent
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return res.status(500).json({
      success: false,
      error: 'An error occurred while processing the consultation request.'
    });
  }
}
