export * from './is'
export * from './uuid'
export * from './log'
export * from './date'
export * from './deep-merge'
export * from './deep-find'
export * from './util'
export * from './file'
export * from './helper'
export * from './safeEval'
export {
    isEmpty,
    isNumber,
    isBoolean,
    isEqual,
    isUndefined,
    upperFirst,
    isFunction, isString, isArray, isMap
} from 'lodash'

export const toMoney = (value: any, digits: number = 2, moneyFlag?: string
    , emptyOrNullFlag: string = '-'): string => {
    if (emptyOrNullFlag) {
        if (!value || value == 0) {
            return emptyOrNullFlag;
        }
    }

    const temp = Number(value).toFixed(digits);
    const moneyStr = temp;
    let result = ''
    if (!moneyStr.includes('.')) {
        result = moneyStr.toLocaleString() + ".".padEnd(digits + 1, '0');
    } else {
        const numArr = moneyStr.split('.')
        const digstr = numArr[1].padEnd(digits, '0')
        result = numArr[0].toLocaleString() + '.' + digstr
    }
    if (moneyFlag) {
        return moneyFlag + result;
    } else {
        return result;
    }
}
export function __uri(url: string) {
    return url;
}
