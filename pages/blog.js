"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";

const categories = [
  "All",
  "Farmer Stories",
  "Artisan Stories",
  "Wellness",
  "Stories",
  "Education",
  "Seasons",
];

export default function BlogLayout() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const filteredBlogs =
    activeCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === activeCategory);

  const [featured, ...rest] = filteredBlogs;

  return (
    <div style={{ background: "hsl(36 28% 96%)" }}>
      {/* HEADER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="text-center max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "hsl(12 55% 38% / 0.1)",
              color: "hsl(12 55% 38%)",
            }}
          >
            🏔️ Stories from the Mountains
          </div>

          <h1
            className="mb-4"
            style={{
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 700,
              color: "hsl(20 25% 12%)",
            }}
          >
            The Arenq Journal
          </h1>

          <p
            className="text-sm leading-relaxed"
            style={{ color: "hsl(30 12% 48%)" }}
          >
            Wellness guides, sourcing stories and Himalayan traditions —
            straight from the source.
          </p>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 flex-wrap justify-center mt-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background:
                  activeCategory === category
                    ? "hsl(12 55% 38%)"
                    : "white",
                color:
                  activeCategory === category
                    ? "white"
                    : "hsl(30 12% 38%)",
                border: `1.5px solid ${
                  activeCategory === category
                    ? "hsl(12 55% 38%)"
                    : "hsl(35 15% 82%)"
                }`,
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {/* LOADING */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden"
              >
                <div className="h-64 bg-gray-200 animate-pulse"></div>

                <div className="p-5">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* FEATURED BLOG */}
            {featured && (
              <div
                className="mb-10 rounded-3xl overflow-hidden"
                style={{
                  background: "white",
                  border: "1px solid hsl(35 15% 82%)",
                }}
              >
                <div className="grid md:grid-cols-2">
                  <div
                    className="relative"
                    style={{ minHeight: 280 }}
                  >
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover"
                    />

                    <div
                      className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        background: "hsl(12 55% 38%)",
                        color: "white",
                      }}
                    >
                      Featured
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "hsl(12 55% 38%)" }}
                      >
                        <Tag size={11} />
                        {featured.category || "Blog"}
                      </span>

                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "hsl(30 12% 48%)" }}
                      >
                        <Clock size={11} />
                        5 min read
                      </span>

                      <span
                        className="text-xs"
                        style={{ color: "hsl(30 12% 48%)" }}
                      >
                        {new Date(
                          featured.createdAt
                        ).toDateString()}
                      </span>
                    </div>

                    <h2
                      className="mb-3"
                      style={{
                        fontSize: "clamp(1.2rem,2.5vw,1.7rem)",
                        fontWeight: 700,
                        color: "hsl(20 25% 12%)",
                      }}
                    >
                      {featured.title}
                    </h2>

                    <p
                      className="text-sm leading-relaxed mb-5"
                      style={{ color: "hsl(30 12% 48%)" }}
                    >
                      {featured.metaDescription ||
                        featured.description?.slice(0, 180)}
                    </p>

                    <Link
                      href={`/blogs/${featured.slug}`}
                      className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 w-fit"
                    >
                      Read Article
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* BLOG GRID */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blogs/${blog.slug}`}
                  className="blog-card group cursor-pointer bg-white rounded-3xl overflow-hidden border border-[#e5dfd6]"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "16/9" }}
                  >
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: "white",
                        color: "hsl(12 55% 38%)",
                      }}
                    >
                      {blog.category || "Blog"}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "hsl(30 12% 48%)" }}
                      >
                        <Clock size={10} />
                        5 min read
                      </span>

                      <span
                        className="text-xs"
                        style={{ color: "hsl(30 12% 48%)" }}
                      >
                        {new Date(blog.createdAt).toDateString()}
                      </span>
                    </div>

                    <h3
                      className="mb-2 group-hover:text-[hsl(12_55%_38%)] transition-colors"
                      style={{
                        fontWeight: 700,
                        color: "hsl(20 25% 12%)",
                        lineHeight: 1.4,
                      }}
                    >
                      {blog.title}
                    </h3>

                    <p
                      className="text-xs leading-relaxed line-clamp-2"
                      style={{ color: "hsl(30 12% 48%)" }}
                    >
                      {blog.metaDescription ||
                        blog.description?.slice(0, 120)}
                    </p>

                    <div
                      className="flex items-center gap-1 mt-4 text-xs font-semibold"
                      style={{ color: "hsl(12 55% 38%)" }}
                    >
                      Read More
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* EMPTY STATE */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-20">
                <div className="text-4xl mb-4">📖</div>
                <p
                  className="text-sm"
                  style={{ color: "hsl(30 12% 48%)" }}
                >
                  No articles in this category yet.
                </p>
              </div>
            )}
          </>
        )}

        
      </div>
    </div>
  );
}