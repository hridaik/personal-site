import React, { useState, useEffect, useMemo } from 'react';

export function slugify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function stripMarkdown(text) {
    return text.replace(/[*_`]/g, '');
}

function TOC({ sections }) {
    const headings = useMemo(() => sections.filter(s => s.type === 'heading'), [sections]);
    const [active, setActive] = useState(null);

    useEffect(() => {
        if (headings.length === 0) return;
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) setActive(e.target.id);
                });
            },
            { rootMargin: '-15% 0px -75% 0px' }
        );
        headings.forEach(h => {
            const el = document.getElementById(slugify(h.text));
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="toc" aria-label="Table of contents">
            <div className="toc-inner">
                <div className="toc-line" />
                {headings.map((h, idx) => {
                    const id = slugify(h.text);
                    return (
                        <a
                            key={idx}
                            href={`#${id}`}
                            className={`toc-item${active === id ? ' toc-active' : ''}`}
                            onClick={() => setActive(id)}
                        >
                            <span className="toc-label">{stripMarkdown(h.text)}</span>
                            <span className="toc-dot" />
                        </a>
                    );
                })}
            </div>
        </nav>
    );
}

export default TOC;
