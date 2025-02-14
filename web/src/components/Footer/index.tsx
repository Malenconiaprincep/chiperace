import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const socialLinks = [
  {
    icon: '/img/footer-wx.png',
    qrCode: '/img/qrcode.jpg',
    label: '微信',
    url: '#'
  },
  // {
  //   icon: '/img/social/weibo.svg',
  //   label: '微博',
  //   url: '#'
  // },
  // {
  //   icon: '/img/social/linkedin.svg',
  //   label: 'LinkedIn',
  //   url: '#'
  // },
  // {
  //   icon: '/img/social/zhihu.svg',
  //   label: '知乎',
  //   url: '#'
  // }
];

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
  const [activeQRCode, setActiveQRCode] = useState<string | null>(null);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.mainContent}>
            <div className={styles.logo}>
              <img src="/img/logo.png" alt="Cambricon" />
              <span>芯培森</span>
            </div>
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
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.copyright}>
          <p>版权所有 © 2016-2025 Cambricon.com</p>
          <p>备案/许可证号: 京ICP备17003415号-1</p>
        </div>
      </div>
    </footer>
  );
} 