import './Projects.css';
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const PROJECTS = [
    {
        id: 'p-20265',
        year: 2026,
        name: 'Emergent Control',
        date: 'Nov 2026',
        collab: '',
        repo: 'https://github.com/hridaik/fuzzy-blankets',
        desc: `Identifying and controlling emergent collectives. Treating individuality as graded and observer-dependent, I'm developing mathematical methods to detect emergent collectives, find where they can be influenced, and retask them without destroying them. The boundary that makes a collective a "thing" isn't necessarily the lever that moves it, and because identity comes in layers (a collective can keep its memory while every part is replaced), steering can mean retasking, splitting or dissolving it, not just preserving it.\n\nDemos on a simulated flock and a model of morphogenesis (fun to look at/play with):\n- [Flock: boundaries, control and movement](/demos/flock/)\n- [Morphogenesis: cell clusters that remember](/demos/morphogenesis/)\n*Work in progress.*`,
    },
    {
        id: 'p-20264',
        year: 2026,
        name: 'Oscillatory Basal Ganglia Model',
        date: '2026',
        collab: 'Chandrasekaran, Chakravarthy (IIT Madras)',
        repo: 'https://doi.org/10.1016/j.neunet.2026.109873',
        desc: "An oscillatory deep neural network architecture (Hopf-oscillator units in place of standard activations) applied in a basal ganglia reinforcement learning model of interval timing, reproducing behavior in healthy, Parkinson's and schizophrenia conditions. *Published in Neural Networks, 2026.* Related earlier explorations: Phase Amplitude Coupling and Auditory Cortex.",
    },
    {
        id: 'p-20262',
        year: 2026,
        name: 'Coupling & Current',
        date: 'June 2026',
        collab: '',
        repo: '/current',
        desc: "Investigating structure-function mismatch in biological systems with a stochastic perspective. Work in progress - refer to blog post [here](current). Preliminary draft of a paper in preparation.",
    },
    {
        id: 'p-20261',
        year: 2026,
        name: 'Bayesian Agent Networks',
        date: 'Feb 2026',
        collab: 'R Bufacchi, V Mussetto, C Gross',
        repo: '/blog',
        desc: "Hierarchical active inference model of naturalistic defensive mouse behavior, in social defeat. The modular network architecture of active inference (bayesian inference + action) agents enables natural extension to other behavioral domains including foraging and multi-agent interactions, representing a foundational step toward interpretable models of general mouse behavior.\n\n [Here](blog) is the paper in blog format. *Published in Front. Neural Circuits, 2026* Part of my thesis.",
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


const years = [...new Set(PROJECTS.map(p => p.year))].sort((a, b) => b - a);

function Projects() {
    const [activeId, setActiveId] = useState('overview');

    const isOverview = activeId === 'overview';
    const project = isOverview ? null : PROJECTS.find(p => p.id === activeId);

    const projName = isOverview ? 'Start here' : project?.name ?? '';
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
                            className={`pane-btn${activeId === 'overview' ? ' chosen' : ''}`}
                            onClick={() => setActiveId('overview')}
                            aria-current={activeId === 'overview' ? 'true' : undefined}
                        >
                            Start here
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
                            {!isOverview && <h2>Collaborators: {collab}</h2>}
                        </div>
                    </div>
                    <div className='container'>
                        <div className='projdesc'>
                            <div className='desccon'>
                                {isOverview ? (
                                    <div className='formatted' style={{ whiteSpace: 'normal' }}>
                                        <p>Welcome. The list on the left holds some things I have built, newest first, from current research to a website I made when I was eight. Most of it is science and machine learning, the older items show where it started. Each has a short description and a link to the code or write-up where one exists.</p>
                                        <p>If you only have a few minutes, start here:</p>
                                        <ul>
                                            <li><b>Research, published:</b> <a href='/blog' target='_blank' rel="noopener noreferrer">Fleeing is Believing</a>, an interpretable model of mouse defensive behavior (<i>Front. Neural Circuits</i>, 2026), written up as a blog post.</li>
                                            <li><b>Research, published:</b> <a href='https://doi.org/10.1016/j.neunet.2026.109873' target='_blank' rel="noopener noreferrer">Oscillatory Basal Ganglia Model of Timing Behaviors in Parkinson's Disease and Schizophrenia</a> (<i>Neural Networks</i>, 2026).</li>
                                            <li><b>First game:</b> <button className='inline-link' onClick={() => setActiveId('p-2017')}>TicTacToe</button>, one of my first coding projects, playable against the computer.</li>
                                            <li><b>First project:</b> <button className='inline-link' onClick={() => setActiveId('p-2011')}>The ecommerce website</button> I built at age 8 to sell things I no longer wanted.</li>
                                            <li><b>Right now (work in progress):</b> <button className='inline-link' onClick={() => setActiveId('p-20265')}>Emergent Control</button>, detecting and steering emergent multi-agent collectives, with some cool demos you can check out; <a href='/current' target='_blank' rel="noopener noreferrer">Coupling &amp; Current</a>, non-equilibrium stochastic dynamics to separate stable coupling from state-supported coordination</li>
                                        </ul>
                                    </div>
                                ) : (
                                    <ReactMarkdown className='formatted'>{projDesc}</ReactMarkdown>
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
