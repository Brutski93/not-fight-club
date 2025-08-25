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
const profileWins = document.querySelector('.frofile-wins');
const profileLoose = document.querySelector('.frofile-loose');

const fightName = document.querySelector('.fight-name'); // fight player's name
const fightImg = document.querySelector('.fight-img'); // fight player's image
const fightHP = document.querySelector('.fight-hp'); // fight player's HP
const fightNameEnemy = document.querySelector('.fight-name-enemy'); // fight Enemy's name
const fightImgEnemy = document.querySelector('.fight-img-enemy'); // fight Enemy's image
const fightHPEnemy = document.querySelector('.fight-hp-enemy'); // fight Enemy's HP
const fightLog = document.querySelector('.fight-log'); // fight log
const buttonRunFight = document.querySelector('.run-fight'); // button to attack
const radioButtons = document.querySelectorAll('.fight-input'); // all inputs in the fight section

const screenWin = document.querySelector('.win');
const screenLoose = document.querySelector('.loose');

const enemys = [{
  name: 'goblin',
  ph: 50,
  attacks: 1,
  defense: 1
}, {
  name: 'orc',
  ph: 150,
  attacks: 2,
  defense: 1
}, {
  name: 'knight',
  ph: 100,
  attacks: 2,
  defense: 2
}, {
  name: 'bandit',
  ph: 100,
  attacks: 1,
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

function creatAndPrepend(whatParent, whatTag, whatClass = false, whatText = false) {
  const newItem = document.createElement(whatTag);
  if (whatClass) {
    whatClass = whatClass.split(' ');
    for (let i = 0; i < whatClass.length; i += 1) {
      newItem.classList.add(whatClass[i]);
    }
  }
  if (whatText) newItem.innerHTML = whatText;
  whatParent.prepend(newItem);
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
  showCookie();
}
function showProfile() {
  hideAllSectionsExept(sectionProfile);
}
function showFight() {
  hideAllSectionsExept(sectionFight);
  resetFight();
}
function showCookie() {
  let test1 = document.cookie.split('; ');
  console.log('All cookie')
  test1.forEach(a => console.log(a));
}
/* start */
function changeHero(event) {
  buttons.forEach(a => a.classList.remove('chouse-fighter-button-active'));
  event.currentTarget.classList.add('chouse-fighter-button-active');
  const newClass = event.currentTarget.innerHTML.toLowerCase();
  removeAllImgExsept(newClass);
  document.cookie = `class_____=${newClass}`;
}

function createHero() {
  changeName(input.value);
  document.cookie = 'gamestarted=yes';
  getRandonEnemy();
  showMain();
  header.classList.remove('over-top');
}
/* setting */
function changeName(name) {
  document.cookie = `user______=${name}`;
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
function removeAllImgExsept(text = 'paladin') {
  for (let i = 0; i < classesName.length; i += 1) {
    profileImg.classList.remove(classesName[i]);
    fightImg.classList.remove(classesName[i]);
    divImg.classList.remove(classesName[i]);
  }
  profileImg.classList.add(text);
  fightImg.classList.add(text);
  divImg.classList.add(text);
}
function changeClass(event) {
  let text = event.target.innerText;
  if (!text) text = event.target.previousSibling.innerText;
  text = text.toLowerCase();
  removeAllImgExsept(text);
  document.cookie = `class_____=${text}`;
}
/* fight */

function getCurrentEnemyIndex() {
  let enemyIndex = false;
  document.cookie.split('; ').forEach(a => {
    if (a.includes('enemyName_')) {
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

// function isFightNotStarted() {
//   let fighIsStarted = true;
//   tempDate.forEach(a => {
//     if (a.includes('enemy')) fighIsStarted = false;
//   });
//   return fighIsStarted;
// }

function getRandonEnemy() {
  const random = getRandom(enemys.length);
  document.cookie = `enemyName_=${enemys[random].name}`;
  fightNameEnemy.innerText = enemys[random].name[0].toUpperCase() + enemys[random].name.slice(1).toLowerCase();
  resetEnemyImg(enemys[random].name);
  fightHPEnemy.style.width = '100%';
  document.cookie = `enemyHP___=100%`;
  fightHP.style.width = '100%';
  document.cookie = `playerHP__=100%`;
}

function resetFight() {
  const allCookie = document.cookie.split('; ');
  allCookie.forEach(a => {
    if (a.includes('enemyName_')) {
      fightNameEnemy.innerText = a.slice(11, 12).toUpperCase() + a.slice(12);
      resetEnemyImg(a.slice(11));
    }
    if (a.includes('enemyHP_')) fightHPEnemy.style.width = a.slice(11);
    if (a.includes('playerHP_')) fightHP.style.width = a.slice(11);
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
  if (selectedAttack.length !== 1) {
    buttonRunFight.classList.remove('run-fight-active');
    return false;
  }
  const selectedDefense = document.querySelectorAll('input[name="defense"]:checked');
  if (selectedDefense.length !== 2) {
    buttonRunFight.classList.remove('run-fight-active');
    return false;
  }
  buttonRunFight.classList.add('run-fight-active');
  return true;
}

function getArrWithEnemyActions(num) {
  const arr = [];
  for (let i = 0; i < num; i += 1) {
    let temp = zones[getRandom(zones.length)];
    if (i !== 0 && zones[getRandom(zones.length)] === arr[0]) temp = zones[getRandom(zones.length)];
    arr.push(temp);
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
    creatAndPrepend(fightLog, 'p', false, text);
  } else {
    text = `${playerName} attacks ${enemyName}'s ${pa} and deal to ${enemyName} 15 damage.`;
    if (fightImg.className.includes('bard')) text = `${playerName} attacks ${enemyName}'s ${pa} and deal to ${enemyName} 40 damage.`;
    creatAndPrepend(fightLog, 'p', false, text);
    text = dealDamageToEnemy();
  }
  if (text === 99) return;
  for (let i = 0; i < ea.length; i += 1) {
    if (pd.includes(ea[i])) {
      text = `${enemyName} attacks ${playerName}'s ${ea[i]}, but ${playerName} blocks it.`;
      creatAndPrepend(fightLog, 'p', false, text);
    } else {
      text = `${enemyName} attacks ${playerName}'s ${ea[i]} and deal to ${playerName} 10 damage.`;
      creatAndPrepend(fightLog, 'p', false, text);
      text = dealDamageToPlayer();
      if (text === 99) return;
    }
  }
}

function dealDamageToEnemy() {
  let damage = 1500;
  if (fightImg.className.includes('bard')) damage = 4000;
  const fullHP = enemys[getCurrentEnemyIndex()].ph;
  const damageHP = Math.floor(damage / fullHP);
  const currentHP = fightHPEnemy.style.width.slice(0, -1) - 0;
  if (currentHP <= damageHP) {
    fightHPEnemy.style.width = '0%';
    document.cookie = `enemyHP___=0%`;
    winFight();
    return 99;
  } else {
    const finaleHP = currentHP - damageHP + '%';
    fightHPEnemy.style.width = finaleHP;
    document.cookie = `enemyHP___=${finaleHP}`;
  }
}

function dealDamageToPlayer() {
  let damage = 1000;
  const fullHP = 100;
  const damageHP = Math.floor(damage / fullHP);
  const currentHP = fightHP.style.width.slice(0, -1) - 0;
  if (currentHP <= damageHP) {
    fightHP.style.width = '0%';
    document.cookie = `playerHP__=0%`;
    looseFight();
    return 99;
  } else {
    const finaleHP = currentHP - damageHP + '%';
    fightHP.style.width = finaleHP;
    document.cookie = `playerHP__=${finaleHP}`;
  }
}

function clearInputs() {
  radioButtons.forEach(a => {
    a.checked = false;
  });
  buttonRunFight.classList.remove('run-fight-active');
}

function winFight() {
  toggleWinScreen();
  getRandonEnemy();
  showMain();
  increaseWins();
  setTimeout(toggleWinScreen, 3000);
  fightLog.innerHTML = '';
}

function looseFight() {
  toggleLooseScreen();
  getRandonEnemy();
  showMain();
  increaseLoose();
  setTimeout(toggleLooseScreen, 3000);
  fightLog.innerHTML = '';
}

function toggleWinScreen() {
  screenWin.classList.toggle('hidden');
}
function toggleLooseScreen() {
  screenLoose.classList.toggle('hidden');
}

function increaseWins() {
  const temp = profileWins.innerText - 0 + 1;
  profileWins.innerText = temp;
  document.cookie = `countWin__=${temp}`;
}
function increaseLoose() {
  const temp = profileLoose.innerText - 0 + 1;
  profileLoose.innerText = temp;
  document.cookie = `countLoose=${temp}`;
}
document.cookie = `enemyName_=knight`;
// ------------------- builder --------------------------------------
let gameInfo = false;
const tempDate = document.cookie.split('; ');
tempDate.forEach(a => {
  // console.log(a.slice(0,12)); // delete
  if (a.includes('gamestarted')) {
    gameInfo = a; // check is character created
    header.classList.remove('over-top');
  }
  if (a.includes('user_')) {
    changeName(a.slice(11));
    console.log(a.slice(11)); // delete
  }
  if (a.includes('class_')) {
    profileImg.classList.add(a.slice(11)); // set profile image
    fightImg.classList.add(a.slice(11)); // set fight image
  }
  if (a.includes('countWin_')) {
    profileWins.innerText = a.slice(11);
  }
  if (a.includes('countLoose')) {
    profileLoose.innerText = a.slice(11);
  }
});
if (!gameInfo) {// first run
  showStart();
  removeAllImgExsept();
  profileWins.innerText = '0';
  document.cookie = `countWin__=0`;
  profileLoose.innerText = '0';
  document.cookie = `countLoose=0`;
} 
else showMain(); // continue game
// start build profile all cards
for (let i = 0; i < 13; i += 1) {
  const card = creatAndAppend(profileCardHolder, 'div', 'profile-classes-card');
  creatAndAppend(card, 'div', 'profile-classes-card-class', `${classesName[i].toUpperCase()}`);
  creatAndAppend(card, 'div', `profile-classes-card-img ${classesName[i]}`);
}
// end build profile all cards
const profileAllCards = document.querySelectorAll('.profile-classes-card'); // change class function
profileAllCards.forEach(a => a.addEventListener('click', changeClass));

console.log(
  'Моя предпологаемая оценка:\n1. Экран регистрации: 10 баллов',
  '\n2. Домашняя страница: 5 баллов',
  '\n3. Страница персонажа: 25 баллов',
  '\n4. Страница настроек: 10 баллов',
  '\n5. Страница с боем: 85 баллов',
  '\n - не реализована механика критических ударов',
  '\n - не реализована стилистика логов боя',
  '\n6. Бонусное задание: 15 баллов',
  '\n - не реализована логика хранения логов боя',
  '\n - всё остальное хранитсья в памяти:',
  '\n     имя игрока, текущий враг, класс(картинка),\n     здоровье игрока и противника, списко побед и поражений',
  '\nИтого: 150 баллов'
)