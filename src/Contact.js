import './Contact.css';
import { useState } from "react";
import Nav from './Nav';
import { AnimatePresence, motion } from 'framer-motion';

const EMAIL = 'hridaikhurana@gmail.com';
const WORK_EMAIL = 'hridai.khurana@aircyt.com';

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
                <a className='contactEmail' href={`mailto:${WORK_EMAIL}`}>{WORK_EMAIL}</a>
                <button className='subbutton copyBtn' onClick={copyEmail}>
                    <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
                <p className='contactTagline'>
                    <a href='https://orcid.org/0009-0001-6084-063X' target='_blank' rel='noopener noreferrer'>ORCID</a> &middot; <a href='https://scholar.google.com/citations?user=sQvNT7sAAAAJ&hl=en' target='_blank' rel='noopener noreferrer'>Google Scholar</a> &middot; <a href='https://doi.org/10.3389/fncir.2026.1812938' target='_blank' rel='noopener noreferrer'>Frontiers in Neural Circuits</a> &middot; <a href='https://doi.org/10.1016/j.neunet.2026.109873' target='_blank' rel='noopener noreferrer'>Neural Networks</a>
                </p>
            </div>
        </div>
    </motion.div>
    </AnimatePresence>
    )
}

export default Contact;
