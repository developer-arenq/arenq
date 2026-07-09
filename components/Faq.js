import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Faq = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const parseFaq = (faqData) => {
    if (!faqData) return [];

    let faqString = "";

    if (Array.isArray(faqData)) {
      faqString = faqData.join(" ");
    } else {
      faqString = faqData;
    }

    faqString = faqString
      .replace(/,Ans\./gi, " Ans.")
      .replace(/\s+/g, " ")
      .trim();

    const regex =
      /Q\d+\.\s*(.*?)\?\s*Ans\.\s*(.*?)(?=Q\d+\.|$)/gi;

    const matches = [...faqString.matchAll(regex)];

    return matches.map((match) => ({
      question: match[1].trim() + "?",
      answer: match[2].trim(),
    }));
  };

  const faqItems = parseFaq(faq);



  if (!faqItems.length) return null;

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-4 text-left font-semibold text-green-900 bg-white hover:bg-gray-100 transition"
            >
              <span>{item.question}</span>

              {openIndex === index ? (
                <FaMinus size={14} />
              ) : (
                <FaPlus size={14} />
              )}
            </button>

            {openIndex === index && (
              <div className="px-4 py-4 text-gray-700 bg-gray-50 border-t">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;