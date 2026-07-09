import Link from "next/link";
import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1000); // show after 1 sec
    }
  }, []);

  const saveConsentToServer = async (status) => {
    try {
      await fetch("/api/cookie-consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          timestamp: new Date(),
          userAgent: navigator.userAgent,
        }),
      });
    } catch (err) {
      console.error("Error saving consent:", err);
    }
  };

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    saveConsentToServer("accepted");
    setVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    saveConsentToServer("declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-xl p-4 w-[90%] md:w-[500px] z-50 border border-gray-200">
      <p className="text-gray-800 text-sm md:text-base mb-3">

        🍪 ARENQ uses cookies to improve your browsing experience
        and provide better energy solution services.{" "}

        <Link
          href="/privacy-policy"
          className="text-blue-600 underline hover:text-blue-800"
        >
          Read ARENQ Privacy Policy
        </Link>

      </p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={declineCookies}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
        >
          Decline
        </button>
        <button
          onClick={acceptCookies}
          className="px-4 py-2 bg-green-500 hover:bg-[#2d241b] text-white rounded-lg text-sm"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
