/**
 * InsightArticle Component
 * 
 * Design: Premium editorial layout with author attribution, reading time,
 * social sharing buttons, and related articles section.
 * 
 * Brand Colors: Deep Forest (#133129), Teal (#224B40), Sage (#406D61), 
 * Gold (#d4a84b), Cream (#faf9f6)
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar, User, Share2, Linkedin, Twitter, Facebook, Mail, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Author {
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  image?: string;
}

interface RelatedArticle {
  slug: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  image: string;
}

interface InsightArticleProps {
  slug: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  categoryEn: string;
  categoryAr: string;
  date: string;
  readingTimeMinutes: number;
  author: Author;
  heroImage: string;
  contentEn: React.ReactNode;
  contentAr: React.ReactNode;
  relatedArticles?: RelatedArticle[];
}

export default function InsightArticle({
  slug,
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  categoryEn,
  categoryAr,
  date,
  readingTimeMinutes,
  author,
  heroImage,
  contentEn,
  contentAr,
  relatedArticles = []
}: InsightArticleProps) {
  const { language, isRTL } = useLanguage();

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = language === 'ar' ? titleAr : titleEn;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    };
    
    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (language === 'ar') {
      return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article className="min-h-screen bg-[#faf9f6]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.5)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#133129] via-[#133129]/50 to-transparent" />
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16">
          {/* Back Button */}
          <Link href="/insights">
            <motion.button 
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-[#faf9f6]/80 hover:text-[#d4a84b] transition-colors mb-6"
            >
              {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{language === 'ar' ? 'العودة إلى الرؤى' : 'Back to Insights'}</span>
            </motion.button>
          </Link>

          {/* Category Badge */}
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block bg-[#d4a84b] text-[#133129] px-4 py-1.5 text-sm font-semibold rounded-full mb-4 w-fit"
          >
            {language === 'ar' ? categoryAr : categoryEn}
          </motion.span>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#faf9f6] leading-tight mb-4 max-w-4xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {language === 'ar' ? titleAr : titleEn}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-[#faf9f6]/80 max-w-3xl"
          >
            {language === 'ar' ? subtitleAr : subtitleEn}
          </motion.p>
        </div>
      </div>

      {/* Article Meta Bar */}
      <div className="bg-[#133129] border-b border-[#224B40]">
        <div className="container py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Author & Meta */}
            <div className="flex items-center gap-6 flex-wrap">
              {/* Author */}
              <div className="flex items-center gap-3">
                {author.image ? (
                  <img 
                    src={author.image} 
                    alt={language === 'ar' ? author.nameAr : author.nameEn}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#d4a84b]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#224B40] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#d4a84b]" />
                  </div>
                )}
                <div>
                  <p className="text-[#faf9f6] font-medium text-sm">
                    {language === 'ar' ? author.nameAr : author.nameEn}
                  </p>
                  <p className="text-[#faf9f6]/60 text-xs">
                    {language === 'ar' ? author.roleAr : author.roleEn}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-[#faf9f6]/70 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(date)}</span>
              </div>

              {/* Reading Time */}
              <div className="flex items-center gap-2 text-[#faf9f6]/70 text-sm">
                <Clock className="w-4 h-4" />
                <span>
                  {language === 'ar' 
                    ? `${readingTimeMinutes} دقائق للقراءة`
                    : `${readingTimeMinutes} min read`
                  }
                </span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[#faf9f6]/60 text-sm hidden sm:inline">
                {language === 'ar' ? 'مشاركة:' : 'Share:'}
              </span>
              <button 
                onClick={() => handleShare('linkedin')}
                className="p-2 rounded-full bg-[#224B40] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="p-2 rounded-full bg-[#224B40] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                aria-label="Share on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="p-2 rounded-full bg-[#224B40] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                aria-label="Share on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleShare('email')}
                className="p-2 rounded-full bg-[#224B40] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                aria-label="Share via Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none
              prose-headings:font-serif prose-headings:text-[#133129]
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[#133129]/80 prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-[#133129] prose-strong:font-semibold
              prose-a:text-[#224B40] prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[#d4a84b]
              prose-ul:my-6 prose-li:text-[#133129]/80
              prose-blockquote:border-l-4 prose-blockquote:border-[#d4a84b] prose-blockquote:bg-[#133129]/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-[#133129]/90
            "
            style={{ fontFamily: language === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Inter', sans-serif" }}
          >
            {language === 'ar' ? contentAr : contentEn}
          </motion.div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-[#133129]/10">
            {/* Author Bio */}
            <div className="flex items-start gap-4 p-6 bg-[#133129]/5 rounded-xl">
              {author.image ? (
                <img 
                  src={author.image} 
                  alt={language === 'ar' ? author.nameAr : author.nameEn}
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#d4a84b]"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#224B40] flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-[#d4a84b]" />
                </div>
              )}
              <div>
                <p className="text-[#133129] font-semibold text-lg">
                  {language === 'ar' ? author.nameAr : author.nameEn}
                </p>
                <p className="text-[#406D61] text-sm mb-2">
                  {language === 'ar' ? author.roleAr : author.roleEn}
                </p>
                <p className="text-[#133129]/70 text-sm">
                  {language === 'ar' 
                    ? 'خبير في القطاع المالي والمصرفي مع خبرة تزيد عن 15 عامًا في الأسواق الناشئة.'
                    : 'Financial and banking sector expert with over 15 years of experience in emerging markets.'
                  }
                </p>
              </div>
            </div>

            {/* Share Again */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="text-[#133129]/60 text-sm">
                {language === 'ar' ? 'هل وجدت هذا المقال مفيدًا؟ شاركه:' : 'Found this article helpful? Share it:'}
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-full bg-[#133129] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-full bg-[#133129] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleShare('email')}
                  className="p-2 rounded-full bg-[#133129] hover:bg-[#d4a84b] text-[#faf9f6] hover:text-[#133129] transition-all"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#133129] py-16">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-serif text-[#faf9f6] mb-8 text-center" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/insights/${article.slug}`}>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="group bg-[#224B40]/50 rounded-xl overflow-hidden cursor-pointer"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={language === 'ar' ? article.titleAr : article.titleEn}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[#d4a84b] text-xs font-semibold uppercase tracking-wider">
                        {language === 'ar' ? article.categoryAr : article.categoryEn}
                      </span>
                      <h3 className="text-[#faf9f6] font-medium mt-2 line-clamp-2 group-hover:text-[#d4a84b] transition-colors">
                        {language === 'ar' ? article.titleAr : article.titleEn}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#faf9f6] py-16 border-t border-[#133129]/10">
        <div className="container text-center">
          <BookOpen className="w-12 h-12 text-[#d4a84b] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-serif text-[#133129] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'ar' ? 'هل تريد المزيد من الرؤى؟' : 'Want More Insights?'}
          </h2>
          <p className="text-[#133129]/70 mb-6 max-w-xl mx-auto">
            {language === 'ar' 
              ? 'اشترك في نشرتنا الإخبارية للحصول على أحدث التحليلات والتقارير مباشرة في بريدك الإلكتروني.'
              : 'Subscribe to our newsletter for the latest analysis and reports delivered directly to your inbox.'
            }
          </p>
          <Link href="/contact">
            <Button className="bg-[#d4a84b] hover:bg-[#c9a227] text-[#133129] font-semibold px-8 py-6">
              {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
              {isRTL ? <ArrowLeft className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </Link>
        </div>
      </section>
    </article>
  );
}
