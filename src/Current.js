import './Blog.css';
import React from 'react';
import Nav from './Nav';
import TOC, { slugify } from './TOC';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const POST = {
    title: '[Post title]',
    subtitle: '[One-line subtitle describing what this is about]',
    date: '[Month Year]',
    links: [
        // Add paper/preprint links here when ready
        // { label: 'Author et al., Journal (Year)', href: '...' },
    ],
    sections: [
        {
            type: 'paragraph',
            text: `[Opening paragraph — set the scene, introduce the problem or context. What is this work about and why does it matter?]`,
        },
        {
            type: 'video',
            src: '/localassets/[PLACEHOLDER_intro_video].mp4',
            caption: '[Caption describing what the video shows]',
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: '[Section heading]',
        },
        {
            type: 'paragraph',
            text: `[Body text placeholder.]`,
        },
        {
            type: 'paragraph',
            text: `[Body text placeholder.]`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: '[Section heading]',
        },
        {
            type: 'paragraph',
            text: `[Body text placeholder.]`,
        },
        {
            type: 'image',
            src: '/localassets/[PLACEHOLDER_figure].png',
            caption: '[Figure caption]',
        },
        {
            type: 'paragraph',
            text: `[Body text placeholder.]`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: 'Code and data',
        },
        {
            type: 'paragraph',
            text: `[Link to code repository and/or data when available.]`,
        },
    ],
};

function renderSection(section, idx) {
    switch (section.type) {
        case 'heading':
            return <h2 key={idx} id={slugify(section.text)} className="blog-heading">{section.text}</h2>;

        case 'subheading':
            return <h3 key={idx} className="blog-subheading">{section.text}</h3>;

        case 'paragraph':
            return <ReactMarkdown key={idx} className="blog-body">{section.text}</ReactMarkdown>;

        case 'pullquote':
            return (
                <blockquote key={idx} className="blog-pullquote">
                    <ReactMarkdown>{section.text}</ReactMarkdown>
                </blockquote>
            );

        case 'image':
            return (
                <figure key={idx} className="blog-image-wrap">
                    <img src={section.src} alt={section.caption} />
                    {section.caption && (
                        <figcaption className="blog-caption">{section.caption}</figcaption>
                    )}
                </figure>
            );

        case 'video':
            return (
                <figure key={idx}>
                    <div className="blog-video-wrap">
                        <iframe
                            src={section.src}
                            title={section.caption || 'Embedded video'}
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    {section.caption && (
                        <figcaption className="blog-caption">{section.caption}</figcaption>
                    )}
                </figure>
            );

        case 'divider':
            return <hr key={idx} className="blog-divider" />;

        case 'cite':
            return (
                <div key={idx} className="blog-cite">
                    <span className="blog-cite-label">Cite</span>
                    <p className="blog-cite-text">{section.text}</p>
                </div>
            );

        default:
            return null;
    }
}

function Current() {
    return (
        <AnimatePresence exitBeforeEnter>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="Blog">
                    <Nav current="blog" />
                    <TOC sections={POST.sections} />

                    <div className="content">
                        <h1 className="blog-title">{POST.title}</h1>
                        {POST.subtitle && <p className="blog-subtitle">{POST.subtitle}</p>}
                        <p className="blog-date">{POST.date}</p>
                        <hr className="blog-header-rule" />

                        {POST.links && POST.links.length > 0 && (
                            <div className="blog-links">
                                {POST.links.map((link, idx) => (
                                    <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="blog-link-pill">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        {POST.sections.map((section, idx) => renderSection(section, idx))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Current;
