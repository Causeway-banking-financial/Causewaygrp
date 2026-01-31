/**
 * Insights Page - Articles, Publications, News
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Download, 
  FileText,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = [
  'All',
  'Governance',
  'Islamic Finance',
  'Compliance',
  'Risk Management',
  'Economic Analysis'
];

const articles = [
  {
    id: 'governance-fragile-markets',
    category: 'Governance',
    title: 'Governance in Fragile Markets: Building Audit-Ready Systems',
    excerpt: 'A deep dive into compliance frameworks for high-risk environments and emerging market banks. This analysis explores practical approaches to establishing robust governance structures.',
    date: 'January 28, 2026',
    readTime: '12 min',
    image: '/images/hero-observatory.jpg',
    type: 'article',
    featured: true
  },
  {
    id: 'islamic-finance-engineering',
    category: 'Islamic Finance',
    title: 'Islamic Finance Product Engineering: From Concept to Execution',
    excerpt: 'Structuring innovative, compliant financial solutions for modern banking needs. A comprehensive guide to developing Sharia-compliant products.',
    date: 'January 25, 2026',
    readTime: '8 min',
    image: '/images/hero-islamic-finance.jpg',
    type: 'article'
  },
  {
    id: 'aml-cft-frameworks',
    category: 'Compliance',
    title: 'AML/CFT in Development Finance: Practical Frameworks',
    excerpt: 'Implementing robust anti-money laundering strategies in challenging environments. Best practices for financial institutions in fragile states.',
    date: 'January 20, 2026',
    readTime: '10 min',
    image: '/images/hero-services.jpg',
    type: 'article'
  },
  {
    id: 'treasury-governance',
    category: 'Risk Management',
    title: 'Treasury Governance for Emerging Market Banks',
    excerpt: 'Optimizing liquidity and risk management in volatile markets. Strategic approaches to treasury operations.',
    date: 'January 15, 2026',
    readTime: '9 min',
    image: '/images/hero-insights.jpg',
    type: 'article'
  },
  {
    id: 'yemen-banking-outlook-2026',
    category: 'Economic Analysis',
    title: 'Yemen Banking Sector Outlook 2026',
    excerpt: 'Analysis of current trends, challenges, and opportunities in Yemen\'s banking sector. Key indicators and projections for the year ahead.',
    date: 'January 10, 2026',
    readTime: '15 min',
    image: '/images/hero-main.jpg',
    type: 'article'
  },
  {
    id: 'microfinance-resilience',
    category: 'Economic Analysis',
    title: 'Microfinance Resilience in Crisis Economies',
    excerpt: 'How MFIs in Yemen have adapted to economic challenges and maintained operations. Lessons for the sector.',
    date: 'January 5, 2026',
    readTime: '11 min',
    image: '/images/hero-observatory.jpg',
    type: 'article'
  }
];

const publications = [
  {
    title: 'CauseWay Company Profile 2026',
    description: 'Comprehensive overview of our services, expertise, and track record.',
    type: 'PDF',
    size: '2.4 MB'
  },
  {
    title: 'Islamic Finance Engineering Guide',
    description: 'Best practices for developing Sharia-compliant financial products.',
    type: 'PDF',
    size: '1.8 MB'
  },
  {
    title: 'AML/CFT Framework Template',
    description: 'Template for establishing anti-money laundering frameworks.',
    type: 'PDF',
    size: '1.2 MB'
  },
  {
    title: 'YETO Overview Brochure',
    description: 'Introduction to the Yemen Economic Transparency Observatory.',
    type: 'PDF',
    size: '0.8 MB'
  }
];

const news = [
  {
    title: 'CauseWay Announces YETO Platform Launch',
    date: 'January 30, 2026',
    excerpt: 'The Yemen Economic Transparency Observatory will launch in Q2 2026.'
  },
  {
    title: 'New AML/CFT Framework Released',
    date: 'January 25, 2026',
    excerpt: 'Updated compliance framework aligned with latest FATF recommendations.'
  },
  {
    title: 'Partnership with Yemen Microfinance Network',
    date: 'January 15, 2026',
    excerpt: 'CauseWay strengthens collaboration with YMN for sector development.'
  }
];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-causeway-forest">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: 'url(/images/hero-insights.jpg)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-causeway-forest via-causeway-forest/95 to-causeway-forest" />
        </div>
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-causeway-gold font-semibold text-sm uppercase tracking-wider">
              Insights
            </span>
            <h1 className="text-4xl md:text-5xl font-display text-causeway-cream mt-3 mb-6">
              Expert Analysis & Thought Leadership
            </h1>
            <p className="text-xl text-causeway-cream/80 leading-relaxed">
              In-depth articles, research publications, and news from CauseWay's 
              experts on governance, Islamic finance, compliance, and economic analysis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-causeway-cream border-b border-causeway-forest/10 sticky top-20 z-30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-causeway-forest text-causeway-cream'
                      : 'bg-white text-causeway-forest hover:bg-causeway-forest/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-causeway-forest/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-causeway-forest/10 rounded-lg text-causeway-forest placeholder:text-causeway-forest/40 focus:outline-none focus:border-causeway-gold"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-causeway-cream">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Articles */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-display text-causeway-forest">
                Articles ({filteredArticles.length})
              </h2>
              
              {filteredArticles.length === 0 ? (
                <div className="bg-white p-8 rounded-lg text-center">
                  <p className="text-causeway-forest/60">No articles found matching your criteria.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Link href={`/insights/articles/${article.id}`}>
                        <div className={`group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow ${
                          article.featured ? 'ring-2 ring-causeway-gold' : ''
                        }`}>
                          <div className="grid grid-cols-1 md:grid-cols-3">
                            <div 
                              className="h-48 md:h-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${article.image})` }}
                            />
                            <div className="md:col-span-2 p-6">
                              <div className="flex items-center gap-3 mb-3">
                                <span className="bg-causeway-gold/20 text-causeway-gold-dark text-xs font-semibold px-3 py-1 rounded-full">
                                  {article.category}
                                </span>
                                {article.featured && (
                                  <span className="bg-causeway-forest text-causeway-cream text-xs font-semibold px-3 py-1 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl font-display text-causeway-forest mb-2 group-hover:text-causeway-teal transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-causeway-forest/60 text-sm mb-4 line-clamp-2">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center gap-4 text-causeway-forest/50 text-sm">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {article.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {article.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Publications */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-display text-causeway-forest mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-causeway-teal" />
                  Publications
                </h3>
                <div className="space-y-4">
                  {publications.map((pub) => (
                    <div key={pub.title} className="group cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-causeway-forest text-sm group-hover:text-causeway-teal transition-colors">
                            {pub.title}
                          </h4>
                          <p className="text-causeway-forest/50 text-xs mt-1">
                            {pub.description}
                          </p>
                        </div>
                        <Download className="w-4 h-4 text-causeway-teal flex-shrink-0 mt-1" />
                      </div>
                      <div className="text-xs text-causeway-forest/40 mt-1">
                        {pub.type} • {pub.size}
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/insights/publications">
                  <Button variant="outline" className="w-full mt-4 text-sm border-causeway-forest text-causeway-forest hover:bg-causeway-forest hover:text-causeway-cream">
                    View All Publications
                  </Button>
                </Link>
              </div>

              {/* News */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-display text-causeway-forest mb-4">
                  Company News
                </h3>
                <div className="space-y-4">
                  {news.map((item) => (
                    <div key={item.title} className="border-b border-causeway-forest/10 pb-4 last:border-0 last:pb-0">
                      <h4 className="font-medium text-causeway-forest text-sm">
                        {item.title}
                      </h4>
                      <p className="text-causeway-forest/50 text-xs mt-1">
                        {item.date}
                      </p>
                    </div>
                  ))}
                </div>
                <Link href="/insights/news">
                  <Button variant="outline" className="w-full mt-4 text-sm border-causeway-forest text-causeway-forest hover:bg-causeway-forest hover:text-causeway-cream">
                    View All News
                  </Button>
                </Link>
              </div>

              {/* Newsletter */}
              <div className="bg-causeway-forest p-6 rounded-lg">
                <h3 className="text-lg font-display text-causeway-cream mb-3">
                  Subscribe to Updates
                </h3>
                <p className="text-causeway-cream/70 text-sm mb-4">
                  Get the latest insights delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 bg-causeway-forest-light border border-causeway-teal/30 rounded text-causeway-cream placeholder:text-causeway-cream/40 focus:outline-none focus:border-causeway-gold text-sm"
                  />
                  <Button className="btn-gold w-full text-sm">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
