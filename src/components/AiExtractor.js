//aiextractor.js
import React, { useState } from 'react'

export default function AiExtractor({ handleSubmission, handleInputChange, inputValue }) {

  // State to store the input value

  const handleSubmit = () => {
    handleSubmission({ type: 'aiExtractor', data: inputValue });
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <textarea
        value={inputValue}
        onChange={handleInputChange}
        className="border-2 border-gray-400 bg-gray-200 shadow-inner h-24 p-3 w-80 resize-none"
        placeholder="Your message here..."></textarea>

      <button
        onClick={handleSubmit}
        className='transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg mt-10 p-2 w-36 bg-black text-white rounded-2xl shadow'>
        Submit
      </button>

    </div>
  )
}
