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
                @click="clickLayer('reporter1')"
                :class="{inActive: currentState !== 'reporter1'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter1.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter2')"
                :class="{inActive: currentState !== 'reporter2'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter2.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter3')"
                :class="{inActive: currentState !== 'reporter3'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter3.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter4')"
                :class="{inActive: currentState !== 'reporter4'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter4.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter5')"
                :class="{inActive: currentState !== 'reporter5'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter5.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter6')"
                :class="{inActive: currentState !== 'reporter6'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter6.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter7')"
                :class="{inActive: currentState !== 'reporter7'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter7.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter8')"
                :class="{inActive: currentState !== 'reporter8'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter8.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter9')"
                :class="{inActive: currentState !== 'reporter9'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter9.png')})`}"
            ></div>
            <div class="control--guid-item"
                @click="clickLayer('reporter10')"
                :class="{inActive: currentState !== 'reporter10'}"
                :style="{'background-image': `url(${require('imgs/btn-reporter10.png')})`}"
            ></div>
        </div>
        <!-- 切换tab用切换背景图片的方式，不用多图层的方式 -->
        <div class="control--tap">
            <div class="control--tab-supervise"
                :class="{inActive: currentState !== 'supervise'}"
                @click="clickLayer('supervise')"
                :style="{'background-image': `url(${require('imgs/btn-supervise.png')})`}"
            ></div>
            <div class="control--tab-mayer"
                :class="{inActive: currentState !== 'mayer'}"
                @click="clickLayer('mayer')"
                :style="{'background-image': `url(${require('imgs/btn-mayer.png')})`}"
            ></div>
            <div class="control--tab-basic"
                :class="{inActive: currentState !== 'basic'}"
                @click="clickLayer('basic')"
                :style="{'background-image': `url(${require('imgs/btn-basic.png')})`}"
            ></div>
            <div class="control--tab-park"
                :class="{inActive: currentState !== 'park'}"
                @click="clickLayer('park')"
                :style="{'background-image': `url(${require('imgs/btn-park.png')})`}"
            ></div>
            <div class="control--tab-reporter"
                @click="showReporter"
                :class="{inActive: !reporterState}"
                :style="{'background-image': `url(${require('imgs/btn-reporter.png')})`}"
            ></div>
        </div>
    </div>
    <div class="mask" v-if="showMask && !isVertical" @touchstart="clickMask">
        <div class="mask--icon">
            <div class="mask--icon-left shuffleAnimate-left"
                :style="{'background-image': `url(${require('imgs/icon-arrow.png')})`}"
            ></div>
            <div class="mask--icon-right shuffleAnimate-right"
                :style="{'background-image': `url(${require('imgs/icon-arrow.png')})`}"
            ></div>
        </div>
        <div class="mask--text">
            <div class="mask--text-after"
                :style="{'background-image': `url(${require('imgs/icon-zoom.png')})`}"
            ></div>
            双指缩放地图可查看详细信息
        </div>
    </div>
    <vue-rota @rotation="handleRotation"></vue-rota>
</div>
</template>

<script>
import PinchZoom from '@/lib/pinchzoom';
// import Draw from '@/config/drawImg';
import VueRota from '@/components/childComponents/Rota.vue';
import {Howl} from 'howler';
import { isVertical, bus } from '@/config/util';
// import Preload from '@/config/preload';
// import { extraConfig } from '@/config/config';

let timer = null;
let blingCount = 0;
let hasBling = false;
let layerMap = {
    default: require('imgs/map.jpg'),
    all: require('imgs/all.jpg'),
    supervise: require('imgs/layer-supervise.jpg'),
    mayer: require('imgs/layer-mayer.jpg'),
    basic: require('imgs/layer-basic.jpg'),
    park: require('imgs/layer-park.jpg'),
    reporter1: require('imgs/layer-reporter1.jpg'),
    reporter2: require('imgs/layer-reporter2.jpg'),
    reporter3: require('imgs/layer-reporter3.jpg'),
    reporter4: require('imgs/layer-reporter4.jpg'),
    reporter5: require('imgs/layer-reporter5.jpg'),
    reporter6: require('imgs/layer-reporter6.jpg'),
    reporter7: require('imgs/layer-reporter7.jpg'),
    reporter8: require('imgs/layer-reporter8.jpg'),
    reporter9: require('imgs/layer-reporter9.jpg'),
    reporter10: require('imgs/layer-reporter10.jpg')
}

export default {
    data() {
        return {
            bgmImg: require('imgs/btn-music-on.png'),
            musicState: true,
            url: '',
            showMask: true,
            isVertical: false,
            reporterState: false,
            currentState: ''
        }
    },
    components: {
        VueRota
    },
    created() {
        // let preload = new Preload(extraConfig);
        // preload.init();


        if ( localStorage.getItem('mask') === 'true' && !location.search.includes('cache')) {
            this.showMask = false;
        }
        // 音乐

        bus.musicList.bgm.play();
    },
    mounted() {
        let el = this.$refs['map'];
        new PinchZoom(el, {
            maxZoom: 8,
            minZoom: 1,
            tapZoomFactor: 4,
            drawIns: null
        });
        this.switchLayer('default');
        // window.pz = pz;
        if (!this.showMask) {
            this.bling();
        }
    },
    watch: {
        showMask(val) {
            if(!val) {
                this.bling();
            }
        }
    },
    methods: {
        clickLayer(layer) {
            bus.musicList.click.play();
            this.stopBling();
            this.switchLayer(layer);
        },
        switchLayer(layer) {
            this.url = layerMap[layer];
            this.currentState = layer;
        },
        showReporter() {
            bus.musicList.click.play();
            this.reporterState = !this.reporterState
        },
        triggerBgm(){
            if (bus.musicList.bgm && bus.musicList.bgm.playing()) {
                this.musicState = false;
                this.bgmImg = require('imgs/btn-music-off.png')
                bus.musicList.bgm.pause();
            } else {
                this.musicState = true;
                this.bgmImg = require('imgs/btn-music-on.png')
                bus.musicList.bgm.play();
            }
        },
        clickMask() {
            this.showMask = false;
            localStorage.setItem('mask', 'true')
        },
        handleRotation() {
            this.isVertical = isVertical();
        },
        bling() {
            if (hasBling) return;
            hasBling = true;
            this.switchLayer('default');
            timer = setInterval(() => {
                if (blingCount >= 6) {
                    clearInterval(timer);
                    timer = null;
                    return;
                }

                blingCount++;
                if (this.currentState === 'all') {
                    this.switchLayer('default');
                } else {
                    this.switchLayer('all');
                }
            }, 500)
        },
        stopBling() {
            if (timer) {
                clearInterval(timer);
                timer = null
            }

        }
    }
}
</script>



<style lang="scss" scoped>
@import '../assets/scss/extend.scss';

.inActive{
    // css变灰兼容写法
    // filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale"); /* Firefox 3.5+ */
    // filter: gray; /* IE6-9 */
    // -webkit-filter: grayscale(100%);
    opacity: .5;
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

.mask{
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,.8);
    z-index: 999;
    width: 100%;
    height: 100%;

    &--icon{
        width: tvwV(180);
        height: tvwV(180);
        margin: tvwV(160) auto 0;
        position: relative;

        &>div{
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: tvwV(90);
            height: tvwV(90);
            position: absolute;
            transform-origin: center;
        }
        &-left{
            left: 0;
            bottom: 0;
            transform: rotate(90deg);
        }
        &-right{
            right: 0;
            top: 0;
            transform: rotate(-90deg);
        }
    }
    &--text{
        position: relative;
        margin-top: tvwV(108);
        color: white;
        font-size: tvwV(36);
        width: 100%;
        text-align: center;
        transform: translateX(tvwV(50));

        &-after{
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            width: tvwV(58);
            height: tvwV(58);
            position: absolute;
            left: tvwV(350);
            top: 0;

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
.shuffleAnimate-left{
    animation: shuffle-left 2s infinite ease-in-out;
}
.shuffleAnimate-right{
    animation: shuffle-right 2s infinite ease-in-out;
}
@keyframes shuffle-left {
    from, to {
        // left: 0;
        // bottom: 0;
        transform: rotate(90deg) translate(0, 0)
    }
    50% {
        // left: -10%;
        // bottom: -10%;
        transform: rotate(90deg) translate(30%, 30%)
    }
}
@keyframes shuffle-right {
    from, to {
        // right: 0;
        // top: 0;
        transform: rotate(-90deg) translate(0, 0)
    }
    50% {
        transform: rotate(-90deg) translate(30%, 30%)
    }
}
</style>
