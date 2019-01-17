<template>
<div class="home" ref="scroll" freeScroll="true">
    <div class="map" ref='map'></div>
    <div class="control">
        <div class="control--pre" @click="preStep">上一步</div>
        <div class="control--next" @click="nextStep">下一步</div>
    </div>
</div>
</template>

<script>
import { game } from '@/config/config';
import { scrollTo } from '@/config/util';
import VueScroll from 'better-scroll'

let gameStep = 0;
let gameLen = game.length;
export default {
    data() {
        return {

        }
    },
    mounted() {
        let scroll = new VueScroll(this.$refs.scroll, {
            probeType: 3,
            eventPassthrough: 'vertical'
            // freeScroll: true
        })
        scroll.on('scroll', () => {
            console.log('scroll')
        })
    },
    methods: {
        preStep() {
            let config = game[gameStep % gameLen];
            gameStep++;
            if (gameStep === gameStep-1) gameStep = 0
            scrollTo(this.$refs.map, config.position[0], config.position[1])
        },
        nextStep() {
            let config = game[gameStep % gameLen];
            gameStep--;
            if (gameStep === -1) gameStep = gameLen-1
            scrollTo(this.$refs.map, config.position[0], config.position[1])
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
    background-image: url('../assets/img/map.jpg');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat
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
