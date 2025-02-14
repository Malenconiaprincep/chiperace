import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './about.module.css';

const AboutPage = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        <div className={styles.banner}>
          <h1>关于我们</h1>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>公司简介</h2>
            <p>芯培森是一家专注于人工智能芯片和智能计算解决方案的高科技企业。我们致力于为客户提供领先的AI计算产品和服务，助力各行业实现智能化转型。</p>
          </div>

          <div className={styles.section}>
            <h2>发展历程</h2>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.year}>2016</div>
                <div className={styles.event}>公司成立</div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.year}>2018</div>
                <div className={styles.event}>发布首款AI芯片</div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.year}>2020</div>
                <div className={styles.event}>完成B轮融资</div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.year}>2022</div>
                <div className={styles.event}>全球化布局</div>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>企业文化</h2>
            <div className={styles.cultureGrid}>
              <div className={styles.cultureItem}>
                <h3>愿景</h3>
                <p>成为全球领先的AI芯片设计公司</p>
              </div>
              <div className={styles.cultureItem}>
                <h3>使命</h3>
                <p>用创新科技推动产业智能化升级</p>
              </div>
              <div className={styles.cultureItem}>
                <h3>价值观</h3>
                <p>创新、专注、协作、共赢</p>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>联系我们</h2>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <h3>总部地址</h3>
                <p>北京市海淀区科技园区</p>
              </div>
              <div className={styles.contactItem}>
                <h3>联系电话</h3>
                <p>400-888-8888</p>
              </div>
              <div className={styles.contactItem}>
                <h3>电子邮箱</h3>
                <p>contact@chipforce.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 