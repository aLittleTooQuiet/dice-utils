export default (str) => {
  if (typeof str === 'string') {
    return /[xX*]{1}[\d]{1,}/.test(str);
  }
  return false;
};
