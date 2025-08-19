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