import React, { useEffect, useState } from "react";

const TermsAndConditions = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|mobile/i.test(userAgent));
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col">
      <div>
        <h1
          className="bg-[#009FD6] shadow text-center md:text-start 
          text-white px-4 md:px-20 py-2 md:py-4 text-xl md:text-2xl"
        >
          Terms and Conditions
        </h1>
        {/* Optional download link if needed later */}
        {/* <a href="/terms-and-conditions.pdf" className="self-end px-4 md:px-20 " download>
          Download File
        </a> */}
      </div>

      <div style={{ height: "100vh", width: "100%" }}>
        {isMobile ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center">
            <p className="mb-4 text-gray-700">
              This document is best viewed in your device’s PDF viewer.
            </p>
            <a
              href="/terms-and-conditions.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#009FD6] text-white px-4 py-2 rounded shadow"
            >
              Open PDF
            </a>
          </div>
        ) : (
          <iframe
            src="/terms-and-conditions.pdf"
            title="Terms and Conditions"
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        )}
      </div>
    </section>
  );
};

export default TermsAndConditions;
