import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './about.module.css';
import bannerStyles from '../styles/banner.module.css';

const AgreementPage = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.aboutContainer}>
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>用户协议</h1>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <h2>1. 总则</h2>
            <p>本法律声明包含芯培森平台的使用条款和法律条款。使用我们的服务即表示您同意本声明的全部内容。</p>
          </div>

          <div className={styles.section}>
            <h2>2. 知识产权声明</h2>
            <p>2.1 芯培森平台及其内容，包括但不限于文字、图片、音频、视频、图表、标识、版面设计、电子文档等均受著作权法和国际著作权条约以及其他知识产权法律法规的保护。</p>
            <p>2.2 未经芯培森事先书面同意，任何人不得以任何方式使用。</p>
          </div>

          <div className={styles.section}>
            <h2>3. 免责声明</h2>
            <p>3.1 芯培森对以下情况不承担责任：</p>
            <ul>
              <li>因不可抗力导致的服务中断或故障</li>
              <li>用户使用过程中的风险和后果</li>
              <li>第三方侵权行为</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>4. 适用法律</h2>
            <p>4.1 本声明适用中华人民共和国法律。</p>
            <p>4.2 因本声明引起的任何争议，均应提交至有管辖权的人民法院解决。</p>
          </div>

          <div className={styles.section}>
            <h2>5. 其他规定</h2>
            <p>本声明的最终解释权归芯培森所有。</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgreementPage; 