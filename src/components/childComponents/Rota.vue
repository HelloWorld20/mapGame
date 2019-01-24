<template>
    <div class="rota"
        v-show=shown
        :style="{'background-image': `url(${require('@/assets/img/mask.png')})`}"
    ></div>
</template>

<script>
import { isVertical } from '@/config/util'
export default {
    data() {
        return {
            shown: false
        }
    },
    created() {
        window.addEventListener("orientationchange", this.rotationCallback, false);
        this.rotationCallback();
    },
    methods: {
        rotationCallback() {
            this.$emit('isVertical', isVertical())
            if (isVertical()) {
                // 竖屏
                this.shown = true;
                this.$emit('rotation', 'vertical')
            } else {
                this.shown = false;
                this.$emit('rotation', 'horizon')
                // if(this.isComponents) {
                //     this.shown = false;
                //     this.$emit('rotation', 'horizon')
                // } else {
                //     // 横屏
                //     // this.$router.push('Loading')
                // }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.rota{
    position: fixed;
    left: 0;
    top: 0;
    // right: 0;
    // bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background-color: rgba(0, 0,0,0.6);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
</style>

