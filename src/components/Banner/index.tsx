import React from 'react';
import Link from '@docusaurus/Link';
import Slider from 'react-slick';
import styles from './styles.module.css';

// 引入 slick 的样式
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bannerData = [
  {
    title: 'MLU290-M5云端AI训练卡',
    subtitle: '面向人工智能训练',
    description: '采用MLU架构云端芯片技术，自适应高效训练方案',
    image: '/img/banner.jpg',
    link: '/products/mlu290'
  },
  {
    title: 'MLU370-S4云端AI加速卡',
    subtitle: '性能全面升级',
    description: '先进Chiplet技术，超强MLU Uarch3.0架构，AI性能全面升级',
    image: '/img/banner.jpg',
    link: '/products/mlu370'
  },
  {
    title: 'MLU220-M.2边缘AI加速卡',
    subtitle: '边缘智能解决方案',
    description: '新一代边缘计算核心动力，为智能边缘赋能',
    image: '/img/banner.jpg',
    link: '/products/mlu220'
  }
];

export default function MainProduct() {
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

  return (
    <section className={styles.mainProduct}>
      <Slider {...settings} className={styles.slider}>
        {bannerData.map((banner, index) => (
          <div key={index}>
            <div
              className={styles.slide}
              style={{ backgroundImage: `url(${banner.image})` }}
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