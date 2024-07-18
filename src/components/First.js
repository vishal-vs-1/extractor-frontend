//first.js file

import React from 'react';
import gif from '../images/spin.gif';
import { ImAttachment } from "react-icons/im";
import { IoMdCloseCircle } from 'react-icons/io';

export default function First( {file, handleUrlChange, handleFileChange, handleSubmit, url, error, darkMode} ) {
    
    const handleRemoveFile = () => {
        handleFileChange({ target: { files: [] } });  // Trigger handleFileChange with empty files array to reset state
    };

    return (
        <div className='w-full mt-0 max-w-md mx-auto flex flex-col items-center justify-center p-6 rounded-b-lg' 
        style={{
            background: darkMode ? '#181920' : '#3987b1',
            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.6)'
        }}>

                {error && <div className="mb-4 text-red-500">{error}</div>}

                {/* image */}
                <img src={gif} className='mb-8 rounded-full h-52 w-52'></img>

                {/* input box to paste url */}
                <input
                    type="text"
                    placeholder="Paste url..."
                    className="w-72 mb-1 p-2 border-2 border-gray-300 rounded"
                    style={{ boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)' }}
                    value={url}                    
                    onChange={handleUrlChange}
                />

                {/* seperator */}
                <p className='text-3xl mb-2'>/</p>

                {/* attach files - to upload files */}
                <div className="w-72 mb-4 p-2 bg-white rounded shadow border-2 border-gray-300 flex items-center justify-between">
                <label className="flex cursor-pointer">
                    <ImAttachment className='mr-2 w-auto h-auto' />
                    {file ? <span className="text-gray-700 truncate">{file.name}</span> : <span className="text-gray-700">Upload pdf/docx/txt</span>}
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                    />
                </label>
                {file && <IoMdCloseCircle className="text-red-500 cursor-pointer" onClick={handleRemoveFile} />}
            </div>

                {/* submit button */}
                <button
                    onClick={handleSubmit}
                    className="transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg mt-2 p-2 w-36 bg-black text-white rounded-2xl shadow"
                >
                    Submit
                </button>
            </div>

    );
};
