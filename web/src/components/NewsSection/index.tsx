import React from 'react';
import styles from './styles.module.css';

const news = [
  {
    date: '09',
    month: 'Oct',
    title: '关于禁售原因素某某公司对文述件通报相关声明',
    tag: '声明'
  },
  {
    date: '25',
    month: 'Sep',
    title: '公司声明',
    tag: '声明'
  }
];

export default function NewsSection() {
  return (
    <section className={styles.newsSection}>
      <div className="container">
        <h2>公司新闻</h2>
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <div key={item.title} className={styles.newsCard}>
              <div className={styles.newsDate}>
                <span className={styles.day}>{item.date}</span>
                <span className={styles.month}>{item.month}</span>
              </div>
              <div className={styles.newsContent}>
                <h3>{item.title}</h3>
                <span className={styles.tag}>{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 