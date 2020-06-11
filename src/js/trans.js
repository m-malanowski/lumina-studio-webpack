import Highway from '@dogstudio/highway';
import Transition from "./transition";

class CustomTransition extends Highway.Transition {
    in({ from, to, done }) {
        window.scrollTo(0, 0);
        // console.log('in', from, to);
        from.remove();
        done();
    }

    out({ from, done }) {
        // console.log('out', from);
        const transition = new Transition();
        transition.pageTransition();
        done();

    }
}

export default CustomTransition;