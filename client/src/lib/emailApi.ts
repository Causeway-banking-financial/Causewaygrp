/**
 * CauseWay Email API Client
 * Frontend helper for sending form data to the server-side email API
 */

const API_BASE = '/api/email';

interface ApiResponse {
  success: boolean;
  message: string;
  recipient?: string;
}

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

async function sendRequest<T>(endpoint: string, data: T): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Email API error:', error);
    return {
      success: false,
      message: 'Network error. Please try again.',
    };
  }
}

export async function sendContactForm(data: ContactFormData): Promise<ApiResponse> {
  return sendRequest('/contact', data);
}

export async function sendBookingRequest(data: BookingFormData): Promise<ApiResponse> {
  return sendRequest('/booking', data);
}

export async function sendTrainingRegistration(data: TrainingFormData): Promise<ApiResponse> {
  return sendRequest('/training', data);
}

export async function sendNewsletterSubscription(data: NewsletterFormData): Promise<ApiResponse> {
  return sendRequest('/newsletter', data);
}

export async function sendYetoNotification(data: YetoNotificationData): Promise<ApiResponse> {
  return sendRequest('/yeto-notify', data);
}

export type { 
  ApiResponse, 
  ContactFormData, 
  BookingFormData, 
  TrainingFormData, 
  NewsletterFormData, 
  YetoNotificationData 
};
