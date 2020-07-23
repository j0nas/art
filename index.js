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

const paint = () => ctx.strokeRect(state.x, state.y, state.width, state.height);
const setColor = () => ctx.strokeStyle = `rgb(${rand(255)},${rand(255)},${rand(255)})`

const setDirectionX = () => coinFlip(() => state.directionX = true, () => state.directionX = false)
const setDirectionY = () => coinFlip(() => state.directionY = true, () => state.directionY = false)

const increaseX = () => { if (state.x < width) state.x++; else { setDirectionX(); setColor(); } }
const decreaseX = () => { if (state.x > 0) state.x--; else { setDirectionX(); setColor(); } }
const mutateX = () => state.directionX ? increaseX() : decreaseX();

const increaseY = () => { if (state.y < height) state.y++; else { setDirectionY(); setColor(); } }
const decreaseY = () => { if (state.y > 0) state.y--; else { setDirectionY(); setColor(); } }
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
  setCoord();
  paint()
  const paintInterval = new Observable(10, { intervalFn: paint });
  // const colorInterval = new Observable(1000, { intervalFn: setColor });
  const coordInterval = new Observable(10, { intervalFn: setCoord });

  Object.keys(state).forEach(field => createLabel(field, 100));

  createField('paintInterval', paintInterval)
  // createField('colorInterval', colorInterval)
  createField('coordInterval', coordInterval)
})();

console.log('Painted!');
