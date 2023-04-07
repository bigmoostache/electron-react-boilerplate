import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

const CustomNavLink = ({ path, IconComponent, linkName }) => {
    const navLinkId = `${linkName}_li`;
    const [isActive, setIsActive] = useState(false);
  
    useEffect(() => {
      const liElement = document.getElementById(navLinkId);
  
      if (liElement) {
        if (isActive) {
          liElement.classList.add(styles.current_page_li);
        } else {
          liElement.classList.remove(styles.current_page_li);
        }
      }
    }, [navLinkId, isActive]);

    return (
        <li id={navLinkId}>
          <NavLink
            to={path}
            activeClassName={styles.current_page}
            isActive={(match, location) => {
              setIsActive(match !== null);
              return match;
            }}
          >
            <div className={styles.icon}>
              <IconComponent />
            </div>
            {linkName}
          </NavLink>
        </li>
      );
    };

export default CustomNavLink;
