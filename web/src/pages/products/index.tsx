import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import Link from '@docusaurus/Link';
import { productApi, getFullUrl } from '../../services/api';
import type { ProductItem } from '../../services/api';
import styles from './products.module.css';

const ProductsPage = (): JSX.Element => {
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

  return (
    <Layout>
      <div className={styles.productsContainer}>
        <div className={styles.banner}>
          <div className={styles.bannerBg}></div>
          <div className={styles.bannerContent}>
            <h1>产品方案</h1>
            <p>专业的高性能计算解决方案</p>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <div className="container">
              <div className={styles.sectionHeader}>
                <h2>产品方案</h2>
              </div>

              {loading ? (
                <div className={styles.loading}>加载中...</div>
              ) : (
                <div className={styles.productsGrid}>
                  {products.map((product) => (
                    <div key={product.id} className={styles.productCard}>
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
                        <Link
                          className={styles.learnMore}
                          to={`/products/detail?id=${product.id}`}
                        >
                          了解更多
                          <span className={styles.arrow}>→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <div className={styles.customersSection}>
            <h3>产品与服务用户</h3>
            <div className={styles.customerLogos}>
              <div className={styles.logoItem}>
                <img src="/img/customers/huawei.png" alt="华为" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/aist.png" alt="北京量子智能研究院" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/nudt.png" alt="国防科技大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/jilin.png" alt="吉林大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/dp.png" alt="深势科技" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/ustb.png" alt="北京科技大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/xmu.png" alt="厦门大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/zzu.png" alt="郑州大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/pku.png" alt="北京大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/hbnu.png" alt="湖北第二师范学院" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/scut.png" alt="华南理工大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/whu.png" alt="武汉大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/cityu.png" alt="香港城市大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/nwpu.png" alt="西北工业大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/kunming.png" alt="昆明理工大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/hku.png" alt="香港大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/inner-mongolia.png" alt="内蒙古师范大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/physics-cas.png" alt="中国科学院物理研究所" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/bit.png" alt="北京理工大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/tsinghua.png" alt="清华大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/chongqing.png" alt="重庆大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/caep.png" alt="中国工程物理研究院" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/huazhong.png" alt="华中科技大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/hunan.png" alt="湖南大学" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage; 