import React from 'react'

export default function CurrencyRow() {
  return (
    <div className='currencyInput'>
      <input className='input' type="number"/>
      <select>
        <option value="USD">USD</option>
      </select>
    </div>
  )
}
