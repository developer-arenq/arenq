import React, { useEffect, useState, useRef } from "react";
import ProductSkeleton from "./cardSkeleton";
import Product from "./card";
import { useSelector } from "react-redux";

function BannerandProduct({ products = [], subheading, dataUrl }) {
    const { loading } = useSelector((state) => state.products);

    const [fullProducts, setFullProducts] = useState(products);
    const hasFetched = useRef(false);

    // Reset when parent gives new products
    useEffect(() => {
        setFullProducts(products);
    }, [products]);

    // Fetch products dynamically (if dataUrl provided)
    useEffect(() => {
        if (dataUrl && !hasFetched.current) {
            hasFetched.current = true;

            fetch(dataUrl)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) {
                        setFullProducts(data);
                    }
                })
                .catch((err) => console.error("Failed to fetch data:", err));
        }
    }, [dataUrl]);

    const displayedProducts = fullProducts;

    return (
        <div className="mt-2 z-10">
            <div className="bg-transparent rounded-md mt-1">
                <div className="mx-auto sm:px-6 sm:py-12 lg:px-16">

                    {/* Heading */}
                    <header className="text-start flex flex-col items-start mx-auto">
                        <h2 className="text-green-600 text-xl sm:text-2xl md:text-3xl py-1 font-bold font-sans">
                            {subheading}
                        </h2>
                    </header>

                    {/* Product Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                        {!loading && displayedProducts.length > 0 ? (
                            displayedProducts.map((item) => (
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
                                    }}
                                />
                            ))
                        ) : (
                            Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerandProduct;
