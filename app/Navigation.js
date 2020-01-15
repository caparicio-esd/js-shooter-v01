
/**
 * Programmatic Navigation and Page Transitions
 * 
 * 
 */


/**
* Global vars
*
*/
let links = GAME_UI.app.querySelectorAll('a[href^="#"]');
let sections = GAME_UI.app.querySelectorAll('section');
let modals = GAME_UI.app.querySelector('modal_window');



/**
 * 
 */
const getLinkIdParent = (link) => {
    let id = '';
    let currElement = link.parentElement;
    while (currElement.id == '') {
        currElement = currElement.parentElement;
        id = currElement.id;
    }
    return '#' + id;
};


/**
 * @function navigateTo
 * Init navigation
 * 
 */
const initNavigation = () => {
    links.forEach(link => {
        link.addEventListener('click', ev => {
            ev.preventDefault();
            navigateTo(link.hash, getLinkIdParent(link));
        });
    });
};


/**
 * @function navigateTo
 * Como la navegación está basada en bloques que se ven y no.
 * Simplemente esconde todo y muestra el elemento a navegar
 * 
 * @param getTo: @default = #menu_page -> Es el ID a navegar. Por defecto es #menu_page
 * 
*/
const navigateTo = (getTo = '#menu_page', getFrom = '') => {
    let isModal =
        document.querySelector(getTo).classList.contains('modal_window') ||
        document.querySelector(getTo).classList.contains('spinner_window');

    if (isModal) {
        document.querySelector(getTo).classList.add('active');
    } else {

        // // distribute navigations....
        // sections.forEach(section => {
        //     section.scrollTo(0, 0);
        // });
        sections.forEach(section => section.classList.remove('active'));
        document.querySelector(getTo).classList.add('active');
        location.hash = getTo;

        if (getTo == '#main_page') {
            startGame();
        }

        // console.log(getTo, getFrom);
        // if (getTo == "#settings_page" && getFrom == "#menu_page") {
        //     animation_slideOut(getTo, getFrom);
        // }
    }
};



const animation_slideOut = (getTo, getFrom) => {
    let going = document.querySelector(getFrom);
    let coming = document.querySelector(getTo);
    anime({
        targets: going,
        translateX: '-100%',
        easing: 'easeOutQuad',
        duration: 2000
    });
    anime({
        targets: coming,
        translateX: '0%',
        easing: 'easeOutQuad',
        opacity: 1,
        duration: 2000,
        begin: (anim) => {
            coming.classList.add('active');
            coming.style.transform = 'translateX(100%)';
            anim.play();
        }
    });
};


/**
 * @function getBack
 * @alias navigateTo() 
 * 
 * Just for debuggin purposes
 * 
 */
const getBack = () => {
    navigateTo();
};


/**
 * @function show/hideSpinner
 * @alias navigateTo("#spinner_window") 
 * 
 */
const showSpinner = () => {
    GAME_UI.state.spinning = true;
    GAME_UI.modalWindows.spinner.classList.add('active');
};
const hideSpinner = () => {
    GAME_UI.state.spinning = false;
    GAME_UI.modalWindows.spinner.classList.remove('active');
};


/**
 * @function init
 * Poner la navegación a funcionar. IIFE
 * 
*/
const init = (() => {
    initNavigation();

    // Fake splash
    setTimeout(() => {
        navigateTo('#menu_page');
    }, 1600);
})();













/**
 * No sabía donde ponerlo....
 * 
*/
let toggles = document.querySelectorAll('.toggle');
toggles.forEach(t => {
    t.addEventListener('click', () => {
        t.classList.toggle('on');
    });
});

navigateTo('#splash_page');