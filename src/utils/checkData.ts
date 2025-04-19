import {
  mobileNoRegExp,
  emailRegExp,
  telephoneNoRegExp,
  lowerCaseRegExp,
  upperCaseRegExp,
  alphabetsRegExp,
} from './RegExp';

// 判断是否有值
export function validatenull(val: unknown): boolean {
  if (typeof val === 'boolean' || typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    // todo ? 'undefined' 为什么返回 true
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true;
    return false;
  }
  return false;
}

// 邮箱
export function isEmail(str: string): boolean {
  return emailRegExp.test(str);
}

// 手机号码
export function isMobile(str: string): boolean {
  return mobileNoRegExp.test(str);
}

// 电话号码
export function isPhone(str: string): boolean {
  return telephoneNoRegExp.test(str);
}

// URL地址
export function isURL(str: string): boolean {
  return /^http[s]?:\/\/.*/.test(str);
}

// 小写字母
export function validateLowerCase(str: string): boolean {
  return lowerCaseRegExp.test(str);
}

// 大写字母
export function validateUpperCase(str: string): boolean {
  return upperCaseRegExp.test(str);
}

// 大小写字母
export function validatAlphabets(str: string): boolean {
  return alphabetsRegExp.test(str);
}
