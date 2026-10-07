/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Head from "next/head";
import Layout from "../layout/layout";
import "../styles/globals.css";

import { Provider } from "react-redux";
import { store } from "../reduxStore/store";
import { persistStore } from "redux-persist";

import { SessionProvider } from "next-auth/react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { memo, useEffect, useState } from "react";

import Router from "next/router";
import dynamic from "next/dynamic";
import Script from "next/script";

import CartSync from "../components/CartSync";

/* =========================================================
   Persistor
========================================================= */

const persistor = persistStore(store);

/* =========================================================
   Lazy Components
========================================================= */

const Loader = dynamic(
  () => import("../components/loader"),
  {
    ssr: false,
  }
);

const CookieConsent = dynamic(
  () => import("../components/CookieConsent"),
  {
    ssr: false,
  }
);

/* =========================================================
   GOOGLE ANALYTICS
========================================================= */

/*
  ARENQ Google Analytics Measurement ID
*/

const GA_ID = "G-6HJT9LZS8R";

/* =========================================================
   Google Analytics Page View
========================================================= */

const pageview = (url) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_ID, {
      page_path: url,
    });
  }
};

/* =========================================================
   My App
========================================================= */

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  /* =======================================================
     Route Change Loader
  ======================================================== */

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
    };

    Router.events.on(
      "routeChangeStart",
      handleStart
    );

    Router.events.on(
      "routeChangeComplete",
      handleComplete
    );

    Router.events.on(
      "routeChangeError",
      handleError
    );

    return () => {
      Router.events.off(
        "routeChangeStart",
        handleStart
      );

      Router.events.off(
        "routeChangeComplete",
        handleComplete
      );

      Router.events.off(
        "routeChangeError",
        handleError
      );
    };
  }, []);

  /* =======================================================
     Google Analytics SPA Page Tracking
  ======================================================== */

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    Router.events.on(
      "routeChangeComplete",
      handleRouteChange
    );

    return () => {
      Router.events.off(
        "routeChangeComplete",
        handleRouteChange
      );
    };
  }, []);

  /* =======================================================
     App Component
  ======================================================== */

  const AppComponent = memo((props) => (
    <Layout>
      <Component {...props} />

      <CookieConsent />
    </Layout>
  ));

  /* =======================================================
     Render
  ======================================================== */

  return (
    <>
      {/* =====================================================
          GLOBAL HEAD
      ====================================================== */}

      <Head>

        {/* Mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        {/* Theme */}
        <meta
          name="theme-color"
          content="#ffffff"
        />

        {/* Font Preconnect */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Work Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

      </Head>

      {/* =====================================================
          GOOGLE ANALYTICS
      ====================================================== */}

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* =====================================================
          TOAST
      ====================================================== */}

      <ToastContainer />

      {/* =====================================================
          SESSION PROVIDER
      ====================================================== */}

      <SessionProvider
        session={pageProps?.session}
      >

        {/* ===================================================
            REDUX PROVIDER
        ==================================================== */}

        <Provider store={store}>

          {/* =================================================
              CART SYNC
          ================================================== */}

          <CartSync />

          {/* =================================================
              MAIN APPLICATION
          ================================================== */}

          <AppComponent {...pageProps} />

          {/* =================================================
              PAGE LOADER
          ================================================== */}

          {isLoading && (
            <div className="fixed inset-0 z-30 bg-black/30 flex items-center justify-center pointer-events-none">
              <Loader />
            </div>
          )}

        </Provider>

      </SessionProvider>
    </>
  );
}

/* =========================================================
   EXPORT
========================================================= */

export default MyApp;