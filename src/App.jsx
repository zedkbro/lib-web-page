import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ForeignExchange from "./ForeignExchange";
import PrivacyPolicy from "./PrivacyPolicy";
import logo from "./image/logo.jpeg";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-24">
      <img src={logo} alt="Logo" className="h-10 md:h-24" />
      <h2 className="text-center text-3xl mt-10 font-bold">Lion International Bank</h2>
      <p>Key to success!</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
     <nav className="flex justify-center gap-4 p-4 bg-gray-100">
        {[
          { to: "/", label: "Home" },
          { to: "/exchange-rates", label: "Exchange Rates" },
          { to: "/privacy-policy", label: "Privacy Policy" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-4 py-2 ${
                isActive ? "text-[#009FD6]" : "hover:text-[#009FD6]"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-rates" element={<ForeignExchange />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

     
    </BrowserRouter>
  );
}
