import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";

interface Article {
  title: string;
  link: string;
  published: string;
  summary: string;
}

interface BlogData {
  [key: string]: Article[];
}

export default function BlogSection() {
  const [articles, setArticles] = useState<BlogData>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/blog_articles.json');
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const stripHtmlTags = (html: string) => {
    if (typeof document === 'undefined') return html;
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getAllArticles = () => {
    const allArticles: (Article & { source: string })[] = [];
    Object.entries(articles).forEach(([source, sourceArticles]) => {
      sourceArticles.forEach(article => {
        allArticles.push({ ...article, source });
      });
    });
    return allArticles.sort((a, b) => {
      try {
        return new Date(b.published).getTime() - new Date(a.published).getTime();
      } catch {
        return 0;
      }
    });
  };

  const getArticlesToDisplay = () => {
    if (activeTab === 'all') {
      return getAllArticles();
    }
    return (articles[activeTab] || []).map(article => ({ ...article, source: activeTab }));
  };

  const articlesToDisplay = getArticlesToDisplay();

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Disney Parks Blog':
        return 'from-blue-500 to-blue-600';
      case 'The Disney Food Blog':
        return 'from-orange-500 to-orange-600';
      case 'Universal Blog':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-300">Loading latest articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="mb-8">
            <span className="inline-block text-yellow-400 font-bold text-sm tracking-widest mb-2">FROM THE BLOGS</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Latest Theme Park<br />
              <span className="text-yellow-400">News & Tips</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl">
              Stay updated with the latest news, dining tips, and insider information from the top Disney and Universal blogs.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-start gap-3 mb-12 pb-4 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-yellow-400'
            }`}
          >
            All Articles
          </button>
          {Object.keys(articles).map(source => (
            <button
              key={source}
              onClick={() => setActiveTab(source)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeTab === source
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-yellow-400'
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {articlesToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesToDisplay.slice(0, 6).map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-all hover:translate-y-[-4px]"
              >
                {/* Source Badge Bar */}
                <div className={`h-1 bg-gradient-to-r ${getSourceColor(article.source)}`} />
                
                <div className="p-6">
                  {/* Source Label */}
                  <div className="mb-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getSourceColor(article.source)}`}>
                      {article.source}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors line-clamp-3">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {stripHtmlTags(article.summary)}
                  </p>

                  {/* Date and Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock size={12} />
                      {formatDate(article.published)}
                    </span>
                    <span className="text-yellow-400 font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles available at the moment.</p>
          </div>
        )}

        {/* View All Button */}
        {articlesToDisplay.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-lg hover:shadow-lg transition-shadow">
              View All Articles
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
