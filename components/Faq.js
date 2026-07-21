import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Faq = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const parseFaq = (faqData) => {
    if (!faqData) return [];

    // New format: array of { question, answer } objects
    if (
      Array.isArray(faqData) &&
      faqData.length > 0 &&
      typeof faqData[0] === "object"
    ) {
      return faqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      }));
    }

    // Old string format (backward compatibility)
    let faqString = Array.isArray(faqData) ? faqData.join(" ") : faqData;

    faqString = faqString
      .replace(/,Ans\./gi, " Ans.")
      .replace(/\s+/g, " ")
      .trim();

    const regex = /Q\d+\.\s*(.*?)\?\s*Ans\.\s*(.*?)(?=Q\d+\.|$)/gi;

    return [...faqString.matchAll(regex)].map((match) => ({
      question: match[1].trim() + "?",
      answer: match[2].trim(),
    }));
  };

  const faqItems = parseFaq(faq);

  if (!faqItems.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-10 md:py-12 bg-[#FFFFFF">
      <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-center mb-2 text-[#0A528F]">
        Frequently Asked Questions
      </h2>
      <p className="text-center text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
        Everything you need to know, answered.
      </p>

      <div className="space-y-2.5 sm:space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl sm:rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen
                  ? "border-[#FFB600] bg-[#FFB600]/[0.06]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full flex items-start sm:items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left transition-colors hover:bg-[#0A528F]/[0.04] active:bg-[#0A528F]/[0.06]"
              >
                <span className="text-sm xs:text-base sm:text-lg font-semibold text-[#0A528F] leading-snug">
                  {item.question}
                </span>

                <span
                  className={`flex-shrink-0 mt-0.5 sm:mt-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 ${
                    isOpen
                      ? "bg-[#FFB600] text-[#0A528F] rotate-180"
                      : "bg-[#0A528F]/10 text-[#0A528F]"
                  }`}
                >
                  {isOpen ? (
                    <FaMinus size={11} className="sm:hidden" />
                  ) : (
                    <FaPlus size={11} className="sm:hidden" />
                  )}
                  {isOpen ? (
                    <FaMinus size={13} className="hidden sm:block" />
                  ) : (
                    <FaPlus size={13} className="hidden sm:block" />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-[#0A528F]/15 pt-3 mt-0.5">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;