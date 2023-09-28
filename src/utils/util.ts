/* eslint-disable @typescript-eslint/no-unused-expressions */


export const openWindow = (
  url: string,
  opt?: {
    target?: '_self' | '_blank' | string
    noopener?: boolean
    noreferrer?: boolean
  },
) => {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}


export const mustNotStartsWith = (str: string, prefix: string) => {
  if (str.startsWith(prefix)) {
    return str.substring(prefix.length)
  } else {
    return str
  }
}
export const mustStartsWith = (str: string, prefix: string) => {
  if (str.startsWith(prefix)) {
    return str
  } else {
    return prefix + str
  }
}

export const mustEndsWith = (str: string, postFix: string) => {
  if (str.endsWith(postFix)) {
    return str
  } else {
    return str + postFix
  }
}

export const mustNotEndsWith = (str: string, postFix: string) => {
  if (str.endsWith(postFix)) {
    return str.slice(0, -1 * postFix.length)
  } else {
    return str
  }
}

export const buildUrl = (str1: string, str2: string) => {
  if (str1 === '/') {
    return mustStartsWith(str2, '/')

  }
  return mustNotEndsWith(str1, '/') + mustStartsWith(str2, '/')
}

// export const decodeJwt = (token: string) => {
//   const text = decodeURIComponent(window.atob(token.split('.')[1]))
//   const obj = JSON.parse(text)
//   return obj
// }

export function camelCase(str: string | null | undefined): string {
  if (!str) return ""
  const [first, ...rest] = str
  return [first.toLocaleLowerCase(), ...rest].join("")
}
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export const setObjToUrlParams = (baseUrl: string, obj: any): string => {
  let parameters = ''
  // eslint-disable-next-line guard-for-in
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

/**
 * @description:  Set ui mount node
 */
export const getPopupContainer = (node?: HTMLElement): HTMLElement => {
  return (node?.parentNode as HTMLElement) ?? document.body
}
