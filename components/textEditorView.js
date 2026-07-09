import { useState } from "react";
import Head from "next/head";
import { FaPlus, FaMinus } from "react-icons/fa";

const TextEditorAccordionView = ({ desc }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🔥 SAFE PARSER (FINAL FIX)
  const parseDescriptionToItems = () => {
    if (!desc) return [];

    let blocks;

    try {
      const parsed = typeof desc === "string" ? JSON.parse(desc) : desc;
      blocks = parsed?.blocks || [];
    } catch (error) {
      console.warn("Invalid description format, using fallback");

      return [
        {
          property: "Product Details",
          value: desc,
        },
      ];
    }

    if (!Array.isArray(blocks) || blocks.length === 0) {
      return [
        {
          property: "Product Details",
          value: desc,
        },
      ];
    }

    const fullText = blocks.map((b) => b.text).join("\n");

    const lines = fullText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const items = [];
    let currentProperty = "";
    let currentValue = [];

    const pushItem = () => {
      if (!currentProperty) return;
      const text = currentValue.join("\n").trim();
      if (!text) return;

      const isList = /^([-•–]|\d+\.)\s+/m.test(text);
      const value = isList
        ? text
          .split("\n")
          .map((v) => v.replace(/^([-•–]|\d+\.)\s*/, "").trim())
          .filter(Boolean)
        : text;

      items.push({ property: currentProperty, value });
    };

    lines.forEach((line) => {
      const isHeading = /^[A-Z][^:]{2,40}:$/.test(line);
      if (isHeading) {
        pushItem();
        currentProperty = line.replace(/:$/, "");
        currentValue = [];
      } else {
        currentValue.push(line);
      }
    });

    pushItem();

    // 🔥 fallback if nothing parsed
    if (items.length === 0) {
      return [
        {
          property: "Product Details",
          value: fullText,
        },
      ];
    }

    return items;
  };

  const items = parseDescriptionToItems();

  // 🔥 STATIC HTML FOR SEO
  const renderStaticHTMLDescription = () => {
    if (!items || items.length === 0) {
      return "<p>No description available.</p>";
    }

    return items
      .map((item) => {
        const title = `<h3>${item.property}</h3>`;
        const content = Array.isArray(item.value)
          ? `<ul>${item.value.map((v) => `<li>${v}</li>`).join("")}</ul>`
          : `<p>${item.value}</p>`;
        return `<div>${title}${content}</div>`;
      })
      .join("");
  };




  return (
    <>
     



      {/* 🔥 ACCORDION UI */}
      <section className="w-full space-y-2 ">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500">
            No description available.
          </p>
        ) : (
          items.map((item, index) => (
            <article
              key={index}
              className="border border-gray-300 transition-all"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-3 py-2 text-left text-sm font-medium bg-gray-100 hover:bg-gray-200"
              >
                <span>{item.property}</span>
                <span>
                  {openIndex === index ? (
                    <FaMinus size={12} />
                  ) : (
                    <FaPlus size={12} />
                  )}
                </span>
              </button>

              {openIndex === index && (
                <div className="px-3 py-2 text-sm bg-white border-t border-gray-200">
                  {Array.isArray(item.value) ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {item.value.map((val, i) => (
                        <li key={i}>{val}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </section>

      {/* 🔥 HIDDEN SEO CONTENT */}
      <div
        className="hidden"
        dangerouslySetInnerHTML={{
          __html: renderStaticHTMLDescription(),
        }}
      />
    </>
  );
};

export default TextEditorAccordionView;