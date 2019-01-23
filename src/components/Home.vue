<template>
<div class="home">
     <div class="bgm"
        :class="{rotaAnimate: musicState}"
        @click="triggerBgm"
        :style="{'background-image': `url('${bgmImg}')`}"
     ></div>
    <div class="map" ref='map'
         :style="{'background-image': `url('${url}')`}"
        >
    </div>

    <div class="control">
        <div class="control--guid" v-show="reporterState">
            <div class="control--guid-item"
                @click="switchLayer('reporter1')"
                :class="{inActive: !state.reporter1}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter1.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter2')"
                :class="{inActive: !state.reporter2}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter2.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter3')"
                :class="{inActive: !state.reporter3}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter3.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter4')"
                :class="{inActive: !state.reporter4}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter4.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter5')"
                :class="{inActive: !state.reporter5}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter5.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter6')"
                :class="{inActive: !state.reporter6}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter6.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter7')"
                :class="{inActive: !state.reporter7}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter7.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter8')"
                :class="{inActive: !state.reporter8}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter8.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter9')"
                :class="{inActive: !state.reporter9}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter9.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="switchLayer('reporter10')"
                :class="{inActive: !state.reporter10}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter10.png')})`}"
            ></div>
        </div>
        <!-- 切换tab用切换背景图片的方式，不用多图层的方式 -->
        <div class="control--tap">
            <div class="control--tab-supervise"
                :class="{inActive: !state.supervise}"
                @click="switchLayer('supervise')"
                :style="{'background-image': `url(${require('@/assets/img/btn-supervise.png')})`}"
            ></div>
            <div class="control--tab-mayer"
                :class="{inActive: !state.mayer}"
                @click="switchLayer('mayer')"
                :style="{'background-image': `url(${require('@/assets/img/btn-mayer.png')})`}"
            ></div>
            <div class="control--tab-basic"
                :class="{inActive: !state.basic}"
                @click="switchLayer('basic')"
                :style="{'background-image': `url(${require('@/assets/img/btn-basic.png')})`}"
            ></div>
            <div class="control--tab-park"
                :class="{inActive: !state.park}"
                @click="switchLayer('park')"
                :style="{'background-image': `url(${require('@/assets/img/btn-park.png')})`}"
            ></div>
            <div class="control--tab-reporter"
                @click="showReporter"
                :class="{inActive: !reporterState}"
                :style="{'background-image': `url(${require('@/assets/img/btn-reporter.png')})`}"
            ></div>
        </div>
    </div>
    <vue-rota :isComponents="true"></vue-rota>
</div>
</template>

<script>
import { game } from '@/config/config';
import { scrollTo, parseTransform } from '@/config/util';
import PinchZoom from '@/lib/pinchzoom';
import Draw from '@/config/drawImg';
import VueRota from '@/components/childComponents/Rota.vue';
import {Howl, Howler} from 'howler';

// let gameLen = game.length;  // 游戏配置长度
// let isAnimating = false;
let pz = null;// pinchzoom实例
let timer = null;
let layerMap = {
    supervise: require('imgs/layer-supervise.png'),
    mayer: require('imgs/layer-mayer.png'),
    basic: require('imgs/layer-basic.png'),
    park: require('imgs/layer-park.png'),
    reporter1: require('imgs/layer-reporter1.png'),
    reporter2: require('imgs/layer-reporter2.png'),
    reporter3: require('imgs/layer-reporter3.png'),
    reporter4: require('imgs/layer-reporter4.png'),
    reporter5: require('imgs/layer-reporter5.png'),
    reporter6: require('imgs/layer-reporter6.png'),
    reporter7: require('imgs/layer-reporter7.png'),
    reporter8: require('imgs/layer-reporter8.png'),
    reporter9: require('imgs/layer-reporter9.png'),
    reporter10: require('imgs/layer-reporter10.png')
}

let selectedLayer = [require('imgs/map.png')];
var bgm

export default {
    data() {
        return {
            // game,   // 游戏配置
            // gameStep: 0,    // 当前游戏步骤
            // 'Supervise', 'Mayer', 'Basic', 'Park', 'Reporter1'
            activeLayer: new Set([]),
            bgmImg: require('imgs/btn-music-on.png'),
            musicState: true,
            state: {
                supervise: false,
                mayer: false,
                basic: false,
                park: false,
                reporter1: false,
                reporter2: false,
                reporter3: false,
                reporter4: false,
                reporter5: false,
                reporter6: false,
                reporter7: false,
                reporter8: false,
                reporter9: false,
                reporter10: false,
            },
            reporterState: false,
            url: ''
        }
    },
    components: {
        // VueFrame,
        VueRota
    },
    created() {
        bgm = new Howl({
            src: [require('@/assets/audios/bgm.mp3')],
            loop: true
        });
        bgm.play();
    },
    mounted() {

        let el = this.$refs['map'];
        pz = new PinchZoom(el, {
            maxZoom: 8,
            minZoom: 1,
            tapZoomFactor: 4,
            drawIns: null
        });

        // window.pz = pz;

        // this.$refs.frame.$emit('start');

        this.drawIns = new Draw()

        this.drawIt(selectedLayer);
    },
    methods: {
        switchLayer(layer) {
            bus.musicManager.play('bgm')
            if (this.activeLayer.has(layer)) {
                this.activeLayer.delete(layer)
                this.state[layer] = false;
            } else {
                this.activeLayer.add(layer);
                this.state[layer] = true;
            }

            let selectedBtn = Object.keys(this.state).filter(v => {
                return this.state[v]
            });

            let result = [
                require('imgs/map.png')
            ]
            result = result.concat(selectedBtn.map(v => {
                return layerMap[v]
            }))

            this.drawIt(result)
        },
        drawIt(selectedLayer) {
            this.drawIns.draw(selectedLayer).then(res => {
                this.url = res
            })
        },
        showReporter() {
            this.reporterState = !this.reporterState
        },
        triggerBgm(){
            if (bgm && bgm.playing()) {
                this.musicState = false;
                this.bgmImg = require('imgs/btn-music-off.png')
                bgm.pause();
            } else {
                this.musicState = true;
                this.bgmImg = require('imgs/btn-music-on.png')
                bgm.play();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/extend.scss';

.inActive{
    // css变灰兼容写法
    filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 3.5+ */
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(100%);
}
.home{
    position: relative;
    width: 100vw;
    height: 100vh;
    // overflow: auto;
    overflow: hidden;
    // -webkit-overflow-scrolling: touch;
}
.bgm{
    position: absolute;
    left: tvwV(30);
    top: tvwV(30);
    z-index: 999;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: tvwV(50);
    height: tvwV(50);
}
.map{
    position: relative;
    width: 3300px;
    height: 2475px;
    z-index: 1;
    transform-origin: 0 0;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    // border: 1px solid green;
    padding-left: 300px;
    &--active{
        position: absolute;
        z-index: 10;
        &-item{
            width: 100px;
            height: 100px;
            position: absolute;
            // transform: translate(-50%, -50%);
            animation-delay: .5s;
            // will-change: transform;
        }
    }

    &--layer{
        position: relative;
        width: 3300px;
        height: 2475px;
        &>div{
            position: absolute;
            // border: 1px solid red;
            // 不懂为什么还是3300px
            width: 3300px;
            height: 2475px;
        }

        &-supervise{
            z-index: 5;
        }
        &-mayer{
            z-index: 6;
        }
        &-basic{
            z-index: 7;
        }
        &-park{
            z-index: 8;
        }
        &-reporter{
            z-index: 9;
        }
    }
}

.control{

    font-size: .13rem;
    color: white;
    &--handle {
        position: fixed;
        z-index: 10;
        width: 100%;
        top: 0;
        left: 0;
        height: 8vh;
        background-color: rgba(0,0,0,0.6);
        display: flex;
        justify-content: space-around;

        &>div{
            flex-grow: 1;
            text-align: center;
        }
    }
    &--guid{
        position: fixed;
        z-index: 10;
        width: 100%;
        bottom: tvwV(110);
        left: 0;
        height: tvwV(98);
        background-color: transparent;
        display: flex;
        justify-content: space-around;

        &-item{
            width: tvwV(80);
            height: tvwV(80);
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
        }
    }
    &--tap{
        position: fixed;
        z-index: 10;
        width: 100%;
        bottom: tvwV(36);
        left: 0;
        height: tvwV(80);
        background-color: transparent;
        display: flex;
        justify-content: space-around;

        &>div{
            // width:20%;
            // flex-grow: 1;
            // text-align: center;
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            width: tvwV(232);
            height: tvwV(80);
            border-radius: tvwV(80);
        }
    }
}

.rotaAnimate {
    transform-origin: 50%, 50%;
    animation: rotation 3s infinite linear;
}
@keyframes rotation {
    0% {
        transform: rotate(0);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
