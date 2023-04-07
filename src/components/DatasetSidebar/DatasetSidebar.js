import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './DatasetSidebar.module.css';

const DatasetSidebar = ({ items, setSelectedItem }) => {
  const [selectedDataset, setSelectedDataset] = useState(null);

  const handleItemClick = (dataset) => {
    setSelectedDataset(dataset);
    setSelectedItem(dataset);
  };

  const createLink = (path, icon, text, additionalClassName = '', isSelected = false) => (
    <li className={`${additionalClassName} ${isSelected ? styles.selected : ''}`} onClick={() => handleItemClick(text)}>
      <Link to={path}>
        <div className={styles.icon}>
          <FontAwesomeIcon icon={icon} />
        </div>
        {text}
      </Link>
    </li>
  );

  return (
    <div className={styles.sidebar_datasets}>
      <h2>Datasets</h2>
      <ul>
        {items.map((item, index) => (createLink(`/datasets/${item}`, faFolderOpen, item,selectedDataset === item ? styles.selected : '')))}
        {createLink('/datasets/add-dataset', faPlus, 'Add Dataset', styles.add_dataset, selectedDataset === 'Add Dataset')}
      </ul>
    </div>
  );
};

export default DatasetSidebar;
