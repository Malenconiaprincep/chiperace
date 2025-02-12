import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const products = [
  {
    title: '云端AI加速卡MLU370-S4',
    description: '先进Chiplet技术，超强MLU Uarch3.0架构，AI性能全面升级',
    image: '/img/products/mlu370.png',
    link: '/products/mlu370'
  },
  {
    title: '云端AI训练卡MLU290-M5',
    description: '面向人工智能训练',
    image: '/img/products/mlu290.png',
    link: '/products/mlu290'
  },
  {
    title: '边缘AI加速卡MLU220-M.2',
    description: '新一代边缘智能解决方案',
    image: '/img/products/mlu220.png',
    link: '/products/mlu220'
  }
];

export default function ProductGrid() {
  return (
    <section className={styles.productGrid}>
      <div className="container">
        <div className={styles.gridContainer}>
          {products.map((product) => (
            <div key={product.title} className={styles.productCard}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <Link className="button button--secondary" to={product.link}>
                了解更多
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 