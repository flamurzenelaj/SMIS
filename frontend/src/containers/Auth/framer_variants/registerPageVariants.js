export const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw',
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type:'spring',
            stiffness: 30,
            duration: 1,
        }
    },
    exit: {
        x: '100vw',
        transition: {ease: 'easeInOut'},
        opacity: 0,
    }
}

export const h1Variant = {
    hidden: {
        opacity: 0,
        y: '-50vh',
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 1.25,
            delay:1
        }
    },
    exit: {
        y: '-100vw',
        transition: {ease: 'easeInOut'},
        opacity: 0
    }
}

export const inputFieldEmailVariant = {
    hidden: {
        opacity: '0%',
        x: '100vw',
    },
    visible: {
        opacity: '100%',
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 1.75,
            delay:1.5
        },
    },
    exit: {
        x: '100vw',
        transition: {ease: 'easeInOut'},
        opacity: 0
    }
}
export const inputFieldPasswordVariant = {
    hidden: {
        opacity: '0%',
        x: '100vw',
    },
    visible: {
        opacity: '100%',
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 1.75,
            delay:1.6
        },
    },
    exit: {
        x: '100vw',
        transition: {ease: 'easeInOut'},
        opacity: 0
    }
}
export const inputFieldRePasswordVariant = {
    hidden: {
        opacity: '0%',
        x: '100vw',
    },
    visible: {
        opacity: '100%',
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 50,
            duration: 1.75,
            delay:1.7
        },
    },
    exit: {
        x: '100vw',
        transition: {ease: 'easeInOut'},
        opacity: 0
    }
}

export const h6Variant = {
    hidden: {
        opacity: 0,
        y: '7.5vh',
    },
    visible: {
        opacity: 1,
        y: '20%',
        transition: {
            type: 'tween',
            stiffness: 50,
            duration: 1,
            delay:1.75
        },
    },
    exit: {
        y: '7.5vh',
        transition: {ease: 'easeInOut'},
        opacity: 0
    }
}

export const btnVariant = {
    hidden: {
        opacity: 0,
        y: '15vh',
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            duration: 2,
            delay:1.25
        },
    },
    exit: {
        y: '15vh',
        transition: {ease: 'easeInOut'},
        opacity: 0
    }
}