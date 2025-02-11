import React from 'react';
import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Navbar from '@site/src/components/Navbar';
import MainProduct from '@site/src/components/MainProduct';
import ProductGrid from '@site/src/components/ProductGrid';
import NewsSection from '@site/src/components/NewsSection';
import Footer from '@site/src/components/Footer';
// import HomepageHeader from '@site/src/components/HomepageHeader';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Navbar />
      {/* <Layout
        title={siteConfig.title}
        description="寒武纪官方网站"
        wrapperClassName="homepage"
      > */}
      {/* <HomepageHeader /> */}
      <MainProduct />
      <ProductGrid />
      <NewsSection />
      <Footer />
      {/* </Layout> */}
    </>
  );
}
