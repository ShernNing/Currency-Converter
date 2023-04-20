import React from 'react'

export default function CurrencyRow(props) {
  // const {currencyOptions, selectedCurrency, onchangeCurrency, amount, onChangeAmount} = props
  return (
    <div className='currencyInput'>
      <input className='input' type="number" value={props.amount}
        onChange={props.onChangeAmount}
      />
      <select value={props.selectedCurrency}
        onChange={props.onChangeCurrency}>
        {props.currencyOptions.map(option => (
          //each child in a list must have a unique key prop
          <option key={option} value={option}>{option}</option> 
        ))}
      </select>
    </div>
  )
}
