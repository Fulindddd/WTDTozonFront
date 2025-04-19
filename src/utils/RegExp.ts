export const mobileNoRegExp = /1[3|4|5|7|8|9][0-9]\d{8}$/;

export const userPasswordRegExp = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;

export const TelNoRegExp = /^((1[3|4|5|6|7|8|9][0-9]\d{8})|((?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?))$/; //固定电话
// message: '6-20个字符，字母、数字或“_”'
export const userNameRegExp = /^(?=.*[a-zA-Z_-])[a-zA-Z0-9][a-zA-Z0-9_-]{5,20}$/;

export const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 姓名 汉字 可以加·
// export const nameRegExp = /^(([a-zA-Z+\.?\·?a-zA-Z+]{2,10}$)|([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,10}$))/;
export const nameRegExp = /^([\u4e00-\u9fa5+\·?\u4e00-\u9fa5+]{2,10}$)/;
// export const emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;

export const telephoneNoRegExp = /^([0-9]{3,4}-)?[0-9]{7,8}$/;

export const lowerCaseRegExp = /^[a-z]+$/;

export const upperCaseRegExp = /^[A-Z]+$/;

export const alphabetsRegExp = /^[A-Za-z]+$/;

export const creditCodeExp = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/; //纳税人识别号

export const bankAccountExp = /^\d{10,30}$/; //银行账号
export const contentNullExp = /^(?=.*\S).+$/; //全空
// 身份证
export const IDNumber = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9X]$/;
export const certificateCode = /^[0-9A-Z]{17}$/;
export const notSpace = /[^\s]+/;
export const non_zero_negative = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/; // 非零非负
export const one_to_hundred_integer = /^([1-9]?\d|100)$/; // 0-100正整数
export default {};
