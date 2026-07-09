// /pages/FAQs.js
import Head from "next/head";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// ✅ Lazy load Flowbite Accordion
const Accordion = dynamic(() => import("flowbite-react").then(m => m.Accordion), { ssr: false });

// ✅ Lazy load icon
const HiOutlineArrowCircleDown = dynamic(() =>
  import("react-icons/hi").then(m => m.HiOutlineArrowCircleDown),
  { ssr: false }
);

// ✅ Already lazy-loaded text editor view
const TextEditorViewforfaq = dynamic(() => import("../components/textEditorViewforfaq"), {
  ssr: false,
});

export async function getServerSideProps() {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/faq/get`);
  const res = await data.json();

  return {
    props: {
      faqs: res || [],
    },
  };
}

export default function FAQ({ faqs }) {
  // Use useMemo to avoid re-creating map output unnecessarily
  const faqPanels = useMemo(() => {
    return faqs.map((item) => (
      <Accordion.Panel key={item._id}>
        <Accordion.Title className="font-bold">{item.question}</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            <TextEditorViewforfaq desc={item.answer} />
          </p>
        </Accordion.Content>
      </Accordion.Panel>
    ));
  }, [faqs]);

  return (
    <>
      <Head>
        <title>FAQ&#39;s</title>
      </Head>
      <div className="w-full bg-gray-100 min-h-screen">
        <div className="lg:max-w-6xl bg-white mx-auto p-5 min-h-screen">
          <div className="text-center space-y-3">
            <h1 className="text-sm font-medium capitalize">FAQs</h1>
            <h1 className="text-4xl font-serif">Frequently Asked Questions</h1>
            <h5 className="text-md font-normal text-gray-500">
              Have questions? We are here to help you
            </h5>
          </div>
          <div className="py-5 md:p-20">
            <Accordion arrowIcon={HiOutlineArrowCircleDown}>{faqPanels}</Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
