import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import AmortizationSchedule from '../components/AmortizationSchedule';

const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [termUnit, setTermUnit] = useState('years');
  const [repaymentFreq, setRepaymentFreq] = useState('monthly');
  const [product, setProduct] = useState('');
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
    return errors;
  };

  const isFormValid = () => {
    return (
      amount && parseFloat(amount) > 0 &&
      rate && parseFloat(rate) > 0 &&
      term && parseInt(term) > 0 &&
      product
    );
  };

  const generateAmortizationSchedule = (principal, interestRate, days, payments) => {
    const termInYears = days / 365;
    const totalInterest = principal * (interestRate / 100) * termInYears;
    const totalRepayment = principal + totalInterest;
    const paymentAmount = totalRepayment / payments;
    const interestPerPayment = totalInterest / payments;

    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= payments; i++) {
      const interestPayment = interestPerPayment;
      const principalPayment = paymentAmount - interestPayment;
      balance -= principalPayment;

      schedule.push({
        paymentNumber: i,
        paymentAmount: paymentAmount.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        remainingBalance: balance > 0 ? balance.toFixed(2) : '0.00',
      });
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

    const interest = (principal * interestRate * days) / (100 * 365);
    const totalRepayment = principal + interest;
    const payments = calculateRepayments(days);
    const perPayment = totalRepayment / payments;

    setResult({
      interest: interest.toFixed(2),
      totalRepayment: totalRepayment.toFixed(2),
      payments,
      perPayment: perPayment.toFixed(2),
    });

    const amortSchedule = generateAmortizationSchedule(principal, interestRate, days, payments);
    setSchedule(amortSchedule);
  };

  const handleReset = () => {
    setAmount('');
    setRate('');
    setTerm('');
    setTermUnit('years');
    setRepaymentFreq('monthly');
    setProduct('');
    setResult(null);
    setValidationErrors({});
    setSchedule([]);
  };

  // Download CSV helper
  const downloadCSV = () => {
    if (schedule.length === 0) return;

    const headers = ['Payment #', 'Payment Amount', 'Principal Payment', 'Interest Payment', 'Remaining Balance'];
    const rows = schedule.map(item => [
      item.paymentNumber,
      item.paymentAmount,
      item.principalPayment,
      item.interestPayment,
      item.remainingBalance,
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'amortization_schedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          label="Loan Amount"
          id="loan-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          step="any"
          error={validationErrors.amount}
          aria-describedby="amount-error"
          className="w-full"
        />
        {validationErrors.amount && (
          <p id="amount-error" className="text-red-600 text-sm mt-1">
            {validationErrors.amount}
          </p>
        )}

        <InputField
          label="Interest Rate (%)"
          id="interest-rate"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          min="0"
          step="any"
          error={validationErrors.rate}
          aria-describedby="rate-error"
          className="w-full"
        />
        {validationErrors.rate && (
          <p id="rate-error" className="text-red-600 text-sm mt-1">
            {validationErrors.rate}
          </p>
        )}

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
              aria-describedby="term-error"
              className="w-full"
            />
            {validationErrors.term && (
              <p id="term-error" className="text-red-600 text-sm mt-1">
                {validationErrors.term}
              </p>
            )}
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
          aria-describedby="product-error"
          className="w-full"
        />
        {validationErrors.product && (
          <p id="product-error" className="text-red-600 text-sm mt-1">
            {validationErrors.product}
          </p>
        )}

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`flex-1 py-2 rounded-md font-semibold text-white transition-colors
              ${isFormValid() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
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
        <div
          className="mt-8 p-5 bg-blue-50 border border-blue-300 rounded-md"
          aria-live="polite"
          role="region"
        >
          <h3 className="text-lg font-bold text-blue-700 mb-3">Result</h3>
          <p className="mb-1">Interest: <span className="font-semibold">{result.interest} birr</span></p>
          <p className="mb-1">Total Repayment: <span className="font-semibold">{result.totalRepayment} birr</span></p>
          <p className="mb-1">Number of Payments: <span className="font-semibold">{result.payments}</span></p>
          <p>Each Payment: <span className="font-semibold">{result.perPayment} birr</span></p>

          {/* Amortization Schedule Table */}
         {schedule.length > 0 && (
  <AmortizationSchedule schedule={schedule} downloadCSV={downloadCSV} />
)}

        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
