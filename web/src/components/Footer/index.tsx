import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const footerLinks = [
  {
    label: '用户协议',
    url: '/agreement'
  },
  {
    label: '法律声明',
    url: '/legal'
  },
  {
    label: '隐私政策',
    url: '/privacy'
  }
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.logo}>
            <img src="/img/logo.png" alt="Chipierce" className={styles.logoImage} />
          </div>

          <div className={styles.links}>
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                to={link.url}
                className={styles.footerLink}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.copyright}>
          <p>版权所有 © 2016-2025 Chipierce.com</p>
          <p>备案/许可证号: 粤ICP备2025373852号</p>
        </div>
      </div>
    </footer>
  );
} 