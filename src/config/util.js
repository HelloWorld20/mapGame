import Vue from 'vue';

// let lastPosition = {x: 0, y: 0};
// let offsetWidth = window.innerWidth >> 1;   // >> 1 位运算：除以2
// let offsetHeight = window.innerHeight >> 1;

// let isStopAnimate = true;

// function animateHandler(time) {
//     if (isStopAnimate) return;
//     requestAnimationFrame(animateHandler);
//     TWEEN.update(time);
// }

// function startAnimate() {
//     isStopAnimate = false;
//     animateHandler();
// }

// function stopAnimate() {
//     isStopAnimate = true;
// }

export const isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);

export const bus = new Vue({
    data() {
        return {
            musicList: {}
        }
    }
});

// 是否时竖屏
// 0：竖屏、90或-90横屏
export const isVertical = () => {
    return Math.abs(window.orientation) !== 90
}

// export const scrollTo = ({x, y, scale = 1, animate = true, target, map}) => {

//     // 屏幕的一半
//     x = x - offsetWidth/scale;
//     y = y - offsetHeight/scale;

//     let targetWidth;
//     let targetHeight;

//     let coords = {x: lastPosition.x, y: lastPosition.y}
//     return new Promise(resolve => {
//         setTimeout(() => {
//             // 半个元素的宽高
//             targetWidth = target.offsetWidth >> 1;
//             targetHeight = target.offsetHeight >> 1;
//             x = x + targetWidth;
//             y = y + targetHeight;

//             if (animate) {
//                 startAnimate();
//                 var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
//                     .to({ x, y }, 1000) // Move to (300, 200) in 1 second.
//                     .easing(TWEEN.Easing.Quartic.Out) // Use an easing function to make the animation smooth.
//                     .onUpdate(function() { // Called after tween.js updates 'coords'.
//                         map.style.transform = `scale3d(${scale}, ${scale}, 1) translate3d(${-coords.x}px, ${-coords.y}px, 0px)`;
//                     })
//                     .onComplete(function() {
//                         stopAnimate()
//                         resolve({
//                             x, y
//                         })
//                         lastPosition = {x, y};
//                     })
//                     .start();

//             } else {
//                 stopAnimate()
//                 map.style.transform = `scale3d(${scaleX}, ${scaleX}, 1) translate3d(${-x}px, ${-y}px, 0px)`;
//                 resolve({
//                     x, y
//                 })
//                 lastPosition = {x, y};
//             }
//         }, 20)

//     })

// }

// export const parseTransform = transformStr => {
//     let result = transformStr.split(' ');

//     // let scaleX = result[0].slice(6, -1);
//     // let scaleY = parseFloat(result[1]) + '';
//     // let translateX = result[2].slice(10, -1);
//     // let translateY = parseFloat(result[3]) + 'px';

//     return result[0].slice(6, -1)

//     // return {
//     //     scaleX
//     //     // scaleY,
//     //     // translateX,
//     //     // translateY
//     // }
// }

