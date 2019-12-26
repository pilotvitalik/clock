import { ul, requestData } from './initialLoad';

let listTime = document.querySelector('.choice-time-timeZone'); // common time zone list field
let subList = document.querySelector('.choice-time-timeZone-list'); // list of time zones

// show and hide the list of time zones
ul.addEventListener('click', (e) => {
	listTime.classList.toggle('height');
})

// data transmission to the initialLoad.js and hode the list of time zones
subList.addEventListener('click', (e) => {
	requestData(`http://worldtimeapi.org/api/timezone/${e.target.attributes.value.value}`);
	listTime.classList.toggle('height');
})

