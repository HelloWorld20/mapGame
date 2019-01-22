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
            <div class="right"
                :style="{'background-image': `url(${require('../assets/img/loading.gif')})`}"
            >
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
        <!-- <div class="icon"
            :style="{'background-image': `url(${require('../assets/img/loading.gif')})`}"
        ></div>
        <div class="bar">
            <div class="wrapper">
                <div class="process" :style="{width: progress + '%'}"></div>
            </div>
        </div>
        <div class="count">
            {{progress}} %
        </div> -->
        <vue-rota></vue-rota>
        <!-- <vue-preload @percentage="percentage" @loaded="loaded"></vue-preload> -->
    </section>

</template>

<script>
import { isVertical } from '@/config/util'
import VueRota from '@/components/childComponents/Rota'
import Preload from '@/config/preload';
export default {
    data() {
        return {
            progress: 0,
            ready: false
        }
    },
    props: {
        // 是否只是展示而已，不loading，默认不是静态，要loading
        isStatic: {
            default: false,
            type: Boolean
        }
    },
    components: {VueRota},
    created() {
        let preload = new Preload(this.percentage, this.loaded);
        if (!this.isStatic) {
            preload.init();
        } else {
            this.ready = true;
        }

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
            }
        }
        .right{
            width: tvwV(302);
            height: tvwV(362);
            background-size: 100%;
            background-position: center;
            background-repeat: no-repeat;
            position: absolute;
            right: 0;
            top: tvwV(-60);
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
            width: 100%;
            text-align: center;
            margin-top: tvwV(36);
        }
    }


    // .icon{
    //     background-size: 100%;
    //     background-position: center;
    //     background-repeat: no-repeat;
    //     width: tvw(302);
    //     height: tvw(362);
    //     position: absolute;
    //     transform: translate(-50%, -50%);
    //     left: 50%;
    //     top: 30vw;
    // }

    // .bar{
    //     width: tvw(440);
    //     margin: tvw(400) auto 0;
    //     height: tvw(30);
    //     border: tvw(5) solid black;
    //     border-radius: tvw(15);
    //     box-sizing: border-box;
    //     display: flex;
    //     // justify-content: center;
    //     align-items: center;
    //     padding: 0 tvw(8);
    //     .wrapper{
    //         height: tvw(8);
    //         background-color: transparent;
    //         // background-color: rgba(0, 100, 0, .4);
    //         width: tvw(424);

    //         .process{
    //             transition: width 1s ease-in-out;
    //             height: 100%;
    //             background-color: black;
    //             border-radius: tvw(4);
    //         }
    //     }
    // }

    // .count{
    //     font-size: tvw(26);
    //     width: 100%;
    //     text-align: center;
    //     margin-top: tvw(42);
    // }

</style>
