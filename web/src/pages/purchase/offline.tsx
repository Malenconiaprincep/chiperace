import React, { useState } from 'react';
import Layout from '@site/src/components/Layout';
import styles from './styles.module.css';
import bannerStyles from '../../styles/banner.module.css';
import { purchaseApi, type PurchaseFormData } from '../../services/api';

export default function OfflinePurchase(): JSX.Element {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<PurchaseFormData>({
    company: '',
    contact: '',
    phone: '',
    email: '',
    requirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      // 使用 purchaseApi 提交表单
      await purchaseApi.submitPurchase(formData);

      // 清空表单
      setFormData({
        company: '',
        contact: '',
        phone: '',
        email: '',
        requirements: ''
      });

      // 显示成功消息
      alert('提交成功！我们会尽快与您联系。');
    } catch (error) {
      console.error('提交失败:', error);
      alert('提交失败，请稍后重试。');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className={bannerStyles.banner}>
        <div className={bannerStyles.bannerContent}>
          <h1>线下购买</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.companyInfo}>
            <h2>公司联系方式</h2>
            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <strong>公司电话：</strong>
                <a href="tel:400-123-4567">400-123-4567</a>
              </div>
              <div className={styles.contactItem}>
                <strong>公司邮箱：</strong>
                <a href="mailto:sales@chipierce.com">sales@chipierce.com</a>
              </div>
            </div>
            <div className={styles.divider}></div>
          </div>

          <h2>填写采购信息</h2>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="company">公司名称</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact">联系人</label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">联系电话</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">电子邮箱</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="requirements">采购需求</label>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={submitting}
              >
                {submitting ? '提交中...' : '提交申请'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
} 