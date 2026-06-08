import './Blog.css';
import React from 'react';
import Nav from './Nav';
import TOC, { slugify } from './TOC';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';

const MATH_PLUGINS = {
    remarkPlugins: [remarkMath, remarkGfm],
    rehypePlugins: [rehypeKatex],
};

const POST = {
    title: 'One wiring, two functions',
    subtitle: 'Distinguishing structural from state-dependent functional organization in driven circuits with a current-velocity decomposition',
    date: 'June 2026',
    links: [],
    sections: [

        // ── Section 1 ──────────────────────────────────────────────────────────
        {
            type: 'heading',
            text: 'Why functional connectivity is not structural connectivity',
        },
        {
            type: 'paragraph',
            text: `Neural circuits do not sit at equilibrium. Neuromodulators, sensory input, and metabolic processes continually drive them away from the assumptions under which standard connectivity methods are easiest to interpret.`,
        },
        {
            type: 'paragraph',
            text: `That matters because graphical lasso, partial correlation, and related methods treat the precision matrix - the conditional-dependence graph - as a proxy for direct coupling. This identification is exact at thermodynamic equilibrium. It is not exact in general.`,
        },
        {
            type: 'paragraph',
            text: `Away from equilibrium, two neurons with no synaptic connection can become strongly conditionally dependent through state-dependent currents rather than anatomy. Cut the corresponding synapse and nothing may happen: the functional link may have no anatomical target.`,
        },
        {
            type: 'paragraph',
            text: `The goal is to distinguish two kinds of links:\n\n- **Coupling-supported links:** present because of direct coupling or anatomy.\n- **Current-supported links:** present because of the circuit's driven state.`,
        },
        {
            type: 'paragraph',
            text: `The distinction is link-specific. The question is not whether the whole circuit is out of equilibrium, but which apparent functional links are supported by coupling and which are supported by current.`,
        },
        { type: 'subheading', text: 'Short summary' },
        {
            type: 'video',
            src: 'localassets/current_summary.mp4',
            caption: 'Video summary',
        },
        { type: 'divider' },

        // ── The setup ──────────────────────────────────────────────────────────
        { type: 'subheading', text: 'The setup' },
        {
            type: 'paragraph',
            text: String.raw`Consider a stochastic circuit described by the Itô process

$$
dX_t = f(X_t)\,dt + \sqrt{2D}\,dW_t,
$$

where $f$ is the drift, $D$ is a constant positive-definite diffusion matrix, and the process has a unique smooth stationary density $p$.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The density $p(x,t)$ satisfies the Fokker-Planck equation

$$
\partial_t p
=
-\nabla\cdot(fp)
+
\nabla\cdot(D\nabla p)
=
-\nabla\cdot j,
\qquad
j = fp - D\nabla p.
$$

At stationarity, $\partial_t p = 0$, so the probability current $j$ is divergence-free:

$$
\nabla\cdot j = 0.
$$

Define the current velocity

$$
v = \frac{j}{p}.
$$

Then the drift decomposes as

$$
f = D\nabla\log p + v,
\qquad
\nabla\cdot(pv) = 0.
$$

The first term is the gradient contribution: the equilibrium part. The second is the circulating current that breaks detailed balance. At detailed balance, $v = 0$.`,
        },
        { type: 'divider' },

        // ── The identity ───────────────────────────────────────────────────────
        { type: 'subheading', text: 'The identity' },
        {
            type: 'paragraph',
            text: String.raw`Differentiate the drift decomposition with respect to $x_j$:

$$
\boxed{J - DH = \partial v}
$$

where

$$
J_{ij} = \partial_j f_i,
\qquad
H_{ij} = \partial_i\partial_j \log p,
\qquad
(\partial v)_{ij} = \partial_j v_i.
$$

Here $J$ is the drift Jacobian, so it captures direct coupling. The Hessian $H$ is the log-density Hessian; for a Gaussian distribution, $H = -Q$, where $Q$ is the precision matrix.

At equilibrium, $\partial v = 0$, so the precision graph and coupling graph coincide. Away from equilibrium, $\partial v$ is exactly their discrepancy. If $J_{ij}=0$ but the corresponding precision entry is non-zero, the link is current-supported.`,
        },
        { type: 'divider' },

        // ── Linear Gaussian case ───────────────────────────────────────────────
        { type: 'subheading', text: 'Linear Gaussian case' },
        {
            type: 'paragraph',
            text: String.raw`For a linear drift

$$
f(x) = Ax
$$

with constant $D$, the stationary distribution is Gaussian,

$$
X \sim \mathcal{N}(0,\Sigma),
$$

with covariance $\Sigma$ satisfying the Lyapunov equation

$$
A\Sigma + \Sigma A^\top + 2D = 0.
$$

Let

$$
Q = \Sigma^{-1}
$$

be the precision matrix, and define the current-velocity matrix

$$
\Omega = A + DQ.
$$

Then the identity becomes

$$
Q = D^{-1}(\Omega - A).
$$

At equilibrium, $\Omega = 0$, so

$$
Q = -D^{-1}A.
$$

The precision matrix recovers the coupling matrix up to the diffusion scale.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Away from equilibrium, $\Omega \neq 0$. Off-diagonal entries of $Q$ now receive contributions from both $A$ and $\Omega$. If $A_{ij}=0$, then

$$
Q_{ij} = \left(D^{-1}\Omega\right)_{ij}.
$$

For $D = I$, this simplifies to

$$
Q = \Omega - A,
$$

so every off-coupling precision entry satisfies

$$
Q_{ij} = \Omega_{ij}.
$$

It is entirely current-supported.`,
        },
        {
            type: 'paragraph',
            text: String.raw`For two behavioral states $s_1$ and $s_2$, with state-specific $D_s$ and $Q_s$, the state-dependent current change is

$$
\Delta\Omega
=
D_{s_1}Q_{s_1}
-
D_{s_2}Q_{s_2}.
$$

If the coupling matrix $A$ is unchanged across states, it cancels from the difference.`,
        },
        { type: 'divider' },

        // ── How to apply ───────────────────────────────────────────────────────
        { type: 'subheading', text: 'How to apply the decomposition' },
        {
            type: 'paragraph',
            text: String.raw`You need three objects:

1. A coupling matrix $A$, from anatomy, effective connectivity, or a fitted dynamical model.
2. A diffusion estimate $D$, for example $D \approx \operatorname{Cov}(\Delta x)$.
3. A precision estimate $Q$, estimated from time-series data in each behavioral state.

For each state $s$, compute

$$
\Omega_s = D_s Q_s + A.
$$

Then compute the state difference

$$
\Delta\Omega
=
\Omega_{\text{state 1}}
-
\Omega_{\text{state 2}}.
$$

Classification is direct:

- If $A_{ij}=0$, the corresponding $\Delta\Omega_{ij}$ is current-supported.
- If $A_{ij}\neq0$, the decomposition separates coupling and current contributions.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The mechanism test is also direct: rank off-connectome entries of $\Delta\Omega$ by magnitude and ask whether they are enriched for a biological pathway, such as a neuropeptide ligand-receptor pair, receptor subtype, or gap-junction class.`,
        },
        {
            type: 'paragraph',
            text: String.raw`If $D$ is approximately uniform, then

$$
\Delta\Omega \approx D\,\Delta Q,
$$

and the precision difference alone may be sufficient. A useful check is the correlation between $\Delta D$ and $\Delta Q$. If it is near zero, diffusion and precision capture different aspects of state reorganization.`,
        },
        { type: 'divider' },

        // ── How to read the biology ────────────────────────────────────────────
        { type: 'subheading', text: 'How to read the biology' },
        {
            type: 'paragraph',
            text: `A **coupling-supported link** should persist across drive states. If it appears at rest, under arousal, and under anesthesia, it likely traces to anatomy. The appropriate intervention is structural: lesion, synaptic block, or targeted perturbation.`,
        },
        {
            type: 'paragraph',
            text: `A **current-supported link** exists only in the relevant drive regime. Change the neuromodulatory state, reduce arousal, or remove the sensory input sustaining it, and the link dissolves. There may be no synapse to cut.`,
        },
        {
            type: 'paragraph',
            text: `An **off-connectome conditional dependence** is current-supported by construction, provided the coupling reference is complete at the relevant scale. If two neurons have no known synapse and no effective coupling, but the precision matrix links them strongly in one state, the link reflects the circuit's current geometry rather than its wiring.`,
        },
        {
            type: 'paragraph',
            text: `The intervention test follows immediately:

| Link type | Structural intervention | Reduce drive/state |
| --- | --- | --- |
| Coupling-supported | Removes it | Does not necessarily remove it |
| Current-supported | No anatomical target | Removes it |`,
        },
        {
            type: 'paragraph',
            text: `This distinction is the practical payoff. A structural link and a current-supported link can look identical in a functional connectivity graph, but they predict different interventions.`,
        },
        { type: 'divider' },

        // ── Section 2: OU cascade ─────────────────────────────────────────────
        {
            type: 'heading',
            text: 'The OU cascade: a controlled example',
        },
        {
            type: 'paragraph',
            text: String.raw`The identity

$$
J - DH = \partial v
$$

is exact. The next question is whether the current-supported term is large enough to change what one would infer about circuit organization.`,
        },
        {
            type: 'paragraph',
            text: `Before turning to real data, consider a minimal case where everything is analytically tractable.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Model' },
        {
            type: 'paragraph',
            text: String.raw`Take a feedforward cascade

$$
x_n \to x_{n-1} \to \cdots \to x_1
$$

with coupling matrix

$$
A_{ii} = -1,
\qquad
A_{i,i+1} = g,
\qquad
A_{ij} = 0 \;\; \text{otherwise}.
$$

The drive is localized at the source node:

$$
D_\alpha = \operatorname{diag}(1,\ldots,1,\alpha).
$$

The coupling matrix $A$ never changes. Only the source drive $\alpha$ changes.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Biologically, $\alpha$ can be read as concentrated input at a circuit entry point: thalamic drive into a cortical relay, afferent sensory input, or neuromodulatory tone. These can vary with arousal, task demand, or pharmacology while synaptic weights remain fixed.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The parameters are

$$
n = 8,
\qquad
g = 1.0,
\qquad
\alpha \in \{1,5,20\}.
$$

For each $\alpha$, solve

$$
A\Sigma_\alpha
+
\Sigma_\alpha A^\top
+
2D_\alpha
=
0,
$$

then compute

$$
Q_\alpha = \Sigma_\alpha^{-1},
\qquad
\Omega_\alpha = A + D_\alpha Q_\alpha,
$$

and the partial-correlation matrix

$$
R_{ij}
=
-\frac{(Q_\alpha)_{ij}}
{\sqrt{(Q_\alpha)_{ii}(Q_\alpha)_{jj}}}.
$$`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Results' },
        {
            type: 'paragraph',
            text: String.raw`The coupling matrix $A$ is fixed across all conditions. As $\alpha$ increases, the current-velocity matrix $\Omega_\alpha$ develops substantial off-diagonal structure, and the partial-correlation graph reorganizes with it: near-local at low drive, increasingly long-range at high drive.`,
        },
        {
            type: 'paragraph',
            text: String.raw`| Quantity | $\alpha = 1$ | $\alpha = 5$ | $\alpha = 20$ |
| --- | ---: | ---: | ---: |
| Off-local current $S_{\mathrm{cur}} = \|M \odot \Omega_\alpha\|_F$ | 0.072 | 0.364 | 1.612 |
| Off-local conditional dependence $S_{\mathrm{stat}} = \|M \odot R_\alpha\|_F$ | 0.072 | 0.193 | 0.423 |
| Off-local share of all conditional dependence | 5.0% | - | 14.7% |`,
        },
        {
            type: 'paragraph',
            text: String.raw`Here $M$ masks non-adjacent pairs, $|i-j|>1$. Off-local current rises roughly twentyfold, and off-local conditional dependence rises roughly sixfold, with no change in $A$.`,
        },
        {
            type: 'paragraph',
            text: String.raw`As a control, a reversible symmetric chain

$$
A_{\mathrm{rev}} = -I + h(S + S^\top)
$$

with $D=I$ gives

$$
\Omega = 0
$$

exactly; numerically,

$$
\|\Omega\|_F = 3.9 \times 10^{-15}.
$$

Finite-sample estimates from Euler-Maruyama trajectories converge to the analytic values as trajectory length increases, with $\Omega$ converging more slowly than $Q$. That slower convergence is a warning for estimation on real data.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'The intervention distinction' },
        {
            type: 'paragraph',
            text: String.raw`At $\alpha=20$, the strongest off-local link joins nodes 6 and 8. The coupling entry is zero throughout:

$$
A_{68} = 0.
$$

The partial correlation changes from

$$
R_{68} = -0.026
\qquad
(\alpha = 1)
$$

to

$$
R_{68} = -0.257
\qquad
(\alpha = 20).
$$

Because $A_{68}=0$ and $D_{66}=1$, the decomposition gives

$$
Q_{68} = \Omega_{68}.
$$

The link arises entirely from propagated source-node fluctuations.`,
        },
        {
            type: 'paragraph',
            text: String.raw`A graphical lasso applied at $\alpha=20$ would find

$$
Q_{68} = 0.079
$$

and report a connection between nodes 6 and 8. Anatomy finds nothing. The current-velocity decomposition correctly classifies the link as current-supported and predicts that reducing $\alpha$ returns $R_{68}$ to $-0.026$ without changing $A$.`,
        },
        {
            type: 'paragraph',
            text: `Misclassifying this link as structural sends you looking for a synapse that does not exist. Misclassifying a structural link as current-supported sends you trying to modulate away something that will persist across states. The decomposition separates the two.`,
        },
        { type: 'divider' },

        // ── Section 3: Leech ──────────────────────────────────────────────────
        {
            type: 'heading',
            text: 'The leech swimming CPG: a biological test',
        },
        {
            type: 'paragraph',
            text: `The OU cascade shows the mechanism in a controlled system. The leech swimming central pattern generator tests the same decomposition in a real identified circuit, where the cells, projections, and coupling phases are known experimentally.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'The circuit' },
        {
            type: 'paragraph',
            text: `Swimming in the medicinal leech is generated by a traveling wave across 17 segmental ganglia, M2-M18. Three interneuron classes coordinate the wave:

- **Cells 208 and 123** project posteriorly, toward the tail, and are active at the start of the swim cycle.
- **Cell 28** projects anteriorly, toward the head, and is active one-third of the way through the cycle.
- **Cells 27 and 33** project anteriorly and are active two-thirds of the way through the cycle.`,
        },
        {
            type: 'paragraph',
            text: `Together, these projections generate the characteristic anterior-to-posterior phase lag of 8-10° per segment.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Model' },
        {
            type: 'paragraph',
            text: `The model is based on the phase-oscillator model of Cang and Friesen (2002), with independent Gaussian noise added so that the current-velocity decomposition applies.`,
        },
        {
            type: 'paragraph',
            text: `The effective coupling between connected ganglia is a sinusoidal function of phase difference, parameterized from measured phase-response curves and 120° interneuron activity windows. Axonal conduction between adjacent ganglia takes about 15 ms, shifting the coupling phase by roughly 7° per ganglion.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The drive parameter is the overall coupling gain. It scales all three interneuron classes uniformly:

- zero gain: no coordination;
- nominal gain: the traveling swim wave.

The analysis is performed in **phase-difference coordinates**. In these coordinates, $D_\phi$ is dense and tridiagonal, so attribution is blockwise rather than entry-by-entry. For off-local entries, however, the result is unambiguous: those entries are absent from the anatomical coupling matrix $K$, so their presence in $\Omega$ is current-supported.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Validation' },
        {
            type: 'paragraph',
            text: `At nominal gain, the 18-ganglion chain produces a stable wave with a 9.8° lag per ganglion, within the experimental 8-10° range. Shorter chains coordinate more steeply, matching truncated-preparation data:

| Chain length $n$ | Phase lag (°/ganglion) |
| :---: | :---: |
| 6 | 14.3 |
| 10 | 11.5 |
| 14 | 10.4 |
| 18 | 9.8 |`,
        },
        {
            type: 'paragraph',
            text: `Fluctuations around the fixed point are small, with spread around 2.3°, supporting the Gaussian approximation.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Results' },
        {
            type: 'paragraph',
            text: `Increasing gain from zero produces two separable signatures.`,
        },
        {
            type: 'paragraph',
            text: `First, there is an **onset effect**: specific non-adjacent ganglion pairs become conditionally coupled as soon as the wave is established. The same pairs appear at 25%, 50%, and 100% of nominal gain. The topology is set by coupling phase, not amplitude.`,
        },
        {
            type: 'paragraph',
            text: `Second, there is an **amplitude effect**: the magnitude of the current-velocity contribution scales continuously with gain, growing tenfold between 10% and 100% of nominal gain.`,
        },
        {
            type: 'paragraph',
            text: `In short: the wave switches on the topology, and the gain scales its strength.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Structural perturbation experiments in simulation separate the circuit into three classes:

- **Load-bearing connections:** removing the posteriorward projections of cells 208/123, or the anteriorward projections of cell 28, collapses the wave. These projections are structurally necessary for the wave regime itself.
- **Current-supported connections:** 55-56 non-adjacent ganglion pairs retain stable conditional dependence even after removing cells 27 and 33, which reduces the phase lag from 11.5° to 7.6° per ganglion. These links have no anatomical counterpart in $K$; only reducing coupling gain changes their amplitude.
- **Coupling-supported connections:** links that change when their anatomical source is removed, as expected from the coupling matrix.`,
        },
        {
            type: 'paragraph',
            text: `The decomposition recovers this three-way classification from the dynamics alone. It does not require knowing in advance which cells are load-bearing.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Null controls' },
        {
            type: 'paragraph',
            text: `At zero gain, the current-velocity term is exactly zero.`,
        },
        {
            type: 'paragraph',
            text: `A surrogate null that randomizes the directional asymmetry of the coupling phases reduces the current-velocity term to 4.4% of the wave-regime value. The residual comes from axonal conduction delay.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'What the leech adds' },
        {
            type: 'paragraph',
            text: String.raw`In the OU cascade, the drive parameter $\alpha$ was abstract. In the leech model, the drive is the coupling gain of a real circuit with identified cells.`,
        },
        {
            type: 'paragraph',
            text: `The same decomposition now separates three biological roles:

1. structure needed to create the regime;
2. functional links supported by that regime;
3. direct coupling links that behave as expected under structural perturbation.`,
        },
        {
            type: 'paragraph',
            text: `The framework does not require pre-labeling a connection as structural, load-bearing, or current-supported. It infers the class from how coupling, diffusion, precision, and current fit together.`,
        },
        { type: 'divider' },

        // ── Section 4: C. elegans ─────────────────────────────────────────────
        {
            type: 'heading',
            text: 'State-dependent current and neuropeptide circuit organization in freely behaving _C. elegans_',
        },
        {
            type: 'paragraph',
            text: String.raw`The decomposition predicts that a circuit can reorganize its functional connectivity without changing its wiring. In the linear-Gaussian case, the state-specific current organization is

$$
\Omega_s = D_s Q_s + A,
$$

where $A$ is coupling, $D_s$ is diffusion, and $Q_s$ is the precision matrix in state $s$. If $A$ is fixed, any change in $\Omega_s$ reflects a change in the circuit's driven dynamical state rather than a change in anatomy.`,
        },
        {
            type: 'paragraph',
            text: `_C. elegans_ is an unusually good test case. It has a known synaptic connectome, identified neurons across animals, whole-brain calcium recordings in freely behaving animals, a mapped neuropeptide ligand-receptor network, and an independent optogenetic perturbation atlas.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The behavioral contrast is also clean. During **dwelling**, the animal moves slowly, searches locally, and feeds. During **roaming**, it moves quickly and explores. The wiring is the same in both states; the neuromodulatory regime changes. That is exactly the setting where the framework predicts state-dependent reorganization of $\Omega$ without changes in $A$.`,
        },
        {
            type: 'paragraph',
            text: `We analyzed 40 whole-brain calcium recordings from freely behaving animals across 61 identified head-ganglion neurons. The analysis compared dwelling and roaming in three objects:

- the diffusion matrix $D$, which captures where new fluctuations enter the circuit;
- the precision matrix $Q$, which captures conditional dependence;
- the current organization $\\Omega = DQ + A$, which combines both.`,
        },
        {
            type: 'paragraph',
            text: `Raw GCaMP fluorescence is strongly affected by locomotion and posture, so the primary analysis used **CePNEM residuals**: neural activity after removing components explained by behavior. Raw z-scored GCaMP was used as a robustness coordinate. Unless noted otherwise, results below refer to CePNEM residuals.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Dataset and connectome classification' },
        {
            type: 'paragraph',
            text: `The 40 recordings identified between 29 and 96 neurons from the 61-neuron reference subgraph, yielding 1,830 unique undirected neuron pairs.`,
        },
        {
            type: 'paragraph',
            text: `Behavioral state epochs were defined from the CePNEM velocity score using locked segmentation parameters:

- exponentially weighted moving average timescale: 20 s;
- dwelling-roaming threshold: 0.284;
- transition exclusion: ±10 s;
- minimum bout duration: 10 s.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Neuron pairs were classified against two coupling references:

1. the Cook/Witvliet electron-microscopy connectome, including chemical synapses and gap junctions with threshold $\geq 1$ synapse, denoted $A_{\mathrm{raw}}$;
2. the Creamer connectome-constrained linear dynamical system, whose effective weight matrix $A_C$ was fitted to the Randi optogenetic perturbation data.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Pairs present in both references (**Class 1**, $n=219$) have both direct anatomical connectivity and perturbation-measurable effective coupling.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Pairs absent from both references (**Class 4**, $n=1,321$) have neither a known direct synapse nor a perturbation-derived effective weight. These pairs form the primary test set for current-supported organization.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Diffusion reorganizes across behavioral states' },
        {
            type: 'paragraph',
            text: String.raw`Before examining conditional dependence, we measured how diffusion changes between roaming and dwelling. The empirical diffusion matrix was estimated as

$$
D_{\mathrm{emp}} = \operatorname{Cov}(\Delta x),
$$

where

$$
\Delta x(t) = x(t+1) - x(t).
$$

The diagonal entry $D_{ii}$ measures neuron $i$'s frame-to-frame innovation amplitude: how much its next state changes relative to its current state. Off-diagonal entries capture shared instantaneous fluctuations between neuron pairs.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Roaming and dwelling produced distinct diffusion structures. The Spearman rank correlation between the full roaming and dwelling $D$ matrices was

$$
\rho = 0.14
$$

in CePNEM residuals. Behavioral state therefore reorganizes where fluctuations enter the circuit.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The reorganization was not uniform. During roaming, the largest increases in moment-to-moment variability appeared in **URXL**,

$$
\Delta D_{ii} = +0.208,
$$

and **URYVL**,

$$
\Delta D_{ii} = +0.149.
$$

URXL and URY neurons integrate ambient oxygen and carbon dioxide and regulate aerotaxis and locomotion. Both also express the PDF receptor _pdfr-1_, placing them downstream of a neuropeptide system associated with roaming.`,
        },
        {
            type: 'paragraph',
            text: String.raw`During dwelling, increased variability concentrated in **AIZL**,

$$
\Delta D_{ii} = -0.167,
$$

and **AVJR**,

$$
\Delta D_{ii} = -0.150.
$$

AIZL is involved in olfactory integration and local search, while AVJR participates in reversal control. The diffusion signature therefore tracks the behavioral demands of each state: gas-gradient sampling during roaming, local evaluation and reorientation during dwelling.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The diagonal of $D$ was approximately homogeneous across neurons. Total activity variance,

$$
D2 = \operatorname{Var}(x_i),
$$

had coefficient of variation 3.1% in CePNEM residuals. Frame-to-frame innovation variance,

$$
D3 = \operatorname{Var}(\Delta x_i),
$$

had coefficient of variation 9.3%. This near-uniformity supports diagonal or identity approximations of $D$ in the precision pipeline, while the full $D_{\mathrm{emp}}$ captures additional biological structure.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Diffusion and precision change along different axes' },
        {
            type: 'paragraph',
            text: String.raw`Because both $D$ and $Q$ change between states, the next question is whether they change together.`,
        },
        {
            type: 'paragraph',
            text: String.raw`They mostly do not. The Spearman correlation between vectorized state-difference matrices $\Delta D$ and $\Delta Q$ was

$$
\rho = -0.15,
$$

and was not statistically significant.`,
        },
        {
            type: 'paragraph',
            text: `In other words, the neurons that become more dynamically variable are not generally the same neurons that form new conditional-dependence relationships. Behavioral state reorganizes the circuit along two partly independent axes:

- **diffusion:** where new fluctuations enter;
- **precision:** which neurons become conditionally linked.`,
        },
        {
            type: 'paragraph',
            text: `A complete account of state-dependent circuit organization needs both.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Current organization identifies a PDF-receptor circuit linking food sensing to gas sensing during dwelling' },
        {
            type: 'paragraph',
            text: String.raw`The current organization combines diffusion and precision:

$$
\Omega = DQ + A.
$$

We computed the dwelling-roaming difference using the full empirical diffusion matrix in each state:

$$
\Delta \Omega
=
\Omega_{\mathrm{dwell}}
-
\Omega_{\mathrm{roam}}.
$$

Because $A$ is fixed across states, anatomy cancels:

$$
\Delta \Omega
=
D_{\mathrm{dwell}}Q_{\mathrm{dwell}}
-
D_{\mathrm{roam}}Q_{\mathrm{roam}}.
$$

This isolates state-dependent current reorganization.`,
        },
        {
            type: 'paragraph',
            text: String.raw`We then asked whether the strongest off-connectome entries of $\Delta\Omega$ were enriched for specific neuropeptide pathways. The hypothesis was that current-supported off-connectome structure reflects extrasynaptic neuromodulatory coupling rather than indirect synaptic pathways.`,
        },

        { type: 'subsubheading', text: 'Enrichment test' },
        {
            type: 'paragraph',
            text: String.raw`For each neuropeptide annotation, Class 4 pairs were ranked by $|\Delta\Omega|$. Two tests were used:

- **AUROC:** whether annotated pairs rank above unannotated pairs across all Class 4 pairs;
- **Fisher top-$K$ test:** whether annotated pairs are overrepresented among the top 20 entries.

Both tests used a degree-preserving permutation null with 10,000 permutations, preserving each neuron's degree in the synaptic and neuropeptide networks.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The broad neuropeptide annotation from the Ripoll-Sánchez connectome covered 972 of 1,321 Class 4 pairs, or 73.6%. That annotation was too dense to be informative and gave a null result:

$$
\mathrm{AUROC} = 0.50.
$$

The serotonin receptor annotation was sparse, covering 33 Class 4 pairs, or 2.5%, but was also null.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The _unc-31_-sensitive annotation from the Randi perturbation atlas covered 108 Class 4 pairs, or 8.2%, and was also null:

$$
\mathrm{AUROC} = 0.495,
\qquad
p = 0.656.
$$

The PDF receptor network was different.`,
        },

        { type: 'subsubheading', text: 'The PDF receptor network is enriched' },
        {
            type: 'paragraph',
            text: `The PDF signaling system consists of neuropeptides encoded by _pdf-1_ and _pdf-2_ acting through the receptor _pdfr-1_. A directed pair $i \\to j$ was PDF-annotated when neuron $i$ expressed _pdf-1_ or _pdf-2_ and neuron $j$ expressed _pdfr-1_.`,
        },
        {
            type: 'paragraph',
            text: String.raw`This annotation identified 61 of 1,321 Class 4 pairs, a density of 4.6%. That is sparse enough for enrichment testing.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Under the full current organization $\Omega$, PDF-annotated Class 4 pairs were significantly enriched among the strongest $|\Delta\Omega|$ entries in CePNEM residuals:

$$
\mathrm{AUROC} = 0.664,
\qquad
p = 0.004.
$$

The Fisher test on the top 20 entries gave

$$
\mathrm{odds\ ratio} = 7.2,
\qquad
p = 0.002.
$$

PDF-annotated pairs were therefore overrepresented among the strongest current-difference entries at more than seven times their base rate.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The signal was absent in raw GCaMP coordinates:

$$
\mathrm{AUROC} = 0.541,
\qquad
p = 0.18.
$$

That pattern is consistent with a neural-state signal masked by movement-correlated kinematics in the raw fluorescence.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'The PDF-receptor circuit' },
        {
            type: 'paragraph',
            text: `The top-ranked Class 4 PDF pairs revealed a specific circuit.`,
        },
        {
            type: 'paragraph',
            text: `The dominant source was **ADEL**, a dopaminergic anterior deirid mechanosensor that detects bacterial substrate texture. ADEL triggers the basal slowing response when the animal encounters a bacterial lawn and helps initiate dwelling. It also expresses _pdf-1_, making it a source in the PDF network.`,
        },
        {
            type: 'paragraph',
            text: `Secondary sources were:

- **RMEL** and **RMER**, GABAergic ring motor neurons involved in head movement, both expressing _pdf-1_;
- **RID**, an unpaired locomotion-modulating neuron that releases dense-core vesicles and expresses both _pdf-1_ and _pdf-2_.`,
        },
        {
            type: 'paragraph',
            text: `The primary targets were:

- **URYVR** and **URYDL**, gas-sensing neurons involved in oxygen and carbon dioxide integration;
- **URXL**, an oxygen sensor that links ambient gas levels to locomotion state.`,
        },
        {
            type: 'paragraph',
            text: `All targets express _pdfr-1_ at the conservative CeNGEN threshold. None of the source-target pairs has a direct synapse in the Cook/Witvliet connectome, and none has a significant effective weight in the Creamer model.`,
        },
        {
            type: 'paragraph',
            text: `All top-ranked PDF pairs were dwelling-dominant. During dwelling, the food-detection circuit centered on ADEL and the gas-sensing circuit centered on URY/URX become functionally coordinated through _pdf-1/pdfr-1_ signaling. During roaming, that coordination is absent.`,
        },
        {
            type: 'paragraph',
            text: `The neurons, wiring, and receptor machinery are present in both states. What changes is the dynamical regime.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Cross-reference with the perturbation atlas' },
        {
            type: 'paragraph',
            text: `Several identified pairs have independent measurements in the Randi optogenetic perturbation atlas.`,
        },
        {
            type: 'paragraph',
            text: String.raw`**RMER $\to$ URYVR** is a significant functional connection in wild-type animals:

$$
q < 0.001,
$$

with 8 stimulation-recording instances.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The **RMEL-RMER** coupling is also significant:

$$
q < 0.001.
$$

The **RMEL/RMER $\to$ OLL** connection is _unc-31_-sensitive:

$$
q < 0.01.
$$

That means the functional coupling requires dense-core vesicle release and disappears in neuropeptide-deficient mutants.`,
        },
        {
            type: 'paragraph',
            text: String.raw`For **ADEL $\to$ RMEL**, the atlas contains five instances, but the pair is non-significant in the state-averaged immobilized preparation:

$$
q = 0.49.
$$

That is consistent with a dwelling-specific coupling diluted by state-averaged measurement.`,
        },
        {
            type: 'paragraph',
            text: `The most important prospective predictions are **ADEL $\\to$ URYVR** and **ADEL $\\to$ URYDL**. These pairs have zero direct co-observation instances in the perturbation atlas: ADEL was stimulated in sessions where URYVR and URYDL were not co-identified in the same animals. They have not been tested and found null; they have not been directly measured.`,
        },
        {
            type: 'paragraph',
            text: `The prediction is specific:`,
        },
        {
            type: 'pullquote',
            text: `During dwelling, optogenetic activation of ADEL should produce calcium responses in URYVR and URYDL. The response should be absent during roaming, require dense-core vesicle release, and disappear in _pdfr-1_ mutants.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Precision alone recovers the same circuit, but more weakly' },
        {
            type: 'paragraph',
            text: String.raw`To test whether the PDF circuit depends on the diffusion term in $\Omega$, we repeated the enrichment analysis using the precision difference alone:

$$
\Delta Q
=
Q_{\mathrm{dwell}}
-
Q_{\mathrm{roam}}.
$$

With a diagonal approximation to $D$, the current and precision differences are nearly identical:

$$
\rho(\Delta\Omega, \Delta Q) = 0.998.
$$

With the full empirical diffusion matrix, they diverge:

$$
\rho(\Delta\Omega, \Delta Q) = 0.566.
$$

So $D$ contributes real information to the current analysis.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Even so, $\Delta Q$ alone recovered the same biological organization:

$$
\mathrm{AUROC} = 0.556,
\qquad
p = 0.023,
$$

with Fisher enrichment among the top 20 pairs:

$$
\mathrm{odds\ ratio} = 5.456,
\qquad
p = 0.008.
$$

The same source neurons - ADEL, RMEL, RMER, and RID - and the same targets - URYVR, URYDL, and URXL - dominated the ranking.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The enrichment was weaker than in the full current analysis:

$$
0.556 \quad \text{vs.} \quad 0.664.
$$

The reason is that 31 PDF-annotated pairs contributing to $\Delta\Omega$ had $\Delta Q = 0$. They were not selected by the graphical lasso but became active once diffusion mixing was included. The suppressed signal was carried mainly by RID, RMER, RMEL, and ADEL.`,
        },
        {
            type: 'paragraph',
            text: `The ADEL-URY coupling appeared in both $\\Omega$ and $Q$, making it the most robust element of the result.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The PDF signal remained absent in raw GCaMP coordinates under both analyses:

$$
\mathrm{AUROC}_{\Omega} = 0.541,
\qquad
p = 0.18,
$$

and

$$
\mathrm{AUROC}_{Q} = 0.526,
\qquad
p = 0.261.
$$

All subsequent interpretations therefore refer to CePNEM residuals.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'A scalar PDF-gain model fails' },
        {
            type: 'paragraph',
            text: String.raw`A simple model might explain the result by adding one state-dependent PDF gain to the effective coupling matrix:

$$
J_{\mathrm{eff}}(\alpha) = J + \alpha P,
$$

where $J = A_C$ is the Creamer effective coupling matrix, $P$ is the PDF receptor graph, and $\alpha$ is a scalar gain.

In this model,

$$
\alpha_{\mathrm{dwell}} > 0,
\qquad
\alpha_{\mathrm{roam}} = 0.
$$

That is, the PDF receptor circuit becomes uniformly more effective during dwelling.`,
        },
        {
            type: 'paragraph',
            text: String.raw`This model failed. No value of $\alpha$ produced a consistent correspondence between the predicted and observed pair-specific rankings:

$$
\Delta Q_{\mathrm{pred}}
\not\sim
\Delta Q_{\mathrm{obs}}.
$$

The dwelling PDF organization is therefore not captured by a single uniform receptor-gain parameter. It appears to involve pair-specific circuit dynamics.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'The ADEL-URY signal is not explained by simple activity statistics' },
        {
            type: 'paragraph',
            text: `The ADEL-URY signal could reflect shared state modulation, pairwise correlation, or genuinely multivariate network structure. To distinguish these possibilities, we examined the activity of ADEL, URYVR, URYDL, URXL, RMEL, and RMER directly.`,
        },
        {
            type: 'paragraph',
            text: String.raw`No neuron showed a significant mean activity difference between roaming and dwelling:

$$
p > 0.05
$$

for all tested neurons.`,
        },
        {
            type: 'paragraph',
            text: `The network was not uniformly modulated. URYVR and URYDL trended higher during roaming, RMEL and RMER trended lower, and ADEL remained approximately unchanged. This rules out the simplest explanation, in which all members of the circuit move together with behavioral state.`,
        },
        {
            type: 'paragraph',
            text: `Pairwise correlations were also weak. The strongest state-dependent marginal relationship was ADEL-RMEL, whose cross-correlation increased from`,
        },
        {
            type: 'paragraph',
            text: String.raw`$$
0.090
$$

during dwelling to

$$
0.189
$$

during roaming. The ADEL-URY pairs changed only modestly, by roughly 10-35%, and all cross-correlation peaks occurred near zero lag. No robust lead-lag structure was visible in pairwise activity.`,
        },
        {
            type: 'paragraph',
            text: `Transition-triggered averages showed reproducible asymmetries, but not causal ordering. Across 172 dwelling-to-roaming and 174 roaming-to-dwelling transitions:

- during dwelling-to-roaming transitions, RMEL crossed threshold first at 0.2 s, followed by URXL at 2.6 s and URYVR at 3.4 s;
- during roaming-to-dwelling transitions, URYVR crossed first at 1.4 s, followed by ADEL at 2.0 s and URXL at 2.2 s.`,
        },
        {
            type: 'paragraph',
            text: `These timings mark threshold crossings of the average transition-aligned trajectory. They are not activation latencies or evidence of neuron-to-neuron causality.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Module-level activity told the same story. A dopamine/mechanosensory module, combining ADEL and CEP neurons, and an aerotaxis module, combining URY and URX neurons, showed weak correlations:

$$
r \approx 0.16.
$$

The correlations were effectively identical between roaming and dwelling:

$$
p = 0.975.
$$

The ADEL-URY signal is therefore not explained by activity level, pairwise synchrony, transition timing, or module co-activation. It appears only after conditioning on the rest of the network.`,
        },
        {
            type: 'paragraph',
            text: `That is the key point: a pair of neurons can show little change in mean activity, little pairwise correlation, and no module-level co-activation while still becoming conditionally linked through a broader network reconfiguration.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'State-specific current integrates diffusion and precision' },
        {
            type: 'paragraph',
            text: String.raw`The diffusion structure $D$ and precision matrix $Q$ are not separate stories. Both are consequences of the same state-specific current organization:

$$
\Omega_s = D_s Q_s + A.
$$

With $A$ fixed across behavioral states, the roaming-dwelling change is

$$
\Delta \Omega_{\mathrm{ss}}
=
\Omega_{\mathrm{roam}}
-
\Omega_{\mathrm{dwell}}
=
D_{\mathrm{roam}}Q_{\mathrm{roam}}
-
D_{\mathrm{dwell}}Q_{\mathrm{dwell}}.
$$

Adding and subtracting $D_{\mathrm{roam}}Q_{\mathrm{dwell}}$ gives

$$
\boxed{
\Delta \Omega_{\mathrm{ss}}
=
D_{\mathrm{roam}}\Delta Q
+
\Delta D\,Q_{\mathrm{dwell}}
}
$$`,
        },
        {
            type: 'paragraph',
            text: String.raw`The first term,

$$
D_{\mathrm{roam}}\Delta Q,
$$

is precision reorganization weighted by the roaming diffusion structure. It shows which conditional-dependence changes are amplified by the fluctuations that dominate roaming.

The second term,

$$
\Delta D\,Q_{\mathrm{dwell}},
$$

is diffusion reorganization projected through the dwelling precision structure. It shows which changes in moment-to-moment variability are routed through the dwelling conditional-dependence architecture.

Neither term is the whole state change. Together they define the current reorganization. Swapping the reference state gives the analogous decomposition in the opposite frame.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'What the _C. elegans_ analysis shows' },

        { type: 'subsubheading', text: 'A PDF-receptor circuit links food sensing to gas sensing during dwelling' },
        {
            type: 'paragraph',
            text: `The strongest state-dependent off-connectome conditional-dependence changes link the food-sensing neuron ADEL to the gas-sensing neurons URY and URX during dwelling. These pairs are annotated by the _pdf-1/pdfr-1_ signaling network but absent from both the anatomical connectome and the perturbation-derived effective coupling model.`,
        },
        {
            type: 'paragraph',
            text: `The result identifies a dwelling-specific PDF-associated coordination structure between food sensing and gas sensing. That organization is absent during roaming.`,
        },
        {
            type: 'paragraph',
            text: `The behavioral logic is natural: once the animal has committed to local dwelling on a food patch, integrating substrate quality through ADEL with ambient oxygen and carbon dioxide through URY/URX could help regulate whether the animal remains on the patch or exits.`,
        },
        {
            type: 'paragraph',
            text: `The mechanism is also testable. Related RMEL/RMER connections are independently confirmed as neuropeptide-dependent in the perturbation atlas. The predicted ADEL-to-URY links should now be tested directly in a state-conditioned perturbation experiment.`,
        },

        { type: 'subsubheading', text: 'Behavioral state redistributes innovation into state-relevant neurons' },
        {
            type: 'paragraph',
            text: `Roaming and dwelling differ strongly in diffusion structure. Roaming increases fluctuation amplitude in gas-sensing neurons URXL and URYVL, consistent with exploratory locomotion and environmental gas-gradient monitoring. Dwelling shifts variability toward AIZL and AVJR, consistent with local sensory evaluation and reorientation.`,
        },
        {
            type: 'paragraph',
            text: `The state dependence is structured, not global. Roaming amplifies fluctuations in systems that guide exploration; dwelling amplifies fluctuations in circuits supporting local assessment and search.`,
        },

        { type: 'subsubheading', text: 'Diffusion and precision reorganize independently' },
        {
            type: 'paragraph',
            text: `Diffusion answers the question: **who becomes dynamically variable?**`,
        },
        {
            type: 'paragraph',
            text: `Precision answers the question: **who becomes conditionally linked?**`,
        },
        {
            type: 'paragraph',
            text: String.raw`In this dataset, the two answers mostly differ:

$$
\rho(\Delta D,\Delta Q) = -0.15.
$$

That independence is why $\Omega$ is useful. It combines two forms of state reorganization that are individually meaningful but not redundant.`,
        },

        { type: 'subsubheading', text: 'The current improves the biological signal' },
        {
            type: 'paragraph',
            text: String.raw`The full current organization identified the PDF-receptor circuit more strongly than precision alone:

$$
\mathrm{AUROC}_{\Delta\Omega} = 0.664,
\qquad
\mathrm{AUROC}_{\Delta Q} = 0.556.
$$

The diffusion contribution recovered 31 additional PDF-annotated pairs attenuated in the regularized precision estimate. The biological interpretation was unchanged, but the current provided a more sensitive view.`,
        },

        { type: 'subsubheading', text: 'The links are current-supported' },
        {
            type: 'paragraph',
            text: `The ADEL-URY and RMEL/RMER-URY couplings are absent from both the synaptic connectome and the perturbation-derived effective coupling model. Standard functional connectivity can identify these links, but it cannot say what supports them.`,
        },
        {
            type: 'paragraph',
            text: `The current-velocity decomposition classifies them as current-supported: present in the dwelling regime, absent in roaming, and lacking a structural counterpart. The predicted way to dissolve them is not to cut a synapse, but to change the neuromodulatory state - by suppressing the PDF receptor circuit or shifting the animal out of dwelling.`,
        },

        { type: 'subsubheading', text: 'What the framework requires' },
        {
            type: 'paragraph',
            text: `The _C. elegans_ analysis also clarifies when the diagnostic is most useful.`,
        },
        {
            type: 'paragraph',
            text: `The coupling matrix must be known at the coordinate scale of the analysis. Many identified neurons must be recorded simultaneously. Validation annotations must be sparse enough to be informative: the broad neuropeptide annotation covered 73.6% of Class 4 pairs and was too dense; the PDF annotation covered 4.6% and was useful. Behavioral-state labels must be defined in a coordinate that does not simply reproduce movement artifacts. And validation should be state-conditioned, not state-averaged.`,
        },
        {
            type: 'paragraph',
            text: `Those requirements are not specific to _C. elegans_. They are the practical conditions for using current-supported structure to make mechanistic predictions in any neural circuit.`,
        },
        { type: 'divider' },

        // ── Section 5: Comparison ─────────────────────────────────────────────
        {
            type: 'heading',
            text: 'Comparison with existing methods',
        },
        {
            type: 'paragraph',
            text: `The current-velocity framework sits at the intersection of several literatures: precision-matrix functional connectivity, nonequilibrium brain dynamics, diffusion/noise modeling, state-dependent circuit reconfiguration, and _C. elegans_ neuromodulatory connectomics.`,
        },
        {
            type: 'paragraph',
            text: `Each captures part of the problem. None separates functional links into coupling-supported and current-supported components, link by link.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Precision-matrix methods estimate conditional dependence, not mechanism' },
        {
            type: 'paragraph',
            text: `Graphical lasso and related precision-matrix methods are now standard tools for functional connectivity. They estimate the precision matrix $Q$, whose off-diagonal entries describe conditional dependence: whether two variables remain linked after accounting for the rest of the system.`,
        },
        {
            type: 'paragraph',
            text: `That is useful because precision methods reduce many indirect-path confounds that affect ordinary correlations. They have been applied across fMRI, MEG, and calcium imaging, and structurally constrained versions can incorporate anatomical information. Wodeyar and Srinivasan (2022), for example, used a structurally constrained adaptive graphical lasso for MEG partial coherence, with edges constrained by the structural connectome. That is close in spirit to the anatomy-guided lasso used in the _C. elegans_ analysis.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The limitation is interpretive. These methods often treat $Q$ as a proxy for structural coupling. That assumes the equilibrium relation

$$
J = -DQ.
$$

In a driven system, this relation does not hold. The precision matrix contains both coupling-supported and current-supported entries.`,
        },
        {
            type: 'paragraph',
            text: String.raw`So graphical lasso can tell you that a conditional-dependence link exists. It cannot tell you whether the link reflects direct coupling, a nonequilibrium current, or both. It also cannot tell you which intervention should remove the link.

The current-velocity decomposition keeps the useful part of precision methods - the conditional-dependence estimate - but changes the interpretation. A nonzero entry in $Q$ is not automatically a structural link. It becomes interpretable only after comparing it with $A$, $D$, and $\Omega$.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Entropy production measures nonequilibrium, but usually in aggregate' },
        {
            type: 'paragraph',
            text: `The closest conceptual relatives come from nonequilibrium statistical mechanics.`,
        },
        {
            type: 'paragraph',
            text: `Lynn et al. (2021) used broken detailed balance to study macroscopic brain dynamics in fMRI. Their analysis used antisymmetric fluxes between neural states, closely related to stationary current, to estimate entropy production across cognitive tasks. The main result was that task engagement and exertion increase departures from equilibrium.`,
        },
        {
            type: 'paragraph',
            text: `Gilson, Tagliazucchi, and Cofré (2023) extended related ideas using multivariate Ornstein-Uhlenbeck models fitted to fMRI recordings. They found that entropy production varies with level of consciousness across the wakefulness-to-deep-sleep transition. Reviews of nonequilibrium brain dynamics make a similar broad point: cognition, arousal, and task demand tend to increase irreversibility relative to rest.`,
        },
        {
            type: 'paragraph',
            text: `This literature asks:

> How far from equilibrium is the system?

The current-velocity framework asks a different question:

> Which functional links are supported by coupling, and which are supported by current?`,
        },
        {
            type: 'paragraph',
            text: String.raw`That difference matters. Aggregate entropy production can show that a brain state is nonequilibrium, but it does not classify individual entries of the conditional-dependence graph. The current-velocity identity,

$$
\partial v = J - DH,
$$

does. It decomposes the discrepancy link by link.

This also changes the biological readout. Instead of saying that one state is more irreversible than another, the analysis can ask whether specific current-supported links are enriched for a receptor system, neuropeptide pathway, or other molecular mechanism.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Structurally informed effective connectivity integrates anatomy, but not current support' },
        {
            type: 'paragraph',
            text: `Structurally informed effective-connectivity methods also connect structure and function, but with a different goal.`,
        },
        {
            type: 'paragraph',
            text: `For example, Greaves, Novelli, and Razi (2025) studied structurally informed effective connectivity and found that structural connectivity predicts the prior variance of effective connectivity across sessions and samples. This kind of work integrates anatomical priors with directed effective-connectivity models, often at the brain-region scale.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The limitation is that these models require a pre-specified generative architecture and produce effective-connectivity estimates. They do not decompose each functional link into coupling-supported and current-supported parts.

The current-velocity approach is narrower but more diagnostic. Given a coupling matrix $A$, diffusion $D$, and precision $Q$, it asks whether a particular conditional-dependence link has a structural counterpart or is maintained by the driven state.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Diffusion is usually treated as noise, not biology' },
        {
            type: 'paragraph',
            text: `The diffusion matrix $D$ is often treated as a nuisance parameter: a modeling assumption, a diagonal noise term, or a per-neuron variance scale.`,
        },
        {
            type: 'paragraph',
            text: String.raw`That misses information. In the current-velocity framework, $D$ describes where new fluctuations enter the circuit. The empirical estimate

$$
D_{\mathrm{emp}} = \operatorname{Cov}(\Delta x)
$$

can itself be biologically structured.`,
        },
        {
            type: 'paragraph',
            text: String.raw`In the _C. elegans_ analysis, diffusion did not simply mirror the precision matrix. The state difference in diffusion, $\Delta D$, and the state difference in precision, $\Delta Q$, were largely independent:

$$
\rho(\Delta D,\Delta Q) = -0.15.
$$

That means "who fluctuates more?" and "who becomes conditionally linked?" are different questions.`,
        },
        {
            type: 'paragraph',
            text: `This distinction is not usually made in graphical-model or effective-connectivity work. Wide-field calcium imaging studies in mice, for example, have shown that locomotion and arousal reshape brain-wide activity patterns, but these effects are often described using correlations, principal components, or mean activity changes rather than innovation covariance. Similarly, arousal-embedding work characterizes behavioral modulation of cortical activity but generally does not treat frame-to-frame fluctuation covariance as a biological object separate from conditional dependence.`,
        },
        {
            type: 'paragraph',
            text: `The current framework gives $D$ a direct role. It is not just noise around the model; it is one component of the state-dependent current.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'State-dependent functional connectivity is well known' },
        {
            type: 'paragraph',
            text: `The phenomenon itself is not new. Functional connectivity changes across behavioral and cognitive states in many systems.`,
        },
        {
            type: 'paragraph',
            text: `In human neuroimaging, task-state functional connectivity differs from resting-state connectivity, and task-state connectivity improves activity-flow predictions across tasks. In mice, cortex-wide neural dynamics predict behavioral state and contribute to dynamic resting-state correlations. Across systems, functional connectivity is not static.`,
        },
        {
            type: 'paragraph',
            text: `The neuromodulatory interpretation also has a long history. Bargmann's 2012 review articulated the core idea clearly: neuromodulators reshape excitability, synaptic function, and circuit dynamics so that one anatomical connectome can support multiple functional circuits. Some circuits are active in one state and latent in another.`,
        },
        {
            type: 'paragraph',
            text: `The current-velocity framework formalizes that intuition. It supplies a quantitative criterion for deciding whether a particular link is coupling-supported or current-supported, and it predicts which class of intervention should dissolve it.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: '_C. elegans_ state dependence has been studied, but mostly through activity and connectivity changes' },
        {
            type: 'paragraph',
            text: `Roaming and dwelling in _C. elegans_ are already well studied. Kim and Flavell (2021) used calcium imaging in freely moving animals to characterize stereotyped neural activity patterns associated with each foraging state. They showed that mutual inhibition between serotonergic and PDF-expressing neurons helps stabilize the roaming and dwelling states.`,
        },
        {
            type: 'paragraph',
            text: `That work established the circuit logic of state control, but it did not ask whether state-dependent functional links are structural or current-supported.`,
        },
        {
            type: 'paragraph',
            text: String.raw`A particularly relevant computational comparison is the dLDS analysis of _C. elegans_ calcium imaging by Yezerets, Mudrik, and Charles (2025). The dLDS framework learns decomposed linear operators that can be recombined across contexts, capturing changes in sensory-neuron connectivity during adaptation and broader interneuron connectivity shifts across environments and behavioral states. It also emphasizes that the anatomical connectome is insufficient, especially because long-range neuropeptide signaling does not align neatly with synaptic wiring.`,
        },
        {
            type: 'paragraph',
            text: `That is very close in spirit. The difference is classification. dLDS can detect context-dependent connectivity changes, but it does not determine whether a detected link is structural or maintained by the current neuromodulatory state. It learns connectivity patterns from data rather than using the known coupling matrix $A$ to classify mechanism link by link.`,
        },
        {
            type: 'paragraph',
            text: `The Randi perturbation atlas and the Ripoll-Sánchez neuropeptide connectome provide the key biological context. Randi et al. showed that the anatomical connectome underpredicts functional signal propagation and that some functional links are neuropeptide-dependent. Ripoll-Sánchez et al. mapped the ligand-receptor network that may explain part of that structure-function gap.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The current-velocity analysis uses those resources differently. It asks which off-connectome links are active in a particular behavioral state, whether they are enriched for a specific ligand-receptor pathway, and which perturbations should eliminate them.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Summary of related methods' },
        {
            type: 'table',
            text: String.raw`| Capability | Graphical lasso FC | Entropy production / broken detailed balance | DCM / OU effective connectivity | dLDS | **Current-velocity** |
| --- | --- | --- | --- | --- | --- |
| Estimates conditional dependence $Q$ | Yes | No | No | No | Yes |
| Uses anatomical coupling $A$ | Partly | No | Yes | No | Yes |
| Measures aggregate nonequilibrium | No | Yes | Partly | No | Yes |
| Classifies links as coupling- or current-supported | No | No | No | No | **Yes** |
| Treats diffusion $D$ as biological information | No | No | Rarely | No | **Yes** |
| Identifies molecular mechanisms for links | No | No | No | No | **Yes** |
| Predicts the intervention that should dissolve a link | No | No | No | No | **Yes** |
| Applies to state-conditioned _C. elegans_ data | No | No | No | Yes | **Yes** |`,
        },
        {
            type: 'paragraph',
            text: `State-dependent functional connectivity is well established, and neuromodulation has long been recognized as one way a fixed connectome can generate multiple circuit regimes. The contribution here is a link-level decomposition: it separates coupling-supported from current-supported functional links, connects current-supported structure to candidate molecular mechanisms, and predicts the intervention class expected to remove each link.`,
        },
        { type: 'divider' },

        // ── Section 6: Methods ────────────────────────────────────────────────
        {
            type: 'heading',
            text: 'Methods for the _C. elegans_ analysis',
        },
        { type: 'subheading', text: 'Data' },
        {
            type: 'paragraph',
            text: `The analysis used 40 whole-brain calcium recordings from freely behaving _C. elegans_ hermaphrodites expressing GCaMP6s and NeuroPAL.`,
        },
        {
            type: 'paragraph',
            text: `GCaMP6s reports neural activity through calcium-dependent fluorescence. NeuroPAL provides multicolor identity labels, allowing neurons to be matched across animals. Each recording identified 29-96 neurons from a 61-neuron head-ganglion reference subgraph, with per-neuron identification rates ranging from 79% to 100%.`,
        },
        {
            type: 'paragraph',
            text: `Neural traces were analyzed in two coordinate systems:

- **CePNEM residuals:** the primary coordinate. CePNEM decomposes each calcium trace into components explained by behavior - locomotion velocity, body posture, and reversal frequency - and an unexplained residual. The residual removes movement-correlated fluorescence and isolates neural-state structure not directly attributable to kinematics.
- **Raw GCaMP:** z-scored raw fluorescence traces, used as a robustness coordinate.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Behavioral segmentation' },
        {
            type: 'paragraph',
            text: `Roaming and dwelling epochs were defined from the CePNEM locomotion velocity score.`,
        },
        {
            type: 'paragraph',
            text: `The velocity score was smoothed with an exponentially weighted moving average using a 20 s timescale. A threshold of 0.284, chosen from the trough of the bimodal velocity-score distribution, separated dwelling from roaming.`,
        },
        {
            type: 'paragraph',
            text: `Frames within 10 s of a state boundary were excluded, and bouts shorter than 10 s after boundary exclusion were discarded.`,
        },
        {
            type: 'paragraph',
            text: `All segmentation parameters were locked before neural analysis.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Missing data and pairwise covariance' },
        {
            type: 'paragraph',
            text: `A complete-case analysis would require all 61 neurons to be identified in every recording. In practice, the complete intersection contained only 4-13 neurons depending on the behavioral-state pool, too few for the 61-neuron analysis.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The analysis therefore used pairwise available-case covariance. For each neuron pair $(i,j)$ and behavioral state $s$, the sample covariance $S_{ij}^{(s)}$ was computed from all recordings in which both neurons were co-identified and the recording contributed at least one retained epoch in state $s$.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Typical pairwise co-observation support was 14-19 recordings, with median support around 16. The primary predicted pairs had the following support:

| Pair | Recordings | Effective sample size |
| --- | ---: | ---: |
| ADEL-URYVR | 15 | 882 |
| ADEL-URYDL | 14 | 1,094 |`,
        },
        {
            type: 'paragraph',
            text: String.raw`The effective sample size, $n_{\mathrm{eff}}$, accounted for temporal autocorrelation by integrating the normalized cross-product autocorrelation function.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The assembled $61 \times 61$ covariance matrix was projected onto the positive semi-definite cone by eigenvalue clipping with floor $10^{-6}$. In the real data, the clipped fraction was 0, so the assembled matrices were already positive semi-definite.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Connectome classification' },
        {
            type: 'paragraph',
            text: `Neuron pairs were classified against two references:

1. **Anatomical reference:** the Cook/Witvliet electron-microscopy connectome, including chemical synapses and gap junctions with threshold $\\geq 1$ synapse. This matrix is denoted $A_{\\mathrm{raw}}$.
2. **Dynamical reference:** the Creamer connectome-constrained linear dynamical system, whose effective coupling matrix $A_C$ was fitted to the Randi optogenetic perturbation data.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The four pair classes were:

| Class | Definition | Number of pairs |
| --- | --- | ---: |
| Class 1 | on $A_{\mathrm{raw}}$, on $A_C$ | 219 |
| Class 2 | on $A_{\mathrm{raw}}$, outside $A_C$ subspace | 41 |
| Class 3 | off $A_{\mathrm{raw}}$, outside $A_C$ subspace | 249 |
| Class 4 | off $A_{\mathrm{raw}}$, off $A_C$ | 1,321 |

Class 4 was the primary analysis set because these pairs lack both known direct anatomy and perturbation-derived effective coupling.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Diffusion estimation' },
        {
            type: 'paragraph',
            text: String.raw`The empirical diffusion matrix was estimated as the covariance of consecutive frame differences:

$$
D_{\mathrm{emp}} = \operatorname{Cov}(\Delta x),
$$

where

$$
\Delta x(t) = x(t+1) - x(t).
$$

All retained frames within each behavioral state were pooled before computing $D_{\mathrm{emp}}$.

The entry $(i,j)$ measures how strongly the frame-to-frame changes of neurons $i$ and $j$ co-fluctuate instantaneously.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Two diagonal approximations were also computed:

$$
D2 = \operatorname{diag}(\operatorname{Var}(x_i)),
$$

the total activity variance, and

$$
D3 = \operatorname{diag}(\operatorname{Var}(\Delta x_i)),
$$

the frame-to-frame innovation variance.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Homogeneity of the diagonal was assessed by the coefficient of variation. State-dependence of diffusion was measured by Spearman rank correlation between vectorized roaming and dwelling $D$ matrices. Per-neuron state specificity was computed as

$$
\Delta D_{ii}
=
D_{ii}^{\mathrm{roam}}
-
D_{ii}^{\mathrm{dwell}}.
$$

Independence of diffusion and precision reorganization was assessed by Spearman correlation between vectorized $\Delta D$ and $\Delta Q$ across all 1,830 pairs.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Current reconstruction' },
        {
            type: 'paragraph',
            text: String.raw`The current-velocity matrix was reconstructed as

$$
\Omega = DQ + A.
$$

Five specifications of $D$ were tested:

1. identity;
2. diagonal $D2$;
3. diagonal $D3$;
4. full empirical $D_{\mathrm{emp}}$;
5. state-specific empirical $D_{\mathrm{emp}}$, estimated separately for roaming and dwelling.

For each specification, the state difference was computed as

$$
\Delta\Omega
=
\Omega_{\mathrm{dwell}}
-
\Omega_{\mathrm{roam}}.
$$

The resulting $\Delta\Omega$ was compared with $\Delta Q$ by Spearman rank correlation over Class 4 pairs, measuring how much the diffusion term differentiates current organization from precision alone.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Precision estimation' },
        { type: 'subsubheading', text: 'Discovery estimator' },
        {
            type: 'paragraph',
            text: `The discovery analysis used graphical lasso on the PSD-projected pairwise covariance matrix for each state and coordinate.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The regularization parameter was

$$
\lambda = 0.15.
$$

This value was selected during pre-analysis synthetic validation as the value maximizing the Youden index,

$$
\mathrm{TPR} - \mathrm{FPR}.
$$

On synthetic data matching the corpus missingness pattern, it achieved

$$
\mathrm{TPR} = 0.973,
\qquad
\mathrm{FPR} = 0.033.
$$`,
        },
        {
            type: 'paragraph',
            text: `Stability selection used recording-level bootstrap resampling. Each of 25 bootstrap iterations sampled half the recordings without replacement, recomputed the pairwise covariance, and reran graphical lasso. The stability score for an edge was the fraction of bootstrap iterations selecting it.`,
        },
        {
            type: 'paragraph',
            text: `The stability threshold was set to 0.75, again selected by synthetic validation.`,
        },
        { type: 'subsubheading', text: 'Confirmation estimator' },
        {
            type: 'paragraph',
            text: String.raw`The confirmation analysis used an anatomy-guided ADMM lasso with different penalties for on- and off-connectome pairs:

$$
\lambda_{\mathrm{on}} = 0.01,
\qquad
\lambda_{\mathrm{off}} = 0.10.
$$

These values were chosen in pre-analysis validation to maximize true positive rate subject to

$$
\mathrm{FPR} \leq 0.05.
$$

A circularity control confirmed that the anatomy-guided penalty did not create systematic bias toward or against neuropeptide-annotated pairs.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Enrichment tests' },
        {
            type: 'paragraph',
            text: `Enrichment was tested over the 1,321 Class 4 pairs.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The primary statistic was AUROC. Annotated pairs were treated as positives, and all Class 4 pairs were ranked by either $|\Delta\Omega|$ or $|\Delta Q|$. AUROC measures whether annotated pairs rank systematically above unannotated pairs.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The secondary statistic was a Fisher exact test on the top $K$ pairs. The contingency table was

$$
\text{annotated/unannotated}
\times
\text{top-}K\text{/remaining}.
$$

The threshold was

$$
K = 20,
$$

selected by enrichment calibration with type-I error 0.04 and enrichment power 1.00 at odds ratio 2.`,
        },
        {
            type: 'paragraph',
            text: `Two null models were used:

- **Simple permutation:** randomly reassign annotation labels while preserving label count.
- **Degree-preserving permutation:** randomly rewire the annotation network while preserving each neuron's synaptic degree in $A_{\\mathrm{raw}}$ and neuropeptide degree in the Ripoll-Sánchez network.`,
        },
        {
            type: 'paragraph',
            text: `The degree-preserving permutation null, with 10,000 permutations, was the primary null reported throughout.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Annotation sources were:

| Annotation | Class 4 pairs | Density | Source |
| --- | ---: | ---: | --- |
| PDF receptor | 61 | 4.6% | directed _pdf-1_/_pdf-2_ source $\to$ _pdfr-1_ target from CeNGEN and Bentley multilayer connectome |
| Serotonin receptor | 33 | 2.5% | analogous ligand-receptor annotation |
| Broad neuropeptide | 972 | 73.6% | Ripoll-Sánchez neuropeptide connectome |
| _unc-31_-sensitive | 108 | 8.2% | Randi perturbation atlas |`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Scalar PDF-gain forward model' },
        {
            type: 'paragraph',
            text: String.raw`A scalar forward model tested whether the PDF result could be explained by a uniform state-dependent gain:

$$
J_{\mathrm{eff}}(\alpha)
=
A_C + \alpha P,
$$

where $P$ is the directed Class 4 PDF annotation graph, from _pdf-1_/_pdf-2_ source to _pdfr-1_ target.

The model assumed

$$
\alpha_{\mathrm{dwell}} > 0,
\qquad
\alpha_{\mathrm{roam}} = 0.
$$

For each $\alpha$, the predicted precision matrix $Q_{\mathrm{pred}}(\alpha)$ was obtained from the Lyapunov equation

$$
J_{\mathrm{eff}}(\alpha)\Sigma
+
\Sigma J_{\mathrm{eff}}(\alpha)^\top
+
2D
=
0,
$$

with $D = I$.`,
        },
        {
            type: 'paragraph',
            text: String.raw`The predicted state difference $\Delta Q_{\mathrm{pred}}$ was compared with the observed $\Delta Q_{\mathrm{obs}}$ by Spearman rank correlation over Class 4 PDF pairs.

The model was evaluated against two nulls:

- $M_0$: connectome only, $\alpha = 0$;
- $M_2$: random graph with the same density as $P$.

The scalar model was rejected because no value of $\alpha$ produced a significantly better pair-specific rank correspondence than the null models.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Sensitivity analyses' },
        { type: 'subsubheading', text: 'Leave-one-animal-out' },
        {
            type: 'paragraph',
            text: `For each of the 40 recordings, the full pairwise covariance was recomputed after excluding that recording. The PDF enrichment rank ordering was then recomputed.`,
        },
        {
            type: 'paragraph',
            text: String.raw`Median retention of the top 20 pairs across leave-one-out iterations was

$$
0.96.
$$

Two recordings were influential in CePNEM residual coordinates and three in raw GCaMP coordinates; all were in the roaming pool.`,
        },
        { type: 'subsubheading', text: 'Diffusion robustness' },
        {
            type: 'paragraph',
            text: String.raw`$\Delta Q$ was computed under three $D$ specifications:

1. identity;
2. diagonal $D3$;
3. full empirical $D_{\mathrm{emp}}$.

Before final enrichment reporting, the Spearman rank correlation of the top 50 pairs across specifications was required to exceed 0.70.`,
        },
        { type: 'subsubheading', text: 'Coordinate comparison' },
        {
            type: 'paragraph',
            text: `All enrichment tests were run in parallel in CePNEM residual and raw GCaMP coordinates.`,
        },
        {
            type: 'paragraph',
            text: `Results were interpreted by a pre-specified rule:

| CePNEM residual | Raw GCaMP | Interpretation |
| --- | --- | --- |
| significant | null | neural-state organization masked by behavioral kinematics in raw fluorescence |
| significant | significant | robust to behavioral-coordinate choice |
| null | null | null result |
| null | significant | behavior-mediated structure removed by residualization |`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Perturbation-atlas cross-reference' },
        {
            type: 'paragraph',
            text: String.raw`Each Class 4 pair identified in the $\Delta\Omega$ analysis was cross-referenced with the Randi signal-propagation atlas.`,
        },
        {
            type: 'paragraph',
            text: `For each pair, the analysis extracted:

- the FDR-corrected atlas $q$-value;
- the number of stimulation-recording co-observation instances.

A pair with zero co-observation instances was interpreted as unmeasured, not tested-and-null. ADEL $\\to$ URYVR and ADEL $\\to$ URYDL fall into this category.`,
        },
        { type: 'divider' },

        { type: 'subheading', text: 'Activity, correlation, and transition analyses' },
        {
            type: 'paragraph',
            text: `To test whether the top PDF-associated precision relationships could be explained by simpler activity summaries, the analysis examined ADEL, URYVR, URYDL, URXL, RMEL, and RMER directly.`,
        },
        { type: 'subsubheading', text: 'State-conditioned activity' },
        {
            type: 'paragraph',
            text: `For each neuron, all frames assigned to roaming and dwelling were pooled separately. Mean activity, variance, coefficient of variation, and activity distributions were computed in each state.`,
        },
        {
            type: 'paragraph',
            text: `State comparisons used the same locked behavioral labels as the precision analysis.`,
        },
        { type: 'subsubheading', text: 'Cross-correlation' },
        {
            type: 'paragraph',
            text: `Normalized cross-correlation functions were computed separately in roaming and dwelling epochs for four pairs:

- ADEL-URYVR;
- ADEL-URYDL;
- ADEL-URXL;
- ADEL-RMEL.

For each pair, the peak correlation magnitude and lag at peak correlation were recorded. Positive lag means the second neuron follows the first in the correlation function.`,
        },
        { type: 'subsubheading', text: 'Transition-triggered averages' },
        {
            type: 'paragraph',
            text: `Behavioral transitions were identified when the locked behavioral label changed between adjacent valid frames.`,
        },
        {
            type: 'paragraph',
            text: String.raw`For each transition, a 601-frame window was extracted around the transition:

$$
\pm 300 \text{ frames}.
$$

Time zero was the first frame assigned to the new behavioral state.`,
        },
        {
            type: 'paragraph',
            text: `Each transition window was normalized independently. The baseline mean and standard deviation were computed from frames 60 s to 48 s before the transition, and the whole window was converted to a baseline-relative $z$-score.`,
        },
        {
            type: 'paragraph',
            text: `Two transition classes were analyzed:

| Transition | Count |
| --- | ---: |
| dwelling $\\to$ roaming | 172 |
| roaming $\\to$ dwelling | 174 |`,
        },
        {
            type: 'paragraph',
            text: String.raw`For each neuron, the transition timing statistic was computed from the mean trajectory. The baseline level was the mean absolute value of the average trajectory during the final 10 s before transition. The adaptive threshold was

$$
\mathrm{threshold}
=
\max\left(0.3,\;2\times\mathrm{baseline}\right).
$$

The reported transition time was the first time within 20 s after the behavioral transition at which the absolute value of the mean trajectory exceeded this threshold.`,
        },
        {
            type: 'paragraph',
            text: `These values are threshold crossings of the average transition-aligned trajectory. They are not activation latencies, onset times, or evidence of causal order.`,
        },
        { type: 'subsubheading', text: 'Module-level activity' },
        {
            type: 'paragraph',
            text: `Two modules were defined:

- **dopamine/mechanosensory:** ADEL plus CEP neurons;
- **aerotaxis:** URY plus URX neurons.

For each module, member-neuron activity traces were averaged. Pearson correlations between module activities were computed separately in roaming and dwelling.`,
        },
        {
            type: 'paragraph',
            text: `These analyses use marginal activity statistics. The precision analysis instead estimates conditional dependence after accounting for the rest of the observed network. The purpose was not to reproduce the precision result, but to test whether simpler activity summaries could explain it.`,
        },
    ],
};

function renderSection(section, idx) {
    switch (section.type) {
        case 'heading':
            return (
                <h2 key={idx} id={slugify(section.text)} className="blog-heading">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: React.Fragment }}>
                        {section.text}
                    </ReactMarkdown>
                </h2>
            );

        case 'subheading':
            return (
                <h3 key={idx} className="blog-subheading">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ p: React.Fragment }}>
                        {section.text}
                    </ReactMarkdown>
                </h3>
            );

        case 'subsubheading':
            return <h4 key={idx} className="blog-subsubheading">{section.text}</h4>;

        case 'paragraph':
            return (
                <ReactMarkdown key={idx} className="blog-body" {...MATH_PLUGINS}>
                    {section.text}
                </ReactMarkdown>
            );

        case 'pullquote':
            return (
                <blockquote key={idx} className="blog-pullquote">
                    <ReactMarkdown {...MATH_PLUGINS}>{section.text}</ReactMarkdown>
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

        case 'table':
            return (
                <div key={idx} className="blog-table-wrap">
                    <ReactMarkdown className="blog-body" remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]}>
                        {section.text}
                    </ReactMarkdown>
                </div>
            );

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
                        {POST.date && <p className="blog-date">{POST.date}</p>}
                        <hr className="blog-header-rule" />

                        <div className="blog-read-also">
                            <span className="blog-read-also-label">Work in progress</span>
                            <span className="blog-read-also-link" style={{ cursor: 'default', borderBottom: 'none' }}>This is currently unpublished, and a work in progress</span>
                        </div>

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
