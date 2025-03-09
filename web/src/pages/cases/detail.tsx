import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import { useLocation } from '@docusaurus/router';
import { applicationApi, getFullUrl } from '../../services/api';
import type { ApplicationItem } from '../../services/api';
import styles from './styles.module.css';
import bannerStyles from '../../styles/banner.module.css';

const ApplicationDetailPage = (): JSX.Element => {
  const location = useLocation();
  const [application, setApplication] = useState<ApplicationItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationDetail = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const id = params.get('id');

        if (!id) {
          setLoading(false);
          return;
        }

        const data = await applicationApi.getApplicationById(Number(id));
        setApplication(data);
      } catch (error) {
        console.error('获取应用领域详情失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationDetail();
  }, [location]);

  return (
    <Layout>
      <div className={styles.applicationContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>跨领域赋能实践</h1>
            <p>研究基因 产业表达</p>
          </div>
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>加载中...</div>
          ) : !application ? (
            <div className={styles.notFound}>应用领域不存在</div>
          ) : (
            <div className={styles.applicationDetail}>
              <h1 className={styles.applicationTitle}>{application.title}</h1>

              {/* {application.image && (
                <div className={styles.applicationDetailImage}>
                  <img src={getFullUrl(application.image)} alt={application.title} />
                </div>
              )} */}

              <div className={styles.applicationDescription}>
                <p>{application.description}</p>
              </div>

              {application.details && (
                <div
                  className={styles.applicationDetailContent}
                  dangerouslySetInnerHTML={{ __html: application.details }}
                />
              )}

              {/* {application.link && (
                <div className={styles.applicationLink}>
                  <h3>相关链接</h3>
                  <a href={application.link} target="_blank" rel="noopener noreferrer">
                    {application.link}
                  </a>
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationDetailPage; 