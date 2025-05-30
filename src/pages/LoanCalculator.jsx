import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import { useNavigate } from 'react-router-dom';
import { openSchedulePDF } from '../utils/openSchedule';
import {
  calculateDays,
  calculateRepayments,
  calculateEndDate,
  generateAmortizationSchedule,
  validateInputs,
} from '../utils/loanUtils';

const LoanCalculator = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [termUnit, setTermUnit] = useState('years');
  const [repaymentFreq, setRepaymentFreq] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [schedule, setSchedule] = useState([]);

  const isFormValid = () =>
    amount && parseFloat(amount) > 0 &&
    rate && parseFloat(rate) > 0 &&
    term && parseInt(term, 10) > 0 &&
    startDate;

  const handleCalculate = () => {
    const errors = validateInputs({ amount, rate, term, startDate });
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setResult(null);
      setSchedule([]);
      return;
    }

    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate);
    const days = calculateDays(term, termUnit); // ✅ RESTORE THIS
    const payments = calculateRepayments(term, termUnit, repaymentFreq, startDate); // ✅ Already correct

    const interest = (principal * interestRate * days) / (100 * 365); // ✅ now "days" is defined
    const totalRepayment = principal + interest;

    const amortSchedule = generateAmortizationSchedule(
      principal,
      interestRate,
      payments,
      repaymentFreq,
      startDate
    );

    const perPayment = amortSchedule.length > 0 ? amortSchedule[0].paymentAmount : 0;
    const endDate = calculateEndDate(startDate, term, termUnit);

    setResult({
      interest: interest.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
      payments,
      perPayment,
      startDate,
      endDate,
    });

    setSchedule(amortSchedule);
  };

  const handleReset = () => {
    setAmount('');
    setRate('');
    setTerm('');
    setTermUnit('years');
    setRepaymentFreq('monthly');
    setStartDate('');
    setResult(null);
    setValidationErrors({});
    setSchedule([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCalculate();
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg font-sans text-gray-800">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Loan Interest Calculator
      </h2>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <InputField
          label="Loan Amount (Birr)"
          id="loan-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="any"
          error={validationErrors.amount}
          className="w-full"
        />

        <InputField
          label="Interest Rate (%)"
          id="interest-rate"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0"
          step="any"
          error={validationErrors.rate}
          className="w-full"
        />

        <div className="flex space-x-4 items-end">
          <div className="flex-1">
            <InputField
              label="Loan Term"
              id="loan-term"
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              min="0"
              step="1"
              error={validationErrors.term}
              className="w-full"
            />
          </div>

          <div className="w-36">
            <SelectField
              label=" "
              id="term-unit"
              value={termUnit}
              onChange={(e) => setTermUnit(e.target.value)}
              options={[
                { value: 'days', label: 'Days' },
                { value: 'months', label: 'Months' },
                { value: 'years', label: 'Years' },
              ]}
            />
          </div>
        </div>

        <InputField
          label="Start Date"
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          error={validationErrors.startDate}
          className="w-full"
        />

        <SelectField
          label="Repayment Frequency"
          id="repayment-frequency"
          value={repaymentFreq}
          onChange={(e) => setRepaymentFreq(e.target.value)}
          options={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
          ]}
          className="w-full"
        />

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`flex-1 py-2 rounded-md font-semibold text-white transition-colors ${isFormValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            Calculate
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2 rounded-md border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold"
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-8 p-5 bg-blue-50 border border-blue-300 rounded-md" aria-live="polite" role="region">
          <h3 className="text-lg font-bold text-blue-700 mb-3">Result</h3>
          <p className="mb-1">Interest: <span className="font-semibold">{result.interest} birr</span></p>
          <p className="mb-1">Total Repayment: <span className="font-semibold">{result.totalRepayment} birr</span></p>
          <p className="mb-1">Number of Payments: <span className="font-semibold">{result.payments}</span></p>
          <p className="mb-1">Each Payment: <span className="font-semibold">{result.perPayment} birr</span></p>
          <p className="mb-1">Start Date: <span className="font-semibold">{result.startDate}</span></p>
          <p className="mb-1">End Date: <span className="font-semibold">{result.endDate}</span></p>

          {schedule.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => openSchedulePDF(schedule)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Full Amortization Schedule
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
