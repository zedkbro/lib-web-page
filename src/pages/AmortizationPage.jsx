import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AmortizationSchedule from '../components/AmortizationSchedule';

const AmortizationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const schedule = location.state?.schedule;

  if (!schedule) {
    return (
      <div className="p-10 text-center text-red-600">
        No amortization data provided.{" "}
        <button className="underline text-blue-600" onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Full Amortization Schedule</h1>
      <AmortizationSchedule schedule={schedule} />
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Calculator
        </button>
      </div>
    </div>
  );
};

export default AmortizationPage;
