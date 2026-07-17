/* eslint-disable @next/next/inline-script-id */
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ---------------- Basic Meta ---------------- */}
        <meta charSet="UTF-8" />

        <meta name="robots" content="index,follow" />
        {/* ---------------- Resource Hints ---------------- */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://arenq.s3.ap-south-1.amazonaws.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* ---------------- Structured Data ---------------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Arenq",
              url: "https://www.arenq.co.in",
              logo: "https://arenq.s3.ap-south-1.amazonaws.com/logo.png",
            }),
          }}
        />

        {/* ---------------- Site Verification ---------------- */}
        <meta
          name="google-site-verification"
          content="Ba-66nEw4p5EZJW43E8tZ25QNHMsnGPjwY_7UE0_uaw"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
