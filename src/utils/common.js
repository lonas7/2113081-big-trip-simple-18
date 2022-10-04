const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.lenght - 1)];

function arrayRandElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

export {getRandomInteger, getRandomValue, arrayRandElement};
