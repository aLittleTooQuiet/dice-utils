/* eslint-disable no-throw-literal */
const dieRegex = /[-*x]{0,1}\d*(d)?([f\d]+)/g;

export default (diceString) => {
  if (typeof diceString !== 'string') {
    throw {
      name: 'TypeError',
      message: 'separateDieTypes must be called with a string',
    };
  }
  const match = diceString.replace(/\s/g, '').toLowerCase().match(dieRegex);
  const result = match.map((dieString) => dieString);
  return result;
};
