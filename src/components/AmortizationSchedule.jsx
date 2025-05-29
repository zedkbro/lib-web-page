import React from 'react';

const AmortizationSchedule = ({ schedule, onDownload }) => {
    if (!schedule || schedule.length === 0) return null;

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-2 px-2">
                <h3 className="text-lg font-semibold text-blue-700">Amortization Schedule</h3>
                <button
                    onClick={onDownload}
                    className="text-blue-600 underline text-sm hover:text-blue-800 focus:outline-none"
                    aria-label="Download amortization schedule as CSV"
                >
                    Download Amortization Schedule
                </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto border border-gray-300 rounded-md">
                <table className="min-w-full text-sm table-auto border-collapse">
                    <thead className="bg-gray-100 sticky top-0">
                        <tr>
                            <th className="border px-2 py-1 text-left">Payment #</th>
                            <th className="border px-2 py-1 text-right">Payment Amount</th>
                            <th className="border px-2 py-1 text-right">Principal</th>
                            <th className="border px-2 py-1 text-right">Interest</th>
                            <th className="border px-2 py-1 text-right">Remaining Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map(({ paymentNumber, paymentAmount, principalPayment, interestPayment, remainingBalance }) => (
                            <tr key={paymentNumber} className="even:bg-gray-50">
                                <td className="border px-2 py-1 text-left">{paymentNumber}</td>
                                <td className="border px-2 py-1 text-right">{paymentAmount}</td>
                                <td className="border px-2 py-1 text-right">{principalPayment}</td>
                                <td className="border px-2 py-1 text-right">{interestPayment}</td>
                                <td className="border px-2 py-1 text-right">{remainingBalance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile friendly version */}
            <div className="md:hidden mt-4 space-y-3">
                {schedule.map(({ paymentNumber, paymentAmount, principalPayment, interestPayment, remainingBalance }) => (
                    <div key={paymentNumber} className="p-3 border border-gray-300 rounded-md bg-gray-50">
                        <p><strong>Payment #:</strong> {paymentNumber}</p>
                        <p><strong>Payment Amount:</strong> {paymentAmount}</p>
                        <p><strong>Principal:</strong> {principalPayment}</p>
                        <p><strong>Interest:</strong> {interestPayment}</p>
                        <p><strong>Remaining Balance:</strong> {remainingBalance}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AmortizationSchedule;
