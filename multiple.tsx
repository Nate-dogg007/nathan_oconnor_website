/// app/page.tsx
export const dynamic = "force-static";

// app/layout.tsx
import React from 'react';

const Layout = ({ children }) => {
return (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
      <link rel="preconnect" href="https://consent.cookiebot.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://consent.cookiebot.com" />
      {/* If you use Matomo Cloud */}
      <link rel="preconnect" href="https://cdn.matomo.cloud" crossOrigin="" />
      {/* Optional: your Matomo subdomain, only if configured */}
      {/* <link rel="preconnect" href="https://nathanoconnor.matomo.cloud" crossOrigin="" /> */}
      {/* JSON-LD should stay here */}
    </head>
    <body>
      {children}
    </body>
  </html>
);
};

export default Layout;

// package.json
{
"browserslist": {
  "production": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari major versions",
    "last 2 Edge versions",
    "not IE 11",
    "not dead"
  ],
  "development": [
    "last 1 Chrome version",
    "last 1 Firefox version",
    "last 1 Safari major version"
  ]
}
}
