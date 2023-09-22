import { mustNotEndsWith } from "@/utils"
import runtime from "@/utils/helper/envHelper"

type AppSettings = {
    publicPath: string,
    clientRoot: string,
    apiBaseUrl: string,
    clientId: string,
    loginPage: string,
    // skip_login_page: boolean
    disable_langselect: boolean,
}

let localAppSettings: AppSettings = {
    publicPath: runtime.VITE_publicPathPrefix as string || '',
    clientRoot: runtime.VITE_clientRoot as string,
    apiBaseUrl: runtime.VITE_apiRoot as string,
    clientId: runtime.VITE_clientId as string,
    loginPage: '/auth/login',
    // skip_login_page: SKIP_LOGIN_PAGE
    disable_langselect: runtime.VITE_disable_langselect as boolean,
}
export type CloudSettings = {
    /**
     * 子菜单模式,正则模式，或服务端模式
     */
    clientUrlMode: 'TenantNameRegExp' | 'SubFolder' //| "fromServer",
    /**
     * 正则模式时的匹配规则 字符串，因为要 JSON 会丢失正则对象
     * 默认：/http[s]?:\/\/(\w+)\./
     * 注意 是正则表达式字符串，可以通过 浏览器控制台测试 new RegExp(/http[s]?:\/\/(\w+)\./)
       或者 /http[s]?:\/\/xxx-(\w+).test-local.localhost/.toString() 将内容贴到这里
     */
    exp: string
    /**
     * 正则匹配位置,默认1
     */
    matchGroupIdx: number
}



const cloudSettings: CloudSettings = {
    //@ts-ignore
    clientUrlMode: runtime.VITE_clientUrlMode as string,
    exp: runtime.VITE_tenantNameRegExp,
    matchGroupIdx: parseInt(runtime.VITE_matchGroupIdx),
}

let cachedSettings: AppSettings

const getAppSettings = () => {
    if (!cachedSettings) {
        cachedSettings = localAppSettings;
        const url = window.location;
        switch (cloudSettings.clientUrlMode) {
            case "SubFolder":
                // eslint-disable-next-line no-case-declarations
                const publicPath = url.pathname.split('/')[1]
                cachedSettings.clientRoot = `${url.origin}/${publicPath}`;
                cachedSettings.publicPath = `/${publicPath}/`

                // eslint-disable-next-line no-case-declarations
                let serverFolder = publicPath

                // if (cloudSettings.tenantNameMapping
                //     && has(cloudSettings.tenantNameMapping, publicPath)) {
                //     serverFolder = cloudSettings.tenantNameMapping[publicPath];
                // }
                cachedSettings.apiBaseUrl = localAppSettings.apiBaseUrl.replace("[tenatName]", serverFolder)
                break;
            case "TenantNameRegExp"://从正则匹配租户地址

                cachedSettings.clientRoot = window.location.origin
                cachedSettings.publicPath = '/'
                let exp = "http[s]?:\\/\\/(\\w+)\."
                if (cloudSettings.exp) {
                    exp = cloudSettings.exp
                }
                const matchResult = cachedSettings.clientRoot.match("http[s]?:\\/\\/(\\w+)\.");
                //TODO:修复正则问题
                // const mResult = window.origin.toString().match(/http[s]?:\/\/(\w+)\./);
                if (matchResult) {
                    let tname = matchResult[cloudSettings.matchGroupIdx || 1]
                    // if (cloudSettings.tenantNameMapping
                    //     && has(cloudSettings.tenantNameMapping, tname)) {
                    //     tname = cloudSettings.tenantNameMapping[tname];
                    // }

                    if (!tname && localAppSettings.apiBaseUrl.endsWith('/')) {
                        cachedSettings.apiBaseUrl = mustNotEndsWith(localAppSettings.apiBaseUrl, '/')
                    } else {
                        cachedSettings.apiBaseUrl
                            = mustNotEndsWith(localAppSettings.apiBaseUrl, '/').replace("[tenatName]", tname)
                    }
                }
                break;
        }
        //@ts-ignore
        window.publicPath = cachedSettings.publicPath
        console.log('cachedSettings: ', cachedSettings);
    }
    return cachedSettings
}
const appSettings = getAppSettings()
export default appSettings

