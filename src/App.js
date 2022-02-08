import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBriefcase, faEnvelope, faAdjust } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn, faStackExchange, faGithub } from '@fortawesome/free-brands-svg-icons';
import React from "react";
import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  return (
  <AnimatePresence exitBeforeEnter>
  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity: 0 }}>
    <div className="App">
      <div className='divider left'>
        <div className='hero'>
          <h1 className='hero-text'>Hridai Khurana</h1>
          <div className='nnn'><FontAwesomeIcon className="git" icon={faBook} color='white' size="lg"/><h1 className='cred'>IIT MADRAS</h1></div>
          <div class='nnn'><FontAwesomeIcon className="git" icon={faBriefcase} color='white' size="lg"/><h1 className='cred'>STORYPROCESS</h1></div>
        </div>
        <NavLink to='/resume' style={{ textDecoration: 'none' }} >
        <div className='resume nav'>
          <h1 className ='nav-text'>RESUMÉ</h1>
          <FontAwesomeIcon icon={faAdjust} color='white' className='fa-icon' />
        </div>
        </NavLink>
      </div>
      <div className='divider right'>
        <div className='half top'>
          <h1 className='nav-text'>REACH OUT TO ME</h1>
          <div className='nnn'>
            <a className="links" href="https://www.linkedin.com/in/hridaik/" target="_blank"><FontAwesomeIcon className="socials" icon={faLinkedinIn} color='white' size='2x'/></a>
            <a className="links" href="https://stackexchange.com/users/14140394/hridai-khurana?tab=accounts" target="_blank"><FontAwesomeIcon className="socials" icon={faStackExchange} color='white' size='2x'/></a>
            <NavLink to='/contact' style={{ textDecoration: 'none', marginRight: "2%" }}><FontAwesomeIcon className="socials" icon={faEnvelope} color='white' size='2x'/></NavLink>
            <a href="" target="_blank"><FontAwesomeIcon className="git" icon={faGithub} color='white' size='2x'/></a>
          </div>
        </div>
        <NavLink to='/projects' style={{ textDecoration: 'none' }}>
        <div className='half nav'>
          <h1 className='nav-text'>PROJECTS</h1>
          <FontAwesomeIcon icon={faAdjust} color='white' className='fa-icon' />
        </div>
        </NavLink>
      </div>
    </div>
  </motion.div>
  </AnimatePresence>
  );
}

export default App;
