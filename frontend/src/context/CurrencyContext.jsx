import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const RATES = {
  USD: 1,
  INR: 85.0,
  EUR: 0.94,
  GBP: 0.81,
  CAD: 1.37
};

const SYMBOLS = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  CAD: "C$"
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('USD');

  // Helper to convert and format a USD base amount
  const formatCurrency = (amountInUSD, includeSymbol = true, decimalPlaces = 0) => {
    if (amountInUSD === undefined || amountInUSD === null || isNaN(amountInUSD)) return "-";
    const rate = RATES[currency] || 1;
    const converted = amountInUSD * rate;
    
    // Using standard en-US format to insert commas reliably (1,000,000 format)
    const formattedNum = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(converted);

    return includeSymbol ? `${SYMBOLS[currency]}${formattedNum}` : formattedNum;
  };

  const getSymbol = () => SYMBOLS[currency] || '$';

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, getSymbol, CURRENCIES: Object.keys(RATES) }}>
      {children}
    </CurrencyContext.Provider>
  );
};
