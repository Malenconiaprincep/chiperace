import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import styles from './cases.module.css';
import bannerStyles from '../styles/banner.module.css';
import { applicationApi, getFullUrl, type ApplicationItem } from '../services/api';
import { Spin } from 'antd';

const CasePage = (): JSX.Element => {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const data = await applicationApi.getApplicationList();
        setApplications(data);
      } catch (error) {
        console.error('获取应用领域失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Layout>
      <div className={styles.caseContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>应用案例</h1>
            <p>高性能计算的实际应用场景</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.applicationSection}>
            <h2>应用领域</h2>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Spin size="large" />
              </div>
            ) : (
              <div className={styles.applications}>
                {applications.map((app) => (
                  <div key={app.id} className={styles.applicationItem}>
                    <div className={styles.applicationImages}>
                      <img src={getFullUrl(app.image)} alt={app.title} />
                    </div>
                    <div className={styles.applicationContent}>
                      <h4>{app.title}</h4>
                      <p>{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CasePage; 