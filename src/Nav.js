import './Nav.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav({ current }) {
    return (
        <div className='nav-wrapper'>
            <nav className='navigation'>
                <NavLink className="home" to="/" aria-label="Home">
                    <h1 className='logo'>Hridai Khurana</h1>
                </NavLink>

                <div className='navg'>
                    <NavLink className="navbar" to="/" style={{ textDecoration: 'none' }}>
                        <h1 className={`nav-textR${current === 'home' ? ' active' : ''}`}>home</h1>
                    </NavLink>
                    <NavLink className="navbar" to="/projects" style={{ textDecoration: 'none' }}>
                        <h1 className={`nav-textR${current === 'projects' ? ' active' : ''}`}>projects</h1>
                    </NavLink>
                    <NavLink className="navbar" to="/resume" style={{ textDecoration: 'none' }}>
                        <h1 className={`nav-textR${current === 'resume' ? ' active' : ''}`}>resume</h1>
                    </NavLink>
                    <NavLink className="navbar" to="/contact" style={{ textDecoration: 'none' }}>
                        <h1 className={`nav-textR${current === 'contact' ? ' active' : ''}`}>contact</h1>
                    </NavLink>
                </div>
            </nav>
            <span className='gradborder'></span>
        </div>
    );
}

export default Nav;
