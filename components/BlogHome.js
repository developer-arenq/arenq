import React, { useState, useRef } from "react";
import Image from "next/image";
import blogData from "../public/data/blogData";
import Link from "next/link";

const BlogHome = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const scrollRef = useRef(null);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const getArticles = () => {
        if (selectedCategory === "All") {
            return Object.values(blogData).flatMap((cat) => cat.articles);
        }
        return blogData[selectedCategory]?.articles || [];
    };

    const articles = getArticles();

    return (
        <div className="bg-gradient-to-br from-[#f8f8f8] to-[#e6f0e6] min-h-screen">
            <div className="relative py-2 px-4 lg:px-16 mb-4">
                <div className="lg:flex justify-center">
                    <div className="flex gap-3 flex-wrap justify-center">
                        <button
                            onClick={() => handleCategoryClick("All")}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === "All"
                                ? "bg-green-700 text-white"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                                }`}
                        >
                            All
                        </button>
                        {Object.keys(blogData).map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                                    ? "bg-green-700 text-white"
                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Articles Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2 px-4 sm:px-6 lg:px-6">
                {articles.map((article, index) => (
                    <Link key={index} href={`/blogs/${article.slug}`}>
                        <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
                            <div className="h-[25rem] w-full relative">
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-green-800 font-sans">{article.title}</h3>
                                <p className="text-sm text-gray-500 text-center">
                                    {article.author} • {article.date}
                                </p>
                                <p className="mt-2 text-gray-700 text-sm text-center">
                                    {article.description}
                                </p>

                                <div className="mt-4 flex justify-center space-x-4">
                                    <Link href={`/blogs/${article.slug}`}>
                                        <span className="text-green-700 font-medium text-sm underline hover:text-green-900">
                                            Read More →
                                        </span>
                                    </Link>

                                    
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BlogHome;
