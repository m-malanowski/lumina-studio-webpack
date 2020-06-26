import {Expo, TweenMax,  TimelineMax} from 'gsap';
const tm = TweenMax;
const fullMenuItems = document.querySelectorAll('.fmi');
const canvas = document.getElementsByTagName('canvas');
const greekMobile = document.querySelector('.greekMobile');
const tl = new TimelineMax();
const t = tl.staggerFromTo(fullMenuItems, 1.2, {
    y: 20,
    autoAlpha: 0,
},
    {
        y: 0,
        autoAlpha: 1,
        ease: Expo.easeInOut,
    }, .1).reversed(true);


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
        if(canvas){
            tm.to(canvas, 2, {
                delay: 1.8,
                x: 40,
                ease: Expo.easeInOut,
                opacity: 1
            });
        }
        // if(greekMobile){
            tm.to('.greekMobile', 3, {
                ease: Expo.easeInOut,
                opacity: .8
            });
        // }

        tm.staggerFromTo('.d', 2.4, {
            y: 200,
            opacity: 0,
            ease: Expo.easeInOut,
        }, {
            y: 0,
            opacity: 1,
            ease: Expo.easeInOut,
        },.2);

        tm.staggerFromTo('.g', 2.4, {
            y: 10,
            opacity: 0,
            ease: Expo.easeInOut,
        }, {
            delay: 1,
            y: 0,
            opacity: 1,
            ease: Expo.easeInOut,
        },.2);

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
        t.reversed( !t.reversed() );
    }

}

