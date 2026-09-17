// Shared scroll-reveal animation variants for framer-motion.
// Used across landing page sections (Work, About, Contact) so entrance
// motion feels consistent as the user scrolls down the page.

export const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

// Wrap a group of children with this on the parent to stagger their
// individual fadeUp/scaleIn animations as they enter the viewport.
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren: stagger,
            delayChildren,
        },
    },
});

// Default viewport settings: animate once, a little before the element
// is fully on screen so it doesn't feel late.
export const defaultViewport = { once: true, amount: 0.25 };