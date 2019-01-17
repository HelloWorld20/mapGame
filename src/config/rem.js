export default (function () {
    // 设置font-size大小
	const innerWidth = window.innerWidth < window.innerHeight ?
        window.innerWidth : window.innerHeight;
	const size = innerWidth / 3.75;
	document.documentElement.style.fontSize = `${size}px`;
}());
