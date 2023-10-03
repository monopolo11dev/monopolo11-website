'use client';

import Script from 'next/script';
import React, { FC, useEffect } from 'react';
import { init } from '@socialgouv/matomo-next';

const MATOMO_URL = 'https://analytics.monopolo11.com';
const MATOMO_SITE_ID = '4';

const Analytics: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);

  return (
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
};

export default Analytics;
