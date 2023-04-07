// FileLoader.jsx

import React, { useState } from 'react';
import axios from 'axios';
//import { encryptAndSignFile } from './fileUtils';

function FileLoader() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLoadFiles = async (e) => {
    setLoading(true);
    setProgress(0);

    const files = Array.from(e.target.files);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Encrypt and sign the file
      //const encryptedFile = await encryptAndSignFile(file);

      // Send the file to the API
      await sendFileToApi(file);

      // Update the progress bar
      const newProgress = ((i + 1) / files.length) * 100;
      setProgress(newProgress);
    }

    setLoading(false);
  };

  const sendFileToApi = async (encryptedFile) => {
    //const apiUrl = 'http://57.128.108.48:33198/uploadfileS3';
    const apiUrl = 'http://127.0.0.1:33198/uploadfileS3';
    // Create a new FormData instance
    const formData = new FormData();
  
    // Append the file to the FormData
    formData.append('file', encryptedFile);
  
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleLoadFiles} />
      {loading && (
        <div>
          Loading...
          <progress value={progress} max="100" />
        </div>
      )}
    </div>
  );
}

export default FileLoader;
