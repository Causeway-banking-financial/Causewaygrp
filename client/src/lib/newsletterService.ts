/**
 * Newsletter Service with Double Opt-in Flow
 * Uses localStorage for demo purposes - in production, this would connect to a backend API
 */

import { nanoid } from 'nanoid';

export interface NewsletterSubscription {
  id: string;
  email: string;
  status: 'pending' | 'confirmed' | 'unsubscribed';
  confirmationToken: string;
  language: 'en' | 'ar';
  source: string;
  confirmedAt?: string;
  unsubscribedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'causeway_newsletter_subscriptions';

// Get all subscriptions from localStorage
export function getSubscriptions(): NewsletterSubscription[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save subscriptions to localStorage
function saveSubscriptions(subscriptions: NewsletterSubscription[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
}

// Find subscription by email
export function findByEmail(email: string): NewsletterSubscription | undefined {
  const subscriptions = getSubscriptions();
  return subscriptions.find(s => s.email.toLowerCase() === email.toLowerCase());
}

// Find subscription by confirmation token
export function findByToken(token: string): NewsletterSubscription | undefined {
  const subscriptions = getSubscriptions();
  return subscriptions.find(s => s.confirmationToken === token);
}

// Subscribe to newsletter (initiates double opt-in)
export interface SubscribeResult {
  success: boolean;
  message: string;
  messageAr: string;
  alreadySubscribed?: boolean;
  confirmationToken?: string;
}

export function subscribe(
  email: string, 
  language: 'en' | 'ar' = 'en',
  source: string = 'footer'
): SubscribeResult {
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
      messageAr: 'يرجى إدخال عنوان بريد إلكتروني صالح.'
    };
  }

  // Check if already subscribed
  const existing = findByEmail(email);
  if (existing) {
    if (existing.status === 'confirmed') {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter.',
        messageAr: 'هذا البريد الإلكتروني مشترك بالفعل في نشرتنا الإخبارية.',
        alreadySubscribed: true
      };
    }
    if (existing.status === 'pending') {
      return {
        success: true,
        message: 'A confirmation email has already been sent. Please check your inbox.',
        messageAr: 'تم إرسال بريد التأكيد بالفعل. يرجى التحقق من صندوق الوارد.',
        confirmationToken: existing.confirmationToken
      };
    }
    // If unsubscribed, allow re-subscription
  }

  const subscriptions = getSubscriptions();
  const now = new Date().toISOString();
  const confirmationToken = nanoid(32);

  if (existing && existing.status === 'unsubscribed') {
    // Re-subscribe
    const index = subscriptions.findIndex(s => s.id === existing.id);
    subscriptions[index] = {
      ...existing,
      status: 'pending',
      confirmationToken,
      unsubscribedAt: undefined,
      updatedAt: now
    };
  } else {
    // New subscription
    const newSubscription: NewsletterSubscription = {
      id: nanoid(),
      email: email.toLowerCase(),
      status: 'pending',
      confirmationToken,
      language,
      source,
      createdAt: now,
      updatedAt: now
    };
    subscriptions.push(newSubscription);
  }

  saveSubscriptions(subscriptions);

  return {
    success: true,
    message: 'Please check your email to confirm your subscription. Click the confirmation link to complete your registration.',
    messageAr: 'يرجى التحقق من بريدك الإلكتروني لتأكيد اشتراكك. انقر على رابط التأكيد لإكمال التسجيل.',
    confirmationToken
  };
}

// Confirm subscription (completes double opt-in)
export interface ConfirmResult {
  success: boolean;
  message: string;
  messageAr: string;
}

export function confirmSubscription(token: string): ConfirmResult {
  const subscriptions = getSubscriptions();
  const index = subscriptions.findIndex(s => s.confirmationToken === token);

  if (index === -1) {
    return {
      success: false,
      message: 'Invalid or expired confirmation link.',
      messageAr: 'رابط التأكيد غير صالح أو منتهي الصلاحية.'
    };
  }

  const subscription = subscriptions[index];
  
  if (subscription.status === 'confirmed') {
    return {
      success: true,
      message: 'Your subscription has already been confirmed.',
      messageAr: 'تم تأكيد اشتراكك بالفعل.'
    };
  }

  const now = new Date().toISOString();
  subscriptions[index] = {
    ...subscription,
    status: 'confirmed',
    confirmedAt: now,
    updatedAt: now
  };

  saveSubscriptions(subscriptions);

  return {
    success: true,
    message: 'Thank you! Your subscription has been confirmed. You will now receive our newsletter.',
    messageAr: 'شكراً لك! تم تأكيد اشتراكك. ستتلقى الآن نشرتنا الإخبارية.'
  };
}

// Unsubscribe from newsletter
export function unsubscribe(token: string): ConfirmResult {
  const subscriptions = getSubscriptions();
  const index = subscriptions.findIndex(s => s.confirmationToken === token);

  if (index === -1) {
    return {
      success: false,
      message: 'Invalid unsubscribe link.',
      messageAr: 'رابط إلغاء الاشتراك غير صالح.'
    };
  }

  const now = new Date().toISOString();
  subscriptions[index] = {
    ...subscriptions[index],
    status: 'unsubscribed',
    unsubscribedAt: now,
    updatedAt: now
  };

  saveSubscriptions(subscriptions);

  return {
    success: true,
    message: 'You have been successfully unsubscribed from our newsletter.',
    messageAr: 'تم إلغاء اشتراكك بنجاح من نشرتنا الإخبارية.'
  };
}

// Get confirmed subscribers count
export function getConfirmedCount(): number {
  const subscriptions = getSubscriptions();
  return subscriptions.filter(s => s.status === 'confirmed').length;
}

// Export subscriptions as CSV (for admin use)
export function exportSubscriptionsCSV(): string {
  const subscriptions = getSubscriptions();
  const headers = ['Email', 'Status', 'Language', 'Source', 'Confirmed At', 'Created At'];
  const rows = subscriptions.map(s => [
    s.email,
    s.status,
    s.language,
    s.source,
    s.confirmedAt || '',
    s.createdAt
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
