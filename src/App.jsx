import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ForeignExchange from "./ForeignExchange";
import PrivacyPolicy from "./PrivacyPolicy";
import LoanCalculator from "./pages/LoanCalculator";
import AmortizationPage from "./pages/AmortizationPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / <Route path="/" element={<Home />} /> */}
        <Route path="/exchange-rates" element={<ForeignExchange />} />
        <Route path="/app-privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
         <Route path="/amortization" element={<AmortizationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

