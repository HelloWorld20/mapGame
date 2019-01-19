import Vue from 'vue';
const EASE_STEP = 30;
const SCROLL_DURATION = 500;
let srollTimer;
let lastPosition = [0, 0];
let offsetWidth = window.innerWidth/2;
let offsetHeight = window.innerHeight/2;

function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

export const isWeixinBrowser = () => /micromessenger/i.test(navigator.userAgent);

export const bus = new Vue();

export const scrollTo = ({el, x, y, scale = 1, animate = true, target, map}) => {

    x = x - offsetWidth/scale;
    y = y - offsetHeight/scale;

    let targetWidth;
    let targetHeight;

    let {scaleX, scaleY} = parseTransform(map.style.transform)

    let coords = {x: lastPosition[0], y: lastPosition[1]}
    return new Promise(resolve => {
        setTimeout(() => {
            // 暂时有点乱，为啥是1.5
            targetWidth = target.offsetWidth*1.5 * scale;
            targetHeight = target.offsetHeight*1.5 * scale;
            x = x + targetWidth;
            y = y + targetHeight;

            if (animate) {
                var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
                .to({ x, y }, 500) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate(function() { // Called after tween.js updates 'coords'.
                    map.style.transform = `scale(${scaleX}, ${scaleX}) translate(${-coords.x}px, ${-coords.y}px)`;
                })
                .onComplete(function() {
                    lastPosition = [x, y];
                    resolve(lastPosition)
                })
                .start();
            } else {
                map.style.transform = `scale(${scaleX}, ${scaleX}) translate(${-x}px, ${-y}px)`;
                resolve([x, y])
            }
        }, 0)

    })

}

export const parseTransform = transformStr => {
    let result = transformStr.split(' ');

    let scaleX = result[0].slice(6, -1);
    let scaleY = parseFloat(result[1]) + '';
    let translateX = result[2].slice(10, -1);
    let translateY = parseFloat(result[3]) + 'px';

    return {
        scaleX,
        scaleY,
        translateX,
        translateY
    }
}

