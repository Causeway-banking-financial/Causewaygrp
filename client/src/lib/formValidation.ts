/**
 * Form Validation Utilities with Bilingual Error Messages
 * CauseWay - Financial & Banking Consultancies
 */

export interface ValidationError {
  field: string;
  messageEn: string;
  messageAr: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (international format)
const PHONE_REGEX = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;

// Validation messages
export const validationMessages = {
  required: {
    en: 'This field is required',
    ar: 'هذا الحقل مطلوب'
  },
  email: {
    en: 'Please enter a valid email address',
    ar: 'يرجى إدخال بريد إلكتروني صحيح'
  },
  phone: {
    en: 'Please enter a valid phone number',
    ar: 'يرجى إدخال رقم هاتف صحيح'
  },
  minLength: (min: number) => ({
    en: `Must be at least ${min} characters`,
    ar: `يجب أن يكون على الأقل ${min} حرفاً`
  }),
  maxLength: (max: number) => ({
    en: `Must be no more than ${max} characters`,
    ar: `يجب ألا يتجاوز ${max} حرفاً`
  }),
  name: {
    en: 'Please enter your full name',
    ar: 'يرجى إدخال اسمك الكامل'
  },
  organization: {
    en: 'Please enter your organization name',
    ar: 'يرجى إدخال اسم مؤسستك'
  },
  topic: {
    en: 'Please select a topic',
    ar: 'يرجى اختيار موضوع'
  },
  message: {
    en: 'Please enter your message',
    ar: 'يرجى إدخال رسالتك'
  },
  messageMinLength: {
    en: 'Message must be at least 10 characters',
    ar: 'يجب أن تكون الرسالة 10 أحرف على الأقل'
  }
};

// Field-specific validation functions
export const validators = {
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },
  
  email: (value: string): boolean => {
    return EMAIL_REGEX.test(value.trim());
  },
  
  phone: (value: string): boolean => {
    if (!value.trim()) return true; // Optional field
    return PHONE_REGEX.test(value.trim());
  },
  
  minLength: (value: string, min: number): boolean => {
    return value.trim().length >= min;
  },
  
  maxLength: (value: string, max: number): boolean => {
    return value.trim().length <= max;
  }
};

// Contact form validation
export function validateContactForm(data: {
  name: string;
  email: string;
  organization?: string;
  topic: string;
  message: string;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Name validation
  if (!validators.required(data.name)) {
    errors.push({
      field: 'name',
      messageEn: validationMessages.name.en,
      messageAr: validationMessages.name.ar
    });
  } else if (!validators.minLength(data.name, 2)) {
    errors.push({
      field: 'name',
      messageEn: validationMessages.minLength(2).en,
      messageAr: validationMessages.minLength(2).ar
    });
  }
  
  // Email validation
  if (!validators.required(data.email)) {
    errors.push({
      field: 'email',
      messageEn: validationMessages.required.en,
      messageAr: validationMessages.required.ar
    });
  } else if (!validators.email(data.email)) {
    errors.push({
      field: 'email',
      messageEn: validationMessages.email.en,
      messageAr: validationMessages.email.ar
    });
  }
  
  // Topic validation
  if (!validators.required(data.topic)) {
    errors.push({
      field: 'topic',
      messageEn: validationMessages.topic.en,
      messageAr: validationMessages.topic.ar
    });
  }
  
  // Message validation
  if (!validators.required(data.message)) {
    errors.push({
      field: 'message',
      messageEn: validationMessages.message.en,
      messageAr: validationMessages.message.ar
    });
  } else if (!validators.minLength(data.message, 10)) {
    errors.push({
      field: 'message',
      messageEn: validationMessages.messageMinLength.en,
      messageAr: validationMessages.messageMinLength.ar
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Booking form validation
export function validateBookingForm(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  date?: string;
  time?: string;
  notes?: string;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  // Name validation
  if (!validators.required(data.name)) {
    errors.push({
      field: 'name',
      messageEn: validationMessages.name.en,
      messageAr: validationMessages.name.ar
    });
  }
  
  // Email validation
  if (!validators.required(data.email)) {
    errors.push({
      field: 'email',
      messageEn: validationMessages.required.en,
      messageAr: validationMessages.required.ar
    });
  } else if (!validators.email(data.email)) {
    errors.push({
      field: 'email',
      messageEn: validationMessages.email.en,
      messageAr: validationMessages.email.ar
    });
  }
  
  // Phone validation (optional but must be valid if provided)
  if (data.phone && !validators.phone(data.phone)) {
    errors.push({
      field: 'phone',
      messageEn: validationMessages.phone.en,
      messageAr: validationMessages.phone.ar
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Newsletter form validation
export function validateNewsletterForm(data: {
  email: string;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!validators.required(data.email)) {
    errors.push({
      field: 'email',
      messageEn: validationMessages.required.en,
      messageAr: validationMessages.required.ar
    });
  } else if (!validators.email(data.email)) {
    errors.push({
      field: 'email',
      messageEn: validationMessages.email.en,
      messageAr: validationMessages.email.ar
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Get error message for a specific field
export function getFieldError(
  errors: ValidationError[],
  field: string,
  language: 'en' | 'ar'
): string | null {
  const error = errors.find(e => e.field === field);
  if (!error) return null;
  return language === 'ar' ? error.messageAr : error.messageEn;
}
