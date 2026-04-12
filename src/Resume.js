import './Resume.css';
import React from "react";
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';


const aboutText = 'Biotech and computational engineering undergraduate at IIT Madras. Venturing into cutting-edge biology research with a AI technology background.';
const storyproc = 'Providing a link between our tech and business teams, making sure our product is matching customer expectation and our vision, from functionality to usability. On the tech side, a lot of NLP, working with GPT3, music generation with Magenta/TensorFlow, managing a nodeJS backend and implementing a no-code frontend and database in bubble.io. On the business side, worked on everything from prospecting, handling sales calls, content writing, as well as client calls after closing the sale. Storytelling as a science, not necessarily an art.';
const ey = 'Worked on an ad-hoc IoT project for detecting transport mode in phones (car, bike, walking etc.) for measuring human inefficiency in perishable product supply chains. Used python for training a machine learning model, achieving an accuracy of over 85% in the first iteration. Also included integrating the model into the core API/front end of the RoboTrack app.';
const bw = 'Worked on the sidelines from top to bottom of the sales funnel, from lead generation to closing sales. Managed email campaigns, social media accounts and worked on content SEO on the marketing side. Attended and observed from sales calls throughout the client lifecycle.';
const hal = 'Porting of software/algorithms from R to Python, writing up design for an IP patent, and testing for IoT devices. ';
const iit = 'Dual Degree - Biotechnology and Computational Engineering, 2021-2026';
const schrocken = 'Worked with the Head of Product to help design the functionality and UI of Schrocken\'s MVP for Cell and Gene Therapy applications. Solely revamped their messaging and content on their website, using storytelling techniques for an engaging, easy-to-understand user experience tailored to the target demographic for each webpage.';
const eyCon = 'Went on-site to the production facility of a major construction equipment manufacturer to help identify automation opportunities and implementation strategies in their QMS processes.'
const cellforma = 'Developing an AI Virtual Cell model for cellular reprogramming, initially for optimizing development of regenerative cell therapies.'
const bcg = "Chairman's office at a Fortune Global 200 energy major, designed inventory management model for $500M+ of critical materials."
const embl = 'Bayesian ML (active inference) modeling of biological systems.'


function Resume() {
    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='Resume'>
            <Nav current="resume" />

            <div className='content'>
                <h1>About</h1>
                    <p className='res-text grey'>{aboutText}</p>
                <h1>Work Experience</h1>
                <h2 className='res-sub grad'>Research Intern</h2>
                    <h2 className='res-sub'>European Molecular Biology Laboratory (EMBL)</h2>
                    <h3 className='res-date'>Sep 2025 - Present</h3>
                        <p className='res-text'>{embl}</p>
                        <a href='https://www.biorxiv.org/content/10.64898/2026.02.17.706393v1.full' rel="noopener noreferrer" target="_blank"><p className='res-text'>Recent work on mouse behavior models</p></a>

                <h2 className='res-sub grad'>Associate</h2>
                    <h2 className='res-sub'>Boston Consulting Group (BCG)</h2>
                    <h3 className='res-date'>May 2025</h3>
                        <p className='res-text'>{bcg}</p>

                <h2 className='res-sub grad'>Research Intern</h2>
                    <h2 className='res-sub'>Cellforma</h2>
                    <h3 className='res-date'>May 2024 - May 2025</h3>
                        <p className='res-text'>{cellforma}</p>

                <h2 className='res-sub grad'>Winter Intern, Business Consulting</h2>
                    <h2 className='res-sub'>EY</h2>
                    <h3 className='res-date'>Dec 2023 to Jan 2024</h3>
                        <p className='res-text'>{eyCon}</p>

                    <h2 className='res-sub grad'>Product Intern</h2>
                    <h2 className='res-sub'>Schrocken</h2>
                    <h3 className='res-date'>Jun 2023 to Sept 2023</h3>
                        <p className='res-text'>{schrocken}</p>

                    <span id='videoslink'></span>
                    <h2 className='res-sub grad'>Associate</h2>
                    <h2 className='res-sub'>StoryProcess</h2>
                    <h3 className='res-date'>Oct 2021 to May 2023</h3>
                        <p className='res-text'>{storyproc}</p>
                        <a href='https://vimeo.com/794789295/ff3d0493fe' rel="noopener noreferrer" target="_blank"><p className='res-text'>Example Video</p></a>
                    <h2 className='res-sub grad'>Machine Learning Engineer</h2>
                    <h2 className='res-sub'>Ernst &amp; Young (EY)</h2>
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
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Resume;
