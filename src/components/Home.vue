<template>
<div class="home">
     <!-- :style="{'background-image': `url(${require('imgs/map.jpg')})`,}" -->
    <div class="map" ref='map'
         :style="{'background-image': `url('${url}')`}"
        >
        <!-- <div class="map--active">
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
                        'background-image': `url(${require('imgs/'+ item.img)})`,
                        left: item.position[0] + 'px',
                        top: item.position[1] + 'px',
                    }"
                    v-show="gameStep === key"
                ></div>
            </transition>
        </div> -->
        <div class="map--layer">
                <!-- <div class="map--layer-supervise"
                    v-if="hasSupervise"
                    :style="{'background-image': `url(${require('imgs/layer-supervise.png')})`,}"
                ></div>

                <div class="map--layer-mayer"
                    v-if="hasMayer"
                    :style="{'background-image': `url(${require('imgs/layer-mayer.png')})`,}"
                ></div>

                <div class="map--layer-basic"
                    v-if="hasBasic"
                    :style="{'background-image': `url(${require('imgs/layer-basic.png')})`,}"
                ></div>

                <div class="map--layer-park"
                    v-if="hasPark"
                    :style="{'background-image': `url(${require('imgs/layer-park.png')})`,}"
                ></div>

                <div class="map--layer-reporter1"
                    v-if="hasReporter1"
                    :style="{'background-image': `url(${require('imgs/layer-reporter1.png')})`,}"
                ></div> -->

                <!-- <div class="map--layer-reporter2"
                    v-if="hasReporter2"
                    :style="{'background-image': `url(${require('imgs/layer-reporter2.png')})`,}"
                ></div>

                <div class="map--layer-reporter3"
                    v-if="hasReporter3"
                    :style="{'background-image': `url(${require('imgs/layer-reporter3.png')})`,}"
                ></div>

                <div class="map--layer-reporter4"
                    v-if="hasReporter4"
                    :style="{'background-image': `url(${require('imgs/layer-reporter4.png')})`,}"
                ></div>

                <div class="map--layer-reporter5"
                    v-if="hasReporter5"
                    :style="{'background-image': `url(${require('imgs/layer-reporter5.png')})`,}"
                ></div>

                <div class="map--layer-reporter6"
                    v-if="hasReporter6"
                    :style="{'background-image': `url(${require('imgs/layer-reporter6.png')})`,}"
                ></div>

                <div class="map--layer-reporter7"
                    v-if="hasReporter7"
                    :style="{'background-image': `url(${require('imgs/layer-reporter7.png')})`,}"
                ></div>

                <div class="map--layer-reporter8"
                    v-if="hasReporter8"
                    :style="{'background-image': `url(${require('imgs/layer-reporter8.png')})`,}"
                ></div>

                <div class="map--layer-reporter9"
                    v-if="hasReporter9"
                    :style="{'background-image': `url(${require('imgs/layer-reporter9.png')})`,}"
                ></div>

                <div class="map--layer-reporter10"
                    v-if="hasReporter10"
                    :style="{'background-image': `url(${require('imgs/layer-reporter10.png')})`,}"
                ></div> -->
            <!-- </transition> -->
        </div>
    </div>

    <div class="control">
        <!-- <div class="control--handle">
            <div class="control--handle-pre" @touchstart="preStep">上一步</div>
            <div class="control--handle-next" @touchstart="nextStep">下一步</div>
        </div> -->
        <div class="control--guid">
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

let selectedLayer = [require('imgs/map.png')]

export default {
    data() {
        return {
            // game,   // 游戏配置
            // gameStep: 0,    // 当前游戏步骤
            // 'Supervise', 'Mayer', 'Basic', 'Park', 'Reporter1'
            activeLayer: new Set([]),
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
            url: ''
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
            drawIns: null
        });

        // window.pz = pz;

        // this.$refs.frame.$emit('start');

        this.drawIns = new Draw()

        this.drawIt(selectedLayer);
    },
    methods: {
        switchLayer(layer) {
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
</style>
