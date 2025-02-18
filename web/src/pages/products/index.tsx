import React from 'react';
import Layout from '@site/src/components/Layout';
import ProductGrid from '@site/src/components/ProductGrid';
import styles from './styles.module.css';

const ProductsPage = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.productsContainer}>
        <div className={styles.banner}>
          <div className={styles.bannerBg}></div>
          <div className={styles.bannerContent}>
            <h1>产品方案</h1>
            <p>专业的高性能计算解决方案</p>
          </div>
        </div>

        <div className={styles.content}>
          <ProductGrid />

          <div className={styles.customersSection}>
            <h3>产品与服务用户</h3>
            <div className={styles.customerLogos}>
              <div className={styles.logoItem}>
                <img src="/img/customers/huawei.png" alt="华为" />
              </div>
              {/* ... 其他客户logo ... */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage; 