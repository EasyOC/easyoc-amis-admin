import { AmisExt } from './src/AmisExt'

declare global {
    interface Window {
        $wujie: any
        __POWERED_BY_WUJIE__: boolean
        amisExt: Partial<AmisExt>
    }
}
export * from './src'