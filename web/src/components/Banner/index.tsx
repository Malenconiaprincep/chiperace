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
  let isAnimating = null

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
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={!isMobileView}
        className={styles.slider}
        onSwiper={(swiper) => {
          if (!swiper.animating) {
            clearInterval(isAnimating)
          }
          isAnimating = setInterval(() => {
            swiper.animating = false
          }, 1000)
        }}
      >
        {bannerData.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slide}>
              <div className={styles.overlay}>
                <div className={styles.container}>
                  <Link to={banner.link} className={styles.slideLink}>
                    <div className={styles.contentContainer}>
                      <div className={styles.content}>
                        <h2>{banner.title}</h2>
                        {isMobileView && <p className={styles.subtitle}>{banner.subtitle}</p>}
                        {/* {!isMobileView && (
                        <>
                          <p className={styles.description}>{banner.description}</p>
                          <span className="button button--primary">
                            了解更多
                          </span>
                        </>
                      )} */}
                      </div>
                      {!isMobileView && (
                        <div className={styles.productImage}>
                          <img src={getFullUrl(banner.image)} alt={banner.title} />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
} 