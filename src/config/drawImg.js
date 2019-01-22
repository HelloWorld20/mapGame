
let Draw = function() {
    // this.imgList = imgList;
    this.can = document.getElementById('canvas');
    this.ctx = this.can.getContext('2d')
}


Draw.prototype.draw = async function(imgList) {
    let imgInsList = await loadImg(imgList);
    return new Promise(resolve => {
        setTimeout(() => {
            imgInsList.forEach(v => {
                this.ctx.drawImage(v, 0, 0, 3300, 2475);
            })

            let dataUrl = this.can.toDataURL();
            resolve(dataUrl)
            this.ctx.clearRect(0, 0, 3300, 2475);
            // return dataUrl;
        }, 20)
    })
}

function loadImg(imgList) {
    return new Promise(resolve => {
        let imgInsList = [];
        let loadedCount = 0;
        imgList.forEach(v => {
            let img = new Image();
            img.src = v;
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                loadedCount++;
                if(loadedCount >= imgList.length) {
                    resolve(imgInsList);
                }
            }
            imgInsList.push(img);
        });
    })
}

export default Draw;
