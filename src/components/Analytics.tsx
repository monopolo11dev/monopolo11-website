"use client";
import React, { FC, useEffect } from "react";
import { init } from "@socialgouv/matomo-next";

const MATOMO_URL = "https://analytics.monopolo11.com";
const MATOMO_SITE_ID = "4";

const Analytics: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "production")
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);
  return <></>;
};

export default Analytics;
