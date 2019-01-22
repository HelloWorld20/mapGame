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
        <div class="map--layer">
            <!-- <transition enter-active-class="fadeIn" leave-active-class="fadeOut"> -->
                <div class="map--layer-supervise" v-if="hasSupervise"></div>
            <!-- </transition> -->
            <!-- <transition enter-active-class="fadeIn" leave-active-class="fadeOut"> -->
                <div class="map--layer-mayer" v-if="hasMayer"></div>
            <!-- </transition> -->
            <!-- <transition enter-active-class="fadeIn" leave-active-class="fadeOut"> -->
                <div class="map--layer-basic" v-if="hasBasic"></div>
            <!-- </transition> -->
            <!-- <transition enter-active-class="fadeIn" leave-active-class="fadeOut"> -->
                <div class="map--layer-park" v-if="hasPark"></div>
            <!-- </transition> -->
            <!-- <transition enter-active-class="fadeIn" leave-active-class="fadeOut"> -->
                <div class="map--layer-reporter" v-if="hasReporter"></div>
            <!-- </transition> -->
        </div>
    </div>

    <div class="control">
        <!-- <div class="control--handle">
            <div class="control--handle-pre" @touchstart="preStep">上一步</div>
            <div class="control--handle-next" @touchstart="nextStep">下一步</div>
        </div> -->
        <!-- 切换tab用切换背景图片的方式，不用多图层的方式 -->
        <div class="control--tap">
            <div class="control--tab-1"
                :class="{active: hasSupervise}"
                @click="switchLayer('Supervise')"
            >督察组“回头看”地点</div>
            <div class="control--tab-2"
                :class="{active: hasMayer}"
                @click="switchLayer('Mayer')"
            >市级河长驻河过夜点</div>
            <div class="control--tab-3"
                :class="{active: hasBasic}"
                @click="switchLayer('Basic')"
            >基础设施</div>
            <div class="control--tab-4"
                :class="{active: hasPark}"
                @click="switchLayer('Park')"
            >工业园区</div>
            <div class="control--tab-4"
                :class="{active: hasReporter}"
                @click="switchLayer('Reporter')"
            >驻河记者路线</div>
        </div>
    </div>
    <!-- <vue-frame ref="frame"></vue-frame> -->
    <vue-rota :isComponents="true"></vue-rota>
</div>
</template>

<script>
import { game } from '@/config/config';
import { scrollTo, parseTransform } from '@/config/util';
import PinchZoom from '@/lib/pinchzoom';
// import VueFrame from '@/components/childComponents/Frame.vue';
import VueRota from '@/components/childComponents/Rota.vue';

let gameLen = game.length;  // 游戏配置长度
let isAnimating = false;
let pz = null;// pinchzoom实例

export default {
    data() {
        return {
            game,   // 游戏配置
            gameStep: 0,    // 当前游戏步骤
            activeLayer: new Set(['Supervise', 'Mayer', 'Basic', 'Park', 'Reporter']),
            hasSupervise: true,
            hasMayer: true,
            hasBasic: true,
            hasPark: true,
            hasReporter: true,
        }
    },
    components: {
        // VueFrame,
        VueRota
    },
    mounted() {

        let el = this.$refs['map'];
        pz = new PinchZoom(el, {
            maxZoom: 8,
            minZoom: 1,
            tapZoomFactor: 4,
        });

        // window.pz = pz;

        // this.$refs.frame.$emit('start');
    },
    methods: {
        preStep() {
            if (isAnimating) return;
            this.gameStep--;
            if (this.gameStep === -1) this.gameStep = gameLen-1
            let config = game[this.gameStep % gameLen];
            isAnimating = true;

            let scale = pz.getInitialZoomFactor() * pz.zoomFactor;
            pz.disable();
            scrollTo({
                // el: this.$refs.scroll,
                target: this.$refs.item[this.gameStep],
                map: this.$refs.map,
                x: config.position[0],
                y: config.position[1],
                scale
            }).then(res => {
                // 重设pinchzoom的滚动点位置，为了不让滚动时会闪烁，算法成谜

                pz.offset.x = res.x * scale;
                pz.offset.y = res.y * scale;
                isAnimating = false;
                scale = null;
                pz.enable();
            })
        },
        nextStep() {
            if (isAnimating) return;

            this.gameStep++;
            if (this.gameStep > gameLen-1) this.gameStep = 0
            let config = game[this.gameStep % gameLen];

            isAnimating = true;

            let scale = pz.getInitialZoomFactor() * pz.zoomFactor;
            pz.disable();
            scrollTo({
                target: this.$refs.item[this.gameStep],
                map: this.$refs.map,
                x: config.position[0],
                y: config.position[1],
                scale
            }).then(res => {
                // 重设pinchzoom的滚动点位置，为了不让滚动时会闪烁，算法成谜
                pz.offset.x = res.x * scale;
                pz.offset.y = res.y * scale;
                isAnimating = false;
                pz.enable();
            })
        },
        switchLayer(layer) {
            if (this.activeLayer.has(layer)) {
                this.activeLayer.delete(layer)
                this[`has${layer}`] = false;
                console.log(this[`has${layer}`])
            } else {
                this.activeLayer.add(layer);
                this[`has${layer}`] = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/extend.scss';

.active{
    color: red;
}
.home{
    position: relative;
    width: 100vw;
    height: 100vh;
    // overflow: auto;
    overflow: hidden;
    // -webkit-overflow-scrolling: touch;
}
.map{
    position: relative;
    width: 6000px;
    height: 4500px;
    z-index: 1;
    transform-origin: 0 0;
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
            // will-change: transform;
        }
    }

    &--layer{

        &>div{
            opacity: .1;
            position: absolute;
            width: 100%;
            height: 100%;
        }

        &-supervise{
            z-index: 5;
            background-color: rgba(255,0,0,.6);
        }
        &-mayer{
            z-index: 6;
            background-color: rgba(0,255,0,.6);
        }
        &-basic{
            z-index: 7;
            background-color: rgba(0,0,255,.6);
        }
        &-park{
            z-index: 8;
            background-color: rgba(0,100,100,.6);
        }
        &-reporter{
            z-index: 9;
            background-color: rgba(100,100,0,.6);
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
            width:20%;
            // flex-grow: 1;
            text-align: center;
        }
    }


}
</style>
