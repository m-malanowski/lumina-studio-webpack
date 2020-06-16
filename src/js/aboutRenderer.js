import Highway from '@dogstudio/highway';
import {Expo, TweenMax} from "gsap";
const tm = TweenMax;
    import fot1 from '../assets/img/glitch6.jpg';

class AboutRenderer extends Highway.Renderer {

    onEnter() {
        let fotImg1 = document.querySelector('.fot1');
        fotImg1.src = fot1;
        let down = document.querySelector('.down');

        let htmlEl = document.getElementsByTagName('html')[0];

        if ( htmlEl.classList.contains('overflowY')  ){
            htmlEl.style.overflowY = ('visible');
        }

        const body = document.body,
            scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
            height = scrollWrap.getBoundingClientRect().height - 1,
            width = scrollWrap.getBoundingClientRect().width - 1,
            speed = 0.02;

        let offset = 0;

        body.style.height = Math.floor(height) + "px";
        body.style.width = Math.floor(width) + "px";

        // console.log(body.style.height);
        // console.log(body.style.width);


        const throttle = function(type, name, obj = window) {
                let running = false;
                const func = function() {
                    if (running) {
                        return;
                    }
                    running = true;
                    requestAnimationFrame(function() {
                        obj.dispatchEvent(new CustomEvent(name));
                        running = false;
                    });
                };
                obj.addEventListener(type, func);
            };

        throttle("scroll", "optimizedScroll");

        window.addEventListener("optimizedScroll", () => {
            let height = 0.05 * (window.pageYOffset);

            down.style.transform = "translateY(-" + height + "px)";
            fotImg1.style.transform = "translateY(+" + height + "px)";
        });

       const smoothScroll = function() {
            offset += (window.pageYOffset - offset) * speed;

            let scroll = "translateY(-" + offset + "px) translateZ(0)";
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