import './Projects.css';
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

const PROJECTS = [
    {
        id: 'p-20261',
        year: 2026,
        name: 'Bayesian Agent Networks',
        date: 'Feb 2026',
        collab: 'R Buffachi, V Mussetto, C Gross',
        repo: 'https://doi.org/10.64898/2026.02.17.706393',
        desc: "Hierarchical active inference model of naturalistic defensive mouse behavior, in social defeat. The modular network architecture of active inference (bayesian inference + action) agents enables natural extension to other behavioral domains including foraging and multi-agent interactions, representing a foundational step toward interpretable models of general mouse behavior. Under review, pre-print on bioRxiv. Part of my thesis.",
    },
    {
        id: 'p-20251',
        year: 2025,
        name: 'Cold Mail AI Agent',
        date: 'Feb 2025',
        collab: 'None',
        repo: 'https://github.com/hridaik/tailor-agent',
        desc: "AI agent to create personalized messages. This agent is currently optimized for reaching out to researchers. Given a list of researchers/PIs, and your interests, the agent will pick the most relevant papers from the researcher's lab and write a personalized message/email using an example template, mentioning your interest in the researcher's work. Returns a CSV with the most relevant papers and personalized message.",
    },
    {
        id: 'p-20252',
        year: 2025,
        name: 'AI Evolution Sim',
        date: 'Apr 2025',
        collab: 'None',
        repo: 'https://github.com/hridaik/neat-agents',
        desc: 'Simulating evolution using an open 2D world for simple MLPs to explore and evolve in behaviour without any hard coding, using NeuroEvolution of Augmenting Topologies (NEAT). More info is on the GitHub README. Ongoing.',
    },
    {
        id: 'p-20244',
        year: 2024,
        name: 'Auditory Cortex',
        date: 'Dec 2024',
        collab: 'None',
        repo: 'https://github.com/hridaik/auditory-cortex',
        desc: 'Modelling the auditory cortex using a Convolutional Neural Network using Hopf oscillators in neurons in place of standard activation functions. The oscillators model the behaviour of local neuron field potentials (LFPs), hence each neuron acts like a group of neurons in the brain.',
    },
    {
        id: 'p-20243',
        year: 2024,
        name: 'Phase Amplitude Coupling',
        date: 'Oct 2024',
        collab: 'None',
        repo: 'https://github.com/hridaik/Oscillatory-NN-PAC',
        desc: 'Exploring phase-amplitude cross frequency coupling in an artificial deep oscillatory neural network, when given different tasks.',
    },
    {
        id: 'p-20242',
        year: 2024,
        name: 'Leak Detection',
        date: 'Sep 2024',
        collab: 'None',
        repo: 'https://github.com/hridaik/wadi-fault-detection',
        desc: 'This project addresses the problem of fault and leak detection in modern water distribution systems using machine learning. Traditional manual monitoring techniques are slow, error-prone, and inadequate for identifying subtle system failures in real time. Using sensor and actuator data from the WADI dataset (iTrust, Singapore University of Technology and Design), I built supervised machine learning models to automatically classify system states as either normal or defective. I trained and compared two classifiers, Random Forest and XGBoost, on precision, recall, F1-score, and ROC-AUC. Both models achieved near-perfect recall and precision, with Random Forest slightly outperforming XGBoost on false positives. The models were also analyzed for feature importance and sensor correlation to gain insights into fault indicators.',
    },
    {
        id: 'p-20241',
        year: 2024,
        name: 'Modelling Biofilms',
        date: 'Apr 2024',
        collab: 'None',
        repo: 'https://github.com/hridaik/cooperativity',
        desc: 'Using a public goods game model to study cooperativity between microorganisms in biofilms with varying factors like age and social contribution',
    },
    {
        id: 'p-20231',
        year: 2023,
        name: 'Protein Unfolding',
        date: 'Jan 2023',
        collab: 'Prof Athi Narayan, IIT Madras',
        repo: 'https://github.com/hridaik/PolymerUnfolding',
        desc: 'Monte Carlo Metropolis Criterion simulation for polymer/protein unfolding, with different interaction energy values. Done here with a 16-mer.',
    },
    {
        id: 'p-20232',
        year: 2023,
        name: 'Story AI',
        date: 'Apr 2023',
        collab: 'None',
        repo: 'https://github.com/hridaik/story-generator',
        desc: 'Playing around with LLMs to generate a story along with representative pictures when given some keywords',
    },
    {
        id: 'p-2020',
        year: 2020,
        name: 'This Website',
        date: 'Jul 2020',
        collab: 'None',
        repo: 'https://github.com/hridaik/personal-site',
        desc: 'A website made mostly as a repository for my projects.',
    },
    {
        id: 'p-2019',
        year: 2019,
        name: 'Evolutionary AI',
        date: 'Mar 2019',
        collab: 'None',
        repo: 'https://github.com/hridaik/FlappyBirdNEAT',
        desc: 'NEAT (NeuroEvolution of Augmenting Topologies) is an evolutionary algorithm that creates artificial neural networks. In this project, I have implemented NEAT to teach the computer to play flappy bird. We can see the progression of the AI as it gets better at playing the game over a few generations.',
    },
    {
        id: 'p-2018',
        year: 2018,
        name: 'Heart Disease Risk',
        date: 'May 2018',
        collab: 'None',
        repo: 'https://github.com/hridaik/HeartDiseaseRisk',
        desc: 'Using a KNN classifier to detect risk of heart disease, using a dataset that can be found on Kaggle.',
    },
    {
        id: 'p-2017',
        year: 2017,
        name: 'TicTacToe Game',
        date: 'Mar 2017',
        collab: 'None',
        repo: 'https://github.com/hridaik/TicTacToe',
        desc: 'A small tic tac toe game I made as one of my first coding projects. Can be played with two players or vs the computer.',
    },
    {
        id: 'p-2011',
        year: 2011,
        name: 'ecommerce website',
        date: 'Nov 2011',
        collab: 'None',
        repo: 'https://flickrdelivery.wordpress.com/',
        desc: "My first real technical project, I made this website when I was 8 to sell things I didn't want anymore. You can order things by publicly sharing your address, name and phone number in the comments section. I also claim to provide free home delivery, when most products are valued at ~$2. Used MS Paint for the design and WordPress for web hosting.",
    },
];

// Group projects by year for rendering the sidebar
const years = [...new Set(PROJECTS.map(p => p.year))].sort((a, b) => b - a);

function Projects() {
    const [activeId, setActiveId] = useState('worksample');

    const isSample = activeId === 'worksample';
    const project = isSample ? null : PROJECTS.find(p => p.id === activeId);

    const projName = isSample ? 'Work Samples' : project?.name ?? '';
    const date = project?.date ?? '';
    const collab = project?.collab ?? '';
    const repo = project?.repo ?? '';
    const projDesc = project?.desc ?? '';

    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='Projects'>
            <Nav current="projects" />

            <div className='content'>
                <div className='navpane' role="list" aria-label="Project list">
                    <div className='pane-div' role="listitem">
                        <button
                            className={`pane-btn${activeId === 'worksample' ? ' chosen' : ''}`}
                            onClick={() => setActiveId('worksample')}
                            aria-current={activeId === 'worksample' ? 'true' : undefined}
                        >
                            Work Samples
                        </button>
                    </div>

                    {years.map(year => (
                        <React.Fragment key={year}>
                            <div className='pane-div' role="listitem">
                                <span className='pane-year'>{year}</span>
                            </div>
                            {PROJECTS.filter(p => p.year === year).map(p => (
                                <div className='pane-div' key={p.id} role="listitem">
                                    <button
                                        className={`pane-btn${activeId === p.id ? ' chosen' : ''}`}
                                        onClick={() => setActiveId(p.id)}
                                        aria-current={activeId === p.id ? 'true' : undefined}
                                    >
                                        {p.name}
                                    </button>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>

                <div className='proj'>
                    <div className='info'>
                        <div className='namecon'>
                            <h1 className='projname'>{projName}</h1>
                            <h2>{date}</h2>
                        </div>
                        <div className='repocon'>
                            {repo && (
                                <a href={repo} target="_blank" rel="noopener noreferrer"><h2>{repo}</h2></a>
                            )}
                            {!isSample && <h2>Collaborators: {collab}</h2>}
                        </div>
                    </div>
                    <div className='container'>
                        <div className='projdesc'>
                            <div className='desccon'>
                                {isSample ? (
                                    <pre className='formatted'>
                                        Here are some samples of work I have done in internships. The samples given below are publicly available and not binding to any confidentiality agreements. Broken links may indicate the owner has removed the content.
                                        <ul>
                                            <li><a href='https://intel.ly/40jxwVR' target='_blank' rel="noopener noreferrer">Content for Intel Startup Program's Coffee Table Book</a></li>
                                            <li><a href='https://vimeo.com/794789295/ff3d0493fe' target='_blank' rel="noopener noreferrer">Video Script for Lenovo &amp; OEM Partner meldCX</a></li>
                                            <li><a href='https://vimeo.com/842508780/17e8fe9722' target='_blank' rel="noopener noreferrer">Video Script for Lenovo &amp; OEM Partner iOmniscient</a></li>
                                        </ul>
                                    </pre>
                                ) : (
                                    <pre className='formatted'>{projDesc}</pre>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    );
}

export default Projects;
