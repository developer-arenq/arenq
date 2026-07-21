import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import ProductSkeleton from "../components/cardSkeleton";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


const Product = dynamic(
  () => import("../components/card").then((mod) => mod.default || mod.Card),
  { ssr: false }
);

const PAGE_SIZE = 12;

/* ---------------- Pagination helper ---------------- */
const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }
  pages.push(1);
  let left = currentPage - 1;
  let right = currentPage + 1;

  if (currentPage <= 3) {
    left = 2;
    right = 4;
  } else if (currentPage >= totalPages - 2) {
    left = totalPages - 3;
    right = totalPages - 1;
  }

  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) {
    if (i > 1 && i < totalPages) pages.push(i);
  }
  if (right < totalPages - 1) pages.push("...");
  pages.push(totalPages);

  return pages;
};

/* ---------------- SSR ---------------- */
export async function getServerSideProps(context) {
  try {
    const { page = 1, category } = context.query;

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", PAGE_SIZE);
    if (category) params.set("category", category);

    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const host = context.req.headers.host;

    const res = await fetch(
      `${protocol}://${host}/api/products/list?${params.toString()}`
    );

    const data = await res.json();

    return {
      props: {
        initialProducts: data.products || [],
        pagination: data.pagination || {
          totalItems: 0,
          totalPages: 1,
          currentPage: Number(page),
          limit: PAGE_SIZE,
        },
        initialCategory: category || null,
      },
    };
  } catch (err) {
    console.error("SSR product fetch failed:", err);
    return {
      props: {
        initialProducts: [],
        pagination: {
          totalItems: 0,
          totalPages: 1,
          currentPage: 1,
          limit: PAGE_SIZE,
        },
        initialCategory: null,
      },
    };
  }
}

/* ---------------- Page ---------------- */
export default function Shop({ initialProducts, pagination, initialCategory }) {
  const products = initialProducts || [];
  const currentPage = pagination?.currentPage ?? 1;
  const totalPages = pagination?.totalPages ?? 1;
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const baseQuery = {};
  if (initialCategory) baseQuery.category = initialCategory;

  return (
    <>
      <Head>
        <title>Shop | Arenq</title>
        <meta
          name="description"
          content="Explore authentic mountain-made products — Tea, Chocolates, Handicrafts, and more."
        />
      </Head>

      <main className="bg-[#f5f9fc]">
       

        {/* ---------------- Product Section ---------------- */}
        <section className="w-full md:w-[85%] mx-auto px-2 sm:px-4 py-10">
          <h1 className="text-2xl font-semibold text-[#0A528F] mb-6">
            Our Collection
          </h1>

          {products.length === 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                {products.map((item) => (
                  <Product
                    key={item._id}
                    product={{
                      _id: item._id,
                      title: item.name,
                      price: item.price,
                      MRP: item.MRP,
                      image: item.main_image,
                      category: item.category_id?.name,
                      alt_text: item.alt_text,
                      out_of_stock: item.out_of_stock,
                      slug: item.slug,
                      rating: item.rating,
                      numReviews: item.numReviews,
                      SKU: item.SKU,
                      label: item.label || "none",
                      tax: item.tax,
                      variants: item.variants || [],
                    }}
                  />
                ))}
              </div>

              {/* ---------------- Pagination ---------------- */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <nav className="inline-flex items-center rounded-lg border bg-white shadow-sm text-xs sm:text-sm overflow-hidden">
                    {/* Previous */}
                    {currentPage > 1 ? (
                      <Link
                        href={{ pathname: "/shop", query: { ...baseQuery, page: currentPage - 1 } }}
                      >
                        <span className="px-3 py-2 border-r hover:bg-gray-100 flex items-center gap-1 cursor-pointer">
                          <FaAngleLeft />
                          <span className="hidden sm:inline">Previous</span>
                        </span>
                      </Link>
                    ) : (
                      <span className="px-3 py-2 border-r text-gray-400 flex items-center gap-1">
                        <FaAngleLeft />
                        <span className="hidden sm:inline">Previous</span>
                      </span>
                    )}

                    {/* Page Numbers */}
                    {pageNumbers.map((p, idx) =>
                      p === "..." ? (
                        <span key={idx} className="px-3 py-2 border-r text-gray-500">
                          ...
                        </span>
                      ) : (
                        <Link
                          key={p}
                          href={{ pathname: "/shop", query: { ...baseQuery, page: p } }}
                        >
                          <span
                            className={`px-3 py-2 border-r ${p === currentPage
                                ? "bg-black text-white font-semibold"
                                : "hover:bg-gray-100"
                              }`}
                          >
                            {p}
                          </span>
                        </Link>
                      )
                    )}

                    {/* Next */}
                    {currentPage < totalPages ? (
                      <Link
                        href={{ pathname: "/shop", query: { ...baseQuery, page: currentPage + 1 } }}
                      >
                        <span className="px-3 py-2 hover:bg-gray-100 flex items-center gap-1 cursor-pointer">
                          <span className="hidden sm:inline">Next</span>
                          <FaAngleRight />
                        </span>
                      </Link>
                    ) : (
                      <span className="px-3 py-2 text-gray-400 flex items-center gap-1">
                        <span className="hidden sm:inline">Next</span>
                        <FaAngleRight />
                      </span>
                    )}
                  </nav>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
