import prepareDiceString from '../prepareDiceString';

const dieRegex = /[-*x]{0,1}\d*(d)?([f\d]+)/g;

export default (diceString) => prepareDiceString(diceString).match(dieRegex);
