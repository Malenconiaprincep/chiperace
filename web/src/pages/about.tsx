import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './about.module.css';
import bannerStyles from '../styles/banner.module.css';

const AboutPage = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>关于我们</h1>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>公司简介</h2>
            <p>广东芯培森技术有限公司由湖南大学集成电路学院刘杰教授团队于2024年11月创办，主要从事面向原子级科学计算的算力芯片（APU）的研发和销售。该团队于2022年研发出面向原子级科学计算的第一代“非冯·诺依曼”专用芯片架构技术，并于2023年自主研制出基于第一代技术的服务器产品，经多家第三方用户实测，该产品在运行专用原子级科学计算时，同等精度和功耗下，相较“对华禁运”的高端GPU速度提升约1个数量级。目前，基于第一代技术的产品和服务已销售至国内外30多家企业、高校、科研院所。</p>
          </div>

          {/* <div className={styles.section}>
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
          </div> */}

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
            <h2>公司地址</h2>
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