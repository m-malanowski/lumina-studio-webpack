import Highway from '@dogstudio/highway';
import {Expo, TweenMax} from "gsap";
const tm = TweenMax;

class AboutRenderer extends Highway.Renderer {

    onEnter() {


        let htmlEl = document.getElementsByTagName('html')[0];

        if ( htmlEl.classList.contains('overflowY')  ){
            htmlEl.style.overflowY = ('visible');
        }

        const body = document.body,
            scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
            height = scrollWrap.getBoundingClientRect().height - 1,
            width = scrollWrap.getBoundingClientRect().width - 1,
            speed = 0.02;

        var offset = 0;

        body.style.height = Math.floor(height) + "px";
        body.style.width = Math.floor(width) + "px";

        // console.log(body.style.height);
        // console.log(body.style.width);

        function smoothScroll() {
            offset += (window.pageYOffset - offset) * speed;

            var scroll = "translateY(-" + offset + "px) translateZ(0)";
            scrollWrap.style.transform = scroll;

            requestAnimationFrame(smoothScroll);
        }

        smoothScroll();

        tm.set('.e', {opacity: 0});
        tm.staggerFromTo('.e', 2.4, {
            y: 300,
            opacity: 0,
            ease: Expo.easeInOut,
        }, {
            y: 10,
            opacity: 1,
            ease: Expo.easeInOut,
        },.2);

    }

}

export default AboutRenderer;