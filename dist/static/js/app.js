webpackJsonp([1],{"+iOW":function(t,e,a){t.exports=a.p+"static/img/psb7.jpg"},"/VVs":function(t,e){throw new Error("Module parse failed: Unexpected character '@' (1:0)\nYou may need an appropriate loader to handle this file type.\n| @charset \"UTF-8\";\n| h1, h2, h3, h4, h5, h6 {\n|   margin: 0;")},"/vDR":function(t,e,a){t.exports=a.p+"static/img/psb1.jpg"},"19/2":function(t,e,a){"use strict";a("d2gY")},"3EDT":function(t,e){},"6zCC":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[t._m(0),t._v(" "),a("i"),t._v(" "),a("vue-preload",{on:{percentage:t.percentage,loaded:t.loaded}})],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"preload"},[a("div",{staticClass:"preload-bottom"}),t._v(" "),a("div",{staticClass:"preload-top"})])}],n={render:s,staticRenderFns:i};e.a=n},"8taH":function(t,e,a){"use strict";var s=a("MnwG");e.a={components:{VuePreload:s.a},methods:{percentage:function(t){},loaded:function(){}}}},BxDb:function(t,e,a){t.exports=a.p+"static/img/psb3.jpg"},EuEE:function(t,e,a){"use strict";function s(t){requestAnimationFrame(s),TWEEN.update(t)}a.d(e,"b",function(){return l}),a.d(e,"a",function(){return u});var i=a("//Fk"),n=a.n(i),o=a("7+uW"),r=[0,0],c=window.innerWidth/2,p=window.innerHeight/2;requestAnimationFrame(s);var l=(new o.a,function(t){var e=(t.el,t.x),a=t.y,s=t.scale,i=void 0===s?1:s,o=t.animate,l=void 0===o||o,d=t.target,v=t.map;e-=c/i,a-=p/i;var f=void 0,m=void 0,g=u(v.style.transform),h=g.scaleX,w=(g.scaleY,{x:r[0],y:r[1]});return new n.a(function(t){setTimeout(function(){if(f=1.5*d.offsetWidth*i,m=1.5*d.offsetHeight*i,e+=f,a+=m,l){new TWEEN.Tween(w).to({x:e,y:a},500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){v.style.transform="scale("+h+", "+h+") translate("+-w.x+"px, "+-w.y+"px)"}).onComplete(function(){r=[e,a],t(r)}).start()}else v.style.transform="scale("+h+", "+h+") translate("+-e+"px, "+-a+"px)",t([e,a])},0)})}),u=function(t){var e=t.split(" ");return{scaleX:e[0].slice(6,-1),scaleY:parseFloat(e[1])+"",translateX:e[2].slice(10,-1),translateY:parseFloat(e[3])+"px"}}},Fs8J:function(t,e,a){"use strict";var s=a("lHA8"),i=a.n(s),n=a("d2gY"),o=a("EuEE"),r=(a("GQaK"),n.b.length);e.a={data:function(){return{game:n.b,gameStep:0,scale:.6,currentOffset:[0,0],activeLayer:new i.a(["line","point","text","pic"]),hasline:!0,haspic:!0,hastext:!0,haspoint:!0}},mounted:function(){var t=this,e=Object(o.a)("scale(0.123, 0.123) translate(-123px, 0px)");e.scaleX,e.scaleY,e.translateX,e.translateY;this.scale=parseFloat(e[1]);var a=this.$refs.map,s=(new PinchZoom.default(a,{maxZoom:8,minZoom:1}),{attributes:!0,childList:!1,subtree:!1}),i=function(e){var s=a.style.transform;if(-1!==s.indexOf("scale(")){var i=Object(o.a)(s),n=i.scaleX;t.scale=n}};new MutationObserver(i).observe(a,s)},methods:{preStep:function(){++this.gameStep>r-1&&(this.gameStep=0);var t=n.b[this.gameStep%r];Object(o.b)({el:this.$refs.scroll,target:this.$refs.item[this.gameStep],map:this.$refs.map,x:t.position[0],y:t.position[1],scale:this.scale})},nextStep:function(){-1===--this.gameStep&&(this.gameStep=r-1);var t=n.b[this.gameStep%r];Object(o.b)({el:this.$refs.scroll,target:this.$refs.item[this.gameStep],map:this.$refs.map,x:t.position[0],y:t.position[1],scale:this.scale})},switchLayer:function(t){console.log(t,this.activeLayer,this.activeLayer.has(t)),this.activeLayer.has(t)?(this.activeLayer.delete(t),this["has"+t]=!1):(this.activeLayer.add(t),this["has"+t]=!0)}}}},M93x:function(t,e,a){"use strict";function s(t){a("iYSU")}var i=a("xJD8"),n=a("gOzf"),o=a("VU/8"),r=s,c=o(i.a,n.a,!1,r,null,null);e.a=c.exports},MARB:function(t,e,a){"use strict";var s=a("d2gY");e.a={data:function(){return{loaded:0,totalLen:""}},mounted:function(){this.preloadImg(),this.preloadAudio()},methods:{preloadImg:function(){var t=this;window.imagesCache=[],this.totalLen=s.a.imgs.length;var e=0;s.a.imgs.forEach(function(s,i){var n=new Image;n.onerror=n.onload=function(){t.loaded++,e=t.loaded/t.totalLen,t.$emit("percentage",e),t.loaded>=t.totalLen&&t.$emit("loaded",e)},n.src=a("PvXa")("./"+s),window.imagesCache[i]=n})},preloadAudio:function(){window.audioCache=[],s.a.audios.forEach(function(t,e){var s=new Audio;s.addEventListener("canplaythrough",function(){s.play(),s.pause()},!1),document.addEventListener("WeixinJSBridgeReady",function(){s.play(),s.pause()},!1),s.src=a("PvXa")("./"+t),window.audioCache[e]=s})}}}},MnwG:function(t,e,a){"use strict";function s(t){a("oMVh")}var i=a("MARB"),n=a("yEJ7"),o=a("VU/8"),r=s,c=o(i.a,n.a,!1,r,"data-v-7d1074f6",null);e.a=c.exports},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7+uW"),i=a("EK5g"),n=(a.n(i),a("M93x")),o=a("YaEn");a("19/2"),a("EuEE");a("kw8N"),s.a.config.productionTip=!1,new s.a({el:"#app",router:o.a,template:"<App/>",components:{App:n.a}})},NxGh:function(t,e,a){"use strict";function s(t){a("sfHn")}var i=a("8taH"),n=a("6zCC"),o=a("VU/8"),r=s,c=o(i.a,n.a,!1,r,null,null);e.a=c.exports},PvXa:function(t,e,a){function s(t){return a(i(t))}function i(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var n={"./animate.css":"kw8N","./img/map.jpg":"mi+u","./img/mapss.jpeg":"zgnC","./img/psb0.jpg":"vj9o","./img/psb1.jpg":"/vDR","./img/psb2.jpg":"SYrd","./img/psb3.jpg":"BxDb","./img/psb4.jpg":"lPet","./img/psb5.jpg":"uAC8","./img/psb7.jpg":"+iOW","./img/psb8.jpg":"qFF2","./img/share.png":"yMUZ","./scss/extend.scss":"bus+","./scss/extend.wxss":"/VVs"};s.keys=function(){return Object.keys(n)},s.resolve=i,t.exports=s,s.id="PvXa"},SYrd:function(t,e,a){t.exports=a.p+"static/img/psb2.jpg"},UAgs:function(t,e,a){"use strict";!function(){var t=window.innerWidth<window.innerHeight?window.innerWidth:window.innerHeight,e=t/3.75;document.documentElement.style.fontSize=e+"px"}()},WzNf:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"scroll",staticClass:"home"},[s("div",{ref:"map",staticClass:"map",style:{"background-image":"url("+a("mi+u")+")"}},[s("div",{staticClass:"map--active"},t._l(t.game,function(e,i){return s("transition",{attrs:{"enter-active-class":"bounceIn","leave-active-class":"bounceOut",Key:i}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.gameStep===i,expression:"gameStep === key"}],ref:"item",refInFor:!0,staticClass:"map--active-item map--active-map animated",style:{"background-image":"url("+a("czpq")("./"+e.img)+")",left:e.position[0]+"px",top:e.position[1]+"px"},attrs:{Key:i}})])}),1),t._v(" "),s("div",{staticClass:"map--layer"},[s("transition",{attrs:{"enter-active-class":"fadeIn","leave-active-class":"fadeOut"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.hasline,expression:"hasline"}],staticClass:"map--layer-line"})]),t._v(" "),s("transition",{attrs:{"enter-active-class":"fadeIn","leave-active-class":"fadeOut"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.haspoint,expression:"haspoint"}],staticClass:"map--layer-point"})]),t._v(" "),s("transition",{attrs:{"enter-active-class":"fadeIn","leave-active-class":"fadeOut"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.hastext,expression:"hastext"}],staticClass:"map--layer-text"})]),t._v(" "),s("transition",{attrs:{"enter-active-class":"fadeIn","leave-active-class":"fadeOut"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.haspic,expression:"haspic"}],staticClass:"map--layer-pic"})])],1)]),t._v(" "),s("div",{staticClass:"control"},[s("div",{staticClass:"control--handle"},[s("div",{staticClass:"control--handle-pre",on:{touchstart:t.preStep}},[t._v("上一步")]),t._v(" "),s("div",{staticClass:"control--handle-next",on:{touchstart:t.nextStep}},[t._v("下一步")])]),t._v(" "),s("div",{staticClass:"control--tap"},[s("div",{staticClass:"control--tab-1",class:{active:t.hasline},on:{click:function(e){t.switchLayer("line")}}},[t._v("1")]),t._v(" "),s("div",{staticClass:"control--tab-2",class:{active:t.haspoint},on:{click:function(e){t.switchLayer("point")}}},[t._v("2")]),t._v(" "),s("div",{staticClass:"control--tab-3",class:{active:t.hastext},on:{click:function(e){t.switchLayer("text")}}},[t._v("3")]),t._v(" "),s("div",{staticClass:"control--tab-4",class:{active:t.haspic},on:{click:function(e){t.switchLayer("pic")}}},[t._v("4")])])])])},i=[],n={render:s,staticRenderFns:i};e.a=n},YaEn:function(t,e,a){"use strict";var s=a("7+uW"),i=a("/ocq"),n=a("NxGh"),o=a("lO7g");s.a.use(i.a),e.a=new i.a({routes:[{path:"/",component:n.a},{path:"/Home",component:o.a}]})},"bus+":function(t,e){},czpq:function(t,e,a){function s(t){return a(i(t))}function i(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var n={"./map.jpg":"mi+u","./mapss.jpeg":"zgnC","./psb0.jpg":"vj9o","./psb1.jpg":"/vDR","./psb2.jpg":"SYrd","./psb3.jpg":"BxDb","./psb4.jpg":"lPet","./psb5.jpg":"uAC8","./psb7.jpg":"+iOW","./psb8.jpg":"qFF2","./share.png":"yMUZ"};s.keys=function(){return Object.keys(n)},s.resolve=i,t.exports=s,s.id="czpq"},d2gY:function(t,e,a){"use strict";a.d(e,"b",function(){return s});var s=[{position:[1e3,2e3],img:"psb0.jpg"},{position:[2470,1700],img:"psb1.jpg"},{position:[2879,1212],img:"psb2.jpg"},{position:[1423,3980],img:"psb3.jpg"},{position:[3567,1252],img:"psb4.jpg"}];e.a={share:{title:"分享标题",desc:"分享描述",link:window.location.href,imgUrl:""},imgs:["img/share.png"],audios:[]}},gOzf:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},i=[],n={render:s,staticRenderFns:i};e.a=n},iYSU:function(t,e){},kw8N:function(t,e){},lO7g:function(t,e,a){"use strict";function s(t){a("3EDT")}var i=a("Fs8J"),n=a("WzNf"),o=a("VU/8"),r=s,c=o(i.a,n.a,!1,r,"data-v-0a6f98b2",null);e.a=c.exports},lPet:function(t,e,a){t.exports=a.p+"static/img/psb4.jpg"},"mi+u":function(t,e,a){t.exports=a.p+"static/img/map.jpg"},oMVh:function(t,e){},qFF2:function(t,e,a){t.exports=a.p+"static/img/psb8.jpg"},sfHn:function(t,e){},uAC8:function(t,e,a){t.exports=a.p+"static/img/psb5.jpg"},vj9o:function(t,e,a){t.exports=a.p+"static/img/psb0.jpg"},xJD8:function(t,e,a){"use strict";a("UAgs");e.a={}},yEJ7:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;return(t._self._c||e)("div")},i=[],n={render:s,staticRenderFns:i};e.a=n},yMUZ:function(t,e,a){t.exports=a.p+"static/img/share.png"},zgnC:function(t,e,a){t.exports=a.p+"static/img/mapss.jpeg"}},["NHnr"]);
//# sourceMappingURL=app.js.map