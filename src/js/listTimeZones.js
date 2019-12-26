	import { timeZone } from './requestData.js';

	let list = document.querySelector('.choice-time-timeZone-list');

	function addList() {
		let fragment = new DocumentFragment();
		timeZone.forEach(item => {
			let li = document.createElement('li');
			let p = document.createElement('p');
			let pCity = document.createElement('p');
			li.className = 'choice-time-timeZone-list-item';
			p.className = 'choice-time-timeZone-list-item__name';
			pCity.className = 'choice-time-timeZone-list-item__name';
			li.setAttribute('value',`${item.timeZone}`);
			p.setAttribute('value',`${item.timeZone}`);
			pCity.setAttribute('value',`${item.timeZone}`);
			p.append(item.showZone);
			pCity.append(item.cities.join(' , '));
			li.append(p);
			li.append(pCity);
			fragment.append(li);
		})
		return fragment;
	}

	setTimeout(() => {
	  list.append(addList());
	}, 1)
