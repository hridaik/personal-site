import './Contact.css';
import { useState } from "react";
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';

const EMAIL = 'hridaikhurana@gmail.com';

function Contact() {
    const [copied, setCopied] = useState(false);

    function copyEmail() {
        navigator.clipboard.writeText(EMAIL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
    <AnimatePresence exitBeforeEnter>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className='ContactPage'>
            <Nav current="contact" />

            <div className='contentC'>
                <p className='contactTagline'>Feel free to reach out - I'd love to hear from you.</p>
                <a className='contactEmail' href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <button className='subbutton copyBtn' onClick={copyEmail}>
                    <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Contact;
