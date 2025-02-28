import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import { Button } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import styles from './styles.module.css';

const menuItems = [
  {
    label: '关于我们',
    link: '/about'
  },
  {
    label: '产品技术',
    link: '/products',
    subMenu: [
      { label: '产品介绍', link: '/products' },
      { label: '应用案例', link: '/cases' },
      { label: '文档支持', link: '/docs/intro' }
    ]
  },
  {
    label: '购买渠道',
    link: '/purchase',
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    // 初始化
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (isMobileMenuOpen) {
      if (item.subMenu) {
        setActiveMenu(activeMenu === item.label ? null : item.label);
      } else {
        closeMobileMenu();
      }
    }
  };

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
      <div className="container">
        <div className={styles.navContent}>
          <div className={styles.leftSection}>
            <Link to="/" className={styles.logo}>
              <img src="/img/logo.png" alt="Logo" />
            </Link>


            {isMobileView && (
              <button
                className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
              >
                {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              </button>
            )}

            <div className={`${styles.menuContainer} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className={`${styles.menuItem} ${activeMenu === item.label ? styles.active : ''}`}
                  onMouseEnter={() => !isMobileMenuOpen && setActiveMenu(item.label)}
                  onMouseLeave={() => !isMobileMenuOpen && setActiveMenu(null)}
                >
                  <div
                    className={styles.menuItemWrapper}
                    onClick={() => handleMenuClick(item)}
                  >
                    <Link
                      to={item.link}
                      className={styles.menuLink}
                      onClick={(e) => {
                        if (isMobileMenuOpen && item.subMenu) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <span className={`${styles.expandIcon} ${activeMenu === item.label ? styles.expanded : ''}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12">
                          <path
                            fill="currentColor"
                            d="M6 8.825L11.4 3.425L10.675 2.7L6 7.375L1.325 2.7L0.6 3.425L6 8.825Z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>

                  {item.subMenu && (
                    <div className={`${styles.subMenu} ${activeMenu === item.label ? styles.subMenuActive : ''}`}>
                      <div className={styles.subMenuContent}>
                        <div className={styles.subMenuColumn}>
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.link}
                              className={styles.subMenuLink}
                              onClick={closeMobileMenu}
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

          {/* 只在非移动端显示社交链接 */}
          {!isMobileView && (
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
          )}
        </div>
      </div>
    </nav>
  );
} 