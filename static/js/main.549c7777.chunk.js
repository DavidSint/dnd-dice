(this["webpackJsonpdnd-dice"]=this["webpackJsonpdnd-dice"]||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(7),o=a.n(r),l=(a(13),a(1)),i=a(2),m=function(e){return Math.floor(Math.random()*e+1)};var s=function(e){var t=e.die,a=e.roller;return c.a.createElement("div",{className:"dice-item",role:"button",tabIndex:"0",onClick:function(){a([t])}},c.a.createElement("img",{src:"/dice/d".concat(t,".png"),alt:"Roll a d".concat(t),className:"dice-image"}),c.a.createElement("p",{className:"dice-text ".concat(4===t?"dice-text--d".concat(t):""),"aria-hidden":"true"},"D"+t))};var u=function(e){var t=e.rolls,a=e.removeADie;return c.a.createElement(c.a.Fragment,null,t.map((function(e,t){return c.a.createElement("div",{className:"die die-".concat(e.d),key:t,tabIndex:"0",onContextMenu:function(t){t.preventDefault(),a(e.id)},onClick:function(t){t.preventDefault(),a(e.id)}},c.a.createElement("span",null,"D",e.d),c.a.createElement("p",{className:"die-result"},e.value))})))};var d=function(e){var t=e.rolls,a=e.mod;return t.length>0?c.a.createElement(c.a.Fragment,null,c.a.createElement("p",null,a?"Mod: ".concat(a):""),c.a.createElement("strong",null,"Total:",t.map((function(e){return e.value})).reduce((function(e,t){return e+t}))+a)):null},f=[4,6,8,10,12,20,100];var v=function(){var e=function(e,t){var a=Object(n.useState)((function(){try{return JSON.parse(localStorage.getItem(e))||t}catch(a){return t}})),c=Object(i.a)(a,2),r=c[0],o=c[1];return Object(n.useEffect)((function(){localStorage.setItem(e,JSON.stringify(r))}),[e,r]),[r,o]}("savedRolls",[]),t=Object(i.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)([]),v=Object(i.a)(o,2),E=v[0],p=v[1],b=Object(n.useState)(0),h=Object(i.a)(b,2),g=h[0],N=h[1],D=function(e){var t=Object(l.a)(E).slice(0);e.forEach((function(e){var a=m(e);t.push({id:"d".concat(e,":").concat(a,"@").concat((new Date).getTime()),d:e,value:a}),p(t)}))},x=function(e,t){var a=[];e.forEach((function(e){var n=m(e);a.push({id:"d".concat(e,":").concat(n,"@").concat((new Date).getTime()),d:e,value:n}),p(a),N(null!==t&&void 0!==t?t:0)}))};return c.a.createElement(c.a.Fragment,null,c.a.createElement("header",{className:"header"},c.a.createElement("img",{src:"/dnd-dice/logo192.png",alt:"Dice logo",className:"header-logo"}),c.a.createElement("h1",{className:"header-text h1"},"D&D Dice")),c.a.createElement("div",{className:"container"},c.a.createElement("main",{className:"main"},c.a.createElement("div",{className:"filterScroller"},a.map((function(e,t){return c.a.createElement("div",{className:"filterScroller-item",key:t,role:"button",tabIndex:"0",onClick:function(){x(e.dice,e.mod)},onContextMenu:function(t){t.preventDefault(),function(e){var t=Object(l.a)(a).slice(0);r(t.filter((function(t){return t.id!==e})))}(e.id)}},e.name)}))),c.a.createElement("div",{className:"diceTotal"},E?c.a.createElement(d,{rolls:E,mod:g}):""),c.a.createElement("div",{className:"diceGrid"},E?c.a.createElement(u,{rolls:E,removeADie:function(e){var t=Object(l.a)(E).slice(0);p(t.filter((function(t){return t.id!==e})))}}):""),c.a.createElement("div",{className:"main-footer",tabIndex:"-1"},c.a.createElement("div",{className:"dice"},f.map((function(e,t){return c.a.createElement(s,{die:e,key:t,roller:D})}))),c.a.createElement("div",{className:"modifier"},c.a.createElement("button",{className:"mod",tabIndex:"0",onClick:function(){var e=prompt("Please enter a modifier");e&&N(parseInt(e,10))}},"+/-")),c.a.createElement("button",{className:"roll",tabIndex:"0",onClick:function(){x(E.map((function(e){return e.d})),g)}},"Roll"),c.a.createElement("button",{className:"save",tabIndex:"0",onClick:function(){var e=Object(l.a)(a).slice(0),t=prompt("Please enter the name");if(t){var n={id:"@".concat((new Date).getTime()),name:t,mod:g||0,dice:E?E.map((function(e){return e.d})):[]};e.push(n),r(e)}}},"Save As")))),c.a.createElement("footer",{className:"footer"},c.a.createElement("code",{className:"footer-text"},"Made by David Sint")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(v,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,a){e.exports=a(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.549c7777.chunk.js.map