import Vue from 'vue';

let lastPosition = {x: 0, y: 0};
let offsetWidth = window.innerWidth/2;
let offsetHeight = window.innerHeight/2;

let isStopAnimate = true;

function animateHandler(time) {
    if (isStopAnimate) return;
    console.log('animate')
    requestAnimationFrame(animateHandler);
    TWEEN.update(time);
}

// isStopAnimate = false;
// requestAnimationFrame(animateHandler);

export const isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);

export const bus = new Vue();

export const scrollTo = ({x, y, scale = 1, animate = true, target, map}) => {

    // 屏幕的一半
    x = x - offsetWidth/scale;
    y = y - offsetHeight/scale;

    let targetWidth;
    let targetHeight;

    // let {scaleX} = parseTransform(map.style.transform)

    let coords = {x: lastPosition.x, y: lastPosition.y}
    return new Promise(resolve => {
        setTimeout(() => {
            // 半个元素的宽高
            targetWidth = target.offsetWidth/2;
            targetHeight = target.offsetHeight/2;
            x = x + targetWidth;
            y = y + targetHeight;

            if (animate) {
                isStopAnimate = false;
                animateHandler();

                var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
                    .to({ x, y }, 500) // Move to (300, 200) in 1 second.
                    .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                    .onUpdate(function() { // Called after tween.js updates 'coords'.
                        map.style.transform = `scale(${scale}, ${scale}) translate(${-coords.x}px, ${-coords.y}px)`;
                    })
                    .onComplete(function() {
                        resolve({
                            x, y,
                            offsetX: x - lastPosition.x,
                            offsetY: y - lastPosition.y
                        })
                        lastPosition = {x, y};
                        isStopAnimate = true;
                    })
                    .start();

            } else {
                isStopAnimate = true;
                map.style.transform = `scale(${scaleX}, ${scaleX}) translate(${-x}px, ${-y}px)`;
                resolve({
                    x, y,
                    offsetX: x - lastPosition.x,
                    offsetY: y - lastPosition.y
                })
                lastPosition = {x, y};
            }
        }, 20)

    })

}

export const parseTransform = transformStr => {
    let result = transformStr.split(' ');

    let scaleX = result[0].slice(6, -1);
    // let scaleY = parseFloat(result[1]) + '';
    // let translateX = result[2].slice(10, -1);
    // let translateY = parseFloat(result[3]) + 'px';

    return {
        scaleX
        // scaleY,
        // translateX,
        // translateY
    }
}

