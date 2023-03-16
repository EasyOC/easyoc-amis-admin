export const __inlineold = (path: string) => import(path)

export const __inline = async (path: string) => Promise.resolve(require(path).default)


