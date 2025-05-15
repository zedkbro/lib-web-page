import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ForeignExchange from "./ForeignExchange";
import PrivacyPolicy from "./PrivacyPolicy";
import logo from "./image/logo.jpeg";

function Home() {
  return <div className="flex flex-col items-center justify-center w-full py-24">

    <img src={logo} alt="Logo" className="h-10 md:h-24" />
    <h2 className="text-center text-3xl mt-10 font-bold">Lion International Bank</h2>
    <p>Key to success!</p>
  </div>;
}



export default function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-rates" element={<ForeignExchange />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      </Routes>

      <nav className="flex justify-center gap-4 p-4 bg-gray-100">
        <Link to="/" className="bg-blue-800 rounded text-white px-4 py-2 hover:bg-blue-900">Home</Link>
        <Link to="/exchange-rates" className="bg-blue-800 rounded text-white px-4 py-2 hover:bg-blue-900">Exchange Rates</Link>
        <Link to="/privacy-policy" className="bg-blue-800 rounded text-white px-4 py-2 hover:bg-blue-900">Privacy Policy</Link>

      </nav>
    </BrowserRouter>
  );
}
