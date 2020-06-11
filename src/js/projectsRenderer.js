import Highway from '@dogstudio/highway';
import Panzoom from "@panzoom/panzoom";
import {Expo, TweenMax} from "gsap";
const tm = TweenMax;

class ProjectsRenderer extends Highway.Renderer {

    onEnter() {
        let htmlEl = document.getElementsByTagName('html')[0];
        htmlEl.setAttribute('class', 'overflowY');
        htmlEl.style.overflowY = 'hidden';

        const elem = document.querySelector(".pics-container");
        const panzoom = Panzoom(elem, {
            animate: true,
        });

        tm.to('.d', 1.2, {
            delay: 1.8,
            y: -50,
            opacity: 1,
            ease: Expo.easeInOut,
        });

        tm.staggerTo('.block', .8, {
            delay: .8,
            y: -20,
            opacity: .5,
            ease: Expo.easeInOut,
        }, .1);

    }

}

export default ProjectsRenderer;