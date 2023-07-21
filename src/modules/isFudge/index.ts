export default (sides: number|string): boolean => (!!((sides && sides.toString().toUpperCase() === 'F')));
