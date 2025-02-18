import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { getFullUrl, newsApi, type NewsItem } from '../../services/api';
import bannerStyles from '../../styles/banner.module.css';

const NewsPage = (): JSX.Element => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  const years = Array.from(
    new Set(
      news.map((item) => new Date(item.date).getFullYear())
    )
  ).sort((a, b) => b - a);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const { data, total } = await newsApi.getNewsList({
          year: selectedYear,
          month: selectedMonth,
          page,
          pageSize,
        });
        setNews(data);
        setTotal(total);
        setError(null);
      } catch (error) {
        console.error('获取新闻列表失败:', error);
        setError('获取新闻列表失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedYear, selectedMonth, page]);

  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
    setPage(1);
  };

  const handleMonthChange = (month: number | null) => {
    setSelectedMonth(month);
    setPage(1);
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.newsContainer}>
          <div className={bannerStyles.banner}>
            <div className={bannerStyles.bannerContent}>
              <h1>新闻中心</h1>
            </div>
          </div>
          <div className={styles.newsContent}>
            加载中...
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.newsContainer}>
          <div className={bannerStyles.banner}>
            <div className={bannerStyles.bannerContent}>
              <h1>新闻中心</h1>
            </div>
          </div>
          <div className={styles.newsContent}>
            <div className={styles.errorMessage}>{error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.newsContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>新闻中心</h1>
          </div>
        </div>

        <div className={styles.newsContent}>
          <div className={styles.filterBar}>
            <div className={styles.filterItem}>公司新闻</div>
            <div className={styles.yearFilter}>
              <select
                value={selectedYear || ''}
                onChange={(e) => handleYearChange(e.target.value ? Number(e.target.value) : null)}
                className={styles.filterSelect}
              >
                <option value="">全部年份</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}年</option>
                ))}
              </select>
              <select
                value={selectedMonth || ''}
                onChange={(e) => handleMonthChange(e.target.value ? Number(e.target.value) : null)}
                className={styles.filterSelect}
              >
                <option value="">全部月份</option>
                {months.map((month) => (
                  <option key={month} value={month}>{month}月</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.newsList}>
            {news.map((item) => (
              <Link
                key={item.id}
                to={item.link ? item.link : `/news/detail?id=${item.id}`}
                className={`${styles.newsItem} ${item.isFeature ? styles.featureNews : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {item.image && (
                  <div className={styles.newsImage}>
                    <img src={getFullUrl(item.image)} alt={item.title} />
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

          <div className={styles.pagination}>
            <span>{total}条</span>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className={styles.pageButton}
            >
              上一页
            </button>
            {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1)
              .filter(p => Math.abs(p - page) <= 2 || p === 1 || p === Math.ceil(total / pageSize))
              .map((p, index, array) => (
                <React.Fragment key={p}>
                  {index > 0 && array[index - 1] !== p - 1 && <span>...</span>}
                  <button
                    onClick={() => setPage(p)}
                    className={`${styles.pageButton} ${page === p ? styles.active : ''}`}
                  >
                    {p}
                  </button>
                </React.Fragment>
              ))}
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= Math.ceil(total / pageSize)}
              className={styles.pageButton}
            >
              下一页
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage; 