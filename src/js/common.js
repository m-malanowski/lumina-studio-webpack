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
        setTimeout(() => {
            hamburgerMenu.classList.toggle('animate');
            fullMenu.classList.toggle('show');
        }, 500);
    });
})

menuWrapper.addEventListener('click', () => {

    const transition = new Transition();
    transition.menuTransition();

    setTimeout(() => {
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



//
// window.oncontextmenu = function () {
//     alert(':)')
// }