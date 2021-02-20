import separateDieTypes from '../separateDieTypes';
import parseDiceGroup from '../parseDiceGroup';

/**
 * Parse a die notation string.
 * @param {int} diceString - A die notation string ie "1d20+5".
 * @return {object} An object containing the parsed components of the die string.
 */
export default (diceString) => {
  if (typeof diceString !== 'string') {
    throw new Error('parseDieNotation must be called with a dice notation string');
  }

  const diceGroups = separateDieTypes(diceString);
  const parsedGroups = diceGroups.map(parseDiceGroup);
  if (parsedGroups.length === 1) {
    return parsedGroups[0];
  }
  return parsedGroups;
};
