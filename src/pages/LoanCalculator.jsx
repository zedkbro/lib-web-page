import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import { useNavigate } from 'react-router-dom';
import { openSchedulePDF } from '../utils/openSchedule';

const LoanCalculator = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [termUnit, setTermUnit] = useState('years');
  const [repaymentFreq, setRepaymentFreq] = useState('monthly');
  const [product, setProduct] = useState('');
  const [startDate, setStartDate] = useState('');
  const [result, setResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [schedule, setSchedule] = useState([]);

  const calculateDays = () => {
    const t = parseInt(term);
    if (termUnit === 'days') return t;
    if (termUnit === 'months') return t * 30;
    if (termUnit === 'years') return t * 365;
    return 0;
  };

  const calculateRepayments = (days) => {
    switch (repaymentFreq) {
      case 'daily': return days;
      case 'weekly': return Math.ceil(days / 7);
      case 'monthly': return Math.ceil(days / 30);
      case 'yearly': return Math.ceil(days / 365);
      default: return 1;
    }
  };

  const calculateEndDate = (startDate, term, unit) => {
    const date = new Date(startDate);
    if (unit === 'days') date.setDate(date.getDate() + parseInt(term));
    if (unit === 'months') date.setMonth(date.getMonth() + parseInt(term));
    if (unit === 'years') date.setFullYear(date.getFullYear() + parseInt(term));
    return date.toISOString().split('T')[0];
  };

  const validateForm = () => {
    const errors = {};
    if (!amount || parseFloat(amount) <= 0) {
      errors.amount = 'Amount must be a positive number.';
    }
    if (!rate || parseFloat(rate) <= 0) {
      errors.rate = 'Interest rate must be a positive number.';
    }
    if (!term || parseInt(term) <= 0) {
      errors.term = 'Term must be a positive number.';
    }
    if (!product) {
      errors.product = 'Please select a product.';
    }
    if (!startDate) {
      errors.startDate = 'Start date is required.';
    }
    return errors;
  };

  const isFormValid = () => {
    return (
      amount && parseFloat(amount) > 0 &&
      rate && parseFloat(rate) > 0 &&
      term && parseInt(term) > 0 &&
      product && startDate
    );
  };

  const generateAmortizationSchedule = (
    principal,
    annualInterestRate,
    totalPayments,
    repaymentFreq,
    startDate
  ) => {
    let periodInterestRate;
    let intervalDays;
    switch (repaymentFreq) {
      case 'daily':
        periodInterestRate = (annualInterestRate / 100) / 365;
        intervalDays = 1;
        break;
      case 'weekly':
        periodInterestRate = (annualInterestRate / 100) / 52;
        intervalDays = 7;
        break;
      case 'monthly':
        periodInterestRate = (annualInterestRate / 100) / 12;
        intervalDays = 30;
        break;
      case 'yearly':
        periodInterestRate = (annualInterestRate / 100);
        intervalDays = 365;
        break;
      default:
        periodInterestRate = (annualInterestRate / 100) / 12;
        intervalDays = 30;
    }

    const paymentAmount = principal * periodInterestRate / (1 - Math.pow(1 + periodInterestRate, -totalPayments));
    let balance = principal;
    const schedule = [];

    let currentDate = new Date(startDate);

    for (let i = 1; i <= totalPayments; i++) {
      const interestPayment = balance * periodInterestRate;
      const principalPayment = paymentAmount - interestPayment;
      const beginningBalance = balance;
      balance -= principalPayment;

      // Normalize last balance
      if (i === totalPayments && Math.abs(balance) < 0.01) {
        balance = 0;
      }

      // Format date as yyyy-mm-dd
      const payDate = currentDate.toISOString().split('T')[0];

      schedule.push({
        paymentNumber: i,
        payDate,
        beginningBalance: beginningBalance.toFixed(2),
        paymentAmount: paymentAmount.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        remainingBalance: balance > 0 ? balance.toFixed(2) : '0.00',
      });

      // Increment date
      currentDate.setDate(currentDate.getDate() + intervalDays);
    }

    return schedule;
  };

  const handleCalculate = () => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setResult(null);
      setSchedule([]);
      return;
    }

    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate);
    const days = calculateDays();
    const payments = calculateRepayments(days);
    const interest = (principal * interestRate * days) / (100 * 365);
    const totalRepayment = principal + interest;
    // const amortSchedule = generateAmortizationSchedule(principal, interestRate, payments, repaymentFreq);
    const amortSchedule = generateAmortizationSchedule(principal, interestRate, payments, repaymentFreq, startDate);

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
    setProduct('');
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

        <SelectField
          label="Product"
          id="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          options={[
            { value: '', label: '-- Select Product --' },
            { value: 'personal', label: 'Personal Loan' },
            { value: 'auto', label: 'Auto Loan' },
            { value: 'business', label: 'Business Loan' },
          ]}
          error={validationErrors.product}
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
