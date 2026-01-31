/**
 * Article Detail Page
 */

import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { Calendar, Clock, ChevronRight, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const articlesData: Record<string, {
  category: string;
  title: string;
  titleAr?: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  content: string[];
}> = {
  'governance-fragile-markets': {
    category: 'Governance',
    title: 'Governance in Fragile Markets: Building Audit-Ready Systems',
    titleAr: 'الحوكمة في الأسواق الهشة: بناء أنظمة جاهزة للتدقيق',
    excerpt: 'A deep dive into compliance frameworks for high-risk environments and emerging market banks.',
    date: 'January 28, 2026',
    readTime: '12 min',
    image: '/images/hero-observatory.jpg',
    author: 'CauseWay Research Team',
    content: [
      'Financial institutions operating in fragile and conflict-affected states face unique governance challenges that require tailored approaches. Traditional governance frameworks, designed for stable economies, often fall short when applied to environments characterized by political instability, weak regulatory infrastructure, and limited institutional capacity.',
      'This analysis examines the key principles for building audit-ready governance systems in challenging environments, drawing on CauseWay\'s extensive experience working with banks and financial institutions across Yemen and the broader region.',
      '## The Challenge of Fragile Markets',
      'Fragile markets present a paradox for financial institutions: the need for strong governance is greatest precisely where the conditions for implementing it are most difficult. Banks operating in these environments must contend with:',
      '- **Regulatory Uncertainty**: Frequent changes in regulatory requirements and inconsistent enforcement create compliance challenges.',
      '- **Operational Disruptions**: Conflict, infrastructure failures, and economic instability can interrupt normal business operations.',
      '- **Capacity Constraints**: Limited access to skilled professionals and training resources hampers governance implementation.',
      '- **Reputational Risk**: Operating in high-risk jurisdictions attracts scrutiny from international partners and correspondents.',
      '## Building Audit-Ready Systems',
      'Despite these challenges, financial institutions can build robust governance systems by focusing on several key areas:',
      '### 1. Documentation Excellence',
      'In fragile markets, comprehensive documentation serves as the foundation of audit readiness. Every policy, procedure, and decision should be documented with clear rationale and approval trails. This documentation becomes critical when demonstrating compliance to regulators, auditors, and international partners.',
      '### 2. Risk-Based Approach',
      'Resources are limited in fragile markets, making a risk-based approach essential. Institutions should prioritize governance investments based on risk assessment, focusing first on areas with the highest potential impact on institutional stability and regulatory compliance.',
      '### 3. Adaptive Frameworks',
      'Governance frameworks must be designed for adaptability. This means building in mechanisms for rapid response to changing conditions while maintaining core compliance principles. Regular review cycles and clear escalation procedures are essential.',
      '### 4. Capacity Building',
      'Sustainable governance requires investment in human capital. Institutions should develop comprehensive training programs that build internal capacity for governance implementation and oversight.',
      '## CauseWay\'s Approach',
      'At CauseWay, we have developed a methodology specifically designed for governance implementation in fragile markets. Our approach combines international best practices with deep understanding of local context, ensuring solutions that are both compliant and practical.',
      'Our five-phase methodology—Discovery, Assessment, Design, Implementation, and Handover—ensures systematic implementation with clear milestones and measurable outcomes. Each phase includes specific deliverables and quality assurance checkpoints.',
      '## Conclusion',
      'Building audit-ready governance systems in fragile markets is challenging but achievable. Success requires a combination of strong commitment from leadership, appropriate resource allocation, and expert guidance. Financial institutions that invest in governance today will be better positioned to navigate future challenges and capitalize on opportunities as markets stabilize.',
      'For institutions seeking to strengthen their governance frameworks, CauseWay offers comprehensive advisory services tailored to the unique challenges of fragile markets. Contact us to discuss how we can support your governance journey.'
    ]
  },
  'islamic-finance-engineering': {
    category: 'Islamic Finance',
    title: 'Islamic Finance Product Engineering: From Concept to Execution',
    titleAr: 'هندسة منتجات التمويل الإسلامي: من الفكرة إلى التنفيذ',
    excerpt: 'Structuring innovative, compliant financial solutions for modern banking needs.',
    date: 'January 25, 2026',
    readTime: '8 min',
    image: '/images/hero-islamic-finance.jpg',
    author: 'CauseWay Islamic Finance Team',
    content: [
      'Islamic finance product engineering is the systematic process of designing, developing, and implementing Sharia-compliant financial products. This article explores the key principles and methodologies for successful product development in Islamic banking.',
      '## The Product Engineering Process',
      'Successful Islamic finance product development requires a structured approach that balances Sharia compliance with commercial viability. Our methodology encompasses five key phases:',
      '### Phase 1: Concept Development',
      'Every product begins with a clear understanding of market need and Sharia parameters. During this phase, we work with clients to define product objectives, target markets, and preliminary Sharia structures.',
      '### Phase 2: Sharia Structuring',
      'The Sharia structuring phase involves detailed analysis of the proposed product against AAOIFI standards and local regulatory requirements. We work closely with Sharia Supervisory Boards to ensure full compliance.',
      '### Phase 3: Operational Design',
      'A compliant product must also be operationally viable. This phase focuses on process design, system requirements, and documentation development.',
      '### Phase 4: Implementation',
      'Implementation includes system configuration, staff training, and pilot testing. We ensure all operational elements are in place before launch.',
      '### Phase 5: Launch and Support',
      'Post-launch support includes monitoring, refinement, and ongoing Sharia compliance verification.',
      '## Key Success Factors',
      'Our experience has identified several factors critical to successful Islamic finance product engineering:',
      '- **Early Sharia Engagement**: Involving the Sharia Supervisory Board from the concept stage prevents costly redesigns later.',
      '- **Operational Realism**: Products must work in practice, not just in theory.',
      '- **Market Alignment**: Successful products meet genuine market needs.',
      '- **Documentation Excellence**: Comprehensive documentation supports compliance and training.',
      '## Conclusion',
      'Islamic finance product engineering requires specialized expertise and a systematic approach. CauseWay brings deep experience in both Sharia compliance and operational implementation, ensuring products that are both compliant and commercially successful.'
    ]
  },
  'aml-cft-frameworks': {
    category: 'Compliance',
    title: 'AML/CFT in Development Finance: Practical Frameworks',
    titleAr: 'مكافحة غسل الأموال وتمويل الإرهاب في التمويل التنموي',
    excerpt: 'Implementing robust anti-money laundering strategies in challenging environments.',
    date: 'January 20, 2026',
    readTime: '10 min',
    image: '/images/hero-services.jpg',
    author: 'CauseWay Compliance Team',
    content: [
      'Anti-money laundering and counter-terrorist financing (AML/CFT) compliance presents unique challenges for financial institutions operating in development finance contexts. This article explores practical frameworks for implementing effective AML/CFT programs.',
      '## The Development Finance Context',
      'Development finance institutions often operate in environments where traditional AML/CFT approaches may be difficult to implement. Cash-based economies, limited identification infrastructure, and informal financial systems create compliance challenges.',
      '## Framework Components',
      'An effective AML/CFT framework for development finance includes:',
      '### Risk Assessment',
      'Understanding the specific risks in your operating environment is the foundation of effective compliance. This includes customer risk, product risk, geographic risk, and delivery channel risk.',
      '### Customer Due Diligence',
      'Adapted CDD procedures that balance compliance requirements with the realities of serving underbanked populations. This may include alternative identification methods and enhanced monitoring.',
      '### Transaction Monitoring',
      'Risk-based monitoring systems calibrated to local transaction patterns and risk indicators.',
      '### Reporting and Recordkeeping',
      'Robust systems for suspicious activity reporting and maintaining required records.',
      '## Implementation Considerations',
      'Successful implementation requires:',
      '- **Proportionality**: Measures should be proportionate to identified risks.',
      '- **Practicality**: Systems must work within operational constraints.',
      '- **Training**: Staff must understand both requirements and rationale.',
      '- **Technology**: Appropriate technology solutions enhance effectiveness.',
      '## Conclusion',
      'Effective AML/CFT compliance in development finance requires frameworks that are both robust and practical. CauseWay specializes in developing tailored solutions that meet international standards while remaining implementable in challenging environments.'
    ]
  }
};

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params.id || '';
  const article = articlesData[articleId];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleBookmark = () => {
    toast.success('Article bookmarked');
  };

  if (!article) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="pt-32 pb-20 bg-causeway-cream">
          <div className="container text-center">
            <h1 className="text-3xl font-display text-causeway-forest mb-4">Article Not Found</h1>
            <p className="text-causeway-forest/70 mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/insights">
              <Button className="btn-gold">Back to Insights</Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${article.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-causeway-forest via-causeway-forest/90 to-causeway-forest" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Link href="/insights" className="inline-flex items-center text-causeway-gold hover:text-causeway-gold/80 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Insights
            </Link>
            
            <span className="inline-block bg-causeway-gold text-causeway-forest text-xs font-semibold px-3 py-1 rounded mb-4">
              {article.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-display text-causeway-cream mb-4">
              {article.title}
            </h1>
            
            {article.titleAr && (
              <p className="text-xl text-causeway-cream/80 font-body-ar mb-6">
                {article.titleAr}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-causeway-cream/60 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} read
              </span>
              <span>By {article.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm">
                <div className="prose prose-lg max-w-none text-causeway-forest/80">
                  {article.content.map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-display text-causeway-forest mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-semibold text-causeway-forest mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      return (
                        <ul key={index} className="list-disc pl-6 my-4">
                          <li>{paragraph.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Actions */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-causeway-forest text-causeway-forest"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-causeway-forest text-causeway-forest"
                    onClick={handleBookmark}
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>

              {/* Related */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-display text-causeway-forest mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {Object.entries(articlesData)
                    .filter(([id]) => id !== articleId)
                    .slice(0, 3)
                    .map(([id, art]) => (
                      <Link key={id} href={`/insights/articles/${id}`}>
                        <div className="group">
                          <span className="text-causeway-gold text-xs">{art.category}</span>
                          <h4 className="text-sm font-medium text-causeway-forest group-hover:text-causeway-teal transition-colors line-clamp-2">
                            {art.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-causeway-forest p-6 rounded-lg">
                <h3 className="font-display text-causeway-cream mb-3">Need Expert Advice?</h3>
                <p className="text-causeway-cream/70 text-sm mb-4">
                  Our team can help you implement these insights in your organization.
                </p>
                <Link href="/contact">
                  <Button className="btn-gold w-full">Contact Us</Button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
