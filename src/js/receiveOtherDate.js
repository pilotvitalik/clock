import { ul } from './index.js';

let listTime = document.querySelector('.choice-timeZone');

ul.addEventListener('click', (e) => {
	console.log(e.target)
	listTime.classList.toggle('height');
})