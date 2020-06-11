// var typeString = ['chcesz stworzyć coś ciekawego', 'masz pomysł', 'jesteś zjebem', 'jesteś cool'];
// var  i = 0;
// var count = 0
// var selectedText = '';
// var text = '';
// var typedText = document.getElementById('typing');
// var humanize = Math.round((Math.random() * 100) + 20);
// var intrvl;
//
// function type() {
//     var intervalType =  setTimeout(type, 100);
//
//     if (count == typeString.length) {
//         count = 0;
//     }
//     selectedText = typeString[count];
//
//     text = selectedText.slice(0, ++i);
//     typedText.innerHTML = text;
//
//         if (text.length === selectedText.length) {
//
//             text = selectedText.slice(0, ++i);
//
//             clearInterval(intervalType)
//
//             setTimeout(()=>{
//                 setTimeout(() =>{
//                     intrvl = setInterval(backspace, humanize);
//                 }, 100)
//             },1000)
//
//             function backspace(){
//                 typedText.innerText.length;
//                 let wordLenght = typedText.innerText.length;
//                 let newWordLenght = wordLenght -1;
//                 let backspacedText = text.slice(0, newWordLenght);
//                 typedText.innerText = backspacedText;
//
//                 if(newWordLenght === 0){
//                     clearTimeout(intrvl);
//                     setTimeout(type, 200);
//                 }
//                 else{
//                     newWordLenght = wordLenght;
//                 }
//
//             }
//             count++;
//             i = 0;
//         }
//
//
//
// }
// type();
//
