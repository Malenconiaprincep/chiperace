import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const mainProduct = {
  title: '原子级高性能计算服务器APU-Server v1.0',
  subtitle: '高速高精度分子动力学计算',
  description: '采用非冯·诺依曼架构技术，单节点计算速度等同于≈1000个Intel Xeon CPU核并行速度',
  image: '/img/products/apu-1.jpg',
  link: '/products'
};

export default function ProductGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>产品方案</span>
          <h2 className={styles.sectionTitle}>高性能计算解决方案</h2>
        </div>

        <div className={styles.mainProduct}>
          <div className={styles.productImage}>
            <img src={mainProduct.image} alt={mainProduct.title} />
          </div>
          <div className={styles.productInfo}>
            <h3>{mainProduct.title}</h3>
            <h4>{mainProduct.subtitle}</h4>
            <p>{mainProduct.description}</p>
            <Link className={styles.learnMore} to={mainProduct.link}>
              了解更多
              <span className={styles.arrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 