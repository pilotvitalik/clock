let file = require('../static/cities.json');
let timeZone = [];

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
  		'zone': item,
  		'timeZone': `Etc/GMT+${+item.slice(0, 3)}`,
  		'cities': [],
  	}
  })
  timeZone = tmp.map(item => {
  	return {
  	  'zone': item.zone,
  	  'timeZone': item.timeZone.replace('+-','-'),
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
  console.log(timeZone);
}

setTimeout(() => {
  addCities();
}, 1)