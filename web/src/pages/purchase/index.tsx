import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './styles.module.css';
import bannerStyles from '../../styles/banner.module.css';
import { Button } from 'antd';

export default function Purchase(): JSX.Element {
  return (
    <Layout>
      <div className={styles.purchaseContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>购买渠道</h1>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>选择您的购买方式</h2>
            <p className={styles.description}>
              我们提供多种灵活的购买方式，您可以根据自身需求选择最适合的渠道
            </p>
            <div className={styles.buttonGroup}>
              <div className={styles.purchaseOption}>
                <h3>线下购买</h3>
                <p>直接与我们的销售团队联系，获得专业的购买建议和支持</p>
                <Button
                  type="primary"
                  size="large"
                  href="/purchase/offline"
                  className={styles.button}
                >
                  了解详情
                </Button>
              </div>

              <div className={styles.purchaseOption}>
                <h3>线上购买</h3>
                <p>通过我们的线上商城，便捷地完成产品选购和支付</p>
                <Button
                  type="primary"
                  size="large"
                  href="https://www.baidu.com"
                  target="_blank"
                  className={styles.button}
                >
                  立即购买
                </Button>
              </div>

              <div className={styles.purchaseOption}>
                <h3>云上服务</h3>
                <p>订阅我们的云服务，随时随地使用高性能计算资源</p>
                <Button
                  type="primary"
                  size="large"
                  href="http://nvnmd.picp.vip/"
                  target="_blank"
                  className={styles.button}
                >
                  开始使用
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 