import './Projects.css';
import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { React, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';





function Projects() {
    const[isLoading,setisLoading] = useState(false)
    const[projName,setProjName] = useState('Newest Project');
    const[date,setdate] = useState('Newest Date');
    const[collab,setcollab] = useState('Newest collab');
    const[repo,setrepo] = useState('Newest repo');
    const[active,setactive] = useState('1');
    const[projDesc,setprojDesc] = useState('Select a project from the left');

    const getData = async (i) => {
        // START LOADING
        setisLoading(true);
        axios.get('https://secure-headland-15810.herokuapp.com/projects', {params: {id: i}}).then((res) => {
        setProjName(res.data[0].name);
        setdate(res.data[0].date);
        setcollab(res.data[0].collab);
        setrepo(res.data[0].repo);
        setprojDesc(res.data[0].content);
        setisLoading(false);
    })
        ;
        // STOP LOADING
        if (active!==i.toString()){
        document.getElementById(i.toString()).className = 'pane-text chosen';
        document.getElementById(active).className = 'pane-text';
        setactive(i.toString());}
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


            <div className='content'>

                <div className='navpane'>
                    <div className='pane-div'><h1 className='pane-year'>2022</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(1)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='1' className='pane-text chosen'>Proj1</h1></a></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='2' className='pane-text'>Proj2</h1></a></div>
                    <div className='pane-div'><h1 className='pane-year'>2021</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(1)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='3' className='pane-text'>Proj1</h1></a></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='4' className='pane-text'>Proj2</h1></a></div>
                    <div className='pane-div'><h1 className='pane-year'>2020</h1></div>
                    <div className='pane-div'><h1 className='pane-year'>2019</h1></div>
                    <div className='pane-div'><h1 className='pane-year'>2018</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(1)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='5' className='pane-text'>Proj1</h1></a></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(2)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='6' className='pane-text'>Proj2</h1></a></div>
                    <div className='pane-div'><h1 className='pane-year'>2017</h1></div>
                    <div className='pane-div'><h1 className='pane-year'>2011</h1></div>
                        <div className='pane-div'><a href="#" onClick={() => getData(20111)} style={{ textDecoration: 'none', color: 'white' }}><h1 id='20111' className='pane-text'>ecommerce website</h1></a></div>
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
                            <h2>Collaborators: {collab}</h2>
                        </div>
                    </div>
                    <div className='container'>
                        {isLoading ? (
                            <ReactLoading type={"bars"} color={"white"} />       
                            ) : (
                            <div className='projdesc'>      
                                <div className='imgcon'></div>
                                <div className='desccon'>
                                    <h1>{projDesc}</h1>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Projects;