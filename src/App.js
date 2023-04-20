import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow />
      <div className='equals'>=</div>
      <CurrencyRow />
    </>
  );
}
export default App;