import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import styles from './cases.module.css';
import bannerStyles from '../styles/banner.module.css';
import { applicationApi, getFullUrl, type ApplicationItem, type ApplicationListResponse } from '../services/api';
import { Spin, Pagination } from 'antd';

const pageSize = 12;

const CasePage = (): JSX.Element => {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: pageSize,
    total: 0,
    totalPages: 0
  });

  const fetchApplications = async (page = 1, pageSize = 12) => {
    try {
      setLoading(true);
      const response = await applicationApi.getApplicationList({ page, pageSize });
      setApplications(response.data);
      setPagination({
        current: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages
      });
    } catch (error) {
      console.error('获取应用领域失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1, pageSize);
  }, []);

  // 处理分页变化
  const handlePageChange = (page: number, pageSize?: number) => {
    fetchApplications(page, pageSize);
  };

  // 判断应用领域是否有详情内容
  const hasDetails = (app: ApplicationItem): boolean => {
    return !!app.hasDetails;
  };

  // 判断链接类型并返回适当的链接
  const getAppLink = (app: ApplicationItem): string | null => {
    // 如果有外部链接，优先使用外部链接
    if (app.link) {
      return app.link;
    }

    // 如果有详情内容，则跳转到详情页
    if (hasDetails(app)) {
      return `/cases/detail?id=${app.id}`;
    }

    // 既没有外部链接也没有详情内容，返回null
    return null;
  };

  // 渲染应用领域项
  const renderApplicationItem = (app: ApplicationItem) => {
    const appLink = getAppLink(app);
    const isExternalLink = appLink && appLink.startsWith('http');

    const appContent = (
      <>
        <div className={styles.applicationImages}>
          <img src={getFullUrl(app.image)} alt={app.title} />
        </div>
        <div className={styles.applicationContent}>
          <h4>{app.title}</h4>
          <p>{app.description}</p>
        </div>
      </>
    );

    // 如果有链接
    if (appLink) {
      const linkProps = isExternalLink
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {};

      const linkClass = isExternalLink
        ? `${styles.applicationLink} ${styles.externalLink}`
        : styles.applicationLink;

      return (
        <div key={app.id} className={`${styles.applicationItem} ${styles.hasDetails}`}>
          <a href={appLink} className={linkClass} {...linkProps}>
            {appContent}
          </a>
        </div>
      );
    }

    // 没有链接，则不添加链接跳转
    return (
      <div key={app.id} className={styles.applicationItem}>
        {appContent}
      </div>
    );
  };

  return (
    <Layout>
      <div className={styles.caseContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>应用案例</h1>
            <p>研究基因 产业表达</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.applicationSection}>
            <h2>跨领域赋能实践</h2>
            {loading ? (
              <div className={styles.loadingContainer}>
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className={styles.applications}>
                  {applications.map(app => renderApplicationItem(app))}
                </div>
                {pagination.total > pagination.pageSize && (
                  <div className={styles.paginationContainer}>
                    <Pagination
                      current={pagination.current}
                      pageSize={pagination.pageSize}
                      total={pagination.total}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CasePage; 