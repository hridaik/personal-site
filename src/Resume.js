import './Resume.css';
import React from "react";
import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';


const aboutText = 'I will greatly exaggerate and lie about my skills in the following. I take a keen interest in lying, deception and boasting.';

const storyproc = 'Providing a link between our tech and business teams, making sure our product is matching customer expectation and our vision, from functionality to usability. On the tech side, a lot of NLP, working with GPT3, music generation with Magenta/TensorFlow, managing a nodeJS backend and implementing a no-code frontend and database in bubble.io. On the business side, worked on everything from prospecting, handling sales calls, content writing, as well as client calls after closing the sale. Storytelling as a science, not necessarily an art.';
const ey = 'Worked on an ad-hoc IoT project for detecting transport mode in phones (car, bike, walking etc.) for measuring human inefficiency in perishable product supply chains. Used python for training a machine learning model, achieving an accuracy of over 85% in the first iteration. Also included integrating the model into the core API/front end of the RoboTrack app.';
const bw = 'Worked on the sidelines from top to bottom of the sales funnel, from lead generation to closing sales. Managed email campaigns, social media accounts and worked on content SEO on the marketing side. Attended and observed from sales calls throughout the client lifecycle.';
const hal = 'Porting of software/algorithms from R to Python, writing up design for an IP patent, and testing for IoT devices. ';
const iit = 'Dual Degree - Biotechnology and Undecided, 2021-2026';



function Resume() {
    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity: 0 }}>
        <div className='Resume'>
            <div className='navigation'>

                <NavLink className="home" to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='logo'>
                        Hridai Khurana
                    </h1>
                </NavLink>

                <div className='navg'>
                    <NavLink className="navbar" to="/" style={{ textDecoration: 'none' }}><h1 className='nav-textR'>home</h1></NavLink>
                    <NavLink className="navbar" to="/projects" style={{ textDecoration: 'none' }}><h1 className='nav-textR'>projects</h1></NavLink>
                    <h1 className='nav-textR active'>resume</h1>
                    <NavLink className='navbar' to='/contact' style={{ textDecoration: 'none' }}><h1 className='nav-textR'>contact</h1></NavLink>
                </div>

            </div>
            <span className='gradborder'></span>


            <div className='content'>
                <h1>About</h1>
                    <p className='res-text grey'>{aboutText}</p>
                <h1>Work Experience</h1>
                    <h2 className='res-sub grad'>Product Manager</h2>
                    <h2 className='res-sub'>StoryProcess</h2>
                    <h3 className='res-date'>Dec 2018 to Mar 2019</h3>
                        <p className='res-text'>{storyproc}</p>
                    <h2 className='res-sub grad'>Machine Learning Engineer</h2>
                    <h2 className='res-sub'>Ernst & Young (EY)</h2>
                    <h3 className='res-date'>Dec 2018 to Mar 2019</h3>
                        <p className='res-text'>{ey}</p>
                    <h2 className='res-sub grad'>Sales and Marketing Intern</h2>
                    <h2 className='res-sub'>Broadcast2World</h2>
                    <h3 className='res-date'>Summer 2018, Spring 2019</h3>
                        <p className='res-text'>{bw}</p>
                    <h2 className='res-sub grad'>Engineering Intern</h2>
                    <h2 className='res-sub'>HAL Robotics</h2>
                    <h3 className='res-date'>Jan 2018 to Mar 2018</h3>
                        <p className='res-text'>{hal}</p>
                <h1>Education</h1>
                    <h2 className='res-sub grad'>IIT Madras</h2>
                        <p className='res-text'>{iit}</p>
                    <h2 className='res-sub grad'>DPS Vasant Kunj</h2>
                        <p className='res-text'>High School Diploma, 2019-2021</p>
                    <h2 className='res-sub grad'>TSRS, Aravali</h2>
                        <p className='res-text'>2007-2019</p>
                <h1>Skills</h1>
                    <p className='res-text'>I don't have any</p>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Resume;