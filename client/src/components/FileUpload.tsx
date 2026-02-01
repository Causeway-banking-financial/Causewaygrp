import { useState, useRef, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedTypes?: string[];
  maxSizeMB?: number;
  label?: string;
  labelAr?: string;
  required?: boolean;
}

interface UploadState {
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error: string | null;
}

export function FileUpload({
  onFileSelect,
  acceptedTypes = ['.pdf', '.doc', '.docx'],
  maxSizeMB = 10,
  label = 'Upload your CV/Resume',
  labelAr = 'ارفع سيرتك الذاتية',
  required = false,
}: FileUploadProps) {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    progress: 0,
    status: 'idle',
    error: null,
  });

  const texts = {
    dragDrop: isArabic ? 'اسحب وأفلت ملفك هنا' : 'Drag and drop your file here',
    or: isArabic ? 'أو' : 'or',
    browse: isArabic ? 'تصفح الملفات' : 'Browse Files',
    acceptedFormats: isArabic ? 'الصيغ المقبولة' : 'Accepted formats',
    maxSize: isArabic ? 'الحجم الأقصى' : 'Maximum size',
    uploading: isArabic ? 'جاري الرفع...' : 'Uploading...',
    uploadSuccess: isArabic ? 'تم رفع الملف بنجاح' : 'File uploaded successfully',
    remove: isArabic ? 'إزالة' : 'Remove',
    fileTooLarge: isArabic 
      ? `حجم الملف يتجاوز الحد الأقصى (${maxSizeMB} ميجابايت)` 
      : `File size exceeds maximum limit (${maxSizeMB}MB)`,
    invalidType: isArabic 
      ? 'نوع الملف غير مدعوم. الرجاء استخدام PDF أو DOC أو DOCX' 
      : 'Invalid file type. Please use PDF, DOC, or DOCX',
    required: isArabic ? '(مطلوب)' : '(Required)',
  };

  const validateFile = useCallback((file: File): { valid: boolean; error: string | null } => {
    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return { valid: false, error: texts.fileTooLarge };
    }

    // Check file type
    const fileName = file.name.toLowerCase();
    const isValidType = acceptedTypes.some(type => fileName.endsWith(type.toLowerCase()));
    if (!isValidType) {
      return { valid: false, error: texts.invalidType };
    }

    return { valid: true, error: null };
  }, [maxSizeMB, acceptedTypes, texts.fileTooLarge, texts.invalidType]);

  const simulateUpload = useCallback((file: File) => {
    setUploadState({
      file,
      progress: 0,
      status: 'uploading',
      error: null,
    });

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadState(prev => ({
          ...prev,
          progress: 100,
          status: 'success',
        }));
        onFileSelect(file);
      } else {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(progress, 99),
        }));
      }
    }, 200);
  }, [onFileSelect]);

  const handleFile = useCallback((file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setUploadState({
        file: null,
        progress: 0,
        status: 'error',
        error: validation.error,
      });
      onFileSelect(null);
      return;
    }

    simulateUpload(file);
  }, [validateFile, simulateUpload, onFileSelect]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const handleRemove = useCallback(() => {
    setUploadState({
      file: null,
      progress: 0,
      status: 'idle',
      error: null,
    });
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onFileSelect]);

  const handleBrowseClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Label */}
      <label className="block text-sm font-medium text-[#133129] mb-2">
        {isArabic ? labelAr : label}
        {required && <span className="text-red-500 mx-1">{texts.required}</span>}
      </label>

      {/* Upload Area */}
      {uploadState.status === 'idle' || uploadState.status === 'error' ? (
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
            ${isDragActive 
              ? 'border-[#d4a84b] bg-[#d4a84b]/10 scale-[1.02]' 
              : 'border-[#406D61]/30 hover:border-[#406D61] hover:bg-[#406D61]/5'
            }
            ${uploadState.status === 'error' ? 'border-red-400 bg-red-50' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          role="button"
          tabIndex={0}
          aria-label={isArabic ? 'منطقة رفع الملفات' : 'File upload area'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBrowseClick();
            }
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleChange}
            className="hidden"
            aria-hidden="true"
          />

          <div className="flex flex-col items-center justify-center text-center">
            {/* Upload Icon */}
            <div className={`
              w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300
              ${isDragActive ? 'bg-[#d4a84b] text-white scale-110' : 'bg-[#406D61]/10 text-[#406D61]'}
            `}>
              <Upload className="w-8 h-8" />
            </div>

            {/* Text */}
            <p className="text-lg font-medium text-[#133129] mb-2">
              {texts.dragDrop}
            </p>
            <p className="text-[#406D61] mb-4">{texts.or}</p>
            
            {/* Browse Button */}
            <Button
              type="button"
              variant="outline"
              className="border-[#406D61] text-[#406D61] hover:bg-[#406D61] hover:text-white transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
            >
              <Upload className="w-4 h-4 mx-2" />
              {texts.browse}
            </Button>

            {/* File Info */}
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-[#406D61]/70">
              <span>
                <strong>{texts.acceptedFormats}:</strong> {acceptedTypes.join(', ').toUpperCase().replace(/\./g, '')}
              </span>
              <span>
                <strong>{texts.maxSize}:</strong> {maxSizeMB}MB
              </span>
            </div>
          </div>

          {/* Error Message */}
          {uploadState.status === 'error' && uploadState.error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-600 bg-red-100 rounded-lg p-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{uploadState.error}</span>
            </div>
          )}
        </div>
      ) : null}

      {/* Uploading State */}
      {uploadState.status === 'uploading' && uploadState.file && (
        <div className="border-2 border-[#406D61]/30 rounded-xl p-6 bg-[#406D61]/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#406D61]/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#406D61]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#133129] truncate">{uploadState.file.name}</p>
              <p className="text-sm text-[#406D61]/70">{formatFileSize(uploadState.file.size)}</p>
            </div>
            <Loader2 className="w-6 h-6 text-[#d4a84b] animate-spin flex-shrink-0" />
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-[#406D61] mb-2">
              <span>{texts.uploading}</span>
              <span>{Math.round(uploadState.progress)}%</span>
            </div>
            <div className="h-2 bg-[#406D61]/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#406D61] to-[#d4a84b] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadState.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success State */}
      {uploadState.status === 'success' && uploadState.file && (
        <div className="border-2 border-green-400 rounded-xl p-6 bg-green-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#133129] truncate">{uploadState.file.name}</p>
              <p className="text-sm text-green-600">{texts.uploadSuccess}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
              aria-label={texts.remove}
            >
              <X className="w-5 h-5" />
              <span className="mx-1 hidden sm:inline">{texts.remove}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
