import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ForeignExchange from "./ForeignExchange";
import PrivacyPolicy from "./PrivacyPolicy"; 
import logo from "./image/logo.jpeg";
function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-24">
      <img src={logo} alt="Logo" className="h-10 md:h-24" />
      <h2 className="text-center text-3xl mt-10 font-bold">Lion International Bank</h2>
      <p>Key to Success!</p>
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / <Route path="/" element={<Home />} /> */}
        <Route path="/exchange-rates" element={<ForeignExchange />} />
        <Route path="/app-privacy-policy" element={<PrivacyPolicy />} /> 
      </Routes>
    </BrowserRouter>
  );
}
