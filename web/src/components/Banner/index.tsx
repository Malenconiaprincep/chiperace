import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import styles from './styles.module.css';
import { bannerApi, getFullUrl, type BannerItem } from '../../services/api';

// 引入 Swiper 样式
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

  return (
    <section className={styles.mainProduct}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={!isMobileView}
        className={styles.slider}
      >
        {bannerData.map((banner, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles.slide}
            // style={{
            //   backgroundImage: 'url(/img/banner.jpg)'
            // }}
            >
              <div className={styles.overlay}>
                <div className={styles.container}>
                  <div className={styles.content}>
                    <h2>{banner.title}</h2>
                    <p className={styles.subtitle}>{banner.subtitle}</p>
                    {!isMobileView && (
                      <>
                        <p className={styles.description}>{banner.description}</p>
                        <Link className="button button--primary" to={banner.link}>
                          了解更多
                        </Link>
                      </>
                    )}
                  </div>
                  {!isMobileView && (
                    <div className={styles.productImage}>
                      <img src={getFullUrl(banner.image)} alt={banner.title} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
} 