import React, { useEffect, useState } from 'react';
import Layout from '@site/src/components/Layout';
import styles from './about.module.css';
import bannerStyles from '../styles/banner.module.css';
import { customDocApi } from '../services/api';

const AgreementPage = (): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const doc = await customDocApi.getDocByType('user-agreement');

        if (doc) {
          setContent(doc.content);
        } else {
          setError('未找到用户协议');
        }
      } catch (error) {
        console.error('获取用户协议失败:', error);
        setError('获取用户协议失败');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <Layout>
      <div className={styles.aboutContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>用户协议</h1>
          </div>
        </div>
        <div className={styles.content}>
          {loading ? (
            <div>加载中...</div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgreementPage; 