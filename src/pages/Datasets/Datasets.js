import React, { useEffect, useState } from 'react';
import DatasetSidebar from '../../components/DatasetSidebar/DatasetSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import OneDataset from '../../components/OneDataset/OneDataset';
import AddDataset from '../../components/AddDataset/AddDataset';
import ElementDetails from '../../components/ElementDetails/ElementDetails';
import styles from './Datasets.module.css';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router-dom';
import { dummyContributors, dummyModels } from '../DummyData';

function DatasetsPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [datasets, setDatasets] = useState(['Dataset 1', 'Dataset 2', 'Dataset 3']);
  const [selectedDataset, setSelectedDataset] = useState(null);
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

  return (
    <div>
      <div className={styles.content}>
        <DatasetSidebar items={datasets} setSelectedItem={setSelectedDataset} />
        <div className={styles.content_in}>
          <div className="main-content">
            <Switch>
              <Route path="/datasets/dataset1" render={(props) =>  <OneDataset datasetName="Dummy Dataset" />}/>
              <Route path="/datasets/item10" render={(props) => <ElementDetails {...props} element={exampleElement} />}/>
              <Route
                path="/datasets"
                component={() => (
                  <AddDataset
                    contributorsList={dummyContributors}
                    models={dummyModels}
                  />
                )}
            />
            </Switch>
          </div>
        </div>
          
        </div>
    </div>
  );
}

export default DatasetsPage;
