import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const menuItems = [
  {
    label: '产品中心',
    link: '/products',
    subMenu: [
      {
        title: '产品介绍',
        items: [
          {
            label: '智能加速卡',
            subItems: [
              { label: 'MLU370-S4/S8智能加速卡', link: '/products/mlu370-s' },
              { label: 'MLU290-M5智能加速卡', link: '/products/mlu290-m5' },
              { label: 'MLU220-M.2边缘智能加速卡', link: '/products/mlu220-m2' }
            ]
          },
          {
            label: '智能计算集群',
            subItems: [
              { label: '智能计算集群解决方案', link: '/products/cluster' }
            ]
          }
        ]
      },
      {
        title: '应用案例',
        items: [
          { label: '人工智能', link: '/cases/ai' },
          { label: '智慧金融', link: '/cases/finance' },
          { label: '智慧城市', link: '/cases/city' }
        ]
      },
      {
        title: '文档支持',
        items: [
          { label: '开发文档', link: '/docs/dev' },
          { label: '用户手册', link: '/docs/user' },
          { label: '常见问题', link: '/docs/faq' }
        ]
      }
    ]
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

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
                      {item.subMenu.map((section) => (
                        <div key={section.title} className={styles.subMenuSection}>
                          <h3>{section.title}</h3>
                          {section.items.map((subItem) => (
                            <div key={subItem.label} className={styles.subMenuItem}>
                              {subItem.subItems ? (
                                <>
                                  <h4>{subItem.label}</h4>
                                  <div className={styles.subSubMenu}>
                                    {subItem.subItems.map((subSubItem) => (
                                      <Link
                                        key={subSubItem.label}
                                        to={subSubItem.link}
                                        className={styles.subSubMenuItem}
                                      >
                                        {subSubItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <Link to={subItem.link} className={styles.subMenuLink}>
                                  {subItem.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
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