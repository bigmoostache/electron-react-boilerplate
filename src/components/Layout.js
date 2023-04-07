// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar/Sidebar';
import { Route, Switch } from 'react-router-dom';
import Datasets from '../pages/Datasets/Datasets';
// ... import other pages

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Switch>
          <Route path="/datasets" component={Datasets} />
        </Switch>
      </div>
    </div>
  );
};

export default Layout;
