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

export const scrollTo = ({el, x, y, scale = 1, animate = true, target}) => {

    x = x * scale;
    y = y * scale;

    x = x - offsetWidth;
    y = y - offsetHeight;

    lastPosition = [el.scrollLeft, el.scrollTop];
    let targetWidth;
    let targetHeight;



    // var coords = { x: 0, y: 0 }; // Start at (0, 0)
    let coords = {x: lastPosition[0], y: lastPosition[1]}
    return new Promise(resolve => {
        setTimeout(() => {
            targetWidth = target.offsetWidth/2 * scale;
            targetHeight = target.offsetHeight/2 * scale;
            console.log(targetWidth, targetHeight)
            x = x + targetWidth;
            y = y + targetHeight;

            if (animate) {
                var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
                .to({ x, y }, 500) // Move to (300, 200) in 1 second.
                .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
                .onUpdate(function() { // Called after tween.js updates 'coords'.
                    // Move 'box' to the position described by 'coords' with a CSS translation.
                    // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)');
                    // el.style.transform = `translate(${-coords.x}px, ${-coords.y}px)`
                    // el.scrollTop = -coords.y;
                    // el.scrollLeft = -coords.x;
                    el.scrollTo(coords.x, coords.y)
                })
                .onComplete(function() {
                    lastPosition = [x, y];
                    resolve(lastPosition)
                })
                .start();
            } else {
                el.scrollTo(x, y)
                resolve([x, y])
            }
        }, 0)


    })

}

