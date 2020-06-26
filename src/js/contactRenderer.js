import Highway from '@dogstudio/highway';
import { Expo, TweenMax } from "gsap";
const tm = TweenMax
import fot3 from '../assets/img/j.jpg';
class ContactRenderer extends Highway.Renderer {

    onEnter() {
        let fotImg3 = document.querySelector('.fot3');
        fotImg3.src = fot3;


        const body = document.body;
        body.style.height = '100%';

        let htmlEl = document.getElementsByTagName('html')[0];

        if ( htmlEl.classList.contains('overflowY')  ){
            htmlEl.style.overflowY = ('visible');
        }


        // const scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
        //     height = scrollWrap.getBoundingClientRect().height - 1,
        //     width = scrollWrap.getBoundingClientRect().width - 1,
        //     speed = 0.02;
        //
        // let offset = 0;
        //
        // body.style.height = Math.floor(height) + "px";
        // body.style.width = Math.floor(width) + "px";
        //
        // const smoothScroll = function() {
        //     offset += (window.pageYOffset - offset) * speed;
        //
        //     let scroll = "translateY(-" + offset + "px) translateZ(0)";
        //     scrollWrap.style.transform = scroll;
        //
        //     requestAnimationFrame(smoothScroll);
        // }

        // smoothScroll();

        let typeString = ['chcesz stworzyć coś fajnego', 'masz pomysł', 'cenisz sobie elegancję'];
        let  i = 0;
        let count = 0
        let selectedText = '';
        let text = '';
        let typedText = document.getElementById('typing');
        let humanize = Math.round((Math.random() * 100) + 20);
        var intrvl;

        function type() {
            var intervalType =  setTimeout(type, 100);

            if (count == typeString.length) {
                count = 0;
            }
            selectedText = typeString[count];

            text = selectedText.slice(0, ++i);
            typedText.innerHTML = text;

            if (text.length === selectedText.length) {

                text = selectedText.slice(0, ++i);

                clearInterval(intervalType)

                setTimeout(()=>{
                    setTimeout(() =>{
                        intrvl = setInterval(backspace, humanize);
                    }, 100)
                },1000)

                function backspace(){
                    typedText.innerText.length;
                    let wordLenght = typedText.innerText.length;
                    let newWordLenght = wordLenght -1;
                    let backspacedText = text.slice(0, newWordLenght);
                    typedText.innerText = backspacedText;

                    if(newWordLenght === 0){
                        clearTimeout(intrvl);
                        setTimeout(type, 200);
                    }
                    else{
                        newWordLenght = wordLenght;
                    }

                }
                count++;
                i = 0;
            }
        }
        type();

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

export default ContactRenderer;