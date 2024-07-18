import React from 'react'

export default function Completion( {apiResponse, isLoading} ) {

  const handleDownload = () => {
    const blob = new Blob([apiResponse], { type: 'application/pdf' });

    // Create a URL object from the Blob object
    const url = window.URL.createObjectURL(blob);

    // Create a temporary <a> element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.pdf'; // Set the desired filename
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the URL object
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
       {isLoading ? <p>Loading...</p> :
        apiResponse ? <button onClick={handleDownload}>Download PDF</button> :
        <p>No file to download.</p>
      }
    </div>
  )
}