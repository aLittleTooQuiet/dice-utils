import parseDieNotation from './modules/parse-die-notation/index.ts';
import rollDie from './modules/roll-die/index.ts';
import roll from './modules/roll/index.ts';

export { default as parseDieNotation } from './modules/parse-die-notation/index.ts';
export { default as rollDie } from './modules/roll-die/index.ts';
export { default as roll } from './modules/roll/index.ts';

export default {
  parseDieNotation,
  rollDie,
  roll,
};
