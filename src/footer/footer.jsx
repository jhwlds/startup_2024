import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';

export function Footer(props) {
  return (
    <footer>
      <div className="footer">
        <br />
        <br />
        <NavLink style={{ textDecoration: 'none' }} to='/'>
          ✱&nbsp;&nbsp;HOWON JUNG
        </NavLink>
        <p>jhwlds@gmail.com</p>
      </div>
    </footer>
  );
}