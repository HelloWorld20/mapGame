<template>
<div class="home" ref="scroll">
    <div class="map" ref='map'
        :style="{
            'background-image': `url(${require('../assets/img/map.jpg')})`,
            transform: `scale(${scale}, ${scale})`
            }">
        <div class="map--active">
            <transition
                enter-active-class="fadeIn"
                leave-active-class="fadeOut"
                v-for="(item, key) in game"
                :Key=key
            >
                <!-- transform: `translate(${(innerWidth/2) * (1/scale) - 50}px, ${(innerHeight/2) * (1/scale) - 50}px)`, -->
                <div
                    class="map--active-item map--active-map animated"
                    :Key=key
                    ref='item'
                    :style="{
                        'background-image': `url(${require('../assets/img/'+ item.img)})`,
                        left: item.position[0] + 'px',
                        top: item.position[1] + 'px',
                        }"
                    v-show="gameStep === key"
                ></div>
            </transition>
        </div>
        <div class="map--layer">
            <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
                <div class="map--layer-line" v-show="hasline"></div>
            </transition>
            <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
                <div class="map--layer-point" v-show="haspoint"></div>
            </transition>
            <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
                <div class="map--layer-text" v-show="hastext"></div>
            </transition>
            <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
                <div class="map--layer-pic" v-show="haspic"></div>
            </transition>
        </div>

    </div>

    <div class="control">
        <div class="control--handle">
            <div class="control--handle-pre" @touchstart="preStep">上一步</div>
            <div class="control--handle-zoom" @touchstart="zoomIn">放大</div>
            <div class="control--handle-zoom" @touchstart="zoomOut">缩小</div>
            <div class="control--handle-next" @touchstart="nextStep">下一步</div>
        </div>
        <div class="control--tap">
            <div class="control--tab-1"
                :class="{active: hasline}"
                @click="switchLayer('line')"
            >1</div>
            <div class="control--tab-2"
                :class="{active: haspoint}"
                @click="switchLayer('point')"
            >2</div>
            <div class="control--tab-3"
                :class="{active: hastext}"
                @click="switchLayer('text')"
            >3</div>
            <div class="control--tab-4"
                :class="{active: haspic}"
                @click="switchLayer('pic')"
            >4</div>
        </div>
    </div>
</div>
</template>

<script>
import { game } from '@/config/config';
import { scrollTo } from '@/config/util';
import VueScroll from 'better-scroll'

let gameLen = game.length;  // 游戏配置长度
const MAX_SCALE = 1;
const MIN_SCALE = 0.4;
export default {
    data() {
        return {
            game,   // 游戏配置
            gameStep: 0,    // 当前游戏步骤
            scale: 0.6,    // 地图缩放比例
            currentOffset: [0, 0],
            activeLayer: new Set(['line', 'point', 'text', 'pic']),
            hasline: true,
            haspic: true,
            hastext: true,
            haspoint: true,
        }
    },
    mounted() {
        this.nextStep();
        // setTimeout(() =>{
        //     this.hasLine = false;
        //     console.log('flse')
        // }, 2000)
    },
    computed: {
        // hasLine() {
        //     return this.activeLayer.has('line')
        // },
        // hasPic() {
        //     return this.activeLayer.has('pic')
        // },
        // hasText() {
        //     return this.activeLayer.has('text')
        // },
        // hasPoint() {
        //     return this.activeLayer.has('point')
        // }
    },
    methods: {
        preStep() {
            this.gameStep++;
            if (this.gameStep > gameLen-1) this.gameStep = 0
            let config = game[this.gameStep % gameLen];
            scrollTo({
                el: this.$refs.scroll,
                target: this.$refs.item[this.gameStep],
                x: config.position[0],
                y: config.position[1],
                scale: this.scale
            })
        },
        nextStep() {
            this.gameStep--;

            if (this.gameStep === -1) this.gameStep = gameLen-1

            let config = game[this.gameStep % gameLen];
            scrollTo({
                el: this.$refs.scroll,
                target: this.$refs.item[this.gameStep],
                x: config.position[0],
                y: config.position[1],
                scale: this.scale
            })
        },
        // 放大
        zoomIn() {
            if (this.scale < MAX_SCALE) {
                this.zoom(this.scale + 0.1)
            }
        },
        zoomOut() {
            if (this.scale > MIN_SCALE) {
                this.zoom(this.scale - 0.1)
            }
        },
        zoom(size) {
            let config = game[this.gameStep % gameLen];

            scrollTo({
                el: this.$refs.scroll,
                target: this.$refs.item[this.gameStep],
                x: config.position[0],
                y: config.position[1],
                scale: size,
                animate: false
            }).then(res => {
                this.scale = size;
            })
        },
        switchLayer(layer) {
            console.log(layer, this.activeLayer, this.activeLayer.has(layer));
            if (this.activeLayer.has(layer)) {
                this.activeLayer.delete(layer)
                this[`has${layer}`] = false;
            } else {
                this.activeLayer.add(layer);
                this[`has${layer}`] = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.active{
    color: red;
}
.home{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
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

    &--active{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        &-item{
            width: 100px;
            height: 100px;
            position: absolute;
            transform: translate(-50%, -50%);
            animation-delay: .5s;
        }
    }

    &--layer{

        &>div{
            opacity: .1;
            position: absolute;
            width: 100%;
            height: 100%;
        }

        &-line{
            z-index: 5;
            background-color: rgba(255,0,0,.6);
        }
        &-point{
            z-index: 6;
            background-color: rgba(0,255,0,.6);
        }
        &-text{
            z-index: 7;
            background-color: rgba(0,0,255,.6);
        }
        &-pic{
            z-index: 8;
            background-color: rgba(100,100,100,.6);
        }
    }
}

.control{

    font-size: .3rem;
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

    &--tap{
        position: fixed;
        z-index: 10;
        width: 100%;
        bottom: 0;
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


}
</style>
