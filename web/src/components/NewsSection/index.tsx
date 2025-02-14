import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { newsApi, NewsItem } from '../../services/api';

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsApi.getNewsList();
        // 只显示最新的3条新闻
        setNews(response.data.slice(0, 3));
      } catch (error) {
        console.error('获取新闻列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className={styles.newsSection}>
        <div className="container">
          <h2>公司新闻</h2>
          <div>加载中...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.newsSection}>
      <div className="container">
        <h2>公司新闻</h2>
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <div key={item.id} className={styles.newsCard}>
              <div className={styles.newsDate}>
                <span className={styles.day}>
                  {new Date(item.date).getDate().toString().padStart(2, '0')}
                </span>
                <span className={styles.month}>
                  {new Date(item.date).toLocaleString('en-US', { month: 'short' })}
                </span>
              </div>
              <div className={styles.newsContent}>
                <h3>{item.title}</h3>
                <span className={styles.tag}>{item.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 