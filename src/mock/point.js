import {getRandomInteger, getRandomValue} from '../utils/common.js';
import { generateDescription } from '../utils/point-utils.js';
import { cities, titlesOffers } from './const.js';

const destination = {
  id: getRandomInteger(0,5),
  description: generateDescription(),
  name: getRandomValue(cities),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1,150)}`,
      description: generateDescription()
    }
  ]
};

// const offer = {
//   id: getRandomInteger(),
//   title: 'Upgrade to a business class',
//   price: getRandomInteger()
// };


const offer = {
  id: getRandomInteger(0,5),
  title: getRandomValue(titlesOffers),
  price: getRandomInteger(10,100)
};

// const offers = Array.from({length: 5}, offer);

// const offerByType = {
//   type: offersTypes,
//   offers: offers
// };

export const generatePoint = () => (
  {
    basePrice: getRandomInteger(50, 1000),
    dateFrom: '2019-07-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomInteger(destination.id),
    id: getRandomInteger(1,20),
    offers: offer.id,
    type: 'taxi'
  }
);
// export const generatePoints = () => {
//   const points = Array.from({lenght: POINTS_COUNT}, generatePoint);
//   return points;
// };

