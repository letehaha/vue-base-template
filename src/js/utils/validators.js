import { MathUtil, stringParsers } from '@/js/utils';
import { MAX_FIELD_LENGTH } from '@/js/const';

import * as validators from 'vuelidate/lib/validators';

export { minLength } from 'vuelidate/lib/validators';

export const password = value => validators.minLength(8)(value)
  && validators.maxLength(MAX_FIELD_LENGTH.password)(value)
  && stringParsers.hasBigLetter(value)
  && stringParsers.hasDigit(value)
  && stringParsers.hasSpecCharacters(value);
export const amount = value => Number(value) && Number(value) > 0;
export const maxDecimalPoints = points => value => {
  const splittedValue = String(value).split('.');
  if (splittedValue.length < 2) {
    return true;
  }
  return splittedValue[splittedValue.length - 1].length <= Number(points);
};
export const requiredAtLeastOne = value => !!value.length;
export const amountRange = (from, to) => value => !validators.helpers.req(value)
  || (
    MathUtil.compare(value, from) >= 0 && MathUtil.compare(to, value) >= 0
  );
export function validateEmail(email) {
  const reg = new RegExp('[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?');
  return reg.test(email);
}
export function validatePassword(pass) {
  return pass && password(pass);
}
export const minValueBig = min => value => MathUtil.compare(value, min) >= 0;
export const maxValueBig = max => value => MathUtil.compare(value, max) <= 0;
export * from 'vuelidate/lib/validators';
