'use strict'

let hours = document.querySelector('.hh'); // show hours
let minutes = document.querySelector('.mm'); // show minutes
let seconds = document.querySelector('.ss'); // show seconds
let d = document.querySelector('.date'); // show date
let arrMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let ss; // seconds
let mm; // minutes
let hh; // hours
let data; // common from api

// load api
const requestData = () => {
  let requestURL = 'http://worldtimeapi.org/api/ip';
  let request = new XMLHttpRequest();

  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  request.onload = function() {
    data = request.response;
    time(data);
  }
}

// initial load data
requestData();

// count between synchronizations
function ti() {
  ss++;
  if (ss === 60) {
    ss = 0;
    mm++;
  }
  if (mm === 60) {
    mm = 0;
    hh++;
  }
  hours.innerText = `${ hh }`;
  minutes.innerText = `${ mm.toString().padStart(2, '0') }`;
  seconds.innerText = `${ ss.toString().padStart(2, '0') }`;
}

// create elements of time and date
function time(data) { 
  hh = data.datetime.slice(11, 13);
  mm = data.datetime.slice(14, 16);
  ss = data.datetime.slice(17, 19);
  let date = data.datetime.slice(8, 10);
  let month = data.datetime.slice(5, 7) - 1;
  let year = data.datetime.slice(0, 4);
  let stringDate = `${ date } ${ arrMonths[month] } ${ year }`;
  d.innerText = `${ stringDate }`; 
  hours.innerText = `${ hh }`;
  minutes.innerText = `${ mm.toString().padStart(2, '0') }`;
  seconds.innerText = `${ ss.toString().padStart(2, '0') }`;
}

// main loop
let loop = setTimeout(function tick() {
  if ((Number(ss) + 1) === 60) {
    requestData();
  }
  if ((Number(ss) + 1) > 0 && (Number(ss) + 1) < 60) {
    ti();
  }
  loop = setTimeout(tick, 1000);
}, 1000)
