"use client";

import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export default function BlogDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog/${slug}`)
        .then((res) => res.json())
        .then((data) => setBlog(data));
    }
  }, [slug]);

  /* DYNAMIC IDS */
  const formattedContent = useMemo(() => {
    if (!blog?.content) return "";

    return blog.content.replace(
      /<h2(.*?)>(.*?)<\/h2>/gi,
      (_, attr, title) => {
        const cleanTitle = title.replace(/<[^>]*>/g, "");

        const id = cleanTitle
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");

        return `
          <h2 id="${id}" ${attr}>
            ${title}
          </h2>
        `;
      }
    );
  }, [blog]);

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );

  return (
    <>
      <Head>
        <title>{blog.meta_title || blog.title}</title>

        <meta
          name="description"
          content={blog.meta_description || ""}
        />
      </Head>

      {/* MAIN WRAPPER */}
      <main className="w-full bg-white">

        {/* BLOG CONTAINER */}
        <section
          className="
            w-full
            px-2
            sm:px-3
            md:px-4
            lg:px-5
            py-4
            md:py-8
            bg-white
          "
        >

          {/* BACK BUTTON */}
          <div className="mb-4">

            <Link
              href="/blog"
              className="
                inline-flex
                items-center
                text-green-700
                font-medium
                text-[12px]
                md:text-[14px]
                hover:underline
              "
            >
              ← Back to Blogs
            </Link>

          </div>

          {/* CONTENT */}
          <article
            className="
              max-w-[1220px]
              mx-auto

              text-[13px]
              leading-6

              md:text-[16px]
              md:leading-8

              text-gray-700

              [&>*]:w-full

              /* IMAGES */
              [&_img]:w-full
              [&_img]:h-auto
              [&_img]:rounded-[12px]
              [&_img]:my-4
              [&_img]:object-cover

              md:[&_img]:rounded-[20px]
              md:[&_img]:my-6

              /* IFRAMES */
              [&_iframe]:w-full
              [&_iframe]:aspect-video
              [&_iframe]:rounded-[12px]

              md:[&_iframe]:rounded-[20px]

              /* H1 */
              [&_h1]:text-[22px]
              [&_h1]:leading-[1.05]
              [&_h1]:font-black
              [&_h1]:tracking-[-0.03em]
              [&_h1]:text-[#111827]
              [&_h1]:mb-4

              sm:[&_h1]:text-[28px]

              md:[&_h1]:text-[42px]

              lg:[&_h1]:text-[34px]

              /* H2 */
              [&_h2]:text-[19px]
              [&_h2]:leading-[1.1]
              [&_h2]:font-black
              [&_h2]:tracking-[-0.03em]
              [&_h2]:text-[#111827]
              [&_h2]:mt-8
              [&_h2]:mb-3

              sm:[&_h2]:text-[22px]

              md:[&_h2]:text-[32px]

              lg:[&_h2]:text-[40px]

              /* H3 */
              [&_h3]:text-[16px]
              [&_h3]:font-bold
              [&_h3]:leading-snug
              [&_h3]:mt-6
              [&_h3]:mb-2
              [&_h3]:text-[#111827]

              md:[&_h3]:text-[22px]

              /* PARAGRAPH */
              [&_p]:mb-4
              [&_p]:text-gray-700

              /* UL */
              [&_ul]:pl-5
              [&_ul]:my-4

              /* OL */
              [&_ol]:pl-5
              [&_ol]:my-4

              /* LI */
              [&_li]:mb-2

              /* LINKS */
              [&_a]:text-orange-700
              [&_a]:underline
              [&_a]:underline-offset-[3px]
              [&_a]:decoration-[1.5px]
              [&_a]:font-medium

              /* BLOCKQUOTE */
              [&_blockquote]:border-l-4
              [&_blockquote]:border-orange-400
              [&_blockquote]:pl-3
              [&_blockquote]:italic
              [&_blockquote]:my-5

              /* TABLE */
              [&_table]:block
              [&_table]:overflow-x-auto
              [&_table]:w-full
              [&_table]:border
              [&_table]:border-gray-300

              [&_th]:border
              [&_th]:border-gray-300
              [&_th]:px-2
              [&_th]:py-2
              [&_th]:text-left
              [&_th]:bg-gray-100
              [&_th]:text-[12px]

              md:[&_th]:text-[14px]

              [&_td]:border
              [&_td]:border-gray-300
              [&_td]:px-2
              [&_td]:py-2
              [&_td]:text-[12px]

              md:[&_td]:text-[14px]
            "
            dangerouslySetInnerHTML={{
              __html: formattedContent,
            }}
          />

        </section>

      </main>
    </>
  );
}
