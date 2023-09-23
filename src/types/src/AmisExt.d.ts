import { DynamicFilterInfo } from '@/services/amis/AmisExt'
class TreeHelperConfig {
    id?: string
    children?: string
    pid?: string
    parentFinder?: (parent: any, current: any) => boolean
    rootFinder?: (item: any) => boolean
}

declare interface AmisExt {
    session: User | null;
    copy: (content: string, toast?: string | boolean, contineEvent?: boolean) => void;
    /**
     * Generates a unique ID. If prefix is provided the ID is appended to it.
     *
     * @param prefix The value to prefix the ID with.
     * @return Returns the unique ID.
     */
    uuid(prefix?: string): string;
    /**
     * authService
     */
    auth: any
    listToTree: <T>(list: T[], config: Partial<TreeHelperConfig>) => T[]
    treeToList: <T = any>(
        tree: any,
        config: Partial<TreeHelperConfig> = {},
    ) => T

    treeMap: <T = any>(
        treeData: T[],
        opt: { children?: string; conversion: (current) => any },
    ) => T[]
    //@ts-ignore
    deepMerge: <T = any>(target: any = {}, src: any = {}) => T
    /**
     * 
     * @param condition api.body.condition
     * @returns {DynamicFilterInfo} 返回对象， 为 filters 属性赋值增加过滤条件
     */
    getConditionFilter(condition): DynamicFilterInfo
    /**
     * @deprecated  请使用 getConditionFilter
     * @param args 
     */
    buildConditionFilter(args: [{ value: any }]): any[]
    /**
     * @deprecated  请使用 getConditionFilter
     * @param condition 
     */
    dynamicJsonFilter(condition: any): string
    /**
     * @deprecated  请使用 getConditionFilter
     * @param condition 
     * @returns 
     */
    convertCondition: (condition: any) => string
}