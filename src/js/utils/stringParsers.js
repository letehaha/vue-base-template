function hasBigLetter(str) {
  return (/[A-Z]/.test(str));
}
function hasDigit(str) {
  return (/\d/).test(str);
}
function hasSpecCharacters(str) {
  // eslint-disable-next-line no-useless-escape
  return (/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(str);
}

export const stringParsers = Object.freeze({
  hasBigLetter,
  hasDigit,
  hasSpecCharacters,
});
