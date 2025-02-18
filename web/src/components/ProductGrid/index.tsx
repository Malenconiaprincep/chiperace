import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const products = [
  {
    title: '原子级高性能计算服务器APU-Server v1.0',
    subtitle: '高速高精度分子动力学计算',
    description: '采用非冯·诺依曼架构技术，单节点计算速度等同于≈1000个Intel Xeon CPU核并行速度',
    image: '/img/products/apu-1.jpg',
    link: '/products'
  },
  {
    title: '量子计算模拟器QC-Simulator',
    subtitle: '量子计算仿真与验证',
    description: '支持多种量子门集合，可模拟最多64量子比特系统，适用于量子算法开发与验证',
    image: '/img/products/qc-sim.jpg',
    link: '/products/qc-simulator'
  },
  {
    title: 'AI加速计算平台AI-Accelerator',
    subtitle: '深度学习训练与推理',
    description: '专为AI工作负载优化的计算平台，支持主流深度学习框架，提供卓越的性能表现',
    image: '/img/products/ai-acc.jpg',
    link: '/products/ai-accelerator'
  }
];

export default function ProductGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>产品方案</h2>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <img src={product.image} alt={product.title} className={styles.productImage} />
              </div>
              <div className={styles.productContent}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <h4 className={styles.productSubtitle}>{product.subtitle}</h4>
                <p className={styles.productDescription}>{product.description}</p>
                <Link className={styles.learnMore} to={product.link}>
                  了解更多
                  <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 