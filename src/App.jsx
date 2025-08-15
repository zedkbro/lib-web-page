import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ForeignExchange from "./pages/ForeignExchange";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LoanCalculator from "./pages/LoanCalculator";
import AmortizationPage from "./pages/AmortizationPage";
import AlegntaLoan from "./pages/AlegntaLoan";
import TermsAndConditions from "./pages/TermsAndConditions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* / <Route path="/" element={<Home />} /> */}
        <Route path="/exchange-rates" element={<ForeignExchange />} />
        <Route path="/app-privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
        <Route path="/amortization" element={<AmortizationPage />} />
        <Route path="/alegnta-loan" element={<AlegntaLoan />} />
      </Routes >
    </BrowserRouter >
  );
}
