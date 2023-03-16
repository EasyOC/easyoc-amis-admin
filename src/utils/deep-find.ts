import { isArray, isFunction } from 'lodash'
import { isObject } from './is'
/*
* 1. 检查 src 是否存在 与 condition.key相等的 key,如果存在 且 与 condition.value 相等 则返回src对象
* 2. 否则 遍历 src 的所有 属性 如果是对象 则递归调用 deepFind
*/
export const deepFind = (src: any = {}, condition?: { key: string, value: any } | ((current: any, parent?: any, currentKey?: string) => any)): any => {
  if (isArray(src)) {
    const result = isFunction(condition) ? condition(src) : src.find((item: any) => deepFind(item, condition))
    if (result) {
      return result
    }
  }
  if (isObject(src)) {
    let key: string
    for (key in src) {
      let result;
      if (isFunction(condition)) {
        result = condition(src[key], src, key)
        if (result) {
          return deepFind(src[key], condition)
        }
        else {
          return result
        }
      }

      if (condition && key === condition.key && src[key] === condition.value) {
        return src
      }
      result = deepFind(src[key], condition)
      if (result) {
        return result
      }
    }

  }
  return null
}