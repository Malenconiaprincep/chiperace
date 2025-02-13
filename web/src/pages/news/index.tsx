import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { newsApi, type NewsItem } from '../../services/api';

const NewsPage = (): JSX.Element => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.getNewsList();
        setNews(response.data);
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
      <Layout>
        <div className={styles.newsContainer}>
          <div className={styles.banner}>
            <h1>新闻中心</h1>
          </div>
          <div className={styles.newsContent}>
            加载中...
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.newsContainer}>
        <div className={styles.banner}>
          <h1>新闻中心</h1>
        </div>

        <div className={styles.newsContent}>
          <div className={styles.filterBar}>
            <div className={styles.filterItem}>公司新闻</div>
            <div className={styles.yearFilter}>
              <span>全部年份</span>
              <span>月份</span>
            </div>
          </div>

          <div className={styles.newsList}>
            {news.map((item) => (
              <Link
                key={item.id}
                to={`/news/detail?id=${item.id}`}
                className={`${styles.newsItem} ${item.isFeature ? styles.featureNews : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {item.image && (
                  <div className={styles.newsImage}>
                    <img src={item.image} alt={item.title} />
                  </div>
                )}
                <div className={styles.newsContent}>
                  <div className={styles.newsDate}>
                    <span className={styles.day}>
                      {new Date(item.date).getDate().toString().padStart(2, '0')}
                    </span>
                    <span className={styles.yearMonth}>
                      {new Date(item.date).getFullYear()}.
                      {(new Date(item.date).getMonth() + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className={styles.newsInfo}>
                    <h3>{item.title}</h3>
                    <p>{item.source}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 暂时隐藏分页,等待后端支持
          <div className={styles.pagination}>
            <span>25条</span>
            <span>上一页</span>
            <span className={styles.active}>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>下一页</span>
          </div>
          */}
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage; 