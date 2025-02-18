import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const menuItems = [
  {
    label: '关于我们',
    link: '/about'
  },
  {
    label: '产品中心',
    link: '/products',
    subMenu: [
      { label: '产品介绍', link: '/products' },
      { label: '应用案例', link: '/cases' },
      { label: '文档支持', link: '/docs/intro' }
    ]
  },
  {
    label: '购买渠道',
    subMenu: [
      {
        label: '线下购买',
        link: '/purchase/offline',
      },
      {
        label: '线上购买',
        link: 'https://www.baidu.com', // 替换为实际的线上购买链接
      },
      {
        label: '云上服务',
        link: 'http://nvnmd.picp.vip/', // 替换为实际的云服务链接
      },
    ],
  },
  {
    label: '公司新闻',
    link: '/news'
  },
  {
    label: '加入我们',
    link: '/join'
  }
];

const socialLinks = [
  {
    icon: '/img/footer-wx.png',
    qrCode: '/img/qrcode.jpg',
    label: '微信',
    url: '#'
  }
];



export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeQRCode, setActiveQRCode] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
      <div className="container">
        <div className={styles.navContent}>
          <div className={styles.leftSection}>
            <Link to="/" className={styles.logo}>
              <img src="/img/logo.png" alt="Logo" />
            </Link>

            <div className={styles.menuContainer}>
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className={styles.menuItem}
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    to={item.link}
                    className={`${styles.menuLink} ${activeMenu === item.label ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>

                  {item.subMenu && activeMenu === item.label && (
                    <div className={styles.subMenu}>
                      <div className={styles.subMenuContent}>
                        <div className={styles.subMenuColumn}>
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.link}
                              className={styles.subMenuLink}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.socialLinks}>
            {socialLinks.map((social) => (
              <div
                key={social.label}
                className={styles.socialLinkWrapper}
                onMouseEnter={() => setActiveQRCode(social.qrCode)}
                onMouseLeave={() => setActiveQRCode(null)}
              >
                <div className={`${styles.socialLink} ${activeQRCode === social.qrCode ? styles.active : ''}`} />
                {activeQRCode === social.qrCode && (
                  <div className={styles.qrCodePopup}>
                    <img src={social.qrCode} alt={`${social.label} QR Code`} />
                    <div className={styles.qrCodeText}>微信公众号</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 