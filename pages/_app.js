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

/* ---------------- Persistor ---------------- */
const persistor = persistStore(store);

/* ---------------- Lazy components ---------------- */
const Loader = dynamic(() => import("../components/loader"), { ssr: false });
const CookieConsent = dynamic(
  () => import("../components/CookieConsent"),
  { ssr: false }
);

/* ---------------- GA Tracking ID ---------------- */
const GA_ID = "G-9C84EK7RVK";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- Route change loader ---------------- */
  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  /* ---------------- GA Page Tracking (IMPORTANT) ---------------- */
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag !== "undefined") {
        window.gtag("config", GA_ID, {
          page_path: url,
        });
      }
    };

    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const AppComponent = memo((props) => (
    <Layout>
      <Component {...props} />
      <CookieConsent />
    </Layout>
  ));

  return (
    <>
      {/* ---------------- Google Analytics ---------------- */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      {/* Load GA script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      {/* Initialize GA */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* ---------------- Toast ---------------- */}
      <ToastContainer />

      {/* ---------------- Providers ---------------- */}
      <SessionProvider session={pageProps?.session}>
        <Provider store={store}>
          <CartSync />

          <AppComponent {...pageProps} />

          {/* ---------------- Loader ---------------- */}
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

export default MyApp;