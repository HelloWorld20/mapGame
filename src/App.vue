<template>
    <div id="app">
        <router-view></router-view>
        <canvas id="canvas" width="3300" height="2475" style="width: 3300px; height: 2475px;"></canvas>
    </div>
</template>

<script>
    import './config/rem';

    export default {

    };

</script>

<style>
* {
    padding: 0;
    margin:0;
}

html, body, #app{
    width: 100%;
    height: 100%;
}

#canvas{
    position: absolute;
    left: -10000px;
    top: -100000px;
}

</style>
