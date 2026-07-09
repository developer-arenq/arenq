/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Rating } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { HiHome } from "react-icons/hi2";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { MdMenu } from "react-icons/md";
import axios from "axios";

const BottomNavigation = dynamic(() =>
  import("../../components/bottomNavigation")
);

const Product = dynamic(() => import("../../components/card"));

export async function getServerSideProps(context) {
  const { category, q, subcat, featured, discount } = context.query;
  let endpoint = "/api/products/list?page=1&limit=12";

  if (discount !== undefined) {
    const dQuery = discount ? `?discount=${discount}` : "";
    endpoint = `/api/products/discount${dQuery}`;
  }
  else if (category && category !== "all") {
    endpoint += `&category=${category.toLowerCase()}`;
  }
  else if (featured) {
    endpoint = `/api/products/featured/${featured}`;
  }
  else if (subcat) {
    endpoint = `/api/products/subcat/${subcat}`;
  }
  else if (q) {
    endpoint = `/api/products/name/${encodeURIComponent(q.trim())}`;
  }

  let resultProducts = [];

  try {
    const response = await fetch(process.env.NEXTAUTH_URL + endpoint);

    if (response.ok) {
      const data = await response.json();
      resultProducts = data.products || [];
    }
  } catch (error) {
    console.error("SSR fetch error:", error);
  }

  return {
    props: {
      prod: resultProducts,
      pro_category: category || null,
      pro_subcat: subcat || null,
      query: q || null,
      pagination: {},
    },
  };
}





const productScreen = ({ prod, pro_category, pro_subcat, query }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [products, setProducts] = useState(prod || []);
  const [maxProductPrice, setMaxProductPrice] = useState(30000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(maxProductPrice);
  const [discount, setDiscount] = useState(0);
  const [rating, setRating] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadMoreProducts = useCallback(async () => {
    if (query) return; // ❌ Avoid pagination in search by name
    if (!hasMore || isLoading) return;

    setIsLoading(true);

    try {
      const queryParams = new URLSearchParams();
      queryParams.set("page", page + 1);
      queryParams.set("limit", 12);

      // 🟢 Add category only if NOT "all"
      if (pro_category && pro_category !== "all") {
        queryParams.set("category", pro_category.toLowerCase());
      }

      // 🟢 Add subcat only if exists
      if (pro_subcat) {
        queryParams.set("subcat", pro_subcat);
      }

      const response = await fetch(`/api/products/list?${queryParams.toString()}`);

      if (response.ok) {
        const result = await response.json();

        // Normalise API response (sometimes array or {products: []})
        const newProducts = Array.isArray(result.products)
          ? result.products
          : Array.isArray(result)
            ? result
            : [];

        // 🔥 Avoid duplicates
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const filtered = newProducts.filter((item) => !existingIds.has(item._id));
          return [...prev, ...filtered];
        });

        setPage((prev) => prev + 1);

        // ❌ No more pages available
        if (newProducts.length < 12) setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, pro_category, pro_subcat, query]);


  useEffect(() => {
    if (router.query.q) {
      axios.get(`/api/products/searchbyname?product_name=${router.query.q}`)
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }
  }, [router.query.q]);


  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMoreProducts]
  );

  const sortBy = (sort) => {
    let sortedProducts = [...products];

    if (sort === "lth") {
      sortedProducts.sort((a, b) => a.MRP - b.MRP);
    } else if (sort === "htl") {
      sortedProducts.sort((a, b) => b.MRP - a.MRP);
    } else if (sort === "a-z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "z-a") {
      sortedProducts.sort((a, b) => -a.name.localeCompare(b.name));
    }
    setProducts(sortedProducts);
  };


  const filterHandler = () => {
    let filteredItems = [...prod];

    if (min >= 0 && max >= min) {
      filteredItems = filteredItems.filter(
        (item) => item.price >= min && item.price <= max
      );
    }

    if (discount > 0) {
      filteredItems = filteredItems.filter(
        (item) => ((item.MRP - item.price) / item.MRP) * 100 >= discount
      );
    }

    if (rating > 0) {
      filteredItems = filteredItems.filter(
        (item) => Number(item.Rating) >= rating
      );
    }

    setProducts(filteredItems);
  };

  const resetFilters = () => {
    setMin(0);
    setMax(maxProductPrice);
    setDiscount(0);
    setRating(0);
    setProducts([...prod]);
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach((input) => {
      input.checked = false;
    });
    document.getElementById("maxFilterValue").value = maxProductPrice;
    document.getElementById("maxFilterValueMobile").value = maxProductPrice;
  };



  useEffect(() => {
    if (products.length > 0) {
      if (max < min) {
        setMax(min);
      }
      filterHandler();
    } else {
      setProducts([...prod]);
    }
  }, [min, max, discount, rating]);

  useEffect(() => {
    setProducts([...prod]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    const fetchSubcatFromQuery = async () => {
      if (!query || pro_subcat || pro_category) return;

      try {
        const res = await fetch(`/api/subcat/${query}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          const activeOnly = data.filter((item) => item?.active);
          setProducts(activeOnly);
        }
      } catch (err) {
        console.error("Subcategory fetch failed:", err);
      }
    };

    fetchSubcatFromQuery();
  }, [query, pro_subcat, pro_category]);


  return (
    <>
      <Head>
        <title>
          {query
            ? query
            : pro_subcat
              ? pro_subcat
              : pro_category
                ? pro_category
                : "Products"}
        </title>
      </Head>

      <div className="">
        <div className="w-1/5 hidden md:block "></div>
        <div className="">
          {/* Breadcrumb + Sort (Combined in One Bar) */}



          <div className="d-flex flex-row align-items-start bg-white">


            <div className="hidden md:block sticky top-40 z-5 w-64 bg-white px-4">
              <div className="flex justify-between items-center mb-2">
                <h1 className="font-medium text-md ">Filter By</h1>
                <button
                  className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                  type="button"
                  onClick={() => resetFilters()}
                >
                  Reset
                </button>
              </div>

              {/* Price Filter */}
              <div className="mb-3 w-full">
                <h6 className="font-medium text-md py-2">Price</h6>
                <div className="flex items-center w-full relative">
                  <div className="range-slider">
                    <div className="relative h-4">
                      <input
                        className="bg-green-400 h-1 rounded-lg border-gray-700 appearance-none absolute w-full"
                        defaultValue="0"
                        onChange={(e) => setMin(Number(e.target.value))}
                        min="0"
                        step={500}
                        max={maxProductPrice}
                        type="range"
                      />
                      <input
                        className="bg-green-400 h-1 rounded-lg border-gray-700 appearance-none absolute w-full"
                        defaultValue={maxProductPrice}
                        onChange={(e) => setMax(Number(e.target.value))}
                        min="0"
                        id="maxFilterValue"
                        step={500}
                        max={maxProductPrice}
                        type="range"
                      />
                    </div>

                    <div className="flex gap-x-5 items-center justify-center">
                      <input
                        className=" border-gray-300 border py-1 px-2 text-sm w-full min-w-[65px] overflow-hidden text-ellipsis"
                        value={min}
                        disabled
                      />
                      <h5 className="text-center text-md text-gray-500">to</h5>
                      <input
                        className="border-gray-300 border py-1 px-2 text-sm w-full min-w-[65px] overflow-hidden text-ellipsis"
                        value={max}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Ratings */}
              <div className="mb-3">
                <h6 className="font-medium text-md py-2">Customer Ratings</h6>
                <div className="flex flex-col gap-y-2">
                  {[4, 3, 2].map((rate) => (
                    <div className="flex items-center" key={rate}>
                      <input
                        type="radio"
                        value={rate}
                        onClick={(e) => setRating(Number(e.target.value))}
                        name="rating-radio"
                        className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300"
                      />
                      <label className="ml-2 text-sm text-gray-500 flex items-center cursor-pointer">
                        <span className="mr-1 flex items-center">
                          {rate}
                          <Rating size={"xs"}>
                            <Rating.Star filled={true} />
                          </Rating>
                        </span>
                        & above
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Discount */}
              <div className="mb-3">
                <h6 className="font-medium text-md py-2">Discount</h6>
                <div className="flex flex-col gap-y-2">
                  {[40, 30, 20, 10].map((d) => (
                    <div className="flex items-center" key={d}>
                      <input
                        type="radio"
                        value={d}
                        onClick={(e) => setDiscount(e.target.value)}
                        name="discount-radio"
                        className="w-4 h-4 text-green-400 bg-gray-100 border-gray-300"
                      />
                      <label className="ml-2 text-sm text-gray-500 hover:text-black flex items-center cursor-pointer">
                        {d}% & more
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Product Grid Section */}
            <div className="flex-1 bg-slate-100">
              <div className="bg-white border-b px-3 py-2 flex flex-wrap justify-between items-center rounded shadow-sm">
                {/* Left: Breadcrumb */}
                <div className="flex items-center overflow-x-auto whitespace-nowrap">
                  <Breadcrumb aria-label="breadcrumb" className="bg-transparent p-0 m-0">
                    <Breadcrumb.Item href="/" icon={HiHome}>
                      Home
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Search</Breadcrumb.Item>
                    {pro_category && (
                      <Breadcrumb.Item className="capitalize">{pro_category}</Breadcrumb.Item>
                    )}
                    {pro_subcat && (
                      <Breadcrumb.Item className="capitalize">{pro_subcat}</Breadcrumb.Item>
                    )}
                    {query && (
                      <Breadcrumb.Item className="capitalize">{query}</Breadcrumb.Item>
                    )}
                  </Breadcrumb>
                </div>

                {/* Right: Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort_by" className="text-sm text-gray-600 hidden sm:block">
                    Sort
                  </label>
                  <select
                    onChange={(e) => sortBy(e.target.value)}
                    id="sort_by"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 p-2 cursor-pointer"
                    defaultValue="default"
                  >
                    <option value="default">Default</option>
                    <option value="lth">Low to high</option>
                    <option value="htl">High to low</option>
                    <option value="a-z">A to Z</option>
                    <option value="z-a">Z to A</option>
                  </select>
                </div>
              </div>
              <div className="mx-auto p-2">
                <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 ">
                  {products.length > 0 &&
                    products.map((item, index) => (
                      <div
                        key={item._id}

                        ref={index === products.length - 1 ? lastProductElementRef : null}
                      >
                        <Product
                          key={item._id}
                          product={{
                            _id: item._id,
                            title: item.name,
                            price: item.price,
                            MRP: item.MRP,
                            category: item.category_id?.name,
                            image: item.main_image,
                            alt_text: item.alt_text,
                            out_of_stock: item.out_of_stock,
                            slug: item.slug,
                            rating: item.rating,
                            numReviews: item.numReviews,
                            SKU: item.SKU,
                            label: item.label || "none", // safety
                            tax: item.tax,
                            variants: item.variants || [],
                          }}
                        />
                      </div>
                    ))
                  }


                </div>

                {isLoading && (
                  <div className="text-center py-4">
                    <span>Loading more products...</span>
                  </div>
                )}
                {!hasMore && (
                  <div className="text-center py-4">
                    <span>No more products to load.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNavigation
        resetFilters={resetFilters}
        sortBy={sortBy}
        setDiscount={setDiscount}
        setMin={setMin}
        setMax={setMax}
        min={min}
        max={max}
        setRating={setRating}
        rating={rating}
        maxProductPrice={maxProductPrice}
        setMaxProductPrice={setMaxProductPrice}
      />
    </>
  );
};

export default productScreen;
