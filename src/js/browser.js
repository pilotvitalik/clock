import * as time from './initialLoad';

let dropdownList = document.querySelector('.choice-time-timeZone-list'); // the shell of the list of subitems
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent); // Safari browser detection

// properties of dropdown menu elements for the Safari browser
if (isSafari) {
  dropdownList.style.marginTop = '35px';
}
