<template>
    <div id="app">
        <router-view></router-view>
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

</style>
