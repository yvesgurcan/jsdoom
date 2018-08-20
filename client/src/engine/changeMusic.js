import initMusic from './initMusic';

export default () => {
    if (window.music) {
        window.music.pause();
        window.music = null;
    }
    
    initMusic(true);
    return true;
};
