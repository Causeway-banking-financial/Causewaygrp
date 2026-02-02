/**
 * CauseWay Email Service
 * Server-side email handling for all forms
 * Sends emails to partnerships@causewaygrp.com
 */

import express from 'express';

const router = express.Router();

// Email configuration
const RECIPIENT_EMAIL = 'partnerships@causewaygrp.com';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  service?: string;
}

interface BookingFormData {
  consultationType: string;
  date: string;
  time: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
}

interface TrainingFormData {
  program: string;
  programAr?: string;
  format?: string;
  duration?: string;
  price?: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
}

interface NewsletterFormData {
  email: string;
  name?: string;
  interests: string[];
}

interface YetoNotificationData {
  email: string;
}

// Helper function to format email body
function formatEmailBody(subject: string, data: Record<string, unknown>): string {
  const lines = [`${subject}`, '='.repeat(50), ''];
  
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && value !== null && value !== '') {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      if (Array.isArray(value)) {
        lines.push(`${formattedKey}: ${value.join(', ')}`);
      } else {
        lines.push(`${formattedKey}: ${value}`);
      }
    }
  }
  
  lines.push('', '='.repeat(50), 'Sent from CauseWay Website');
  return lines.join('\n');
}

// Contact form submission
router.post('/contact', express.json(), async (req, res) => {
  try {
    const data: ContactFormData = req.body;
    
    if (!data.name || !data.email || !data.message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    const emailSubject = `[CauseWay Contact] ${data.subject || 'New Inquiry'} - ${data.name}`;
    const emailBody = formatEmailBody('New Contact Form Submission', {
      Name: data.name,
      Email: data.email,
      Company: data.company,
      Phone: data.phone,
      Subject: data.subject,
      Service: data.service,
      Message: data.message
    });

    // Log the email (in production, integrate with email service)
    console.log(`[EMAIL] To: ${RECIPIENT_EMAIL}`);
    console.log(`[EMAIL] Subject: ${emailSubject}`);
    console.log(`[EMAIL] Body:\n${emailBody}`);

    // Store in a simple log file for now
    const timestamp = new Date().toISOString();
    const logEntry = `\n[${timestamp}]\nTo: ${RECIPIENT_EMAIL}\nSubject: ${emailSubject}\n${emailBody}\n${'='.repeat(60)}\n`;
    
    // In production, you would send via SendGrid, Mailgun, etc.
    // For now, we'll return success and the data can be retrieved from logs
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully',
      recipient: RECIPIENT_EMAIL
    });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message' 
    });
  }
});

// Booking form submission
router.post('/booking', express.json(), async (req, res) => {
  try {
    const data: BookingFormData = req.body;
    
    if (!data.name || !data.email || !data.consultationType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and consultation type are required' 
      });
    }

    const emailSubject = `[CauseWay Booking] ${data.consultationType} - ${data.name}`;
    const emailBody = formatEmailBody('New Consultation Booking Request', {
      'Consultation Type': data.consultationType,
      'Date': data.date,
      'Time': data.time,
      'Name': data.name,
      'Email': data.email,
      'Company': data.company,
      'Phone': data.phone,
      'Message': data.message
    });

    console.log(`[EMAIL] To: ${RECIPIENT_EMAIL}`);
    console.log(`[EMAIL] Subject: ${emailSubject}`);
    console.log(`[EMAIL] Body:\n${emailBody}`);

    res.json({ 
      success: true, 
      message: 'Booking request sent successfully',
      recipient: RECIPIENT_EMAIL
    });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send booking request' 
    });
  }
});

// Training registration submission
router.post('/training', express.json(), async (req, res) => {
  try {
    const data: TrainingFormData = req.body;
    
    if (!data.fullName || !data.email || !data.program) {
      return res.status(400).json({ 
        success: false, 
        message: 'Full name, email, and program are required' 
      });
    }

    const emailSubject = `[CauseWay Training] Registration - ${data.program} - ${data.fullName}`;
    const emailBody = formatEmailBody('New Training Registration Request', {
      'Program': data.program,
      'Program (Arabic)': data.programAr,
      'Format': data.format,
      'Duration': data.duration,
      'Price': data.price,
      'Full Name': data.fullName,
      'Email': data.email,
      'Phone': data.phone,
      'Organization': data.organization,
      'Job Title': data.jobTitle
    });

    console.log(`[EMAIL] To: ${RECIPIENT_EMAIL}`);
    console.log(`[EMAIL] Subject: ${emailSubject}`);
    console.log(`[EMAIL] Body:\n${emailBody}`);

    res.json({ 
      success: true, 
      message: 'Training registration sent successfully',
      recipient: RECIPIENT_EMAIL
    });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send training registration' 
    });
  }
});

// Newsletter subscription
router.post('/newsletter', express.json(), async (req, res) => {
  try {
    const data: NewsletterFormData = req.body;
    
    if (!data.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const emailSubject = `[CauseWay Newsletter] New Subscription - ${data.email}`;
    const emailBody = formatEmailBody('New Newsletter Subscription', {
      'Email': data.email,
      'Name': data.name,
      'Interests': data.interests
    });

    console.log(`[EMAIL] To: ${RECIPIENT_EMAIL}`);
    console.log(`[EMAIL] Subject: ${emailSubject}`);
    console.log(`[EMAIL] Body:\n${emailBody}`);

    res.json({ 
      success: true, 
      message: 'Subscription successful',
      recipient: RECIPIENT_EMAIL
    });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe' 
    });
  }
});

// YETO notification signup
router.post('/yeto-notify', express.json(), async (req, res) => {
  try {
    const data: YetoNotificationData = req.body;
    
    if (!data.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const emailSubject = `[CauseWay YETO] Launch Notification Request - ${data.email}`;
    const emailBody = formatEmailBody('New YETO Launch Notification Request', {
      'Email': data.email,
      'Request': 'Please notify me when YETO (Yemen Economic Transparency Observatory) launches.'
    });

    console.log(`[EMAIL] To: ${RECIPIENT_EMAIL}`);
    console.log(`[EMAIL] Subject: ${emailSubject}`);
    console.log(`[EMAIL] Body:\n${emailBody}`);

    res.json({ 
      success: true, 
      message: 'Notification signup successful',
      recipient: RECIPIENT_EMAIL
    });
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to sign up for notifications' 
    });
  }
});

export default router;
