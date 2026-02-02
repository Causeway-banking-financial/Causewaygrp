/**
 * Inquiry Service for Service Inquiries
 * Uses localStorage for demo purposes - in production, this would connect to a backend API
 */

import { nanoid } from 'nanoid';

export interface Inquiry {
  id: string;
  serviceName: string;
  serviceNameAr?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  language: 'en' | 'ar';
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'closed';
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'causeway_inquiries';

// Get all inquiries from localStorage
export function getInquiries(): Inquiry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save inquiries to localStorage
function saveInquiries(inquiries: Inquiry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
}

// Validation helpers
export interface ValidationErrors {
  name?: string;
  nameAr?: string;
  email?: string;
  emailAr?: string;
  phone?: string;
  phoneAr?: string;
}

export function validateInquiry(data: {
  name: string;
  email: string;
  phone?: string;
}): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
    errors.nameAr = 'يجب أن يكون الاسم حرفين على الأقل.';
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
    errors.emailAr = 'يرجى إدخال عنوان بريد إلكتروني صالح.';
  }

  // Phone validation (optional but must be valid if provided)
  if (data.phone && data.phone.trim()) {
    const phoneRegex = /^[\d\s\-\+\(\)]{7,20}$/;
    if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number.';
      errors.phoneAr = 'يرجى إدخال رقم هاتف صالح.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

// Submit inquiry
export interface SubmitResult {
  success: boolean;
  message: string;
  messageAr: string;
  inquiryId?: string;
  errors?: ValidationErrors;
}

export function submitInquiry(data: {
  serviceName: string;
  serviceNameAr?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  language: 'en' | 'ar';
}): SubmitResult {
  // Validate
  const validation = validateInquiry(data);
  if (!validation.valid) {
    return {
      success: false,
      message: 'Please correct the errors in the form.',
      messageAr: 'يرجى تصحيح الأخطاء في النموذج.',
      errors: validation.errors
    };
  }

  const inquiries = getInquiries();
  const now = new Date().toISOString();
  const id = nanoid();

  const newInquiry: Inquiry = {
    id,
    serviceName: data.serviceName,
    serviceNameAr: data.serviceNameAr,
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    phone: data.phone?.trim() || undefined,
    company: data.company?.trim() || undefined,
    message: data.message?.trim() || undefined,
    language: data.language,
    status: 'new',
    createdAt: now,
    updatedAt: now
  };

  inquiries.push(newInquiry);
  saveInquiries(inquiries);

  return {
    success: true,
    message: 'Thank you for your inquiry! Our team will contact you within 24-48 hours.',
    messageAr: 'شكراً لاستفسارك! سيتواصل معك فريقنا خلال 24-48 ساعة.',
    inquiryId: id
  };
}

// Get inquiry count
export function getInquiryCount(): number {
  return getInquiries().length;
}

// Get new inquiry count
export function getNewInquiryCount(): number {
  return getInquiries().filter(i => i.status === 'new').length;
}

// Export inquiries as CSV (for admin use)
export function exportInquiriesCSV(): string {
  const inquiries = getInquiries();
  const headers = ['ID', 'Service', 'Name', 'Email', 'Phone', 'Company', 'Message', 'Status', 'Created At'];
  const rows = inquiries.map(i => [
    i.id,
    i.serviceName,
    i.name,
    i.email,
    i.phone || '',
    i.company || '',
    (i.message || '').replace(/,/g, ';').replace(/\n/g, ' '),
    i.status,
    i.createdAt
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
