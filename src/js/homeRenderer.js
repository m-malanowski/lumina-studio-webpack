import Highway from '@dogstudio/highway';
import HomeScene from './homeScene';
const homeScene = new HomeScene();


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
    }

}

export default HomeRenderer;