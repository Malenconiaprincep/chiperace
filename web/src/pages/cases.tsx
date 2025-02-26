import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './cases.module.css';
import bannerStyles from '../styles/banner.module.css';

const CasePage = (): JSX.Element => {
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
            <div className={styles.applications}>
              <div className={styles.applicationItem}>
                <div className={styles.applicationImages}>
                  <img src="/img/products/app-radiation.jpg" alt="抗辐照示意图" />
                </div>
                <div className={styles.applicationContent}>
                  <h4>抗辐照（Au冲击）</h4>
                  <p>基于分子动力学模拟金离子辐照效应</p>
                </div>
              </div>

              <div className={styles.applicationItem}>
                <div className={styles.applicationImages}>
                  <img src="/img/products/app-memory.jpg" alt="相变存储器芯片" />
                </div>
                <div className={styles.applicationContent}>
                  <h4>相变存储器（GeTe相变）</h4>
                  <p>模拟GeTe材料相变过程及性能</p>
                </div>
              </div>

              <div className={styles.applicationItem}>
                <div className={styles.applicationImages}>
                  <img src="/img/products/app-battery.jpg" alt="锂电池示意图" />
                </div>
                <div className={styles.applicationContent}>
                  <h4>锂电池电解质（LiGePS扩散）</h4>
                  <p>研究锂离子在固态电解质中的扩散行为</p>
                </div>
              </div>

              <div className={styles.applicationItem}>
                <div className={styles.applicationImages}>
                  <img src="/img/products/app-bonding.jpg" alt="混合键合结构" />
                </div>
                <div className={styles.applicationContent}>
                  <h4>混合键合（Cu键合）</h4>
                  <p>研究铜键合界面的形成机理</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CasePage; 