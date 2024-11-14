import { NavLink} from 'react-router-dom';
import React from 'react';
import './main.css'; 

export function Main() {


  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; 
      const yPosition = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
      }
  }
  return (
    <main>
      <header>
        <div className="icon">
          <img src="/icons/macbook.png" width="200px" alt="MacBook" />
          <h2>Welcome to my creative space.</h2>
        </div>

        <div className="profile-container">
          <div className="item profileBox">
            <div>
              <img src="/imgs/jhw.jpeg" alt="Howon's profile picture" className="profile-image" />
            </div>
            <div className="profileInfo">
              <h3>Howon Jung</h3>
              <br />

              <p>
                As a machine learning enthusiast with web development experience,
                I’m passionate about building innovative solutions and exploring new trends in computer science.
                I am excited to apply my skills to machine learning projects.
              </p>

              <br />
              <br />
              <div>
                <a href="https://www.linkedin.com/in/howon-jung" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/LI.png" className="profileIcon" style={{ marginRight: '10px' }} alt="LinkedIn" />
                </a>
                <a href="https://github.com/jhwlds/startup_2024.git" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/GH.png" className="profileIcon" style={{ marginRight: '10px' }} alt="GitHub" />
                </a>
                <a href="https://www.facebook.com/jung.howon.988" target="_blank" rel="noopener noreferrer">
                  <img src="/icons/FB.png" className="profileIcon" style={{ marginRight: '10px' }} alt="Facebook" />
                </a>
              </div>
            </div>
          </div>

          <NavLink className="item" to='/game'>
            Guess Me
          </NavLink>

          <a className="item" onClick={() => scrollToSection('education')}>
            Education
          </a>

          <a className="item" onClick={() => scrollToSection('work-experience')}>
            Skills
          </a>

          <a className="item" onClick={() => scrollToSection('project')}>
            Experiences
          </a>
        </div>
      </header>

      <div id="education" className="eduSec">
        <h2>Education</h2>
        <div className="eduGrid">
          <div className="edu-item">
            <img src="/imgs/byu-logo.png" alt="BYU logo" />
          </div>
          <div className="edu-item">
            <img src="/imgs/ML-logo.png" alt="Machine Learning logo" />
          </div>
          <div className="edu-item">

            <div className='eduInfo'>
              <p>Brigham Young University</p>
              <br />
              <p>Computer Science - Emphasis in Machine Learning</p>
            </div>

          </div>
          <div className="edu-item">
            <img src="/imgs/ML-logo.png" alt="Machine Learning logo" />
          </div>
          <div className="edu-item">
            <img src="/imgs/byuCs-logo.png" alt="BYU-CS logo" />
          </div>
        </div>
      </div>

      <div id="work-experience" className="skillSec">
        <h2>Skills</h2>
        <div className="skillGrid">
          <div className="skill-icon">
            <div className="skillName">
              <img src="/icons/html.png" alt="HTML" width="100px" />
              <p>HTML</p>
            </div>
          </div>

          <div className="skill-icon">
            <div className="skillName">
              <img src="/icons/css.png" alt="CSS" width="100px" />
              <p>CSS</p>
            </div>
          </div>

          <div className="skill-icon">
            <div className="skillName">
              <img src="/icons/js.png" alt="JavaScript" width="100px" />
              <p style={{ marginTop: '15px' }}>JavaScript</p>
            </div>
          </div>

          <div className="skill-icon">
            <div className="skillName">
              <img src="/icons/react.png" alt="React" width="100px" />
              <p style={{ marginTop: '30px' }}>React</p>
            </div>
          </div>

          <div className="skill-icon">
            <div className="skillName">
              <img src="/icons/python.png" alt="Python" width="100px" />
              <p style={{ marginTop: '13px' }}>Python</p>
            </div>
          </div>
        </div>
      </div>

      <div id="project" className="expSec">
        <h2>Experiences</h2>
        <div className="expGrid">
          <div className="exp-icon">
            <div className='exp-info'>
              <p>Website Development</p>
              <br />
              <a href='https://github.com/Find-MPF/Frontend.git' target="_blank" rel="noopener noreferrer">
                FindMyProfessor.com
              </a>
              <br />
              <br />
              <a href='https://github.com/jhwlds/startup_2024.git' target="_blank" rel="noopener noreferrer">
                Jhwlds.com
              </a>
              <br />
              <br />
              <a href='https://jhwlds.wixsite.com/snapmoa' target="_blank" rel="noopener noreferrer">
                Snapmoa.com
              </a>
            </div>
          </div>
          <div className="exp-icon"></div>
          <div className="exp-icon">
            <p>Coming Soon...</p>
          </div>
          <div className="exp-icon">
            <p>Coming Soon...</p>
          </div>
        </div>
      </div>
    </main>
  );
}