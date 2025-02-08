import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.logoSection}>
          {/* <img src="/img/logo.png" alt="Logo" className={styles.logo} /> */}
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>

        <div className={styles.actionButtons}>
          <Link
            className={clsx('button button--primary button--lg', styles.getStartedButton)}
            to="/docs/intro">
            开始对话
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.downloadButton)}
            to="/download">
            获取手机 App
          </Link>
        </div>

        {/* <div className={styles.qrCodeSection}>
          <img src="/img/qr-code.png" alt="QR Code" className={styles.qrCode} />
          <p>扫描下载 App</p>
        </div> */}
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
