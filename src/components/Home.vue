<template>
<div class="home" ref="scroll" :freeScroll="true">
    <div class="map" ref='map'
        :style="{'background-image': `url(${require('../assets/img/map.jpg')})`}">
        <div class="map--layer">
            <transition
                enter-active-class="fadeIn"
                leave-active-class="fadeOut"
                v-for="(item, key) in game"
                :Key=key
            >
                <div
                    class="map--layer-item animated faster"
                    :Key=key
                    :style="{
                        'background-image': `url(${require('../assets/img/share.png')})`,
                        left: item.position[0] + 'px',
                        top: item.position[1] + 'px',
                        transform: `translate(${innerWidth/2 - 50}px, ${innerHeight/2 - 50}px)`,
                        }"
                    v-show="gameStep === key"
                ></div>
            </transition>
        </div>
    </div>

    <div class="control">
        <div class="control--pre" @touchstart="preStep">上一步</div>
        <div class="control--next" @touchstart="nextStep">下一步</div>
    </div>
</div>
</template>

<script>
import { game } from '@/config/config';
import { scrollTo } from '@/config/util';
import VueScroll from 'better-scroll'

// let gameStep = 0;
let gameLen = game.length;
let scroller;
export default {
    data() {
        return {
            game,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            gameStep: 0
        }
    },
    watch: {
        gameStep(val) {
            console.log(val);
        }
    },
    mounted() {
        console.log('../assets/img/' + 'map.jpeg')
        // scroller = new VueScroll(this.$refs.scroll, {
        //     freeScroll: true,
        //     scrollbar: {
        //         fade: false,
        //         interactive: true
        //     },
        //     bounce: {
        //         bottom: false,
        //         left: false,
        //         right: false,
        //         top: false
        //     },
        //     zoom: true,
        //     mouseWheel: true,
        // })
        // window.s = scroller;

        // setTimeout(() => {
        //     scroller.scrollTo(-500, -600, 500)
        // }, 1000)

        // scroller.on('scroll', () => {
        //     console.log('scroll')
        // })
    },
    methods: {
        preStep() {

            this.gameStep++;

            if (this.gameStep === this.gameStep-1) this.gameStep = 0
            let config = game[this.gameStep % gameLen];
            scrollTo(this.$refs.map, config.position[0], config.position[1])
            // console.log(-1 * config.position[0], -1 * config.position[1])
            // scroller.scrollTo(-1 * config.position[0], -1 * config.position[1], 500)
            // scroller.scrollTo(0, -1 * config.position[1], 500)
        },
        nextStep() {

            this.gameStep--;

            if (this.gameStep === -1) this.gameStep = gameLen-1

           // console.log(-1 * config.position[0], -1 * config.position[1])
            let config = game[this.gameStep % gameLen];
           scrollTo(this.$refs.map, config.position[0], config.position[1])
            // scroller.scrollTo(-1 * config.position[0], -1 * config.position[1], 500)
            // scroller.scrollTo(0, -1 * config.position[1], 500)
        }
    }
}
</script>

<style lang="scss" scoped>
.home{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
}
.map{
    position: relative;
    width: 6000px;
    height: 4500px;
    z-index: 1;
    // background-image: url('../assets/img/map.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    &--layer{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.2);

        &-item{
            width: 100px;
            height: 100px;
            position: absolute;

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
