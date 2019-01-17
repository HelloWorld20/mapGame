import Vue from 'vue';
const EASE_STEP = 30;
const SCROLL_DURATION = 500;
let srollTimer;

export const isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);

export const bus = new Vue();

export const scrollTo = (el, x, y) => {

    // let originX = window.scrollX;
    // let originY = window.scrollY;

    // let offsetX = x - originX;
    // let offsetY = y - originY;

    // if (offsetX === 0 || offsetY === 0) return;

    // let easeArr = [];

    // let stepX = EASE_STEP/offsetX;
    // let stepY = EASE_STEP/offsetY;

    // for(let i = 0; i < EASE_STEP; i++) {
    //     easeArr.push({
    //         x: stepX*(i+1),
    //         y: stepY*(i+1)
    //     });
    // }
    // if (isNaN(offsetX) || isNaN(offsetY)) return;

    // srollTimer = setInterval(() => {
    //     if (easeArr.length > 0) {
    //         let currentStep = easeArr.shift()
    //         // console.log('currentStep', currentStep)
    //         window.scrollTo(window.scrollX + currentStep.x, window.scrollY + currentStep.y)
    //     } else {
    //         clearInterval(srollTimer)
    //         console.log(window.scrollX, window.scrollY, x, y)
    //     }
    // }, SCROLL_DURATION / EASE_STEP)

    // window.scrollTo(x, y);
    console.log(x, y)
    el.style.transform = `translate(${-x}px, ${-y}px)`
}

