<template>
    <section>
        <section class="preload">
            <div class="preload-bottom"></div>
            <div class="preload-top"></div>
        </section>
        <i></i>
        <vue-preload @percentage="percentage" @loaded="loaded"></vue-preload>
    </section>

</template>

<script>
    import VuePreload from '@/components/childComponents/Preload'
    export default {
        components: {VuePreload},
        methods: {
            percentage(data) {

            },
            loaded() {
                
            }
        }
    };

</script>

<style lang='scss'>
    @import '../assets/scss/extend.scss';

    i {
        position: absolute;
        top: tr(1000);
        @extend .c;
        width: tr(300);
        height: tr(300);
        @extend .b-contain;
        background-image: url('../assets/img/share.png');
    }

    $wh:154;
    .preload {
        position: relative; // top: tr(1052);
        top: tr(400);
        margin: 0 auto;
        width: tr($wh);
        height: tr($wh);
        border-radius: tr($wh);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 1s;
        -webkit-transform: rotate(0deg); // 修复圆角的BUG
        .preload-bottom {
            $wh: 150;
            width: tr($wh);
            height: tr($wh);
            border-radius: tr($wh);
            background-color: RGB(233, 87, 51);
            animation: bottomLoop linear 6s infinite;
        }
        .preload-top {
            position: absolute;
            left: 0;
            top: 0;
            width: tr($wh);
            height: tr($wh);
            background-color: RGB(242, 242, 242);
            animation: topLoop linear 3s infinite;
        }
        @keyframes topLoop {
            0% {
                transform: translateY(0);
            }
            100% {
                transform: translateY(tr(-160));
            }
        }
        @keyframes bottomLoop {
            0% {}
            40% {
                background-color: RGB(233, 87, 51);
            }
            50% {
                background-color: RGB(244, 205, 33);
            }
            90% {
                background-color: RGB(244, 205, 33);
            }
            100% {
                background-color: RGB(233, 87, 51);
            }
        }
    }

</style>
