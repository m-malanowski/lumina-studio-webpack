import Highway from '@dogstudio/highway';
import HomeScene from './homeScene';
const homeScene = new HomeScene();
import CircleType from 'circletype';

class HomeRenderer extends Highway.Renderer {


    onLeave(){
        homeScene.destroyOnLeave();
    }

    onEnter() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        if(vw < 700 ){
            homeScene.checkViewPort();
        }else{
            homeScene.loadModel();
            homeScene.init();
            homeScene.animate()
        }

        const circleType = new CircleType(
            document.getElementById("rotated")
        ).radius(80);

    }

}

export default HomeRenderer;