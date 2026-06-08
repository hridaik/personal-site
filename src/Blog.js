import './Blog.css';
import React from 'react';
import Nav from './Nav';
import TOC, { slugify } from './TOC';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// ─────────────────────────────────────────────────────────────────────────────
// BLOG POST - edit everything below to update the post.
//
// Section types:
//   { type: 'heading',    text: '...' }             ← bold gradient section title
//   { type: 'subheading', text: '...' }             ← smaller bold inline title
//   { type: 'paragraph',  text: '...' }             ← body text
//   { type: 'pullquote',  text: '...' }             ← indented italic highlight
//   { type: 'image',      src: '...', caption: '...' }   ← full-width image
//   { type: 'video',      src: '...', caption: '...' }   ← responsive iframe embed
//   { type: 'divider' }                             ← thin horizontal rule
// ─────────────────────────────────────────────────────────────────────────────

const POST = {
    title: 'Fleeing is Believing',
    subtitle: 'Building a normative, interpretable model of general mouse behavior - starting with defensive behavior',
    date: 'April 2026',
    links: [
        {
            label: 'Khurana et al., Front. Neural Circuits (2026)',
            href: 'https://www.frontiersin.org/journals/neural-circuits/articles/10.3389/fncir.2026.1812938/abstract',
        },
        {
            label: 'bioRxiv preprint',
            href: 'https://www.biorxiv.org/content/10.64898/2026.02.17.706393v1',
        },
    ],
    sections: [
        {
            type: 'heading',
            text: 'A foundational mouse model?',
        },
        {
            type: 'paragraph',
            text: `At EMBL Rome, there's a bunch of data collected over the years of various neuroscience experiments on mice - mostly without a unified theoretical framework to tie them together. The goal of our first project was to see if we could build one: a kind of "foundational mouse" model, something normative that could explain behavior rather than just describe it, with interpretable cognitive parameters that you can map onto neural dynamics to understand what is going on.`,
        },
        {
            type: 'paragraph',
            text: 'What follows is the MVP/PoC version of that. In principle, the architecture shown here could be extended to cover a range of behavioral domains.'
        },
        { type: 'divider' },
        {
            type: 'image',
            src: '/localassets/mousehead.jpg',
            caption: 'Model architecture',
        },
        {
            type: 'heading',
            text: 'Why not just use RL?',
        },
        {
            type: 'paragraph',
            text: "Traditionally, a model that reconstructs behavior with interpretable cognitive parameters might be built using reinforcement learning (RL). It's the natural go-to - you define a reward function, and the agent learns a policy that maximizes it.",
        },
        // {
        //     type: 'pullquote',
        //     text: '"In biology, understanding beats performance - at least until you\'re ready to deploy."',
        // },
        {
            type: 'paragraph',
            text: "But it's a bit unsatisfying to say all behavior is reward or utility-driven. A mouse sniffing around an empty box isn't obviously trying to maximize anything - it's just curious. You can hack your reward function to fit curiosity in, but it feels like a patch rather than an explanation.",
        },
        {
            type: 'paragraph',
            text: "Active inference offers a cleaner alternative. It models the agent as operating within a partially observable Markov decision process (POMDP), where it uses an internal generative model to infer the hidden causes of its sensory observations, then chooses actions that balance two things: _pragmatic value_ (move toward preferred states - safety, food, etc.) and _epistemic value_ (go find out things you don't know yet). The exploration falls out of the second term naturally, without you having to explicitly build in an explore-exploit tradeoff. That cleanliness - plus the interpretability of the cognitive parameters - is what persuaded us to go this route.",
        },
        {
            type: 'paragraph',
            text: "This is greatly simplified, for a more formal treatment check out [this paper](https://doi.org/10.1016/j.physrep.2023.07.001) (warning: Friston).",
        },
        {
            type: 'heading',
            text: 'The social defeat paradigm',
        },
        {
            type: 'paragraph',
            text: "The test ground for the model we wanted was social defeat in mice. These experiments were being run by Valeria in the Gross Lab. The paradigm is relatively simple: a mouse is placed in an arena with a little shelter, and a big aggressive CD1 mutant mouse is put in a wire-mesh cage in the corner. The mouse explores, sniffs around, goes to investigate the caged aggressor. Then, in the defeat phase, the CD1 is released and the little mouse gets beaten up. After a few rounds of this, the mouse's subsequent behavior - now with just the caged CD1 again - changes noticeably: more time in shelter, less investigation, more hesitation.",
        },
        {
            type: 'image',
            src: '/localassets/protocol.jpg',
            caption: 'Simplified social defeat experiment protocol',
        },
        {
            type: 'paragraph',
            text: "Surprisingly, there wasn't much theoretical explanation for what was happening - some potential neural circuits had been identified, but the behavioral dynamics hadn't been formally modeled. That, plus the fact that the behavior is relatively clean and the individual differences between mice are quite striking, made it a useful starting point.",
        },
        {
            type: 'paragraph',
            text: "The typical behavior is, naively, interpretable: the mouse is curious, so it explores the arena, sees the other mouse in a cage, goes to check out what's up with him, gets scared, and runs back to the shelter. You can see this in the video below:",
        },
        {
            type: 'video',
            src: '/localassets/real_flight_example.mp4',
            caption: 'Exemplary flight behavior observed in the experiment',
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: "What a first-pass model looks like",
        },
        {
            type: 'paragraph',
            text: "This setup maps cleanly onto active inference. Give the agent a slight preference for being near the shelter, a slight aversion to the smell of the other mouse, and the epistemic drive will do the rest - it'll spend some time near the shelter, approach the cage out of curiosity, but also stay cautious. That already looks more like a real mouse than a random walk.",
        },
        {
            type: 'video',
            src: '/localassets/M_only.mp4',
            caption: 'Only M model example',
        },
        {
            type: 'paragraph',
            text: "But compared to real trajectories, it was close in some ways and obviously wrong in some ways. The real mice do things the simple model doesn't: they make ballistic flights back to the shelter - not just drift away from the cage, but _run_. They hesitate at the corridor entrance, peering into the chamber before committing. And their approach to the cage is deliberate and assessment-like, not just a noisy random walk driven by smell gradients.",
        },
        {
            type: 'paragraph',
            text: "The failures point to what's missing.",
        },
        {
            type: 'subheading',
            text: "Why three modules? (And why not just a hierarchy?)",
        },
        {
            type: 'paragraph',
            text: `Two things are clearly absent from the simple model. First, there's no real "assessment" behavior - the agent gets near the cage because uncertainty pulls it there, but the approach isn't as directed as in real mice. Second, there's nothing that produces flight specifically. The agent just dislikes being near the cage; it doesn't panic.`,
        },
        {
            type: 'paragraph',
            text: `To get these, you need higher-level controllers. Here's the reasoning:`,
        },
        {
            type: 'paragraph',
            text: `The mouse approaching the cage isn't doing something simple like "go toward the smell." It's trying to figure out _who is in there_ - friend or foe? The CD1 in the cage is a conspecific, so its smell doesn't inherently signal danger the way a predator's would. And after defeat, the mouse might encounter a _different_ CD1 than the one that actually beat it up. So there's a genuine identification problem. The Identification module addresses the first: something that accumulates evidence about the identity of the other mouse and, when uncertain, drives the Spatio-Motor module to approach and gather better evidence.`,
        },
        {
            type: 'paragraph',
            text: `Then there's the flight. Once the mouse decides the other mouse is a threat and it's close enough to be in danger, something flips - it doesn't just slowly drift away, it bolts. The Context module addresses the second: something that tracks whether the animal is in a "danger" state, and when it is, amplifies the preference for shelter dramatically enough to produce ballistic escape.`,
        },
        {
            type: 'paragraph',
            text: `That gives us three modules:`,
        },
        {
            type: 'paragraph',
            text: `- **Spatio-Motor (M)**: handles navigation. Takes in sensory signals (shelter smell, threat smell, own location), infers spatial state, chooses where to move. Carries the "default" preferences - mild preference for shelter, mild aversion to threat.
- **Threat Identification (T)**: tracks the identity of the other mouse (threat vs. friendly). Has no preference over outcomes - it's purely driven by the need to resolve uncertainty. Its action is to temporarily flip M's preferences to drive approach, so it can gather better sensory evidence.
- **Danger Context (D)**: tracks safety context (safe vs. danger). Takes input from T (what's the identity?) and M (how close is the threat?). When it infers danger, it amplifies M's preferences sharply - large positive utility for shelter, large negative utility for the threat - producing flight.`,
        },
        {
            type: 'image',
            src: '/localassets/mousehead.jpg',
            caption: 'Model architecture',
        },
        {
            type: 'subheading',
            text: `Why "heterarchical" and not just "hierarchical"?`,
        },
        {
            type: 'paragraph',
            text: `The architecture gets called _heterarchical_ in the paper.`,
        },
        {
            type: 'paragraph',
            text: `This distinction matters for what the model is claiming about the underlying brain. A strict hierarchy would imply a specific kind of top-down control structure. A heterarchical one implies something more like a network - which is what it becomes when you extend the model for more general situations.`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: `A behavioral episode, step by step`,
        },
        {
            type: 'paragraph',
            text: `A typical simulated episode goes like this:`,
        },
        {
            type: 'video',
            src: '/localassets/illustrative_trajectory.mp4',
            caption: '',
        },
        {
            type: 'paragraph',
            text: `**1. Investigation.** The agent starts in the shelter with high uncertainty about the other mouse's identity. T, wanting to resolve that uncertainty, flips M's preferences - now the agent is drawn toward the cage rather than away from it. It approaches.`,
        },
        {
            type: 'paragraph',
            text: `**2. Identification.** As the agent gets closer, the sensory signal gets more precise. T's belief about whether the other mouse is a threat rises. Once it crosses a confidence threshold, that belief is passed to D.`,
        },
        {
            type: 'paragraph',
            text: `**3. Flight.** D updates to a "danger" state and amplifies M's preferences sharply. T's override is released. M is now strongly driven toward the shelter. The agent runs.`,
        },
        {
            type: 'paragraph',
            text: `**4. Sustained escape.** As the agent retreats, the sensory signal fades - and so does T's belief that the other mouse is a threat. But D maintains the danger state, sustaining the escape even after the immediate evidence has weakened. The agent avoids leaving the shelter even when it can no longer "smell" the threat strongly. This is what produces the ballistic quality of the escape rather than a gradual drift back.`,
        },
        {
            type: 'paragraph',
            text: `None of the three modules does anything particularly interesting on its own. It's the interaction between them that produces something resembling a scared mouse.`,
        },
        {
            type: 'heading',
            text: 'Does it actually behave like real mice?'
        },
        {
            type: 'paragraph',
            text: `We optimized five parameters for each agent - shelter preference strength, threat aversion strength, confidence threshold for flight, rate of sensory decay with distance, and a motor inertia parameter - using Bayesian optimization (Optuna with a Tree-Structured Parzen Estimator).`,
        },
        {
            type: 'paragraph',
            text: `The fitting was done against a composite loss over five behavioral metrics: time in shelter, time spent investigating the cage, spatial transitions between zones, spatial exploration entropy, and immobility. As a baseline, we compared against a random walk.`,
        },
        {
            type: 'image',
            src: '/localassets/Fig4new.jpg',
            caption: 'Model fit and comparison',
        },
        {
            type: 'paragraph',
            text: `The model closely matches the empirical distributions across all five metrics; the random walk doesn't. The median fit error across mice was 0.56σ - the simulated agents fall within the natural behavioral variance of the real population.`,
        },
        {
            type: 'paragraph',
            text: `One practical note on the fitting: rather than running independent optimization for every mouse (which would have been computationally prohibitive), we generated a library of representative agents across the parameter space and then matched each mouse to the closest entry. It's a pragmatic approximation, but the 0.56σ median suggests the library had enough resolution to cover individual differences adequately.`,
        },
        {
            type: 'paragraph',
            text: `The model also fits the two extreme phenotypes in the data - what we informally call "anxious" mice (high shelter time, rarely leaving the corridor) and "curious" mice (wide-ranging exploration, frequent cage investigation) - without any separate hand-coding. Those phenotypes emerge from different positions in the same parameter space.`,
        },
        {
            type: 'image',
            src: '/localassets/Fig5.png',
            caption: 'Real vs. model trajectories: anxious, curious, flight, hesitation',
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: 'What does defeat actually change?',
        },
        {
            type: 'paragraph',
            text: `We fit the model separately to each mouse's pre-defeat and post-defeat behavior, then looked at how each mouse moved in parameter space between sessions. The idea: if defeat systematically changes behavior, it should show up as a consistent directional shift in parameters - lower threshold for committing to "this is a threat," stronger preference for shelter, stronger aversion to the other mouse.`,
        },
        {
            type: 'image',
            src: '/localassets/Figure6.png',
            caption: '3D parameter space projections, pre→post, control vs. defeat groups',
        },
        {
            type: 'paragraph',
            text: `In the defeat group, the shifts are directional and consistent: mice start in different places (reflecting individual baseline differences) but move in a similar direction. In the control group, shifts are smaller and less consistent. The "trauma vectors" - the net direction of pre-to-post change for each group - point almost exactly opposite each other (cosθ = -0.96). The Mahalanobis distance between groups is 1.49, which is a large effect size.`,
        },
        {
            type: 'paragraph',
            text: `The catch: the permutation test p-value is 0.069. With n=6 defeated and n=7 control mice, the study is underpowered. We say so in the paper. The effect size is large enough to be biologically plausible, but the sample is too small to be conclusive. More data needed.`,
        },
        {
            type: 'paragraph',
            text: `What the model offers here, beyond just "defeat changes behavior," is a specific language for describing _what_ changed. Defeated mice have a lower threshold for classifying something as a threat and a stronger pull toward shelter. That's more specific than "they're more anxious," and it's a claim you can in principle test at the neural level - which is where the next section comes in.`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: 'Using the model to narrow down neural hypotheses',
        },
        {
            type: 'paragraph',
            text: `One of the reasons to build a normative model rather than a descriptive one is that it generates hypotheses you can test. The optogenetics section is the clearest illustration.`,
        },
        {
            type: 'paragraph',
            text: `Previous work from the Gross Lab (Krzywkowski et al., 2020) showed that optogenetic stimulation of the ventrolateral VMH (VMHvl) triggers escape in defeated mice but not in naive controls - a state-dependent effect. We hypothesized that the Danger Context module (D) parallels the functional role of the VMH in this circuit, and modeled stimulation as an exogenous push on D's belief state toward "danger."`,
        },
        {
            type: 'paragraph',
            text: `We tested three candidate hypotheses for what defeat does to the circuit:`,
        },
        {
            type: 'paragraph',
            text: `- **Sensitization (Model S)**: Defeat makes D more sensitive to T's input - it starts treating even distant threats as dangerous, expanding the spatial range over which "danger" is inferred.
- **Biased identity priors (Model T)**: Defeat shifts T's prior toward "this is a threat" - hyper-vigilance at the identity-inference level.
- **Biased context priors (Model D)**: Defeat shifts D's prior toward "the environment is unsafe" - a persistent background danger state, independent of what T is currently inferring.`,
        },
        {
            type: 'paragraph',
            text: `Under pre-defeat parameters, none of the three models produce flight under optogenetic stimulation - consistent with the biological controls. After applying defeat-induced parameter shifts, Models T and D both reproduce the elevated flight rates seen in defeated mice. Model S doesn't change the response under the conditions tested: because the relevant social encounters happen at a distance where the spatial-range manipulation doesn't alter the inferred state, expanding threat sensitivity has no effect here.`,
        },
        {
            type: 'image',
            src: '/localassets/Figure7.png',
            caption: 'Flight rates pre vs. post defeat, real vs. model S/T/D',
        },
        {
            type: 'paragraph',
            text: `This leaves T and D computationally degenerate under the existing experiment - you can't distinguish between them from the data we have. But the model immediately suggests a clean test: run VMH stimulation in defeated mice _in the absence of a conspecific_.`,
        },
        {
            type: 'pullquote',
            text: 'Model D predicts escape: the environment already feels dangerous, and the stimulation tips D over its threshold. Model T predicts little or no response: without an ambiguous social stimulus to classify, T has nothing to act on.',
        },
        {
            type: 'paragraph',
            text: `That experiment hasn't been run, as far as we know. But it fell out of the model naturally.`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: "What the model doesn't do (yet)",
        },
        {
            type: 'paragraph',
            text: `The gaps:`,
        },
        {
            type: 'paragraph',
            text: `- **Thigmotaxis** - wall-hugging, a standard anxiety readout in open field tests, isn't modeled
- **Social buffering** - presence of a familiar conspecific reduces fear responses; not captured here
- **Context-dependent fear** - conditioned place aversion, context generalization, etc.
- **Habituation** - repeated exposure reduces responding; the model doesn't update across sessions
- **Postural and kinematic features** - we fit to centroid trajectories only, not body orientation, stretch-attend postures, or freezing microstructure`,
        },
        {
            type: 'paragraph',
            text: `Many of these could be added as additional state factors or observation channels. The modular structure was designed with extensibility in mind. But they're not here yet.`,
        },
        {
            type: 'paragraph',
            text: `The fitting also admits multiple behaviorally equivalent solutions - parameters that match the behavioral metrics don't uniquely identify the "true" parameters in a circuit sense. That limits the strength of the neural inferences for now, and it's something that would need to be addressed before the model could be used to make strong claims about specific circuits.`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: 'Where this goes',
        },
        {
            type: 'paragraph',
            text: `The immediate practical next step is more data - larger cohorts to properly test the defeat-induced parameter shifts, and ideally concurrent neural recordings to validate the module-to-circuit mappings rather than just proposing them.`,
        },
        {
            type: 'paragraph',
            text: `The longer-term goal is the original one: a modular normative model general enough to cover multiple behavioral domains. The architecture here was built for social defeat, but foraging, multi-agent interactions, conditioned fear, and open-field exploration all fit the active inference framework in principle. Whether the same modular structure extends, or whether different domains need entirely different organizations, remains to be seen.`,
        },
        { type: 'divider' },
        {
            type: 'heading',
            text: 'Code and data',
        },
        {
            type: 'paragraph',
            text: `All code is available at [https://github.com/hridaik/social-defeat](https://github.com/hridaik/social-defeat).`,
        },
        {
            type: 'paragraph',
            text: `The paper: _Fleeing is Believing: Adaptive behavior under social threat as an inference process_ - Khurana, Mussetto, Gross, Bufacchi. EMBL Rome. [Frontiers in Neural Circuits](https://www.frontiersin.org/journals/neural-circuits/articles/10.3389/fncir.2026.1812938/abstract) · [bioRxiv preprint](https://www.biorxiv.org/content/10.64898/2026.02.17.706393v1)`,
        },
        { type: 'divider' },
        {
            type: 'cite',
            text: 'Khurana H, Mussetto V, Gross C and Bufacchi RJ (2026) Fleeing is believing: adaptive behavior under social threat as an inference process. Front. Neural Circuits 20:1812938. doi: 10.3389/fncir.2026.1812938',
        },
    ],
};
// ─────────────────────────────────────────────────────────────────────────────

function renderSection(section, idx) {
    switch (section.type) {
        case 'heading':
            return <h2 key={idx} id={slugify(section.text)} className="blog-heading">{section.text}</h2>;

        case 'subheading':
            return <h3 key={idx} className="blog-subheading">{section.text}</h3>;

        case 'paragraph':
            return <ReactMarkdown key={idx} className="blog-body" remarkPlugins={[remarkGfm]}>{section.text}</ReactMarkdown>;

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
                    <video
                        src={section.src}
                        controls
                        playsInline
                        style={{ width: '100%', display: 'block', border: '1px solid rgba(0,0,0,0.12)' }}
                    />
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

function Blog() {
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

                        {POST.links && (
                            <div className="blog-links">
                                <span className="blog-links-label">Read full publications</span>
                                {POST.links.map((link, idx) => (
                                    <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer" className="blog-link-pill">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}

                        <div className="blog-read-also">
                            <span className="blog-read-also-label">Read also</span>
                            <NavLink to="/current" className="blog-read-also-link">One wiring, two functions</NavLink>
                        </div>

                        {POST.sections.map((section, idx) => renderSection(section, idx))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Blog;
