import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { newsApi, NewsItem, getFullUrl } from '../../services/api';
import Link from '@docusaurus/Link';

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
            <Link
              key={item.id}
              to={item.link ? item.link : `/news/detail?id=${item.id}`}
              className={styles.newsLink}
              style={{ textDecoration: 'none' }}
            >
              <div className={styles.newsCard}>
                {item.image && (
                  <div className={styles.newsImage}>
                    <img src={getFullUrl(item.image)} alt={item.title} />
                  </div>
                )}
                <div className={styles.newsContent}>
                  <div className={styles.newsInfo}>
                    <div className={styles.newsDate}>
                      <span className={styles.month}>
                        {(new Date(item.date).getMonth() + 1).toString().padStart(2, '0')}月
                      </span>
                      <span className={styles.day}>
                        {new Date(item.date).getDate().toString().padStart(2, '0')}日
                      </span>
                    </div>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsSource}>{item.source}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.moreNews}>
          <Link to="/news" className={styles.moreNewsLink}>
            查看更多新闻 →
          </Link>
        </div>
      </div>
    </section>
  );
} 