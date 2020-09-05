import React, { useState, useEffect } from 'react';

import Layout from './Layout';
import { CurrencyContext } from './utils';
import { Skeleton } from 'antd';
const currency = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1]
let initialState = {}

const setupCurrency = () => {
  currency.map((value) => initialState[value] = 0)
}

function App() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState()
  useEffect(() => {
    setupCurrency();
    setValue(initialState)
    setLoading(false)
  }, [])
  const provider = {
    value: value,
    setValue: setValue,
    currency: currency,
  }
  return (
    <CurrencyContext.Provider value={provider}>
      {loading ? <Skeleton /> : <Layout />}
    </CurrencyContext.Provider>

  );
}

export default App;
