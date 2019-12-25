	import { timeZone } from './requestData.js';

	let list = document.querySelector('.choice-timeZone-list');

	function addList() {
		let fragment = new DocumentFragment();
		timeZone.forEach(item => {
			let li = document.createElement('li');
			let p = document.createElement('p');
			let pCity = document.createElement('p');
			li.className = 'choice-timeZone-list-item';
			p.className = 'choice-timeZone-list-item__name';
			pCity.className = 'choice-timeZone-list-item__name';
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
	}, 2)
