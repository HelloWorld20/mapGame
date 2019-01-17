<template>
    
</template>

<script>
import config from '@/config/config'
export default {
    data() {
        return {
            loaded: 0,
            totalLen: '',
        }
    },
    mounted() {
        this.preloadImg();
        this.preloadAudio();
    },
    methods: {
        preloadImg() {
            // 资源写在@/config/config.js里
            window.imagesCache = [];
            this.totalLen = config.imgs.length;

            let percentage = 0

            config.imgs.forEach( (v, i) => {
                let img = new Image();
                
                img.onerror = img.onload = () => {
                    this.loaded++;

                    percentage = this.loaded/this.totalLen

                    // 因为ios没法正确触发音乐的canplaythrough方法，所以进度只算图片进度。
                    // 向父组件抛出进度事件
                    this.$emit('percentage', percentage);

                    if(this.loaded >= this.totalLen) {
                        // 向父组件抛出加载完成事件
                        this.$emit('loaded', percentage);
                    } 
                }

                // 这写法略微有点奇怪。按理来说require只能传入字符串，不能传变量。但是下面的写法又是可以的。所以将就着用着
                img.src = require('@/assets/' + v);
                window.imagesCache[i] = img;

            })
        },
        preloadAudio() {
            window.audioCache = [];
            config.audios.forEach( (v, i) => {
                let audio = new Audio();

                audio.addEventListener('canplaythrough', () => {
                    audio.play();
                    audio.pause();
                }, false)
                document.addEventListener('WeixinJSBridgeReady', () => {
                    audio.play();
                    audio.pause();
                }, false)

                audio.src = require('@/assets/' + v);
                window.audioCache[i] = audio;
            })
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


