import Highway from '@dogstudio/highway';

class ParentRenderer extends Highway.Renderer {

    onEnter() {
        alert('dołączono parent renderera, kurwa');
    }


    onLeave() {
    }
    onEnterCompleted() {
    }
    onLeaveCompleted() {
     }
}

export default ParentRenderer;