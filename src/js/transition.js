import {Expo, TweenMax, gsap} from 'gsap';
const tm = TweenMax;
const fullMenuItems = document.querySelectorAll('.full-menu-item a');
const gs = gsap;

export default class Transition{
    constructor(duration = 1.2) {
        this.duration = duration;
    }

    pageStartTransition(){
        tm.to('.loader', 1, {
            delay: .8,
            autoAlpha: 0,
            // y: -600,
        })

        tm.to('.loading-screen', .6,{
            width: '100%',
            left: '0%',
            ease: Expo.easeInOut,
        })
        tm.to('.loading-screen', this.duration, {
            width: '100%',
            left: '100%',
            ease: Expo.easeInOut,
            delay: .6,
            onComplete: this.animationAfterLoad
        })
        tm.set('.loading-screen', {left: '-50%'})
    }


    animationAfterLoad() {
        tm.to('canvas', 2, {
        x: 40,
        ease: Expo.easeInOut,
        opacity: 1
      });
        tm.staggerTo('.d', .8, {
            y: -50,
            opacity: 1,
            ease: Expo.easeInOut,
        }, .2);


    }

    pageTransition(){
        tm.to('.loading-screen', .3,{
            width: '100%',
            left: '0%',
            ease: Expo.easeInOut,
        })
        tm.to('.loading-screen', this.duration, {
            width: '100%',
            left: '100%',
            ease: Expo.easeInOut,
            delay: .6
        })
        tm.set('.loading-screen', {left: '-100%'})
    }

    menuTransition(){
        tm.to('.loading-screen', .3,{
            width: '100%',
            left: '0%',
            ease: Expo.easeInOut,
        })
        tm.to('.loading-screen', this.duration, {
            width: '100%',
            left: '100%',
            ease: Expo.easeInOut,
            delay: .6,
            onComplete: this.menuItemsTween
        })
        tm.set('.loading-screen', {left: '-100%'})
    }

    menuItemsTween() {
        gs.to(fullMenuItems, 1, {
            delay: .1,
            opacity: 1,
            y: -20,
            stagger: {
               each: 0.3
            }
        })
        tm.to('.tween-to-show', .8, {
            delay: .4,
            y: -20,
            opacity: 1,
        })
    }


}

