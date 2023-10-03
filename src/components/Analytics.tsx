'use client';

import Script from 'next/script';
import React, { FC } from 'react';

const Analytics: FC = () => (
  <>
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-9B49RTBS39" />
    <Script id="google-analytics">
      {` window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9B49RTBS39');
        `}
    </Script>
  </>
);

export default Analytics;
