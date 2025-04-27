import React, { useState, useEffect } from 'react';
import AddCoworker from './AddCoworker';
import CoffeeHistory from './CoffeeHistory';
import { calculateNextPayer } from '../utils/paymentCalculator';

const CoffeeTracker = () => {
  const [coworkers, setCoworkers] = useState(() => {
    const savedCoworkers = localStorage.getItem('coworkers');
    return savedCoworkers ? JSON.parse(savedCoworkers) : [
      { id: 1, name: 'Bob', drink: 'Cappuccino', price: 4.50, totalPaid: 0 },
      { id: 2, name: 'Jim', drink: 'Black Coffee', price: 2.75, totalPaid: 0 },
      { id: 3, name: 'Sarah', drink: 'Latte', price: 4.25, totalPaid: 0 },
      { id: 4, name: 'Mike', drink: 'Mocha', price: 5.00, totalPaid: 0 },
      { id: 5, name: 'Lisa', drink: 'Americano', price: 3.50, totalPaid: 0 },
      { id: 6, name: 'Tom', drink: 'Espresso', price: 3.00, totalPaid: 0 },
      { id: 7, name: 'Emma', drink: 'Flat White', price: 4.75, totalPaid: 0 },
    ];
  });

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('coffeeHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('coworkers', JSON.stringify(coworkers));
    localStorage.setItem('coffeeHistory', JSON.stringify(history));
  }, [coworkers, history]);

  // Calculate drink cost so far for each person
  const calculateDrinkCostSoFar = (coworker) => {
    // Count how many coffee runs have happened total
    const totalCoffeeRuns = history.length;
    
    // If no runs have happened yet, return 0
    if (totalCoffeeRuns === 0) return 0;
    
    // Each person's drink cost so far is their drink price multiplied by the number of coffee runs
    return coworker.price * totalCoffeeRuns;
  };
  
  // Calculate how many times each person has paid
  const calculatePaymentFrequency = (coworkerId) => {
    return history.filter(entry => entry.payerId === coworkerId).length;
  };

  // Get the next payer with explanation
  const getNextPayerInfo = () => {
    const nextPayer = calculateNextPayer(coworkers);
    
    if (!nextPayer) return { payer: null, reason: "No coworkers added yet" };
    
    // Calculate payment stats for explanation
    const totalCost = coworkers.reduce((sum, c) => sum + c.price, 0);
    const totalPaid = coworkers.reduce((sum, c) => sum + c.totalPaid, 0);
    
    // Create explanation based on payment history
    let reason = "";
    
    if (totalPaid === 0) {
      reason = "They're starting the rotation as they have the most expensive drink.";
    } else {
      const fairShare = (nextPayer.price / totalCost) * 100;
      const actualShare = totalPaid === 0 ? 0 : (nextPayer.totalPaid / totalPaid) * 100;
      
      reason = `Their drink is ${fairShare.toFixed(1)}% of total cost, but they've only paid ${actualShare.toFixed(1)}% of total contributions so far.`;
    }
    
    return { payer: nextPayer, reason };
  };
  
  // Get the next payer info once for render
  const payerInfo = getNextPayerInfo();

  const addCoworker = (newCoworker) => {
    const updatedCoworkers = [...coworkers, { 
      ...newCoworker, 
      id: coworkers.length + 1, 
      totalPaid: 0 
    }];
    setCoworkers(updatedCoworkers);
  };

  const recordPayment = () => {
    const totalCost = coworkers.reduce((sum, coworker) => sum + coworker.price, 0);
    const nextPayer = calculateNextPayer(coworkers);
    
    if (!nextPayer) return;

    const updatedCoworkers = coworkers.map(coworker => {
      if (coworker.id === nextPayer.id) {
        return { ...coworker, totalPaid: coworker.totalPaid + totalCost };
      }
      return coworker;
    });

    const date = new Date().toLocaleDateString();
    const newHistoryEntry = {
      id: history.length + 1,
      date,
      payerId: nextPayer.id,
      payerName: nextPayer.name,
      totalAmount: totalCost
    };

    setCoworkers(updatedCoworkers);
    setHistory([...history, newHistoryEntry]);
  };

  const resetData = () => {
    if (window.confirm('Are you sure you want to reset all data?')) {
      localStorage.removeItem('coworkers');
      localStorage.removeItem('coffeeHistory');
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Office Coffee Payment Tracker</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Today's Coffee Run</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-3">Who's Paying Today?</h3>
          {coworkers.length > 0 ? (
            <>
              <div className="mb-4">
                <p className="text-xl font-bold text-blue-600">
                  {payerInfo.payer?.name || 'No one'} should pay today!
                </p>
                <p className="text-gray-700 mt-2">
                  <span className="font-semibold">Why?</span> {payerInfo.reason}
                </p>
                <p className="text-gray-600 mt-2">
                  Total cost: ${coworkers.reduce((sum, c) => sum + c.price, 0).toFixed(2)}
                </p>
              </div>
              <button 
                onClick={recordPayment}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Record Today's Payment
              </button>
            </>
          ) : (
            <p>Add some coworkers to get started!</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Coworkers & Their Orders</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Drink</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Cost So Far</th>
                  <th className="text-left py-2">Times Paid</th>
                  <th className="text-left py-2">Total Paid</th>
                </tr>
              </thead>
              <tbody>
                {coworkers.map(coworker => (
                  <tr key={coworker.id} className="border-b">
                    <td className="py-2">{coworker.name}</td>
                    <td className="py-2">{coworker.drink}</td>
                    <td className="py-2">${coworker.price.toFixed(2)}</td>
                    <td className="py-2">${calculateDrinkCostSoFar(coworker).toFixed(2)}</td>
                    <td className="py-2">{calculatePaymentFrequency(coworker.id)}</td>
                    <td className="py-2">${coworker.totalPaid.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <AddCoworker onAdd={addCoworker} />
          
          <div className="mt-4">
            <button 
              onClick={resetData}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset All Data
            </button>
          </div>
        </div>
        
        <CoffeeHistory history={history} coworkers={coworkers} />
      </div>
    </div>
  );
};

export default CoffeeTracker;