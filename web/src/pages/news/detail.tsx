import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import styles from './styles.module.css';
import { newsApi, type NewsItem, getFullUrl } from '../../services/api';

const NewsDetailPage = (): JSX.Element => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        if (!id) return;
        const response = await newsApi.getNewsById(id);
        setNews(response.data);
      } catch (error) {
        console.error('获取新闻详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className={styles.newsContainer}>
          <div className={styles.banner}>
            <h1>新闻详情</h1>
          </div>
          <div className={styles.newsContent}>
            加载中...
          </div>
        </div>
      </Layout>
    );
  }

  if (!news) {
    return (
      <Layout>
        <div className={styles.newsContainer}>
          <div className={styles.banner}>
            <h1>新闻详情</h1>
          </div>
          <div className={styles.newsContent}>
            新闻不存在
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.newsContainer}>
        <div className={styles.banner}>
          <h1>新闻详情</h1>
        </div>
        <div className={styles.newsContent}>
          <div className={styles.newsDetail}>
            <h1 className={styles.newsTitle}>{news.title}</h1>
            <div className={styles.newsInfo}>
              <span>{news.source}</span>
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
            {/* {news.image && (
              <div className={styles.newsDetailImage}>
                <img src={getFullUrl(news.image)} alt={news.title} />
              </div>
            )} */}
            <div
              className={styles.newsDetailContent}
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetailPage; 