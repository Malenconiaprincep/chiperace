import React, { useState, useEffect } from 'react';
import Layout from '@site/src/components/Layout';
import { useLocation } from '@docusaurus/router';
import { productApi, getFullUrl } from '../../services/api';
import type { ProductDetail } from '../../services/api';
import styles from './styles.module.css';
import bannerStyles from '../../styles/banner.module.css';

const ProductDetailPage = (): JSX.Element => {
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
        <div className={bannerStyles.banner}>
          <div className={bannerStyles.bannerContent}>
            <h1>{product?.title || '产品详情'}</h1>
            {/* {product?.subtitle && <p>{product.subtitle}
            </p>} */}
          </div>
        </div>

        <div className={styles.content}>
          {product ? (
            <>
              <div className={styles.productDisplay}>
                {product.images && product.images.length > 0 && (
                  <div className={styles.productImages}>
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={getFullUrl(image.url)}
                        alt={image.alt || product.title}
                      />
                    ))}
                  </div>
                )}

                <div className={styles.productInfo}>
                  <h2>{product.title}</h2>
                  {product.subtitle && <h3>{product.subtitle}</h3>}
                  {product.description && <p>{product.description}</p>}
                  {product.details && (
                    <div
                      className={styles.productContent}
                      dangerouslySetInnerHTML={{ __html: product.details }}
                    />
                  )}
                </div>
              </div>

              {product.specifications && (
                <div className={styles.specsSection}>
                  <h3>产品规格</h3>
                  <div className={styles.specsContent}>
                    {product.specifications.summary && (
                      <p>{product.specifications.summary}</p>
                    )}
                    {product.specifications.details && (
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
                    )}
                  </div>
                </div>
              )}

              {product.advantages && product.advantages.length > 0 && (
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
              <p>加载产品信息中...</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage; 