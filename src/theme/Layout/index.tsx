import React from 'react';
import Layout from '@theme-original/Layout';
import type { Props } from '@theme/Layout';
import Navbar from '@site/src/components/Navbar';

export default function LayoutWrapper(props: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <Layout {...props} />
    </>
  );
} 