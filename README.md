# Coffee Payment Tracker

A simple web application to help office coworkers track whose turn it is to pay for the daily coffee run.

## Live Demo

Check out the live application: [Coffee Payment Tracker](https://coffee-payment-tracker.vercel.app/)

## Repository

View the source code: [GitHub Repository](https://github.com/saadmansoor93/coffee-payment-tracker)

## Problem Statement

In an office with 7 coworkers who get coffee together daily, it's hard to keep track of whose turn it is to pay, especially when everyone orders different drinks with different prices.

## Solution

This app tracks:
- Each person's preferred coffee drink and its price
- Payment history with dates and amounts
- Who should pay next (calculated based on fair distribution of payment burden)
- Cost accumulation for each coworker
- Payment frequency statistics

## Features

- **Smart Payment Algorithm**: Determines whose turn it is to pay based on drink prices and payment history
- **Detailed Tracking**: Monitors total paid amounts, individual drink costs, and payment frequency
- **Transparent Reasoning**: Explains why a specific person was chosen to pay
- **Easy Management**: Add new coworkers or reset payment history as needed
- **Persistent Storage**: Data is saved to local storage between sessions
- **Mobile Responsive**: Works on all device sizes

## Technology Stack

- React
- Tailwind CSS
- Local Storage API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```
git clone https://github.com/saadmansoor93/coffee-payment-tracker
cd coffee-payment-tracker
```
   
   Or simply download the source code from the [repository page](https://github.com/saadmansoor93/coffee-payment-tracker)

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm start
```

4. Open http://localhost:3000 in your browser

## How It Works

The payment algorithm works as follows:
1. Calculates the total cost of all coffees in a round
2. For each person, tracks how many "rounds" they've paid for (their total paid / cost of a round)
3. Calculates how many rounds they should ideally have paid based on their drink price relative to the total
4. The person with the largest negative difference between actual and ideal rounds paid is the next payer

This ensures that people with more expensive drinks pay proportionally more often than those with cheaper drinks.

## Assumptions

1. All coworkers get coffee every day
2. Coffee prices remain constant (though prices can be updated manually)
3. Fairness means people with more expensive drinks should pay more often
4. The app is meant to be used by a single office group

## Author

Saad Mansoor

## License

This project is licensed under the MIT License - see the LICENSE file for details