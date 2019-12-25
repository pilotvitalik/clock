let file = require('../static/cities.json');
export let timeZone = [];

const requestTimeZone = () => {
  let tmp = [];
  let tmpTime = [];
  file.cities.forEach(item => {
  	tmp.push(item.zone);
  })
  for (let zone of tmp) {
    if (!tmpTime.includes(zone)) {
      tmpTime.push(zone);
    }
  }
  tmp = tmpTime.map(item => {
  	return {
      id: +item.slice(0, 3),
  		'zone': item,
      'showZone': `UTC${item}`,
  		'timeZone': `Etc/GMT-${+item.slice(0, 3)}`,
  		'cities': [],
  	}
  })
  timeZone = tmp.map(item => {
  	return {
      'id': item.id,
  	  'zone': item.zone,
      'showZone': `UTC${item.zone}`,
  	  'timeZone': item.timeZone.replace('--','+'),
  	  'cities': item.cities,
  	}
  })
}

requestTimeZone();

const addCities = () => {
  file.cities.forEach(item => {
    timeZone.forEach(zone => {
      if (item.zone === zone.zone) {
        zone.cities.push(item.city);
      }
    })
  })
  function compareNumeric(a, b) {
    if (a.id > b.id) return 1;
    if (a.id == b.id) return 0;
    if (a.id < b.id) return -1;
  }
  timeZone.sort(compareNumeric);
}

setTimeout(() => {
  addCities();
}, 1)

