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
            if (!isVertical) {
                // 如果是竖屏
                setTimeout(() => {
                    this.$router.replace('Loading')
                }, 500)
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


