import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './styles.module.css';
import bannerStyles from '../../styles/banner.module.css';

export default function OfflinePurchase(): JSX.Element {
  return (
    <Layout>
      <div className={bannerStyles.banner}>
        <div className={bannerStyles.bannerContent}>
          <h1>线下购买</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section} style={{ width: '800px' }}>
          <h2>填写采购信息</h2>
          <div className={styles.formContainer}>
            <form onSubmit={(e) => {
              e.preventDefault();
              // 处理表单提交
              alert('表单已提交，我们会尽快与您联系！');
            }}>
              <div className={styles.formGroup}>
                <label htmlFor="company">公司名称</label>
                <input type="text" id="company" name="company" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact">联系人</label>
                <input type="text" id="contact" name="contact" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">联系电话</label>
                <input type="tel" id="phone" name="phone" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">电子邮箱</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="requirements">采购需求</label>
                <textarea id="requirements" name="requirements" rows={4} required></textarea>
              </div>

              <button type="submit" className={styles.submitButton}>
                提交申请
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 