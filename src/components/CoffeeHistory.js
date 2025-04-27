import React from 'react';

const CoffeeHistory = ({ history }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {history.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Paid By</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {history.map(entry => (
                <tr key={entry.id} className="border-b">
                  <td className="py-2">{entry.date}</td>
                  <td className="py-2">{entry.payerName}</td>
                  <td className="py-2">${entry.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No payment history yet.</p>
        )}
      </div>
    </div>
  );
};

export default CoffeeHistory;