// customPattern.js
import React, { useState } from 'react'
import gif from '../images/Animation2.gif'

export default function CustomPattern({ handleSubmission, handleInputChange , inputValue}) {

  const handleSubmit = () => {
    handleSubmission({ type: 'customPattern', data: inputValue });
  }

  return (
    <div className='flex flex-col items-center justify-center'>

      <img src={gif} className='h-52 w-60' alt="" />

      <input type='text'
        value={inputValue}
        onChange={handleInputChange}
        className="w-72 mb-1 p-2 border-2 border-gray-300 rounded"
        style={{ boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)' }}
        placeholder='Enter regex here...' />
      <button
        onClick={handleSubmit}
        className='transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg mt-10 p-2 w-36 bg-black text-white rounded-2xl shadow'>
        Submit
      </button>
    </div>
  )
}
