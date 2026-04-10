import './Contact.css';
import React from "react";
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';
import * as emailjs from '@emailjs/browser';



function Contact() {
    function sendEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_v6rj7v8', 'template_5kg3tp5', e.target, '0-rpvpjMCv54k9ehy')
            .then(() => {
                alert('Email sent successfully! I will reply ASAP');
            }, () => {
                alert('Error sending email');
            });
        e.target.reset();
    }

    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='ContactPage'>
            <Nav current="contact" />

            <div className='contentC'>
                <form onSubmit={sendEmail} name='emailform'>
                    <div className="formdiv">
                        <label className='formlabel' htmlFor='name'>Name</label>
                        <input className='nameform' id='name' type='text' name='from_name' placeholder='Your name' required />
                    </div>
                    <div className="formdiv">
                        <label className='formlabel' htmlFor='email'>Email</label>
                        <input className='nameform' id='email' type='email' name='reply_to' placeholder='Your email' required />
                    </div>
                    <div className="formdiv">
                        <label className='formlabel' htmlFor='message'>Message</label>
                        <textarea className='nameform' id='message' name='message' placeholder="Let's talk..." required />
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
