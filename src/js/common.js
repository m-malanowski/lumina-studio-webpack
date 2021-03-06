import 'bootstrap';
import '../scss/app.scss';
import Highway from '@dogstudio/highway';
import CustomTransition from './trans';
import Transition from "./transition";
import AboutRenderer from './aboutRenderer.js';
import ProjectsRenderer from './projectsRenderer';
import ContactRenderer from './contactRenderer';
import HomeRenderer from "./homeRenderer";
import '../scss/pace.css';
require('./pace');
import { TweenMax } from "gsap";
const tm = TweenMax;

Pace.start();
Pace.on('done', function() {
    const transition = new Transition(2);
    transition.pageStartTransition();
});

document.addEventListener('DOMContentLoaded', init);
function init(){
    document.body.classList.remove('load-style');
}

const menuWrapper = document.querySelector('.c');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const fullMenu = document.querySelector('.full-menu');
const menuItemB = document.querySelector('.b');
const fullMenuItems = document.querySelectorAll('.full-menu-item a');
const menuOutput = document.querySelector('.menu-big span');
const htmlEl = document.getElementsByTagName('html')[0];

fullMenuItems.forEach((item) => {
    item.addEventListener('mousemove', (e) =>{
       let mouseOverOutput =  e.target.textContent;
       menuOutput.textContent = mouseOverOutput;
    })
})
fullMenuItems.forEach((item) => {
    item.addEventListener('mouseleave', (e) =>{
        menuOutput.textContent = '';
    })
})

fullMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
        const transition = new Transition();
        transition.menuItemsTween();

        setTimeout(() => {
            hamburgerMenu.classList.toggle('animate');
            fullMenu.classList.toggle('show');
            htmlEl.classList.toggle('overflow-y');
        }, 500);
    });
})

menuWrapper.addEventListener('click', () => {

    const transition = new Transition();
    transition.menuTransition();

    setTimeout(() => {

        htmlEl.classList.toggle('overflow-y');

        hamburgerMenu.classList.toggle('animate');
        fullMenu.classList.toggle('show');
        menuItemB.classList.toggle('no-show');
    }, 200);
});

const H = new Highway.Core({
    renderers: {
        'home': HomeRenderer,
        'about': AboutRenderer,
        'projects': ProjectsRenderer,
        'contact': ContactRenderer,
    },
    transitions: {
        default: CustomTransition
    }
});

H.on('NAVIGATE_END', ({ from, to, location }) => {
    // Analytics
    if (typeof gtag !== 'undefined') {
        // eslint-disable-next-line
        gtag('config', 'UA-169184236-1', {
            'page_path': location.pathname,
            'page_title': to.page.title,
            'page_location': location.href
        });
    }
});

// console.clear();

// window.oncontextmenu = function () {
//     alert(':)')
// }



// const $bigBall = document.querySelector('.cursor__ball--big');
// // const $smallBall = document.querySelector('.cursor__ball--small');
// const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
// document.body.addEventListener('mousemove', onMouseMove);
// for (let i = 0; i < $hoverables.length; i++) {
//     $hoverables[i].addEventListener('mouseenter', onMouseHover);
//     $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
// }
//
// // Move the cursor
// function onMouseMove(e) {
//     tm.to($bigBall, .4, {
//         x: e.pageX - 15,
//         y: e.pageY - 15
//     })
//     // tm.to($smallBall, .1, {
//     //     x: e.pageX - 5,
//     //     y: e.pageY - 7
//     // })
// }
//
// // Hover an element
// function onMouseHover() {
//     tm.to($bigBall, .3, {
//         scale: 4
//     })
// }
// function onMouseHoverOut() {
//     tm.to($bigBall, .3, {
//         scale: 1
//     })
// }