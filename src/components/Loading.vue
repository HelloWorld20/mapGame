<template>
    <section>
        <div class="up">
            <div class="left">
                <transition enter-active-class="fadeIn">
                    <div v-show="ready" class="text animated">中央督察组“回头看”都去了哪？</div>
                </transition>
                <transition enter-active-class="fadeIn">
                    <div class="text animated"
                        v-show="ready"
                        style="animation-delay: .5s"
                    >市级河长都在哪些驻河点过夜？</div>
                </transition>
                <transition enter-active-class="fadeIn">
                    <div class="text animated"
                        v-show="ready"
                        style="animation-delay: 1s"
                    >基础设施和工业园区进度如何了？</div>
                </transition>
                <transition enter-active-class="fadeIn">
                    <div class="text animated"
                        v-show="ready"
                        style="animation-delay: 1.5s"
                    >记者带你走走看</div>
                </transition>
            </div>
            <div class="right">
                <div class="man" :style="{'background-image': `url(${require('imgs/loading.gif')})`}"></div>
                <transition enter-active-class="fadeIn">
                    <div class="river animated"
                        v-show="ready"
                        :style="{'background-image': `url(${require('imgs/bg-river.png')})`}"
                        style="animation-delay: 1s; animation-duration: 2s"
                    ></div>
                </transition>
            </div>
        </div>
        <div class="down">
            <div class="wrapper">
                <div class="process" :style="{width: progress + '%'}"></div>
            </div>
            <div class="count">
                {{progress}} %
            </div>
        </div>
        <vue-rota></vue-rota>
    </section>

</template>

<script>
import { isVertical, bus } from '@/config/util'
import VueRota from '@/components/childComponents/Rota'
import Preload from '@/config/preload';
import config from '@/config/config';
export default {
    data() {
        return {
            progress: 0,
            ready: false
        }
    },
    components: {VueRota},
    created() {
        let preload = new Preload(config, this.percentage, this.loaded);
        preload.init();
        bus.musicList.bgm = new Howl({
            src: [require('@/assets/audios/bgm.mp3')],
            loop: true
        });
        bus.musicList.click = new Howl({
            src: [require('@/assets/audios/click.mp3')]
        })
    },
    methods: {
        percentage(data) {
            this.ready = true;
            this.progress = parseInt(data * 100, 10);
        },
        loaded() {
            setTimeout(() => {
                this.$router.replace('Home')
            }, 1000)
        }
    }
};

</script>

<style lang='scss' scoped>
    @import '../assets/scss/extend.scss';

    .up{
        position: relative;
        background-color: white;
        height: tvwV(230);
        width: tvwV(830);
        margin: 0 auto;
        .left{
            margin: tvwV(124) auto 0;
            width: tvwV(830);
            .text{
                text-align: left;
                font-size: tvwV(36);
                line-height: 1;
                margin-bottom: tvwV(26);
                color: black;
                font-weight: bolder;
            }
        }
        .right{
            width: tvwV(302);
            height: tvwV(362);

            position: absolute;
            right: 0;
            top: tvwV(-60);
            z-index: 1;
            // top: tvwV(-100);
            .man{
                position: absolute;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 2;
            }
            .river{
                position: absolute;
                width: tvwV(620);
                height: tvwV(76);
                top: tvwV(240);
                // bottom: tvwV(-70);
                left: tvwV(-180);
                z-index: 1;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }
    .down{
        width: 100%;
        height: tvwV(16);
        margin-top: tvwV(112);
        .wrapper{
            margin: 0 auto;
            height: tvwV(16);
            background-color: transparent;
            background-color: #e4e4e4;
            width: tvwV(830);
            border-radius: tvw(8);

            .process{
                transition: width .5s ease-in-out;
                height: 100%;
                background-color: black;
                border-radius: tvw(8);
            }
        }

        .count{
            font-size: tvwV(26);
            font-weight: bolder;
            width: 100%;
            text-align: center;
            margin-top: tvwV(36);
        }
    }

</style>
