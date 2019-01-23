<template>
    <section v-show="shown" class="entry"
        :style="{'background-image': `url(${require('@/assets/img/bg-loading.png')})`}"
    >
        <!-- <vue-loading :isStatic="true"></vue-loading> -->
        <vue-rota @isVertical="onRota"></vue-rota>
    </section>
</template>

<script>
import VueRota from '@/components/childComponents/Rota';
import VueLoading from '@/components/Loading'
export default {
    data() {
        return {
            shown: true
        }
    },
    components: {VueRota, VueLoading},
    methods: {
        onRota(isVertical) {
            if (!isVertical) {
                this.shown = false;
                // 如果是竖屏
                setTimeout(() => {
                    this.$router.replace('Loading')
                }, 300)
            } else {
                this.shown = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.entry{
    width: 100%;height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
</style>


