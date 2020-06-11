import Highway from '@dogstudio/highway';
import { Expo, TweenMax } from "gsap";
const tm = TweenMax

class ContactRenderer extends Highway.Renderer {

    onEnter() {
        let typeString = ['chcesz stworzyć coś ciekawego', 'masz pomysł', 'lubisz coś tam', 'bla bla bla'];
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

        tm.staggerTo('.d', 1.2, {
            delay: .6,
            y: -50,
            opacity: 1,
            ease: Expo.easeInOut,
        }, .4);

    }


    onLeave() {
    }
    onEnterCompleted() {

    }
    onLeaveCompleted() {
     }
}

export default ContactRenderer;