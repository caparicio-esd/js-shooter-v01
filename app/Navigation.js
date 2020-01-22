/**
 * Programmatic Navigation and Page Transitions
 */


/**
* Global vars
*/
let links;
let sections;
let modals;
let animation = anime.timeline({
    duration: 300,
    easing: 'easeOutQuad'
});


/**
 * @function navigationErrHandler
 * @param game {Error} Trata errores que se den en la navegación
 */
const navigationErrHandler = (err = '') => {
    if (err) {
        console.error('Something went wrong');
        console.error(err);
    }
};


/**
 * @function getLinkIdParent
 * @param link {HTMLElement} Busca a page pertenece el link Clickado
 * Se usa para navegar entre pages y menu
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
 * @function initNavigation
 * Inicio Eventos para crear navegación programática
 * 
 * navigationType es el tipo de animación y viene definido 
 * en el <a href="..." transition="navigationType"></a>
 */
const initNavigation = () => {
    links.forEach(link => {
        link.addEventListener('click', ev => {
            ev.preventDefault();

            let navigationType = link.getAttribute('transition') || 'step';
            navigateTo(link.hash, getLinkIdParent(link), navigationType);
        });
    });
};


/**
 * @function navigateTo
 * Como la navegación está basada en bloques que se ven y no.
 * Simplemente esconde todo y muestra el elemento a navegar
 * 
 * @param getTo {String} -> Id del elemento que entra
 * @param getFrom {String} -> Id del elemento que sale
 * @param navigationType {String} -> Tipo de animación
 * 
*/
const navigateTo = (getTo = '#menu_page', getFrom = '', navigationType = 'step') => {

    let isModal =
        document.querySelector(getTo).classList.contains('modal_window') ||
        document.querySelector(getTo).classList.contains('spinner_window');

    if (isModal) {
        // open modal
        document.querySelector(getTo).classList.add('active');

        // distribute modal
        if (navigationType == 'game_pause') {
            animation_gamePause(() => {
                game.pauseOrResume();
            });
        } else if (navigationType == 'game_confirm') {
            animation_gameConfirm(() => { });
        } else {
            navigationErrHandler()
        }

    } else {

        // distribute pages
        if (navigationType == 'step') {
            clearAll(getTo);

        } else if (navigationType == 'slide_left') {
            animation_slideOut(getTo, getFrom);
        }
        else if (navigationType == 'slide_right') {
            animation_slideIn(getTo, getFrom);

        } else if (navigationType == 'game_begin') {
            animation_gameBegin(() => {
                startGame();
            });
        } else if (navigationType == 'game_stop') {
            animation_gameStop(() => {
                game.endGame();
                GAME_UI.gameBoard.innerHTML = '';
            });
        } else if (navigationType == 'game_resume') {
            animation_gameResume(() => {
                game.pauseOrResume();
            });
        } else if (navigationType == 'game_pause') {
            animation_gamePause(() => {
                game.pauseOrResume();
            });
        } else {
            navigationErrHandler()
        }

        console.log(navigationType);


        animation.finished.then((a, b) => {
            clearAll(getTo)
        });
    }
};


/**
 * @function clearAll
 * @param {String} -> Id del elemento que entra
 * 
 * Limpiamos de clases, de estilos y de scroll cada elemento una vez que 
 * ya está dentro por evitar errores
 */
const clearAll = (getTo) => {
    location.hash = '!' + getTo;
    sections.forEach(section => {
        section.scrollTo(0, 0);
        section.style.transform = '';
        section.style.opacity = '';
        section.classList.remove('active')
    });
    document.querySelector(getTo).classList.add('active');
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
 * La ejecuto en main.js
 * 
*/
const init = () => {
    links = GAME_UI.app.querySelectorAll('a[href^="#"]');
    sections = GAME_UI.app.querySelectorAll('section');
    modals = GAME_UI.app.querySelector('modal_window');

    initNavigation();

    // Fake splash
    setTimeout(() => {
        navigateTo('#menu_page');
    }, 1600);
};
