/**
 * @function animation_slideOut
 * @param {String} getTo Id del bloque al que vamos
 * @param {String} getFrom Id del bloque del que venimos
 * 
 * Animación de entrada entre menu y pages
 */
const animation_slideOut = (getTo, getFrom) => {
    animation = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });
    animation.add({
        targets: document.querySelector(getFrom),
        translateX: ['0%', '-100%'],
        opacity: [1, 0]
    });
    animation.add({
        targets: document.querySelector(getTo),
        translateX: ['100%', '0%'],
        opacity: [0, 1]
    }, '-=300');

    return animation;
};

/**
 * @function animation_slideIn
 * @param {String} getTo Id del bloque al que vamos
 * @param {String} getFrom Id del bloque del que venimos
 * 
 * Animación de salida entre menu y pages
 */
const animation_slideIn = (getTo, getFrom) => {
    animation = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad'
    });
    animation.add({
        targets: document.querySelector(getFrom),
        translateX: ['0%', '100%'],
        opacity: [1, 0]
    });
    animation.add({
        targets: document.querySelector(getTo),
        translateX: ['-100%', '0%'],
        opacity: [0, 1]
    }, '-=300');

    return animation;
};

/**
 * @function animation_gameBegin
 * 
 * Animación de entrada al juego
 */
const animation_gameBegin = (cb) => {
    animation = anime.timeline({
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => {
            cb();
        }
    });
    animation.add({
        targets: GAME_UI.pages.menu,
        translateX: ['0%', '0%'],
        translateY: ['0%', '100%'],
        opacity: [1, 0]
    });
    animation.add({
        targets: GAME_UI.pages.main,
        translateX: ['0%', '0%'],
        translateY: ['-100%', '0%'],
        opacity: [0, 1]
    }, '-=300');

    return animation;
};


/**
 * @function animation_gamePause
 * 
 * Animación de pause al juego
 */
const animation_gamePause = (cb) => {
    animation = anime.timeline({
        easing: 'easeOutQuad',
        complete: () => {
            cb();
        }
    });
    animation.add({
        targets: GAME_UI.modalWindows.pause,
        translateY: ['20%', '0%'],
        opacity: [0, 1],
        duration: 300
    });

    return animation;
};

/**
 * @function animation_gameResume
 * 
 * Animación de continuación al juego cuando haya sido pausado
 */
const animation_gameResume = (cb) => {
    animation = anime.timeline({
        easing: 'easeOutQuad',
        complete: () => {
            cb();
        }
    });
    animation.add({
        targets: [
            GAME_UI.modalWindows.pause,
            GAME_UI.modalWindows.confirm,
        ],
        translateY: ['0%', '20%'],
        opacity: [1, 0],
        duration: 300
    });

    return animation;
};

/**
 * @function animation_gameConfirm
 * 
 * Animación de salida del juego
 */
const animation_gameConfirm = (cb) => {
    animation = anime.timeline({
        easing: 'easeOutQuad',
        complete: () => {
            cb();
        }
    });
    animation.add({
        targets: [
            GAME_UI.modalWindows.confirm
        ],
        translateY: ['20%', '0%'],
        opacity: [0, 1],
        duration: 300
    });

    return animation;
};

/**
 * @function animation_gameStop
 * 
 * Animación de salida del juego
 */
const animation_gameStop = (cb) => {
    animation = anime.timeline({
        easing: 'easeOutQuad',
        complete: () => {
            cb();
        }
    });
    animation.add({
        targets: [
            GAME_UI.modalWindows.pause,
            GAME_UI.modalWindows.confirm,
        ],
        scale: [1, 4],
        translateX: ['0', '0'],
        translateY: ['0', '0'],
        opacity: [1, 0],
        duration: 300,
    });
    animation.add({
        targets: GAME_UI.pages.main,
        translateX: ['0%', '0%'],
        translateY: ['0%', '100%'],
        opacity: [1, 0],
        duration: 1000,
    }, 600);
    animation.add({
        targets: GAME_UI.pages.menu,
        translateX: ['0%', '0%'],
        translateY: ['-100%', '0%'],
        opacity: [0, 1],
    }, '-=600');

    return animation;
};


