import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import { useLocation } from '@docusaurus/router';
import { productApi, getFullUrl } from '../services/api';
import type { ProductDetail } from '../services/api';
import styles from './products.module.css';

const ProductsPage = (): JSX.Element => {
  const location = useLocation();
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const productId = params.get('id');

        if (!productId) {
          return;
        }

        const response = await productApi.getProductDetail(productId);
        setProduct(response.data);
      } catch (error) {
        console.error('获取产品详情失败:', error);
      }
    };

    fetchProduct();
  }, [location]);

  return (
    <Layout>
      <div className={styles.productsContainer}>
        <div className={styles.banner}>
          <div className={styles.bannerBg}></div>
          <div className={styles.bannerContent}>
            <h1>产品详情</h1>
          </div>
        </div>

        <div className={styles.content}>
          {product ? (
            <>
              <div className={styles.productDisplay}>
                <div className={styles.productImages}>
                  {product.images?.map((image, index) => (
                    <img
                      key={index}
                      src={getFullUrl(image.url)}
                      alt={image.alt || product.title}
                    />
                  ))}
                </div>
                <div className={styles.productInfo}>
                  <h2>{product.title}</h2>
                  <h3>{product.subtitle}</h3>
                  <p>{product.description}</p>
                </div>
              </div>

              {product.specifications && (
                <div className={styles.specsSection}>
                  <h3>产品规格</h3>
                  <div className={styles.specsContent}>
                    <p>{product.specifications.summary}</p>

                    <table className={styles.specsTable}>
                      <tbody>
                        {product.specifications.details.map((spec, index) => (
                          <tr key={index}>
                            <td>{spec.label}</td>
                            <td>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {product.advantages && (
                <div className={styles.advantagesSection}>
                  <h3>产品优势</h3>
                  <div className={styles.advantages}>
                    {product.advantages.map((advantage, index) => (
                      <div key={index} className={styles.advantageItem}>
                        <h4>{advantage.title}</h4>
                        <p>{advantage.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noProduct}>
              <p>请选择要查看的产品</p>
            </div>
          )}

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