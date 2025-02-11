import React from 'react';
import type { WrapperProps } from '@docusaurus/types';
import Footer from '@site/src/components/Footer';

export default function FooterWrapper(props: WrapperProps): JSX.Element {
  return <Footer {...props} />;
} 