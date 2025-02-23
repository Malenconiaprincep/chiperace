import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import Slider from 'react-slick';
import styles from './styles.module.css';
import { bannerApi, getFullUrl, type BannerItem } from '../../services/api';

// 引入 slick 的样式
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function MainProduct() {
  const [bannerData, setBannerData] = useState<BannerItem[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const { data } = await bannerApi.getBannerList();
        setBannerData(data);
      } catch (error) {
        console.error('获取 banner 数据失败:', error);
      }
    };

    fetchBannerData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: !isMobileView, // 移动端不显示箭头
    fade: true
  };

  return (
    <section className={styles.mainProduct}>
      <Slider {...settings} className={styles.slider}>
        {bannerData.map((banner, index) => (
          <div key={index}>
            <div className={styles.slide}>
              <div className={styles.overlay}>
                <div className={styles.container}>
                  <div className={styles.content}>
                    <h2>{banner.title}</h2>
                    <p className={styles.subtitle}>{banner.subtitle}</p>
                    {/* 只在非移动端显示描述和按钮 */}
                    {!isMobileView && (
                      <>
                        <p className={styles.description}>{banner.description}</p>
                        <Link className="button button--primary" to={banner.link}>
                          了解更多
                        </Link>
                      </>
                    )}
                  </div>
                  {/* 只在非移动端显示产品图片 */}
                  {!isMobileView && (
                    <div className={styles.productImage}>
                      <img src={getFullUrl(banner.image)} alt={banner.title} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
} 