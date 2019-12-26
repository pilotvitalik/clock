'use strict'
import { timeZone } from './requestData.js';

let hours = document.querySelector('.hh'); // show hours
let minutes = document.querySelector('.mm'); // show minutes
let seconds = document.querySelector('.ss'); // show seconds
let d = document.querySelector('.date'); // show date
let arrMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let data; // common data from api
let ulFormat = document.querySelector('.clock'); // digital clock display field 
export let ul = document.querySelector('.choice-time-timeZone-select'); // the field for displaying the current time zone in the time zone list
let li = ul.querySelector('li'); // item in the field for displaying the current time zone
let isChangeTime = false; // flag for loading a new time zone
let iscreateTitleList = false; // flag informing about the initial adding info to the displaying the current time zone
let requestURL = ''; // URL for downloading required information
let checkFormat = document.querySelector('.choice-time-formatTime>input'); // checkbox for changing the time format
let checkClock = document.querySelector('.choice-clock>input'); // checkbox for changing the clock type
let isChangeFormat = false; // time format change indicator
let isChangeClock = false; // clock type change indicator
let pFormat = document.querySelector('.clock>p'); // "am/pm" input field
let digitalClock = document.querySelector('.clock-box'); // field for displaying digital clock with date
let analogClock = document.querySelector('.clocks-clock'); // field for displaying analog clock without date
let clock = document.querySelector('.clocks'); // common field for displaying digital and analog clock
export let ss; // seconds
export let mm; // minutes
export let hh; // hours

// loading data during initial loading and when changing time zones
export const requestData = (date) => {
  if (requestURL !== date) {
    isChangeTime = true
  }
  requestURL = date;  
  let request = new XMLHttpRequest();

  request.open('GET', requestURL);

  request.responseType = 'json';
  request.send();

  request.onload = function() {
    data = request.response;
    time(data);
    if (isChangeTime === true) {
      pasteData(data);
    } else {
      return;
    }
    isChangeTime = false;
  }
}

// initial load data
requestData('http://worldtimeapi.org/api/ip');

// counter and show time between synchronizations
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
    if (hh < 10) {
      hours.innerText = `0${ hh }`;
    } else {
      hours.innerText = `${ hh }`;
    }
  } else {
    if (hh < 12) {
      if (hh < 10) {
        hours.innerText = `0${ hh }`;
      } else {
        hours.innerText = `${ hh }`;
      }
    } else {
      let newHH = hh-12;
      if (newHH < 10) {
        hours.innerText = `0${ newHH }`;
      } else {
        hours.innerText = `${ newHH }`;
      }
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
    if (hh < 10) {
      hours.innerText = `0${ hh }`;
    } else {
      hours.innerText = `${ hh }`;
    }
  } else {
    if (hh < 12) {
      if (hh < 10) {
        hours.innerText = `0${ hh }`;
      } else {
        hours.innerText = `${ hh }`;
      }
    } else {
      let newHH = hh-12;
      if (newHH < 10) {
        hours.innerText = `0${ newHH }`;
      } else {
        hours.innerText = `${ newHH }`;
      }
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

// inserting a time zone to the field for displaying the current time zone
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

// changing the time format display
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

// changing the display of the clock type
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