<template>
    <div class="frame" v-show="isAnimate">
        <canvas class="animate-frame" ref="can"></canvas>
    </div>
</template>

<script>
import {frame} from '@/config/config'
let ctx = null;
let canWidth = innerWidth << 1;
let canHeight = innerHeight << 1;
let imgList = [];
let timer = null;
let frameIndex = 0;
// let isAnimate = false;
export default {
    data() {
        return {
            isAnimate: false
        }
    },
    mounted() {
        let can = this.$refs['can']
        ctx = can.getContext('2d');

        can.setAttribute('width', innerWidth << 1)
        can.setAttribute('height', innerHeight << 1)

        frame.forEach((v, i) => {
            let img = new Image();
            img.src = require('../../assets/img/monkey/monkey'+(i+1)+'.png');
            imgList.push(img);
        });

        // 注册事件
        this.$on('start', () => {
            frameIndex = 0;
            this.isAnimate = true;
            this.animate();
        })
        this.$on('pause', () => {
            clearInterval(timer)
            this.isAnimate = false;
        })
        this.$on('resume', () => {
            this.isAnimate = true;
            this.animate();
        })
    },
    methods: {
        clearRect() {
            ctx.clearRect(0, 0, canWidth, canHeight);
        },
        drawImage(img) {
            this.clearRect();
            ctx.drawImage(img, 0, 0, canWidth, canHeight);
        },
        animate() {
            if (this.isAnimate) return;
            this.isAnimate = true;

            timer = setInterval(() => {
                let img = imgList[frameIndex++];
                if (img) {
                    this.drawImage(img);
                } else {
                    clearInterval(timer);
                    this.isAnimate = false;
                    this.$emit('end');
                }
            }, 100);
        }
    }
}
</script>

<style lang="scss" scoped>
.frame{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .animate-frame{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
}

</style>
