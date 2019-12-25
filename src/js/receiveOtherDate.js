import { ul, requestData } from './index.js';

let listTime = document.querySelector('.choice-timeZone');
let subList = document.querySelector('.choice-timeZone-list');
export let dat = '';

ul.addEventListener('click', (e) => {
	listTime.classList.toggle('height');
})

subList.addEventListener('click', (e) => {
	requestData(`http://worldtimeapi.org/api/timezone/${e.target.attributes.value.value}`);
	listTime.classList.toggle('height');
})

