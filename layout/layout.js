import { useEffect } from "react";
import Script from "next/script";
import { fetchCategories } from "../slices/categories";
import { fetchProducts } from "../slices/product";
import { setWishlist } from "../slices/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";
import ChatSupport from "../components/ChatSupport";

const Header = dynamic(() => import("../components/header"), { ssr: false });
const Footer = dynamic(() => import("../components/footer"), { ssr: false });
const Whatsapp = dynamic(() => import("../components/whatsapp"), { ssr: false });
const Top = dynamic(() => import("../components/top"), { ssr: false });


const Layout = ({ children }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const { categories } = useSelector(
    (state) => state.categories
  );


  // META PIXEL ROUTE CHANGE TRACKING
  useEffect(() => {

    const handleRouteChange = () => {
      if (window.fbq) {
        window.fbq("track", "PageView");
      }
    };

    router.events.on(
      "routeChangeComplete",
      handleRouteChange
    );

    return () => {
      router.events.off(
        "routeChangeComplete",
        handleRouteChange
      );
    };

  }, [router.events]);



  const isLoginPage =
    router.pathname === "/login";

  const isRegisterPage =
    router.pathname === "/register";

  const isForgetPasswordPage =
    router.pathname === "/forgot-password";


  useEffect(() => {

    dispatch(fetchCategories());
    dispatch(fetchProducts());


    const fetchWishlist = async () => {

      if (session?.user?.accessToken) {

        try {

          const res = await fetch(
            `/api/users/wishlist`,
            {
              headers: {
                Authorization:
                  `Bearer ${session.user.accessToken}`
              }
            }
          );


          const data =
            await res.json();


          if (Array.isArray(data)) {

            dispatch(
              setWishlist(
                data.map((item) => ({
                  _id: item._id,
                  title: item.name,
                  price: item.price,
                  MRP: item.MRP,
                  category:
                    item?.category_id?.name
                    ||
                    "Uncategorized",

                  image:
                    item.main_image
                    ||
                    "/placeholder.png",

                  alt_text:
                    item.alt_text
                    ||
                    item.name,

                }))
              )
            );

          }


        } catch (err) {
          console.log(err);
        }

      }

    };


    fetchWishlist();


  }, [session, dispatch]);



  return (
    <>

      {/* META PIXEL SCRIPT */}

      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){
          n.callMethod?
          n.callMethod.apply(n,arguments):
          n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;
          n.loaded=!0;
          n.version='2.0';
          n.queue=[];
          t=b.createElement(e);
          t.async=!0;
          t.src=v;
          s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}
          (window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init','661019202737530');
          fbq('track','PageView');

          `
        }}
      />



      <div className="relative">


        {
          !isLoginPage &&
          !isRegisterPage &&
          !isForgetPasswordPage &&
          <Header categories={categories} />
        }


        {children}


        {/* <Top /> */}
        <ChatSupport />

       


        {
          !isLoginPage &&
          !isRegisterPage &&
          !isForgetPasswordPage &&
          <Footer categories={categories} />
        }


      </div>

    </>
  );
};


export default Layout;