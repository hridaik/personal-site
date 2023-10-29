import './Projects.css';
import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { React, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import contentimg from './images/website.png';




function Projects() {
    const[isLoading,setisLoading] = useState(false)
    const[projName,setProjName] = useState('');
    const[date,setdate] = useState('');
    const[collab,setcollab] = useState('');
    const[repo,setrepo] = useState('');
    const[active,setactive] = useState('1');
    const[projDesc,setprojDesc] = useState('Select a project from the left');
    const [initialized, setInitialized] = useState(false);
    const [isSample, setIsSample] = useState(false);

    const getData = async (i) => {
        // START LOADING
        setisLoading(true);

        if (i===69) {
            setIsSample(true);
            setProjName('Work Samples');
            setcollab('');
            setdate('');
            setInitialized(false);
            setrepo('');

            setisLoading(false);
        }


        else {
            setIsSample(false);
            axios.get('http://34.236.81.235:5001/projects/'+ String(i)).then((res) => {
            console.log('Sent API req');
            console.log(res.data.project_data[0]);
            setProjName(res.data.project_data[0].name);
            setdate(res.data.project_data[0].date);
            setcollab(res.data.project_data[0].collab);
            setInitialized(true);
            setrepo(res.data.project_data[0].repo);
            setprojDesc(res.data.project_data[0].content);
            setisLoading(false);
            });
            
        }
        // STOP LOADING
        if (active!==i.toString()){
            document.getElementById(active).className = 'pane-text';
            document.getElementById(i.toString()).className = 'pane-text chosen';
            setactive(i.toString());
        }
    }



    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity: 0 }}>
        <div className='Projects'>
            <div className='navigation'>

                <NavLink className="home" to="/" style={{ textDecoration: 'none' }}>
                    <h1 className='logo'>
                        Hridai Khurana
                    </h1>
                </NavLink>

                <div className='navg'>
                    <NavLink className="navbar" to="/" style={{ textDecoration: 'none' }}><h1 className='nav-textR'>home</h1></NavLink>
                    <h1 className='nav-textR active'>projects</h1>
                    <NavLink className="navbar" to="/resume" style={{ textDecoration: 'none' }}><h1 className='nav-textR'>resume</h1></NavLink>
                    <NavLink className='navbar' to='/contact' style={{ textDecoration: 'none' }}><h1 className='nav-textR'>contact</h1></NavLink>
                </div>

            </div>
            <span className='gradborder'></span>

            {/* <div className='content'><h1>Work in progress...</h1></div> */}
            <div className='content'>

                <div className='navpane'>


                <div className='pane-div'><a href="#" onClick={() => getData(69)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='worksample' className='pane-text'>Work Samples</h1></a></div>

                    <div className='pane-div'><h1 className='pane-year'>2023</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(20231)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='20231' className='pane-text'>Protein Unfolding</h1></a></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(20232)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='20232' className='pane-text'>Story AI</h1></a></div>


                    <div className='pane-div'><h1 className='pane-year'>2020</h1></div>
                    <div className='pane-div'><a href="#" onClick={() => getData(2020)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='2020' className='pane-text'>This Website</h1></a></div>

                    <div className='pane-div'><h1 className='pane-year'>2019</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2019)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='2019' className='pane-text'>Evolutionary AI</h1></a></div>

                    <div className='pane-div'><h1 className='pane-year'>2018</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2018)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='2018' className='pane-text'>Heart Disease Risk</h1></a></div>

                    <div className='pane-div'><h1 className='pane-year'>2017</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2017)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='2017' className='pane-text'>TicTacToe Game</h1></a></div>


                    <div className='pane-div'><h1 className='pane-year'>2011</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2011)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='2011' className='pane-text'>ecommerce website</h1></a></div>
                    <div className='pane-div'><h1 className='pane-year'>extra</h1></div>
                </div>

                <div className='proj'>
                    <div className='info'>
                        <div className='namecon'>
                            <h1 className='projname'>{projName}</h1>
                            <h2>{date}</h2>
                        </div>
                        <div className='repocon'>
                            <a href={repo} target="_blank"><h2>{repo}</h2></a>
                            {initialized ? (<h2>Collaborators: {collab}</h2>) : (<h2></h2>)}
                        </div>
                    </div>
                    {isLoading ?
                    (
                    <div className='container' style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ReactLoading type={"bars"} color={"black"} /> 
                    </div>      
                        ) : (
                    <div className='container'>
                        <div className='projdesc'>      
                            {/* <div className='imgcon'>
                                <img src={contentimg}></img>
                            </div> */}
                            <div className='desccon'>
                                {isSample ?
                                 (
                                 <pre className='formatted'>
                                    Here are some samples of work I have done in internships. The samples given below are publicly available and not binding to any confidentiality agreements.
                                    <ul>
                                        <a href='https://vimeo.com/794789295/ff3d0493fe'><li>Video for Lenovo & OEM Partner meldCX</li></a>
                                        <a href='https://vimeo.com/842508780/17e8fe9722'><li>Video for Lenovo & OEM Partner iOmniscient</li></a>
                                        <a href=''><li>Video for LoRa Alliance</li></a>
                                    </ul>
                                 </pre>
                                 ) : 
                                 (<pre className='formatted'>{projDesc}</pre>)}
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Projects;