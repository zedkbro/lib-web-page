import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="relative h-screen w-full flex flex-col ">
      <div className="">
        <h1
          className="bg-[#009FD6] shadow  text-center md:text-start 
       text-white px-4 md:px-20 py-2 md:py-4 text-xl md:text-2xl
      "
        >
          Terms and Conditions
        </h1>
        {/* <a href="/terms-and-conditions.pdf" className="self-end px-4 md:px-20 " download>
          Download File
        </a> */}
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <iframe
          src="/terms-and-conditions.pdf"
          title="Terms and Conditions"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </section>
  );
};

export default TermsAndConditions;
