//email.js
import React from 'react'
import gif from '../images/Animation.gif';

export default function Email({ handleSubmission }) {

  const handleSubmit = ()=>{
    handleSubmission({type: 'email', data: null})
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={gif} className='rounded-full border-gray-300 border-2 h-64 w-64' alt="" />
      <button
          onClick = {handleSubmit}
          className='transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg mt-10 p-2 w-36 bg-black text-white rounded-2xl shadow'>
           Submit 
      </button>
    </div>
  )
}
