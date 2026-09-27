# CRM Integration Guide — 585 N Wendy Dr Landing Page

## Overview

Your landing page is currently set up to send registration data to **Formspree** (as a fallback). To connect your own CRM backend at `harbisonstandard.com/hq`, follow this guide.

---

## Current Data Flow

```
User Registration → Formspree → Your Email + Dashboard
                 → (Falls back if CRM unavailable)
```

**To upgrade to:**

```
User Registration → Your CRM → harbisonstandard.com/hq
                 → Formspree (as backup)
```

---

## Step 1: Create the CRM API Endpoint

You need to create an API endpoint at:
```
http://harbisonstandard.com/hq/api/openhouse
```

### **Endpoint Requirements:**

**Method:** `POST`

**Accepts JSON:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "(555) 123-4567",
  "property": "585 N Wendy Dr, Newbury Park, CA 91320",
  "location": "585 N Wendy Dr, Newbury Park, CA 91320",
  "source": "Open House QR Code",
  "date_time": "09/12/2026 2:45:30 PM",
  "submission_date": "2026-09-12T14:45:30.000Z"
}
```

**Should Return:**
```json
{
  "success": true,
  "message": "Registration recorded"
}
```

### **Example Backend (Node.js/Express):**

```javascript
app.post('/hq/api/openhouse', async (req, res) => {
  const { name, email, phone, property, location, source, date_time, submission_date } = req.body;

  try {
    // Save to your database
    const registration = await Registration.create({
      name,
      email,
      phone,
      property,
      location,
      source,
      date_time,
      submission_date,
      created_at: new Date()
    });

    res.json({ success: true, message: 'Registration recorded' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### **Example Backend (Python/Flask):**

```python
from flask import Flask, request, jsonify
from datetime import datetime

app = Flask(__name__)

@app.route('/hq/api/openhouse', methods=['POST'])
def open_house_registration():
    try:
        data = request.json
        
        # Save to your database
        registration = {
            'name': data.get('name'),
            'email': data.get('email'),
            'phone': data.get('phone'),
            'property': data.get('property'),
            'location': data.get('location'),
            'source': data.get('source'),
            'date_time': data.get('date_time'),
            'submission_date': data.get('submission_date'),
            'created_at': datetime.now()
        }
        
        # TODO: Save to your database
        # db.registrations.insert_one(registration)
        
        return jsonify({'success': True, 'message': 'Registration recorded'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
```

### **Example Backend (PHP):**

```php
<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        $registration = [
            'name' => $input['name'] ?? '',
            'email' => $input['email'] ?? '',
            'phone' => $input['phone'] ?? '',
            'property' => $input['property'] ?? '',
            'location' => $input['location'] ?? '',
            'source' => $input['source'] ?? '',
            'date_time' => $input['date_time'] ?? '',
            'submission_date' => $input['submission_date'] ?? '',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        // TODO: Save to your database
        // INSERT INTO registrations VALUES (...)
        
        echo json_encode(['success' => true, 'message' => 'Registration recorded']);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
}
?>
```

---

## Step 2: How the Forms Send Data

### **From index.html (Landing Page Form):**

```javascript
// In the form submission handler
const formData = {
  name: name,
  email: email,
  phone: phone,
  property: '585 N Wendy Dr, Newbury Park, CA 91320',
  location: '585 N Wendy Dr, Newbury Park, CA 91320',
  source: 'Open House QR Code',
  date_time: dateTime,
  submission_date: new Date().toISOString()
};

// Try CRM first
fetch('http://harbisonstandard.com/hq/api/openhouse', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
// Falls back to Formspree if CRM fails
```

---

## Step 3: Test Your Endpoint

Once your endpoint is live, test it:

### **Using cURL:**
```bash
curl -X POST http://harbisonstandard.com/hq/api/openhouse \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "(555) 123-4567",
    "property": "585 N Wendy Dr, Newbury Park, CA 91320",
    "location": "585 N Wendy Dr, Newbury Park, CA 91320",
    "source": "Open House QR Code",
    "date_time": "09/12/2026 2:45:30 PM",
    "submission_date": "2026-09-12T14:45:30.000Z"
  }'
```

### **Using Postman:**
1. Create a POST request to `http://harbisonstandard.com/hq/api/openhouse`
2. Set header: `Content-Type: application/json`
3. Paste the JSON above in the body
4. Click Send
5. Should return: `{"success": true, "message": "Registration recorded"}`

---

## Step 4: Verify It's Working

Once the endpoint is live:

1. **Test from landing page:** Fill out form on index.html
2. **Check your CRM:** Verify data appears in your database
3. **Check email:** Formspree still sends backup email (even if CRM works)
4. **View on Sign-In Log:** Go to signin-log.html (links to Formspree dashboard)

---

## Data Persistence & Recovery

### **In Case of CRM Downtime:**
- Formspree automatically receives the data as a backup
- User still gets success confirmation
- You can retrieve data from Formspree: https://formspree.io/f/xqpkdwrp

### **Access Your Data:**
- **CRM:** Direct database query to `harbisonstandard.com/hq`
- **Formspree:** Dashboard at https://formspree.io/f/xqpkdwrp
- **Sign-In Log:** View at `signin-log.html` on your site (links to Formspree)
- **Live Count:** Shows on landing page (tracked locally on phone/browser)

---

## Summary

| Component | Status | Data Goes To |
|-----------|--------|--------------|
| Landing Page Form | ✅ Ready | CRM (primary) + Formspree (backup) |
| QR Code Form | ✅ Ready | CRM (primary) + Formspree (backup) |
| Live Count | ✅ Ready | Browser (localStorage) |
| Sign-In Log | ✅ Ready | Formspree (for now) |

Once your CRM endpoint is live, all data will flow there first, with Formspree as an automatic fallback.

---

## Questions?

- **How do I know it's working?** Test an endpoint with cURL or Postman, then submit a test form
- **What if my endpoint goes down?** Formspree catches all data as backup
- **Can I see the data in real-time?** Yes, via your CRM database or Formspree dashboard
- **Do I need to remove Formspree?** No, keep it as a backup — it's free and helpful

Ready to go live! 🚀
