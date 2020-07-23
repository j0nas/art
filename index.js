const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;

const state = {
  x: centerX,
  y: centerY,
  width: 50,
  height: 50,
  directionX: false,
  directionY: false
};

const rand = multiplier => Math.random() * multiplier;
const coinFlip = (func1, func2) => rand(2) > 1 ? func1() : func2();

// Color
const paint = () => ctx.strokeRect(state.x, state.y, state.width, state.height);
const setColor = () => ctx.strokeStyle = `rgb(${rand(255)},${rand(255)},${rand(255)})`

// Direction
const setDirectionX = () => coinFlip(() => state.directionX = true, () => state.directionX = false)
const setDirectionY = () => coinFlip(() => state.directionY = true, () => state.directionY = false)

// Position
const increaseX = () => { if (state.x < width) state.x++; else { setDirectionX(); setColor(); } }
const decreaseX = () => { if (state.x > 0) state.x--; else { setDirectionX(); setColor(); } }
const mutateX = () => state.directionX ? increaseX() : decreaseX();

// Position
const increaseY = () => { if (state.y < height) state.y++; else { setDirectionY(); setColor(); } }
const decreaseY = () => { if (state.y > 0) state.y--; else { setDirectionY(); setColor(); } }
const mutateY = () => state.directionY ? increaseY() : decreaseY();

function createField(fieldName, observable) {
  const inputElement = document.createElement('input');
  inputElement.classList.add('block', 'input')
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
  Object.keys(state).forEach(field => createLabel(field, 100));

  [
    new Observable(10, { name: 'paintInterval', intervalFn: paint }),
    new Observable(10, { name: 'xCoordInterval', intervalFn: mutateX }),
    new Observable(10, { name: 'yCoordInterval', intervalFn: mutateY }),
  ].map(observable => createField(observable.name, observable));
})();

console.log('Painted!');
