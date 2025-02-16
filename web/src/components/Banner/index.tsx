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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const { data } = await bannerApi.getBannerList();
        setBannerData(data);
      } catch (error) {
        console.error('获取 banner 数据失败:', error);
      } finally {
        setLoading(false);
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
    arrows: true,
    fade: true
  };

  if (loading) {
    return <div className={styles.loading}>加载中...</div>;
  }

  return (
    <section className={styles.mainProduct}>
      <Slider {...settings} className={styles.slider}>
        {bannerData.map((banner, index) => (
          <div key={index}>
            <div
              className={styles.slide}
              style={{ backgroundImage: `url(${getFullUrl(banner.image)})` }}
            >
              <div className={styles.overlay}>
                <div className="container">
                  <div className={styles.content}>
                    <h2>{banner.title}</h2>
                    <p className={styles.subtitle}>{banner.subtitle}</p>
                    <p className={styles.description}>{banner.description}</p>
                    <Link className="button button--primary" to={banner.link}>
                      了解更多
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
} 