//second.js

import React, { useEffect, useRef } from 'react';
import Email from './Email';
import CustomPattern from './CustomPattern';
import AiExtractor from './AiExtractor';
import { IoChatbubbles } from 'react-icons/io5';
import Chat from './Chat';

export default function Second( {darkMode ,handleSubmission, handleItemClick, toggleChat, setIsOpen, selectedItem, isOpen, isChatVisible, handleInputChange, inputValue} ) {

  const dropdownRef = useRef(null); // Reference to the dropdown
  // Function to handle clicks outside of the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if the click is outside
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='max-w-3xl mx-auto flex flex-col items-center justify-center p-6 rounded-b-md' 
        style={{
          background: darkMode ? '#181920' : '#3987b1',
          boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.6)'
      }} >

        {/* dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={()=> {setIsOpen(!isOpen)}}
            className="border-2 border-gray-400 px-4 py-2 text-black bg-white rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            style={{ minWidth: '200px', textAlign: 'left', boxShadow: "inset 0 0 0 1px #cbd5e0" }} // Adjusted inset shadow for a subtle effect
          >
            {selectedItem}
            <span className="float-right">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </span>
          </button>

          {isOpen && (
            <div className="absolute mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-10 text-black">
              <a href="#" onClick={() => handleItemClick('Email')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Email</a>
              <a href="#" onClick={() => handleItemClick('Custom Pattern')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Custom pattern</a>
              <a href="#" onClick={() => handleItemClick('AI Extractor')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AI Extractor</a>
            </div>
          )}
        </div>

        <div className='mt-4'>
          {(() => {
            switch (selectedItem) {
              case 'Email':
                return <Email handleSubmission={handleSubmission} />;
              case 'Custom Pattern':
                return <CustomPattern handleSubmission={handleSubmission} handleInputChange={handleInputChange} inputValue={inputValue} />;
              case 'AI Extractor':
                return <AiExtractor handleSubmission={handleSubmission} handleInputChange={handleInputChange} inputValue={inputValue} />;
              default:
                return null;
            }
          })()}
        </div>
      </div>

      {selectedItem === 'Custom Pattern' && (
        <div
          className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center"
          style={{ width: '60px', height: '60px' }} // This sets the size of the chat bubble
          onClick={toggleChat}
        >
          <IoChatbubbles />
        </div>

      )}

      {isChatVisible && <Chat darkMode={darkMode} />}
    </>
  );
}
