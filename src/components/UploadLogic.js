//upload logic.js file

import React, { useState } from 'react';
import First from './First';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Second from './Second';
import Completion from './Completion';

const API_ENDPOINTS = {
    urlEmail: "http://localhost:8080/web/email",
    urlAiExtractor: "http://localhost:8080/web/abstract",
    urlCustomPattern: "http://localhost:8080/web/custom",
    fileEmail: "http://localhost:8080/file/email",
    fileAiExtractor: "http://localhost:8080/file/abstract",
    fileCustomPattern: "http://localhost:8080/file/custom"
};

export default function UploadLogic( {darkMode} ) {
    const [allowNavigate, setAllowNavigate] = useState(false);
    const navigate = useNavigate();

    //first.js
    const [url, setUrl] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [apiPostData, setApiPostData] = useState([]);

    //logic for first.js
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setFile(file);  // Set the file state
        } else {
            setFile(null);  // Reset the file state if no file is selected
        }
        setError(''); // Clear error when changing input
    };

    const handleFirstSubmission = (submissionString) => {
        setApiPostData(currentData => [...currentData, submissionString]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Check if both or neither are provided
        if ((url && file) || (!url && !file)) {
            setError('Please provide either a URL or a file, but not both.');            
            return;
        }else if(url && !isValidURL(url)){
            setError('Please provide a valid url');            
            return;
        }
        setAllowNavigate(true);
        // Prepare data for submission
        let submissionData = url ? { type: 'url', data: url } : { type: 'file', data: file };
        handleFirstSubmission(submissionData);
        navigate('/second');
    };

    function isValidURL(urlString) {
        try {
          const url = new URL(urlString);
          return url.protocol === "http:" || url.protocol === "https:";
        } catch (e) {
          return false;
        }
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value);
        setError(''); // Clear error when changing input
    };



    //logic for second.js
    const [inputValue, setInputValue] = useState('');
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Email');

    // Function to handle item selection
    const handleItemClick = (itemText) => {
        setSelectedItem(itemText); // Update selected item
        setIsOpen(false); // Close dropdown
    };

    const toggleChat = () => {
        setIsChatVisible(!isChatVisible);
    };

    const handleFinalSubmission = (submissionString) => {
        setApiPostData(currentData => {
            const updatedData = [...currentData, submissionString];
            callApi(updatedData);
            navigate('/completion');
            return updatedData;
        });
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setError(''); // Clear error when changing input
    };


    //completion.js logic
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    //common logic
    const callApi = (data) => {

        // Extract objects safely
        const urlObj = data.find(item => item.type === 'url');
        const fileObj = data.find(item => item.type === 'file');
        const emailObj = data.find(item => item.type === 'email');
        const aiExtractorObj = data.find(item => item.type === 'aiExtractor');
        const customPatternObj = data.find(item => item.type === 'customPattern');

        // Extract associated data safely. Fixed variable naming to match object names.
        const url = urlObj ? urlObj.data : null;
        const file = fileObj ? fileObj.data : null;

        // Check for URL associativity and call corresponding API, sending required data
        if (url) {
            if (emailObj) callApiEndpointForUrl(API_ENDPOINTS.urlEmail, url);
            if (aiExtractorObj) callApiEndpointForUrl(API_ENDPOINTS.urlAiExtractor, url, aiExtractorObj);
            if (customPatternObj) callApiEndpointForUrl(API_ENDPOINTS.urlCustomPattern, url, customPatternObj);
        } else if (file) { // Check for File associativity and call corresponding API
            if (emailObj) callApiEndpointForFile(API_ENDPOINTS.fileEmail, file);
            if (aiExtractorObj) callApiEndpointForFile(API_ENDPOINTS.fileAiExtractor, file, aiExtractorObj);
            if (customPatternObj) callApiEndpointForFile(API_ENDPOINTS.fileCustomPattern, file, customPatternObj);
        }
    };

    const callApiEndpointForFile = async (endpoint, file, additionalData = null) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        console.log("step 1");
        console.log(additionalData);
        if (additionalData) {
            if (additionalData.type === 'aiExtractor') {
                formData.append('text', additionalData.data);
            } else if (additionalData.type === 'customPattern') {
                formData.append('pattern', additionalData.data);
            }
        }
        console.log(formData);
        axios.post(endpoint, formData, {responseType: 'blob'})
            .then(response => {
                console.log('API response:  11');
                setApiResponse(response.data);
                setIsLoading(false);
            })
            .catch(error => console.error('API call failed:', error));
    };

    const callApiEndpointForUrl = async (endpoint, url, additionalData = null) => {

        setIsLoading(true);

        let payload;
        if (additionalData === null) {
            payload = {
                'url': url,
            }
        } else {
            payload = {
                'url': url,
                'input': additionalData.data
            }
        }

        axios.post(endpoint, payload, {responseType : 'blob'})
            .then(response => {
                console.log('API response:');
                setApiResponse(response.data);
                setIsLoading(false);
            })
            .catch(error => console.error('API call failed:', error));
    };


    return (
        <Routes>
            <Route path='/' element={<First file={file} handleFileChange={handleFileChange} handleUrlChange={handleUrlChange} handleSubmit={handleSubmit} url={url} error={error} darkMode = {darkMode}/>} />
            <Route path='/second' element={
                allowNavigate ?
                    <Second darkMode={darkMode} handleSubmission={handleFinalSubmission} handleItemClick={handleItemClick} toggleChat={toggleChat} setIsOpen={setIsOpen} selectedItem={selectedItem} isOpen={isOpen} isChatVisible={isChatVisible} handleInputChange={handleInputChange} inputValue={inputValue} />
                    : <Navigate to="/" />} />
            <Route path='/completion' element={<Completion isLoading={isLoading} apiResponse={apiResponse} />} />
        </Routes>
    )
}
