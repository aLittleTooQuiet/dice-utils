import prepareDiceString from '../prepareDiceString';

const dieRegex = /-l|[-*x<>]{0,1}\d*(d)?([f]{1}|\d+)/g;

export default (diceString) => {
  const match = prepareDiceString(diceString).match(dieRegex);
  const result = match.reduce((acc, ds) => {
    if (acc.length) {
      const len = acc.length;
      if (/^-l|[-*x<>]{1}\d+$/.test(ds)) {
        acc[len - 1] = acc[len - 1] + ds;
      } else if (/^\d+$/.test(ds)) {
        acc[len - 1] = `${acc[len - 1]}+${ds}`;
      } else {
        acc.push(ds);
      }
    } else {
      acc.push(ds);
    }
    return acc;
  }, []);
  return result;
};
