import { AmisExt } from './src/AmisExt'
import { IMainStore } from '@/stores'
declare global {
    interface Window {
        store: IMainStore
        __POWERED_BY_WUJIE__: boolean
        amisExt: Partial<AmisExt>
    }
}
export * from './src'