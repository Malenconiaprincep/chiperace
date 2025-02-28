import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { productApi, getFullUrl } from '../../services/api';
import type { ProductItem } from '../../services/api';

export default function ProductGrid() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getProductList();
        setProducts(response.data);
      } catch (error) {
        console.error('获取产品列表失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // if (loading) {
  //   return <div>加载中...</div>;
  // }

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2>产品与解决方案</h2>
        </div>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/detail?id=${product.id}`}
              className={styles.productCard}
            >
              <div className={styles.productImageWrapper}>
                <img
                  src={getFullUrl(product.image)}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productContent}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <h4 className={styles.productSubtitle}>{product.subtitle}</h4>
                <p className={styles.productDescription}>{product.description}</p>
                {/* <div className={styles.learnMore}>
                  了解更多
                  <span className={styles.arrow}>→</span>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
} 