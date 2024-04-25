import React, { useState, useEffect, useMemo } from 'react';

const CurrencyConverter = () => {
  const [allCurrency, setAllCurrency] = useState({});
  const [currencyFrom, setCurrencyFrom] = useState(null);
  const [allSelectedCurrency, setAllSelectedCurrency] = useState({});
  const [currencyTo, setCurrencyTo] = useState(null);
  const [amount, setAmount] = useState(0);

  const memoizedFetchCurrencyData = useMemo(() => async () => {
    const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
    const data = await response.json();
    setAllCurrency(data);
  }, []);

  const memoizedFetchSelectedCurrency = useMemo(() => async () => {
    if (currencyFrom) {
      const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currencyFrom}.json`);
      const data = await response.json();
      setAllSelectedCurrency(data[currencyFrom]);
    }
  }, [currencyFrom]);

  useEffect(() => {
    memoizedFetchCurrencyData();
  }, [memoizedFetchCurrencyData]);

  useEffect(() => {
    memoizedFetchSelectedCurrency();
  }, [memoizedFetchSelectedCurrency]);

  useEffect(() => {
    if (currencyTo && allSelectedCurrency[currencyTo]) {
      setAmount(allSelectedCurrency[currencyTo]);
    }
  }, [currencyTo, allSelectedCurrency]);

  return (
    <>
      <select onChange={(e) => setCurrencyFrom(e.target.value)}>
        <option value={null}>Please select any currency</option>
        {Object.keys(allCurrency).map(el => <option key={el} value={el}>{el}</option>)}
      </select>

      <select onChange={(e) => setCurrencyTo(e.target.value)}>
        <option value={null}>Please select any currency</option>
        {Object.keys(allSelectedCurrency).map(el => <option key={el} value={el}>{el}</option>)}
      </select>

      {amount}
    </>
  );
};

export default React.memo(CurrencyConverter);
