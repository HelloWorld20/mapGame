<template>
<div class="home">
    <!-- <div class="lineX" style="position: fixed; height: 100vh;width: 1px; left: 50%; background: red;z-index: 9999;"></div>
    <div class="lineY" style="position: fixed; height: 1px;width: 100vw; top: 50%; background: green;z-index: 9999;"></div> -->
    <div class="map" ref='map'
        :style="{
            'background-image': `url(${require('../assets/img/map.jpg')})`,
            }">
        <div class="map--active">
            <transition
                enter-active-class="bounceIn"
                leave-active-class="bounceOut"
                v-for="(item, key) in game"
                :Key=key
            >
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
        <!-- <div class="map--layer">
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
        </div> -->

    </div>

    <div class="control">
        <div class="control--handle">
            <div class="control--handle-pre" @touchstart="preStep">上一步</div>
            <!-- <div class="control--handle-zoom" @touchstart="zoomIn">放大</div>
            <div class="control--handle-zoom" @touchstart="zoomOut">缩小</div> -->
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
import { scrollTo, parseTransform } from '@/config/util';
import PinchZoom from '@/lib/pinchzoom'

let gameLen = game.length;  // 游戏配置长度
export default {
    data() {
        return {
            game,   // 游戏配置
            gameStep: 0,    // 当前游戏步骤
            scale: 1,    // 地图缩放比例
            activeLayer: new Set(['line', 'point', 'text', 'pic']),
            hasline: true,
            haspic: true,
            hastext: true,
            haspoint: true,
            pz: null    // pinchzoom实例
        }
    },
    mounted() {

        let el = this.$refs['map'];
        this.pz = new PinchZoom(el, {
            maxZoom: 8,
            minZoom: 1,
            tapZoomFactor: 4,
            // draggableUnzoomed: false
        });

        var callback = mutationsList => {
            let transformStr = el.style.transform;
            // 如果不是3d scale就计算
            if (transformStr.indexOf('scale(') !== -1) {
                let {scaleX} = parseTransform(transformStr)
                // 拿到pinchzoom的scale
                this.scale = scaleX;
            }
        };

        var observer = new MutationObserver(callback);
        observer.observe(el, {attributes: true, childList: false, subtree: false });
    },
    methods: {
        preStep() {
            this.gameStep++;
            if (this.gameStep > gameLen-1) this.gameStep = 0
            let config = game[this.gameStep % gameLen];
            scrollTo({
                // el: this.$refs.scroll,
                target: this.$refs.item[this.gameStep],
                map: this.$refs.map,
                x: config.position[0],
                y: config.position[1],
                scale: this.scale
            }).then(res => {
                // 重设pinchzoom的滚动点位置，为了不让滚动时会闪烁，算法成谜
                this.pz.offset.x = res.x * this.scale;
                this.pz.offset.y = res.y * this.scale;
            })
        },
        nextStep() {
            this.gameStep--;

            if (this.gameStep === -1) this.gameStep = gameLen-1

            let config = game[this.gameStep % gameLen];
            scrollTo({
                // el: this.$refs.scroll,
                target: this.$refs.item[this.gameStep],
                map: this.$refs.map,
                x: config.position[0],
                y: config.position[1],
                scale: this.scale
            }).then(res => {
                // 重设pinchzoom的滚动点位置，为了不让滚动时会闪烁，算法成谜
                this.pz.offset.x = res.x * this.scale;
                this.pz.offset.y = res.y * this.scale;
            })
        },
        switchLayer(layer) {
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
    // overflow: auto;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
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
            // transform: translate(-50%, -50%);
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
