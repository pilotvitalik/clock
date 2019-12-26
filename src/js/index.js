'use strict'
import { timeZone } from './requestData.js';

let hours = document.querySelector('.hh'); // show hours
let minutes = document.querySelector('.mm'); // show minutes
let seconds = document.querySelector('.ss'); // show seconds
let d = document.querySelector('.date'); // show date
let arrMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
export let ss; // seconds
export let mm; // minutes
export let hh; // hours
let data; // common from api
export let ul = document.querySelector('.choice-time-timeZone-select');
let ulFormat = document.querySelector('.clock');
let li = ul.querySelector('li');
let changeTime = false;
let iscreateTitleList = false;
let requestURL = '';
let checkFormat = document.querySelector('.choice-time-formatTime>input');
let checkClock = document.querySelector('.choice-clock>input');
let isChangeFormat = false;
let isChangeClock = false;
let pFormat = document.querySelector('.clock>p');
let digitalClock = document.querySelector('.clock-box');
let analogClock = document.querySelector('.clocks-clock');
let clock = document.querySelector('.clocks');

// load api
export const requestData = (date) => {
  if (requestURL !== date) {
    changeTime = true
  }
  requestURL = date;  
  let request = new XMLHttpRequest();

  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  request.onload = function() {
    data = request.response;
    time(data);
    if (changeTime === true) {
      pasteData(data);
    } else {
      return;
    }
    changeTime = false;
  }
}

// initial load data
requestData('http://worldtimeapi.org/api/ip');

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
  if (isChangeFormat === false) {
    if (hh < 12) {
      hours.innerText = `0${ hh }`;
    } else {
      hours.innerText = `${ hh }`;
    }
  } else {
    if (hh < 12) {
      hours.innerText = `0${ hh }`;
    } else {
      hours.innerText = `0${ hh-12 }`;
    }
  }
  minutes.innerText = `${ mm.toString().padStart(2, '0') }`;
  seconds.innerText = `${ ss.toString().padStart(2, '0') }`;
}

// create elements of time and date
function time(data) { 
  hh = Number(data.datetime.slice(11, 13));
  mm = data.datetime.slice(14, 16);
  ss = data.datetime.slice(17, 19);
  let date = data.datetime.slice(8, 10);
  let month = data.datetime.slice(5, 7) - 1;
  let year = data.datetime.slice(0, 4);
  let stringDate = `${ date } ${ arrMonths[month] } ${ year }`;
  d.innerText = `${ stringDate }`; 
  if (isChangeFormat === false) {
    if (hh < 12) {
      hours.innerText = `0${ hh }`;
    } else {
      hours.innerText = `${ hh }`;
    }
  } else {
    if (hh < 12) {
      hours.innerText = `0${ hh }`;
    } else {
      hours.innerText = `0${ hh-12 }`;
    }
  }
  minutes.innerText = `${ mm.toString().padStart(2, '0') }`;
  seconds.innerText = `${ ss.toString().padStart(2, '0') }`;
}

// main loop
let loop = setTimeout(function tick() {
  if ((Number(ss) + 1) === 60) {
    requestData(requestURL);
  }
  if ((Number(ss) + 1) > 0 && (Number(ss) + 1) < 60) {
    ti();
  }
  loop = setTimeout(tick, 1000);
}, 1000)

function pasteData(data) {
  if (!iscreateTitleList) {
    let zoneHeader = document.createElement('p');
    let cityHeader = document.createElement('p');
    zoneHeader.className = 'choice-time-timeZone-list-item__name';
    cityHeader.className = 'choice-time-timeZone-list-item__name';
    timeZone.forEach(item => {
      if (item.showZone === `UTC${data.utc_offset}`) {
        zoneHeader.append(`UTC${ data.utc_offset }`);
        cityHeader.append(`${ item.cities.join(' , ') }`);
        li.append(zoneHeader);
        li.append(cityHeader);
      }
    })
    iscreateTitleList = true;
  } else {
    let allHeaders = document.querySelectorAll('.choice-time-timeZone-select>li>p');
    timeZone.forEach(item => {
      if (item.showZone === `UTC${data.utc_offset}`) {
        allHeaders[0].innerText = `UTC${ data.utc_offset }`;
        allHeaders[1].innerText = `${ item.cities.join(' , ') }`;
      }
    })
  }
}

checkFormat.addEventListener('click', (e) => {
  pFormat.classList.toggle('display');
  if(checkFormat.checked) {
    isChangeFormat = true;
      if (hh < 12) {
        pFormat.innerText = 'AM';
      } else {
        pFormat.innerText = 'PM';
      }
  } else {
    isChangeFormat = false;
  }
})

checkClock.addEventListener('click', (e) => {
  if(checkClock.checked) {
    isChangeClock = true;
    digitalClock.classList.toggle('display');
    analogClock.style.display = 'flex';
    clock.style.paddingTop = '80px';
  } else {
    isChangeClock = false;
    digitalClock.classList.toggle('display');
    analogClock.style.display = 'none';
    clock.style.paddingTop = '127px';
  }
})