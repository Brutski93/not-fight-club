const divImg = document.querySelector('.chouse-fighter-img'); // start menu div with avatar
const buttons = document.querySelectorAll('.chouse-fighter-button'); // start menu chouse avatar
const start = document.querySelector('.start-button'); // lets go button
const input = document.querySelector('.input-name'); // input in start

const sectionStart = document.querySelector('.start');
const sectionMain = document.querySelector('.main');
const sectionSetting = document.querySelector('.setting');
const sectionProfile = document.querySelector('.profile');
const sectionFight = document.querySelector('.fight');
const allSections = [sectionStart, sectionMain, sectionSetting, sectionProfile, sectionFight];

const header = document.getElementById('header'); // header
const buttonMain = document.getElementById('menu-main'); // header
const buttonSetting = document.getElementById('menu-setting'); // header
const buttonProfile = document.getElementById('menu-profile'); // header
const settingName = document.querySelector('.setting-name'); //span with name in setting
const settingButton = document.querySelector('.setting-change'); // button to change name in setting
const settinfPopup = document.querySelector('.settig-popup');
const settingOk = document.querySelector('.input-setting-ok'); // button to submit changing the name in setting
const input2 = document.querySelector('.input-setting-name'); // input in setting

const buttonFight = document.querySelector('.div-fight'); // button to fight menu

const profileName = document.querySelector('.profile-name'); // profile-name h3
const profileImg = document.querySelector('.profile-img'); // profile-img
const profileCardHolder = document.querySelector('.profile-classes'); // profile all card holder

const fightName = document.querySelector('.fight-name'); // fight player's name
const fightImg = document.querySelector('.fight-img'); // fight player's image
const fightHP = document.querySelector('.fight-hp'); // fight player's HP
const fightNameEnemy = document.querySelector('.fight-name-enemy'); // fight Enemy's name
const fightImgEnemy = document.querySelector('.fight-img-enemy'); // fight Enemy's image
const fightHPEnemy = document.querySelector('.fight-hp-enemy'); // fight Enemy's HP
const fightLog = document.querySelector('.fight-log'); // fight log
const buttonRunFight = document.querySelector('.run-fight'); // button to attack
const radioButtons = document.querySelectorAll('.fight-input'); // all inputs in the fight section

const enemys = [{
  name: 'goblin',
  ph: 70,
  attacks: 1,
  defense: 1
}, {
  name: 'orc',
  ph: 180,
  attacks: 2,
  defense: 1
}, {
  name: 'dk',
  ph: 120,
  attacks: 2,
  defense: 2
}];

const zones = [
'head',
'body',
'lefthand',
'righthand',
'leftleg',
'rightleg'
];

/////////////////////////////////////////////////////////////////////////////////////

buttons.forEach(a => a.addEventListener('click', changeHero));
start.addEventListener('click', createHero);
buttonMain.addEventListener('click', showMain);
buttonFight.addEventListener('click', showFight);
buttonSetting.addEventListener('click', showSetting);
buttonProfile.addEventListener('click', showProfile);
settingButton.addEventListener('click', showPopupToChangeName);
settingOk.addEventListener('click', changeNameInSetting);
buttonRunFight.addEventListener('click', makeAction);
radioButtons.forEach(a => {
  a.addEventListener('click', checkIsReadyToFight);
});

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

function getRandom(max) {
  return Math.floor(Math.random() * max);
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
  console.log(document.cookie.split(';'));
}
function showProfile() {
  hideAllSectionsExept(sectionProfile);
}
function showFight() {
  hideAllSectionsExept(sectionFight);
  if (isFightNotStarted()) getRandonEnemy();
  else resetFight();
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
  fightImg.classList.add(newClass);
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
  fightName.innerText = name;
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
    fightImg.classList.remove(classesName[i]);
  }
  profileImg.classList.add(text);
  fightImg.classList.add(text);
  document.cookie = `class=${text}`;
}
/* fight */

function getCurrentEnemyIndex() {
  let enemyIndex = false;
  document.cookie.split(';').forEach(a => {
    if (a.includes('enemyName')) {
      enemyIndex = a.slice(11);
      for (let i = 0; i < enemys.length; i += 1) {
        if (enemys[i].name === enemyIndex) {
          enemyIndex = i;
          break;
        }
      }
    }
  });
  return enemyIndex;
}

function isFightNotStarted() {
  let fighIsStarted = true;
  tempDate.forEach(a => {
    if (a.includes('enemy')) fighIsStarted = false;
  });
  return fighIsStarted;
}

function getRandonEnemy() {
  const random = getRandom(enemys.length);
  document.cookie = `enemyName=${enemys[random].name}`;
  fightNameEnemy.innerText = enemys[random].name[0].toUpperCase() + enemys[random].name.slice(1).toUpperCase();
  fightImgEnemy.classList.add(`${enemys[random].name}`);
  fightHPEnemy.style.width = '100%';
  fightHP.style.width = '100%';
  document.cookie = `enemyHP=100%`;
  document.cookie = `playerHP=100%`;
}

function resetFight() {
  const allCookie = document.cookie.split(';');
  allCookie.forEach(a => {
    if (a.includes('enemyName')) {
      fightNameEnemy.innerText = a.slice(11, 12).toUpperCase() + a.slice(12);
      resetEnemyImg(a.slice(11));
    }
    if (a.includes('enemyHP')) fightHPEnemy.style.width = a.slice(9);
    if (a.includes('playerHP')) fightHP.style.width = a.slice(10);
  });
}

function resetEnemyImg(name) {
  for (let i = 0; i < enemys.length; i += 1) {
    fightImgEnemy.classList.remove(enemys[i].name);
  }
  fightImgEnemy.classList.add(name);
}

function checkIsReadyToFight() {
  const selectedAttack = document.querySelectorAll('input[name="attack"]:checked');
  if (selectedAttack.length !== 1) return false;
  const selectedDefense = document.querySelectorAll('input[name="defense"]:checked');
  if (selectedDefense.length !== 2) return false;
  buttonRunFight.classList.add('run-fight-active');
  return true;
}

function getArrWithEnemyActions(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    arr.push(zones[getRandom(zones.length)]);
  }
  return arr;
}

function getPlayerAttack() {
  const selectedOption = document.querySelector('input[name="attack"]:checked');
  return selectedOption.value;
}

function getArrWithPlayerDefense() {
  const selectedOption = document.querySelectorAll('input[name="defense"]:checked');
  return [selectedOption[0].value, selectedOption[1].value];
}

function makeAction() { // main game mechanic !!!
 if (!buttonRunFight.classList.value.includes('active')) return;
 // enemy actions
 const enemyData = enemys[getCurrentEnemyIndex()];
 const enemyIsAttack = getArrWithEnemyActions(enemyData.attacks);
 const enemyIsDefense = getArrWithEnemyActions(enemyData.defense);
 // player actions
 const playerIsAttack = getPlayerAttack();
 const playerIsDefense = getArrWithPlayerDefense();
 campareAttaksAndMakeLog(playerIsAttack, playerIsDefense, enemyIsAttack, enemyIsDefense);
 clearInputs();
}

function campareAttaksAndMakeLog(pa, pd, ea, ed) {
  const playerName = fightName.innerText;
  const enemyName = fightNameEnemy.innerText;
  let text = '';
  if (ed.includes(pa)) {
    text = `${playerName} attacks ${enemyName}'s ${pa} , but ${enemyName} blocks it.`
    creatAndAppend(fightLog, 'p', false, text);
  } else {
    text = `${playerName} attacks ${enemyName}'s ${pa} and deal to ${enemyName} 10 damage.`;
    creatAndAppend(fightLog, 'p', false, text);
  }
  for (let i = 0; i < ea.length; i += 1) {
    if (pd.includes(ea[i])) {
      text = `${enemyName} attacks ${playerName}'s ${ea[i]}, but ${playerName} blocks it.`
      creatAndAppend(fightLog, 'p', false, text);
    } else {
      text = `${enemyName} attacks ${playerName}'s ${ea[i]} and deal to ${playerName} 10 damage.`;
      creatAndAppend(fightLog, 'p', false, text);
    }
  }
}

function clearInputs() {
  radioButtons.forEach(a => {
    a.checked = false;
  });
  buttonRunFight.classList.remove('run-fight-active');
}
// ------------------- builder --------------------------------------
let gameInfo = false;
const tempDate = document.cookie.split(';');
tempDate.forEach(a => {
  if (a.includes('gamestarted')) {
    gameInfo = a; // check is character created
    header.classList.remove('over-top');
  }
  if (a.includes('user')) changeName(a.slice(6));
  if (a.includes('class')) {
    profileImg.classList.add(a.slice(7)); // set profile image
    fightImg.classList.add(a.slice(7)); // set fight image
  }
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