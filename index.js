const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

const rand = multiplier => Math.random() * multiplier;

let state = {
  x1: centerX,
  y1: centerY,
  x2: rand(centerX),
  y2: rand(centerY),
  directionX: false,
  directionY: false
};

const paint = () => ctx.strokeRect(state.x1, state.y1, state.x2, state.y2);
const setColor = () => ctx.strokeStyle = `rgb(${rand(255)},${rand(255)},${rand(255)})`

const coinFlip = (func1, func2) => rand(2) > 1 ? func1() : func2();
const setDirectionX = () => coinFlip(() => state.directionX = true, () => state.directionX = false)
const setDirectionY = () => coinFlip(() => state.directionY = true, () => state.directionY = false)

const increaseX = () => {
  if (state.x1 < width) state.x1++; else { setDirectionX(); setColor(); }
  if (state.x2 < width) state.x2++; else { setDirectionX(); setColor(); }
}
const decreaseX = () => {
  if (state.x1 > 0) state.x1--; else { setDirectionX(); setColor(); }
  if (state.x2 > 0) state.x2--; else { setDirectionX(); setColor(); }
}
const mutateX = () => state.directionX ? increaseX() : decreaseX();

const increaseY = () => {
  if (state.y1 < height) state.y1++; else { setDirectionY(); setColor(); }
  if (state.y2 < height) state.y2++; else { setDirectionY(); setColor(); }
}
const decreaseY = () => {
  if (state.y1 > 0) state.y1--; else { setDirectionY(); setColor(); }
  if (state.y2 > 0) state.y2--; else { setDirectionY(); setColor(); }
}
const mutateY = () => state.directionY ? increaseY() : decreaseY();
const setCoord = () => { mutateX(); mutateY(); };

function createField(fieldName, observable) {
  const inputElement = document.createElement('input');
  inputElement.classList.add('block')
  inputElement.placeholder = `${fieldName} (default: ${observable.get()})`;
  inputElement.onchange = e => {
    observable.set(Number(e.target.value));
    console.log(`Set ${fieldName} to ${observable.get()}`);
  };

  document.getElementById('controls').append(inputElement);
  return inputElement;
}

function createLabel(stateFieldName, updateFrequency) {
  const labelElement = document.createElement('label');
  labelElement.classList.add('block')
  const updateLabel = () => labelElement.innerHTML = `${stateFieldName}: ${state[stateFieldName]}`;
  setInterval(updateLabel, updateFrequency)
  document.getElementById('controls').append(labelElement);
}

(function() {
  const paintInterval = new Observable(10, { intervalFn: paint });
  // const colorInterval = new Observable(1000, { intervalFn: setColor });
  const coordInterval = new Observable(10, { intervalFn: setCoord });

  Object.keys(state).forEach(field => createLabel(field, 100));

  createField('paintInterval', paintInterval)
  // createField('colorInterval', colorInterval)
  createField('coordInterval', coordInterval)
})();

console.log('Painted!');