import React from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';
import CustomNavLink from './CustomNavLink';
import { getUserInfo } from '../../services/userService'



import { FaHome, FaDatabase, FaChalkboardTeacher, FaBrain, FaTasks, FaChartArea, FaFileExport } from 'react-icons/fa';

function Sidebar({ currentPage }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <div className={styles.user_profile}>
          <img src={require('../../assets/images/profile.jpg')} alt="User Profile" />
          <div className={styles.user_info}>
            <h4>Jules Descamps</h4>
            <p>Chirurgien orthopédiste</p>
          </div>
        </div>
      </div>
      <ul>
        <CustomNavLink
          path="/home"
          IconComponent={FaHome}
          linkName="Home"
        />   
        <CustomNavLink
          path="/datasets"
          IconComponent={FaDatabase}
          linkName="Datasets"
        /> 
        <CustomNavLink
          path="/tasks"
          IconComponent={FaTasks}
          linkName="Annotate"
        />  
        <CustomNavLink
          path="/train"
          IconComponent={FaChalkboardTeacher}
          linkName="Train Models"
        /> 
        <CustomNavLink
          path="/trained"
          IconComponent={FaBrain}
          linkName="Run Models"
        />    
        <CustomNavLink
          path="/visualization"
          IconComponent={FaChartArea}
          linkName="Visualization"
        />   
        <CustomNavLink
          path="/export"
          IconComponent={FaFileExport}
          linkName="Export"
        />
      </ul>


      <div className={styles.sidebar_footer}>
        Deep<span>Docs</span>
      </div>
    </div>
  );
}

export default Sidebar;
