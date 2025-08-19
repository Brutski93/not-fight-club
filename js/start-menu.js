const divImg = document.querySelector('.chouse-fighter-img'); // start menu div with avatar
const buttons = document.querySelectorAll('.chouse-fighter-button'); // start menu chouse avatar
const start = document.querySelector('.start-button'); // lets go button
const input = document.querySelector('.input-name'); // input in start

const sectionStart = document.querySelector('.start');
const sectionMain = document.querySelector('.main');
const sectionSetting = document.querySelector('.setting');
const sectionProfile = document.querySelector('.profile');
const allSections = [sectionStart, sectionMain, sectionSetting, sectionProfile];

const buttonMain = document.getElementById('menu-main'); // header
const buttonSetting = document.getElementById('menu-setting'); // header
const buttonProfile = document.getElementById('menu-profile'); // header
const settingName = document.querySelector('.setting-name'); //span with name in setting
const settingButton = document.querySelector('.setting-change'); // button to change name in setting
const settinfPopup = document.querySelector('.settig-popup');
const settingOk = document.querySelector('.input-setting-ok'); // button to submit changing the name in setting
const input2 = document.querySelector('.input-setting-name'); // input in setting

const profileName = document.querySelector('.profile-name'); // profile-name h3
const profileImg = document.querySelector('.profile-img'); // profile-img
const profileCardHolder = document.querySelector('.profile-classes'); // profile all card holder

/////////////////////////////////////////////////////////////////////////////////////

buttons.forEach(a => a.addEventListener('click', changeHero));
start.addEventListener('click', createHero);
buttonMain.addEventListener('click', showMain);
buttonSetting.addEventListener('click', showSetting);
buttonProfile.addEventListener('click', showProfile);
settingButton.addEventListener('click', showPopupToChangeName);
settingOk.addEventListener('click', changeNameInSetting);

/////////////////////////////////////////////////////////////////////////////////////

function creatAndAppend(whatParent, whatTag, whatClass = false, whatText = false) {
  const newItem = document.createElement(whatTag);
  if (whatClass) {
    whatClass = whatClass.split(' ');
    for (let i = 0; i < whatClass.length; i += 1) {
      newItem.classList.add(whatClass[i]);
    }
  }
  if (whatText) newItem.innerHTML = whatText;
  whatParent.appendChild(newItem);
  return newItem;
}

function hideAllSectionsExept(section) {
  allSections.forEach(a => a.classList.add('over-left'));
  section.classList.remove('over-left');
}
function showMain() {
  hideAllSectionsExept(sectionMain);
}
function showStart() {
  hideAllSectionsExept(sectionStart);
}
function showSetting() {
  hideAllSectionsExept(sectionSetting);
}
function showProfile() {
  hideAllSectionsExept(sectionProfile);
}
/* start */
function changeHero(event) {
  buttons.forEach(a => a.classList.remove('chouse-fighter-button-active'));
  event.currentTarget.classList.add('chouse-fighter-button-active');
  const newClass = event.currentTarget.innerHTML.toLowerCase();
  divImg.classList.remove('paladin');
  divImg.classList.remove('ranger');
  divImg.classList.remove('fighter');
  divImg.classList.add(newClass);
  profileImg.classList.add(newClass);
  document.cookie = `class=${newClass}`;
}

function createHero() {
  changeName(input.value);
  document.cookie = 'gamestarted=yes';
  showMain();
}
/* setting */
function changeName(name) {
  document.cookie = `user=${name}`;
  settingName.innerText = name;
  profileName.innerText = name;
}
function changeNameInSetting() {
  hidePopupToChangeName();
  changeName(input2.value);
}
function showPopupToChangeName() {
  settinfPopup.classList.remove('hidden');
}
function hidePopupToChangeName() {
  settinfPopup.classList.add('hidden');
}
/* profile */
function changeClass(event) {
  let text = event.target.innerText;
  if (!text) text = event.target.previousSibling.innerText;
  text = text.toLowerCase();
  for (let i = 0; i < classesName.length; i += 1) {
    profileImg.classList.remove(classesName[i]);
  }
  profileImg.classList.add(text);
  document.cookie = `class=${text}`;
}
// ------------------- builder --------------------------------------
let gameInfo = false;
const tempDate = document.cookie.split(';');
tempDate.forEach(a => {
  if (a.includes('gamestarted')) gameInfo = a; // check is character created
  if (a.includes('user')) changeName(a.slice(6));
  if (a.includes('class')) profileImg.classList.add(a.slice(7)); // set profile image
});
if (!gameInfo) showStart(); // first run
else showMain(); // continue game
// start build profile all cards
const classesName = [
  'artificer',
  'barbarian',
  'bard',
  'cleric',
  'druid',
  'fighter',
  'monk',
  'paladin',
  'ranger',
  'rouge',
  'sorcerer',
  'warlock',
  'wizard'
];
for (let i = 0; i < 13; i += 1) {
  const card = creatAndAppend(profileCardHolder, 'div', 'profile-classes-card');
  creatAndAppend(card, 'div', 'profile-classes-card-class', `${classesName[i].toUpperCase()}`);
  creatAndAppend(card, 'div', `profile-classes-card-img ${classesName[i]}`);
}
// end build profile all cards
const profileAllCards = document.querySelectorAll('.profile-classes-card'); // change class function
profileAllCards.forEach(a => a.addEventListener('click', changeClass));