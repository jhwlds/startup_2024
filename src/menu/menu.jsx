import { NavLink, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import React from 'react';
import './menu.css';

export function Menu() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate('/');
    setTimeout(() => {
      scroller.scrollTo(id, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -100,
      });
    }, 100);
  };

  return (
        <nav className="menu">
          <div className="menuDiv">
            <ul className="menuUl">
              <li>
                <NavLink style={{ textDecoration: 'none' }} to="/">✱ HOWON JUNG</NavLink>
              </li>
              <li>
                <button onClick={() => scrollToSection('education')}>Education</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('work-experience')}>Skills</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('project')}>Experiences</button>
              </li>
            </ul>
    
            <NavLink className="playBtn styleBtn" to='/game'>
              PLAY
            </NavLink>
          </div>
        </nav>
      );
    }

