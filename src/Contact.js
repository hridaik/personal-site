import './Contact.css';
import React from "react";
import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import * as emailjs from '@emailjs/browser';



function Contact() {
    function sendEmail(e) {
        e.preventDefault();        
        emailjs.sendForm('service_li5oav1', 'template_5q59b5z',  e.target, 'user_L7FSFpbN3ZexBSgqshdU0')
            .then((result) => {
                alert('Email sent successfully! I will reply ASAP');
            }, (error) => {
                alert('Error sending email');
            });            //clears the form after sending the email
            e.target.reset();
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
                    <NavLink className="navbar" to="/projects" style={{ textDecoration: 'none' }}><h1 className='nav-textR'>projects</h1></NavLink>
                    <NavLink className="navbar" to="/resume" style={{ textDecoration: 'none' }}><h1 className='nav-textR'>resume</h1></NavLink>
                    <h1 className='nav-textR active'>contact</h1>
                </div>

            </div>
            <span className='gradborder'></span>


            <div className='contentC'>
                <form onSubmit={sendEmail} name='emailform'>
                    <div className="formdiv">
                        <label className='formlabel' for='name'>Name</label>
                        <input className='nameform' id='name' type='text' name='from_name' placeholder='Your name'/> 
                    </div>
                    <div className="formdiv">
                        <label className='formlabel' for='email'>Email</label>
                        <input className='nameform' id='email' type='email' name='reply_to' placeholder='Your email' />
                    </div>
                    <div className="formdiv">
                        <label className='formlabel' for='message'>Message</label>
                        <textarea className='nameform' id='message' name='message' placeholder="Let's talk..."/>
                    </div>
                    <button className='subbutton' type='submit'><span>Send</span></button>
                </form>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Contact;