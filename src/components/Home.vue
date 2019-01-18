<template>
<div class="home" ref="scroll">
    <div class="map" ref='map'
        :style="{
            'background-image': `url(${require('../assets/img/map.jpg')})`,
            transform: `scale(${scale}, ${scale})`
            }">
        <div class="map--layer">
            <transition
                enter-active-class="fadeIn"
                leave-active-class="fadeOut"
                v-for="(item, key) in game"
                :Key=key
            >
                <!-- transform: `translate(${(innerWidth/2) * (1/scale) - 50}px, ${(innerHeight/2) * (1/scale) - 50}px)`, -->
                <div
                    class="map--layer-item animated"
                    :Key=key
                    :style="{
                        'background-image': `url(${require('../assets/img/'+ item.img)})`,
                        left: item.position[0] + 'px',
                        top: item.position[1] + 'px',
                        }"
                    v-show="gameStep === key"
                ></div>
            </transition>
        </div>
    </div>

    <div class="control">
        <div class="control--pre" @touchstart="preStep">上一步</div>
        <div class="control--zoom" @touchstart="zoom">缩放</div>
        <div class="control--next" @touchstart="nextStep">下一步</div>
    </div>
</div>
</template>

<script>
import { game } from '@/config/config';
import { scrollTo } from '@/config/util';
import VueScroll from 'better-scroll'

let gameLen = game.length;  // 游戏配置长度
export default {
    data() {
        return {
            game,   // 游戏配置
            gameStep: 0,    // 当前游戏步骤
            scale: 0.6,    // 地图缩放比例
            currentOffset: [0, 0]
        }
    },
    // watch: {
    //     gameStep(val) {
    //         console.log(val);
    //     }
    // },
    mounted() {

    },
    methods: {
        preStep() {

            this.gameStep++;

            if (this.gameStep === this.gameStep-1) this.gameStep = 0
            let config = game[this.gameStep % gameLen];
            scrollTo({
                el: this.$refs.scroll,
                x: config.position[0],
                y: config.position[1],
                scale: this.scale
            }).then(res => {
                this.currentOffset = res;
                console.log(res)
            })
        },
        nextStep() {

            this.gameStep--;

            if (this.gameStep === -1) this.gameStep = gameLen-1

            // console.log(-1 * config.position[0], -1 * config.position[1])
            let config = game[this.gameStep % gameLen];
            scrollTo({
                el: this.$refs.scroll,
                x: config.position[0],
                y: config.position[1],
                scale: this.scale
            }).then(res => {
                this.currentOffset = res;
                console.log(res)
            })
        },
        zoom() {
            this.scale = this.scale === 1 ? 0.4 : 1;
            let config = game[this.gameStep % gameLen];
            scrollTo({
                el: this.$refs.scroll,
                x: config.position[0],
                y: config.position[1],
                scale: this.scale,
                animate: false
            })

        }
    }
}
</script>

<style lang="scss" scoped>
.home{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    // perspective: 100px;
}
.map{
    position: relative;
    width: 6000px;
    height: 4500px;
    z-index: 1;
    transform-origin: 0 0;
    // background-image: url('../assets/img/map.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    &--layer{
        position: absolute;
        width: 100%;
        height: 100%;
        &-item{
            width: 100px;
            height: 100px;
            position: absolute;
            transform: translate(-50%, -50%);
        }
    }
}

.control{
    // position: absolute;
    position: fixed;
    z-index: 10;
    width: 100%;
    // bottom: 0;
    top: 0;
    left: 0;
    height: 10vh;
    background-color: rgba(0,0,0,0.6);
    display: flex;
    justify-content: space-around;
    font-size: .4rem;
    color: white;
    &--pre{

    }
    &--next{

    }

}
</style>
