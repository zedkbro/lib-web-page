import Logo from "../../image/alegnta/Alegnta_loan_logo.png";
import AppStoreBadge from "../../image/alegnta/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import GooglePlayBadge from "../../image/alegnta/GetItOnGooglePlay_Badge_Web_color_English.png";
import HeroImage from "../../image/alegnta/girl-holding-phone.png";

const DownloadButtons = () => {
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

          {/* Google Play Button */}
          <a
            href="https://play.google.com/store/apps/details?id=com.example.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={GooglePlayBadge}
              alt="Get it on Google Play"
              className="h-10 sm:h-12 object-contain"
            />
          </a>
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
    </div>
  );
};

export default DownloadButtons;
