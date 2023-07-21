export default (mod: number|string): boolean => !!(mod && mod.toString().toUpperCase() === '-L');
