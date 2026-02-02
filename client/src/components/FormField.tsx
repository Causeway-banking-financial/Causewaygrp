/**
 * FormField Component with Inline Validation
 * Displays bilingual error messages below form fields
 */

import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormFieldProps {
  label: { en: string; ar: string };
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: { en: string; ar: string };
  required?: boolean;
  error?: { en: string; ar: string } | null;
  options?: { value: string; labelEn: string; labelAr: string }[];
  rows?: number;
  className?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  options,
  rows = 4,
  className = '',
  dir = 'auto'
}: FormFieldProps) {
  const { language, isRTL } = useLanguage();
  
  const baseInputClasses = `w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors text-[#133129] ${
    error 
      ? 'border-red-500 focus:border-red-500 bg-red-50/30' 
      : 'border-[#133129]/20 focus:border-[#d4a84b]'
  }`;
  
  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={rows}
            className={`${baseInputClasses} resize-none`}
            placeholder={placeholder ? placeholder[language] : ''}
            dir={dir}
          />
        );
      
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`${baseInputClasses} bg-white`}
          >
            <option value="">{placeholder ? placeholder[language] : ''}</option>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {language === 'ar' ? option.labelAr : option.labelEn}
              </option>
            ))}
          </select>
        );
      
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={baseInputClasses}
            placeholder={placeholder ? placeholder[language] : ''}
            dir={type === 'email' || type === 'tel' ? 'ltr' : dir}
          />
        );
    }
  };
  
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-[#133129] mb-2">
        {label[language]}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      
      {/* Error Message */}
      {error && (
        <div className={`flex items-center gap-1.5 mt-2 text-red-600 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error[language]}</span>
        </div>
      )}
    </div>
  );
}
