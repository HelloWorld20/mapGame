<template>
    <section class="entry"
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
    components: {VueRota, VueLoading},
    methods: {
        onRota(isVertical) {
            console.log('onRota')
            if (!isVertical) {
                // 如果是竖屏
                // console.log('vertical jump to loading')
                this.$router.replace('Loading')
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


