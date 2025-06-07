import {
  parseISO,
  addYears,
  addMonths,
  addDays,
  differenceInMonths,
  differenceInWeeks,
  differenceInDays,
} from 'date-fns';

export const calculateDays = (term, termUnit) => {
  const t = parseInt(term, 10);
  switch (termUnit) {
    case 'days': return t;
    case 'months': return t * 30;
    case 'years': return t * 365;
    default: return 0;
  }
};

export const calculateRepayments = (term, termUnit, repaymentFreq, startDate) => {
  const start = parseISO(startDate);
  let end;
  const t = parseInt(term, 10);

  switch (termUnit) {
    case 'years': end = addYears(start, t); break;
    case 'months': end = addMonths(start, t); break;
    case 'days': end = addDays(start, t); break;
    default: return 0;
  }

  switch (repaymentFreq) {
    case 'monthly':
      return differenceInMonths(end, start);
    case 'quarterly':
      return Math.floor(differenceInMonths(end, start) / 3);
    case 'weekly':
      return differenceInWeeks(end, start);
    case 'daily':
      return differenceInDays(end, start);
    case 'yearly':
      return t;
    default:
      return 0;
  }
};

export const calculateEndDate = (startDate, term, unit) => {
  const date = new Date(startDate);
  const t = parseInt(term, 10);
  switch (unit) {
    case 'days': date.setDate(date.getDate() + t); break;
    case 'months': date.setMonth(date.getMonth() + t); break;
    case 'years': date.setFullYear(date.getFullYear() + t); break;
  }
  return date.toISOString().split('T')[0];
};

export const generateAmortizationSchedule = (
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
    case 'quarterly':
      periodInterestRate = (annualInterestRate / 100) / 4;
      intervalDays = 91; // Approx. 3 months
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

    if (i === totalPayments && Math.abs(balance) < 0.01) balance = 0;

    schedule.push({
      paymentNumber: i,
      payDate: currentDate.toISOString().split('T')[0],
      beginningBalance: beginningBalance.toFixed(2),
      paymentAmount: paymentAmount.toFixed(2),
      principalPayment: principalPayment.toFixed(2),
      interestPayment: interestPayment.toFixed(2),
      remainingBalance: balance > 0 ? balance.toFixed(2) : '0.00',
    });

    currentDate.setDate(currentDate.getDate() + intervalDays);
  }

  return schedule;
};

export const validateInputs = ({ amount, rate, term, startDate }) => {
  const errors = {};
  if (!amount || parseFloat(amount) <= 0) errors.amount = 'Amount must be a positive number.';
  if (!rate || parseFloat(rate) <= 0) errors.rate = 'Interest rate must be a positive number.';
  if (!term || parseInt(term, 10) <= 0) errors.term = 'Term must be a positive number.';
  if (!startDate) errors.startDate = 'Start date is required.';
  return errors;
};
