import React, { useState } from 'react';
import styles from './AddDataset.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddDataset = (props) => {
  const models = props.models || []; // Provide a default empty array for models prop
  const contributorsList = props.contributorsList || [];
  const [datasetName, setDatasetName] = useState('');
  const [contributors, setContributors] = useState('');
  const [topic, setTopic] = useState('');
  const [source, setSource] = useState('');
  const [appliedModels, setAppliedModels] = useState([]);
  const [isSensitive, setIsSensitive] = useState(false);

  const handleNameChange = (event) => {
    setDatasetName(event.target.value);
  };

  const handleContributorsChange = (event) => {
    const contributor = event.target.value;
    if (contributors.includes(contributor)) {
      setContributors(contributors.filter((c) => c !== contributor));
    } else {
      setContributors([...contributors, contributor]);
    }
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleModelToggle = (event) => {
    const model = event.target.value;
    if (appliedModels.includes(model)) {
      setAppliedModels(appliedModels.filter((m) => m !== model));
    } else {
      setAppliedModels([...appliedModels, model]);
    }
  };
  const [showContributors, setShowContributors] = useState(false);

  const handleSensitiveToggle = (event) => {
    setIsSensitive(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your logic to handle the dataset addition here
    console.log(`Dataset name: ${datasetName}`);
  };
  const toggleContributorsList = () => {
    setShowContributors(!showContributors);
  };
  return (
    <div className={styles.container}>
      <h2>Add Dataset</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="datasetName">Dataset Name:</label>
        <input
          type="text"
          id="datasetName"
          name="datasetName"
          value={datasetName}
          onChange={handleNameChange}
          required
        />

        <div className={styles.contributorsContainer}>
          <label htmlFor="contributors">Add Contributors:</label>
          <button
            type="button"
            className={styles.toggleContributorsButton}
            onClick={toggleContributorsList}
          >
            <FontAwesomeIcon icon={showContributors ? faMinus : faPlus} />
          </button>
        </div>
        {showContributors && (
    <div className={showContributors ? `${styles.contributorsList} ${styles.showContributors}` : styles.contributorsList}>
    <div className={styles.scrollableList}>
      {contributorsList.map((contributor, index) => (
        <div key={index} className={styles.contributorItem}>
          <input
            type="checkbox"
            id={`contributor-${index}`}
            name={`contributor-${index}`}
            value={contributor}
            checked={contributors.includes(contributor)}
            onChange={handleContributorsChange}
          />
          <label htmlFor={`contributor-${index}`}>{contributor}</label>
        </div>
      ))}
    </div>
  </div>
)}
        <label htmlFor="topic">Dataset Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={topic}
          onChange={handleTopicChange}
        />

        <label htmlFor="source">Dataset Source:</label>
        <input
          type="text"
          id="source"
          name="source"
          value={source}
          onChange={handleSourceChange}
        />

        <fieldset>
          <legend>Choose models to apply:</legend>
          {models.map((model, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`model-${index}`}
                name={`model-${index}`}
                value={model}
                onChange={handleModelToggle}
              />
              <label htmlFor={`model-${index}`}>{model}</label>
            </div>
          ))}
        </fieldset>

        <div>
          <input
            type="checkbox"
            id="isSensitive"
            name="isSensitive"
            onChange={handleSensitiveToggle}
          />
          <label htmlFor="isSensitive">Is this dataset sensitive?</label>
        </div>

        <button type="submit">Add Dataset</button>
      </form>
    </div>
  );
};


export default AddDataset;
