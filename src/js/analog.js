import * as time from './initialLoad'; // fix
import { isFirefox, detectFirefox, isSafari, detectSafari } from './browser';

const deg = 6; // the value of rotation in degrees for 1 second
const hour = document.querySelector('.hour'); // clockwise field & clockwise
const minute = document.querySelector('.minute'); // minute hand field & minute hand
const hr = document.querySelector('.clocks-clock-hour__hr'); // clockwise
const mn = document.querySelector('.clocks-clock-min__mn'); // minute hand
const sc = document.querySelector('.clocks-clock-sec__sc'); // second hand

let clock = setTimeout(function tick() {
	let hh = time.hh * 30;
	let mm = time.mm * deg;
	let ss = time.ss * deg;
	let degHour = hh+(mm/12);
	hr.style.transform = `rotateZ(${ degHour }deg)`;
	mn.style.transform = `rotateZ(${ mm }deg)`;
	sc.style.transform = `rotateZ(${ ss }deg)`;
    clock = setTimeout(tick, 1000);
},1000)
