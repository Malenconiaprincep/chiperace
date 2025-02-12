import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import axios from 'axios';
import styles from './styles.module.css';

interface NewsDetail {
  id: number;
  title: string;
  content: string;
  source: string;
  link: string;
  image?: string;
  date: string;
}

const NewsDetailPage = (): JSX.Element => {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get<NewsDetail>(`http://localhost:4000/api/news/${id}`);
        setNews(response.data);
      } catch (error) {
        console.error('获取新闻详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
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
            {news.image && (
              <div className={styles.newsDetailImage}>
                <img src={news.image} alt={news.title} />
              </div>
            )}
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