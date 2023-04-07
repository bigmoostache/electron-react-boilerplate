import React from 'react';
import styles from './OneDataset.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';

const OneDataset = ({ datasetName }) => {

  const dataset = {
    name: 'Example Dataset',
    numberOfFiles: 1234,
    contributors: 'John Doe, Jane Smith, Alice Johnson',
    totalSize: '2.5 GB',
    items: [
      { name: 'Element 1', uploadDate: '2023-03-30', size: '5 MB', patientKey: '123456789' },
      { name: 'Element 2', uploadDate: '2023-03-30', size: '5 MB', patientKey: '123456789' },
      { name: 'Element 3', uploadDate: '2023-03-30', size: '5 MB', patientKey: '123456789' },
      { name: 'Element 4', uploadDate: '2023-03-30', size: '5 MB', patientKey: '123456789' },
      { name: 'Element 5', uploadDate: '2023-03-30', size: '5 MB', patientKey: '123456789' },
      // Add more items as necessary
    ],
  };

  const renderMetadataItems = () => {
    return Object.entries(dataset).map(([key, value]) => {
      if (key !== 'items') {
        return (
          <div key={key} className={styles.metadata_item}>
            <span className={styles.metadata_key}>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span className={styles.metadata_value}>{value}</span>
          </div>
        );
      }
      return null;
    });
  };
  
  const renderItemsList = () => {
    return dataset.items.map((item, index) => (
      <li key={index} onDoubleClick={() => handleElementDoubleClick(item.name)}>
        <FontAwesomeIcon icon={faFile} className={styles.file_icon} />
        <div className={styles.file_info}>
          <span>{item.name}</span>
          <span>Upload date: {item.uploadDate}</span>
          <span>Size: {item.size}</span>
          <span>Patient key: {item.patientKey}</span>
        </div>
      </li>
    ));
  };

  const handleElementDoubleClick = (elementName) => {
    console.log(`Element "${elementName}" has been double-clicked.`);
    // Add your custom action here.
  };

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    // Process the accepted files here
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.content}>
      <div className={styles.content_in}>
        <h2>Dataset information</h2>
        <div className={styles.metadata}>{renderMetadataItems()}</div>
        <h2>Files</h2>
        <div className={styles.elements_container}>
        <ul className={styles.elements_list}>{renderItemsList()}</ul>
        </div>
        <h2>Adding Files</h2>
        <div className={styles.drag_drop_zone} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop files here, or click to select files</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneDataset;
