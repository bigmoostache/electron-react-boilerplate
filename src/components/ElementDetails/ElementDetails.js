import React, { useState,  useEffect } from 'react';
import styles from './ElementDetails.module.css';
import { useHistory } from 'react-router'; // Update this import statement
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Add this import
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // Add this import

const ElementDetails = ({}) => {

  // Page creation
  const [element, setElement] = useState({ tableData: [] });
  useEffect(() => {
    const fetchElement = async () => {
      // Replace this with the actual API call or data fetching logic
      const fetchedElement = await fetchElementData();
      setElement(fetchedElement);
    };
  
    fetchElement();
  }, []);
  const exampleElement = {
    name: 'Example Element',
    uploader: 'John Doe',
    dateUploaded: '2023-04-15',
    text: 'This is an example of sensitive information.',
    tableData: [
      {
        information: 'Info 1',
        value: 'Value 1',
        validation: 'Valid',
      },
      {
        information: 'Info 2',
        value: 'Value 2',
        validation: 'Invalid',
      },
    ],
  };

  const fetchElementData = async () => {
    // Replace this with the actual API call or data fetching logic
    // For example:
    // const response = await fetch('https://your-api-url.com/element');
    // const data = await response.json();
    // return data;
  
    // For now, return the exampleElement directly
    return exampleElement;
  };


  // Page created
  const [password, setPassword] = useState('');
  const [passwordPrompt, setPasswordPrompt] = useState('Enter password to view the text.');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const history = useHistory();

  const handleCloseClick = () => {
    history.goBack();
  };

  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === 'abc') {
      setPasswordPrompt('You have successfully entered the correct password.');
      setIsPasswordCorrect(true);
    } else {
      setPasswordPrompt('Incorrect password. Please try again.');
      setIsPasswordCorrect(false);
    }
  };

  const withSensitiveInfo = (Component, sensitiveInfo) => {
    return isPasswordCorrect ? (
      <Component sensitiveInfo={sensitiveInfo} />
    ) : (
      <strong>HIDDEN</strong>
    );
  };

  const SensitiveName = ({ sensitiveInfo }) => <span>{sensitiveInfo}</span>;

  return (
    <div className={styles.container}>
    <div className={styles.closeButton} onClick={handleCloseClick}>
    <FontAwesomeIcon icon={faTimes} /> {/* Update this line */}
    </div>
      <div className={styles.elementInfo}>
        <h2>Information</h2>
        <div className={styles.elemementBlock}>
          <div className={styles.infoRow}>
            <h2 className={styles.infoLabel}>Name:</h2>
            <p className={styles.infoValue}>{element.name}</p>
          </div>
          <div className={styles.infoRow}>
            <h2 className={styles.infoLabel}>Patient name:</h2>
            <p className={styles.infoValue}>{withSensitiveInfo(SensitiveName, 'Guillaume Draznieks')}</p>
          </div>
          <div className={styles.infoRow}>
            <h2 className={styles.infoLabel}>Uploader:</h2>
            <p className={styles.infoValue}>{withSensitiveInfo(SensitiveName, element.uploader)}</p>
          </div>
          <div className={styles.infoRow}>
            <h2 className={styles.infoLabel}>Date upload:</h2>
            <p className={styles.infoValue}>{withSensitiveInfo(SensitiveName, element.dateUploaded)}</p>
          </div>
        </div>
      </div>

      <div className={styles.passwordPrompt}>
        <h2>Text</h2>
        <div className={styles.elemementBlock}>
          <form
            className={
              isPasswordCorrect ? styles.passwordFormCorrect : styles.passwordForm
            }
            onSubmit={handlePasswordSubmit}
          >            
          <label htmlFor="password">Password to unlock patient information:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </form>
          <p>{passwordPrompt}</p>
          {withSensitiveInfo(SensitiveName, element.text)}

        </div>
      </div>

      <div className={styles.elementTable}>
        <h2>Data</h2>
        <div className={styles.elemementBlock}>
          <table>
            <thead>
              <tr>
                <th>Information</th>
                <th>Value</th>
                <th>Validation</th>
              </tr>
            </thead>
            <tbody>
              {element.tableData.map((data, index) => (
                <tr key={index}>
                  <td>{data.information}</td>
                  <td>{withSensitiveInfo(SensitiveName, data.value)}</td>
                  <td>{withSensitiveInfo(SensitiveName, data.validation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ElementDetails;
