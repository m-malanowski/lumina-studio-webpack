import Highway from '@dogstudio/highway';
import {Expo, TweenMax} from "gsap";
const tm = TweenMax;

class AboutRenderer extends Highway.Renderer {

    onEnter() {

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

        tm.staggerTo('.d', .8, {
            delay: .4,
            y: -50,
            opacity: 1,
            ease: Expo.easeInOut,
        }, .2);

    }

}

export default AboutRenderer;