export const calculateNextPayer = (coworkers) => {
  if (coworkers.length === 0) return null;
  
  // Get the total cost of all coffees
  const totalCostPerRound = coworkers.reduce((sum, coworker) => sum + coworker.price, 0);
  
  // Calculate the total paid by everyone
  const totalPaid = coworkers.reduce((sum, coworker) => sum + coworker.totalPaid, 0);
  
  // For the first payment, simply choose the person with the most expensive drink
  if (totalPaid === 0) {
    return coworkers.sort((a, b) => b.price - a.price)[0];
  }
  
  // Calculate how much each person should have ideally paid proportional to their drink price
  const idealPayments = coworkers.map(coworker => {
    // What percentage of costs should they cover (based on drink price)
    const fairShareRatio = coworker.price / totalCostPerRound;
    
    // What percentage have they actually paid
    const actualPaymentRatio = coworker.totalPaid / totalPaid;
    
    // Payment difference (negative means they should pay next)
    const paymentDifference = actualPaymentRatio - fairShareRatio;
    
    return {
      ...coworker,
      fairShareRatio,
      actualPaymentRatio,
      paymentDifference
    };
  });
  
  // Sort by payment difference (ascending)
  idealPayments.sort((a, b) => a.paymentDifference - b.paymentDifference);
  
  return idealPayments[0];
};