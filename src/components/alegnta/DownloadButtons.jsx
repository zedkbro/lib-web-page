import { useState } from "react";
import Logo from "../../image/alegnta/Alegnta_loan_logo.png";
import AppStoreBadge from "../../image/alegnta/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import GooglePlayBadge from "../../image/alegnta/GetItOnGooglePlay_Badge_Web_color_English.png";
import HeroImage from "../../image/alegnta/girl-holding-phone.png";

const DownloadButtons = () => {
  const [showModal, setShowModal] = useState(false);

  // Close modal handler
  const closeModal = () => setShowModal(false);

  // Prevent modal click from closing when clicking inside modal content
  const modalContentClick = (e) => e.stopPropagation();

  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left px-4 py-6 max-w-screen-md mx-auto">
      {/* Logo */}
      <img
        src={Logo}
        alt="Alegnta Loan Logo"
        className="w-40 h-auto mb-2 sm:w-48"
      />

      {/* Subtitle */}
      <p className="text-gray-700 text-base sm:text-lg leading-tight">
        Download the Alegnta app for seamless loan
      </p>

      {/* Download Now Container */}
      <div className="bg-[#009FD6] text-white px-2 sm:px-6 py-4 rounded-xl mt-4 w-full flex flex-col items-center gap-4">
        {/* Heading */}
        <h3 className="text-lg sm:text-xl font-semibold text-center">Download Now</h3>

        {/* Logos Row */}
        <div className="flex flex-row flex-wrap items-center justify-center sm:justify-between gap-4 w-full max-w-lg mx-auto">
          {/* App Store Button */}
          <a
            href="https://apps.apple.com/us/app/lib-alegnta/id6746380657"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={AppStoreBadge}
              alt="Download on the App Store"
              className="h-10 sm:h-12 object-contain"
            />
          </a>

          {/* Google Play Button with onClick */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-transparent p-0 border-0 cursor-pointer"
            aria-label="Google Play Store Coming Soon"
          >
            <img
              src={GooglePlayBadge}
              alt="Get it on Google Play"
              className="h-10 sm:h-12 object-contain"
            />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mt-4">
        <img
          src={HeroImage}
          alt="Woman holding phone"
          className="max-w-full h-auto drop-shadow-lg"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-xs mx-4 text-center shadow-lg"
            onClick={modalContentClick}
          >
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            <p className="mb-6">The Android version is coming soon. Stay tuned!</p>
            <button
              onClick={closeModal}
              className="bg-[#009FD6] text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadButtons;
