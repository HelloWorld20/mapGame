
let loaded = 0;
let totalLen = '';

let Preload = function(config, percentageCB = new Function(), loadedCB = new Function()) {
    this.config = config;
    this.percentageCB = percentageCB;
    this.loadedCB = loadedCB;
}

Preload.prototype.init = function() {
    // console.log('preload')
    // debugger
    this.preloadImg();
    this.preloadAudio();
}

Preload.prototype.preloadImg = function() {
    // 资源写在@/config/config.js里
    window.imagesCache = [];
    totalLen = this.config.imgs.length;
    // console.log(config)
    let percentage = 0

    this.config.imgs.forEach( (v, i) => {
        let img = new Image();

        img.onerror = img.onload = () => {
            loaded++;

            percentage = loaded/totalLen

            // 因为ios没法正确触发音乐的canplaythrough方法，所以进度只算图片进度。
            // 向父组件抛出进度事件
            this.percentageCB(percentage)
            // $emit('percentage', percentage);

            if(loaded >= totalLen) {
                // 向父组件抛出加载完成事件
                // $emit('loaded', percentage);
                this.loadedCB(percentage)
            }
        }

        // 这写法略微有点奇怪。按理来说require只能传入字符串，不能传变量。但是下面的写法又是可以的。所以将就着用着
        img.src = require('@/assets/' + v);
        window.imagesCache[i] = img;

    })
}

Preload.prototype.preloadAudio = function() {
    window.audioCache = [];
    this.config.audios.forEach( (v, i) => {
        let audio = new Audio();

        audio.addEventListener('canplaythrough', () => {
            audio.play();
            audio.pause();
        }, false)
        document.addEventListener('WeixinJSBridgeReady', () => {
            audio.play();
            audio.pause();
        }, false)

        audio.src = require('@/assets/audios/bgm.mp3');
        window.audioCache[i] = audio;
    })

}

export default Preload
