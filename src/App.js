import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'

const BASE_URL = 'https://api.exchangerate.host/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]) //state of what our currency will be
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1) //sets the default amount to 1
  //which to update, fromCurrency or toCurrency
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) { 
    fromAmount = amount 
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate //in reverse, its always fromAmount to toAmount, so we divide
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json()) //convert response to json
      .then(data => {
        //will select the first currency after base currency
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        //from currency is always the base when loaded
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, []); //empty array will only be called the first time the app loads

  useEffect(() => {
    //only if fromCurrency and toCurrency != null then run this effect
    if (fromCurrency != null && toCurrency != null) { 
      //fetch from base url and pass in parameter of base = fromCurrency
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json()) //convert response to json
        //set exchangerate to toCurrency. When we update our currencies, 
        //it will go to this api and get the new exchange for fromCurrency or toCurrency
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency]) //call this anytime fromCurrency or toCurrency changes

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true) //tells us which box we are changing, toAmount of fromAmount
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false) //false since we are changing our toAmount not fromAmount
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <CurrencyRow currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        //so that when an option is selected it will be selected. Get the value of selected
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
        />
      <div className='equals'>=</div>
      <CurrencyRow currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        //so that when an option is selected it will be selected. Get the value of selected
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
        />
    </>
  );
}
export default App;