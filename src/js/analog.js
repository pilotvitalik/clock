import * as time from './index.js';

const deg = 6;
const hr = document.querySelector('.clocks-clock-hour__hr');
const mn = document.querySelector('.clocks-clock-min__mn');
const sc = document.querySelector('.clocks-clock-sec__sc');

let clock = setTimeout(function tick() {
	let hh = time.hh * 30;
	let mm = time.mm * deg;
	let ss = time.ss * deg;
	hr.style.transform = `rotateZ(${hh+(mm/12)}deg)`;
	mn.style.transform = `rotateZ(${mm}deg)`;
	sc.style.transform = `rotateZ(${ss}deg)`;
    clock = setTimeout(tick, 1000);
},1000)