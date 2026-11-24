import './Resume.css';
import React from "react";
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';


const aboutText = 'Computational biologist building interpretable models that make biological systems more predictable and, eventually, controllable, from cognition and behavior to cell programming. I want engineered cells to become a reliable, affordable way to restore health, produce food and create useful materials - and therapies that work in the lab to reach the patients who need them.';
const stealth = 'AI to make more accessible cell therapies with faster & cheaper manufacturing.';
const embl = 'Interpretable generative models of adaptive behavior, continual/online learning, and cognition in general; and analysis of non-equilibrium network dynamics. First-author paper in Frontiers in Neural Circuits. Developing a framework to separate stable coupling from state-supported coordination in biological time series.';
const iitmResearch = "Developed an oscillatory deep neural network architecture, with Hopf-oscillator units in place of standard activations, and applied it in a basal ganglia reinforcement learning model of interval timing. It reproduces experimental behavior in healthy, Parkinson's and schizophrenia conditions. Second author, Neural Networks (2026).";
const bcg = "Chairman's office at a Fortune Global 200 energy major. Critical materials strategy, including an inventory management model for $500M+ of critical materials, unlocking $100M+ in potential savings. Received a full-time offer.";
const cellforma = 'Sole employee/intern at a regenerative lung cell therapy startup. Applied geometric deep learning and generative chemistry to optimize differentiation protocols.';
const schrocken = "Worked with the Head of Product to help design the functionality and UI of Schrocken's MVP for Cell and Gene Therapy applications. Solely revamped their messaging and content on their website, using storytelling techniques for an engaging, easy-to-understand user experience tailored to the target demographic for each webpage.";
const storyproc = 'Providing a link between our tech and business teams, making sure our product is matching customer expectation and our vision, from functionality to usability. On the tech side, a lot of NLP, working with GPT3, music generation with Magenta/TensorFlow, managing a nodeJS backend and implementing a no-code frontend and database in bubble.io. On the business side, worked on everything from prospecting, handling sales calls, content writing, as well as client calls after closing the sale. Storytelling as a science, not necessarily an art.';
const ey = 'On an ad-hoc project, built a model that infers transport mode (car, bike, walking) from phone GPS data, achieving over 85% accuracy, and integrated it into the app. Used to measure human inefficiency in perishable product supply chains.';
const various = 'Engineering at HAL Robotics, sales and marketing at Broadcast2World, and business consulting at EY.';
const iit = 'BS + MTech (Dual Degree), Biological Sciences and Computational Engineering, 2021-2026. Completed the five-year integrated program; CGPA 8.71.';

const PUBLICATIONS = [
    { title: 'Adaptive behavior as an inference process', authors: 'Khurana et al.', venue: 'Front. Neural Circuits', year: 2026, href: 'https://doi.org/10.3389/fncir.2026.1812938' },
    { title: "Oscillatory Basal Ganglia network model of timing behaviors in Parkinson's Disease and Schizophrenia", authors: 'Chandrasekaran, Khurana & Chakravarthy', venue: 'Neural Networks', year: 2026, href: 'https://doi.org/10.1016/j.neunet.2026.109873' },
    { title: 'Separating stable coupling from state-supported coordination in driven biological systems', authors: 'Khurana', venue: 'In preparation (preliminary draft)', year: 2026, href: '/current' },
];

const AWARDS = [
    'Winner, Boston Consulting Group Bruce Henderson Insight Competition, selected from 10,000+ candidates across top Indian universities. Winning pitch for a CDMO (contract manufacturer) of biologics in microgravity',
    'Peer reviewer, PLOS Computational Biology (2026)',
    'State- and national-level basketball player in India',
];

const PRESENTATIONS = [
    '7th International Conference on the Mathematics of AI & Neuroscience, Thinking about Thinking, 2026 - "Towards interpretable models of behavior" (Poster)',
    'Gordon Research Conference on Neurobiology of Cognition, 2026 - "Fleeing is believing: Adaptive behavior as an inference process" (Poster)',
];

const SKILLS = [
    'Deep learning: PyTorch, PyG, geometric deep learning, oscillatory neural networks',
    'Probabilistic modelling: Bayesian inference, active inference, POMDPs, reinforcement learning',
    'Dynamical systems: stochastic processes, non-equilibrium dynamics, oscillator models',
    'Biological data: single-cell RNA-seq, calcium imaging, behavioral trajectories, transcriptomic perturbation data',
    'Scientific computing: Python, C, R, Bayesian optimization, statistical testing',
    'Engineering: Google Cloud, AWS, Git, distributed training',
];

function Entry({ role, org, date, children }) {
    return (
        <>
            <h2 className='res-sub grad'>{role}</h2>
            <h2 className='res-sub'>{org}</h2>
            <h3 className='res-date'>{date}</h3>
            {children}
        </>
    );
}

function Resume() {
    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='Resume'>
            <Nav current="resume" />

            <div className='content'>
                <h1>About</h1>
                    <p className='res-text grey'>{aboutText}</p>
                    <p className='res-text'><a href='https://orcid.org/0009-0001-6084-063X' rel="noopener noreferrer" target="_blank">ORCID</a> &middot; <a href='https://scholar.google.com/citations?user=sQvNT7sAAAAJ&hl=en' rel="noopener noreferrer" target="_blank">Google Scholar</a></p>

                <h1>Experience</h1>
                <Entry role='Founder' org='Stealth Startup' date='2026 - Present'>
                    <p className='res-text'>{stealth}</p>
                </Entry>

                <Entry role="Master's Thesis Researcher" org='European Molecular Biology Laboratory (EMBL), Rome' date='Sep 2025 - Present'>
                    <p className='res-text'>{embl}</p>
                    <a href='/blog' rel="noopener noreferrer" target="_blank"><p className='res-text'>Recent work on mouse behavior models</p></a>
                    <a href='/current' rel="noopener noreferrer" target="_blank"><p className='res-text'>Work in progress on coupling and current</p></a>
                </Entry>

                <Entry role='Research Intern' org='IIT Madras (Computational Neuroscience Lab)' date='Aug 2025 - Apr 2026'>
                    <p className='res-text'>{iitmResearch}</p>
                </Entry>

                <Entry role='Summer Associate' org='Boston Consulting Group (BCG)' date='May 2025 - Jul 2025'>
                    <p className='res-text'>{bcg}</p>
                </Entry>

                <Entry role='Research Intern' org='Cellforma' date='May 2024 - May 2025'>
                    <p className='res-text'>{cellforma}</p>
                </Entry>

                <Entry role='Product Intern' org='Collabrix (fka Schrocken)' date='Jun 2023 to Sept 2023'>
                    <p className='res-text'>{schrocken}</p>
                </Entry>

                <span id='videoslink'></span>
                <Entry role='Associate' org='StoryProcess' date='Oct 2021 to May 2023'>
                    <p className='res-text'>{storyproc}</p>
                                        <a href='https://intel.ly/40jxwVR' rel="noopener noreferrer" target="_blank"><p className='res-text'>Content for Intel Startup Program's Coffee Table Book</p></a>
                    <a href='https://vimeo.com/794789295/ff3d0493fe' rel="noopener noreferrer" target="_blank"><p className='res-text'>Video Script for Lenovo &amp; OEM Partner meldCX</p></a>
                    <a href='https://vimeo.com/842508780/17e8fe9722' rel="noopener noreferrer" target="_blank"><p className='res-text'>Video Script for Lenovo &amp; OEM Partner iOmniscient</p></a>
                </Entry>

                <Entry role='Machine Learning Engineer' org='Ernst &amp; Young (EY)' date='Dec 2018 to Mar 2019'>
                    <p className='res-text'>{ey}</p>
                </Entry>

                <Entry role='Various startups and industry' org='HAL Robotics, Broadcast2World, EY' date='2018 - 2024'>
                    <p className='res-text'>{various}</p>
                </Entry>

                <h1>Publications</h1>
                {PUBLICATIONS.map(p => (
                    <p className='res-text' key={p.title}>
                        <a href={p.href} rel="noopener noreferrer" target={p.href.startsWith('http') ? '_blank' : undefined}><i>{p.title}</i></a> - {p.authors} ({p.year}). {p.venue}.
                    </p>
                ))}

                <h1>Education</h1>
                    <h2 className='res-sub grad'>IIT Madras</h2>
                        <p className='res-text'>{iit}</p>
                    <h2 className='res-sub grad'>DPS Vasant Kunj</h2>
                        <p className='res-text'>High School Diploma, 2019-2021</p>
                    <h2 className='res-sub grad'>TSRS, Aravali</h2>
                        <p className='res-text'>2007-2019</p>

                <h1>Awards &amp; Activities</h1>
                {AWARDS.map(t => <p className='res-text' key={t}>{t}</p>)}

                <h1>Presentations</h1>
                {PRESENTATIONS.map(t => <p className='res-text' key={t}>{t}</p>)}

                <h1>Methods &amp; Tools</h1>
                {SKILLS.map(t => <p className='res-text' key={t}>{t}</p>)}

            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Resume;
