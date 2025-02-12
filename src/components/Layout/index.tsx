import React, { ReactNode } from 'react';
import Navbar from '@site/src/components/Navbar';
import Footer from '@site/src/components/Footer';
import styles from './styles.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
} 