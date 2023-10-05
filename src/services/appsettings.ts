import { mustNotEndsWith } from "@/utils"
import runtime from "@/utils/helper/envHelper"

type AppSettings = {
    routeBase: string,
    clientRoot: string,
    apiBaseUrl: string,
    clientId: string,
    loginPage: string,
    limitlocale: string | undefined,
    // skip_login_page: boolean
    disable_langselect: boolean,
}

let localAppSettings: AppSettings = {
    routeBase: runtime.VITE_publicPathPrefix as string || '',
    clientRoot: runtime.VITE_clientRoot as string,
    apiBaseUrl: runtime.VITE_apiRoot as string,
    clientId: runtime.VITE_clientId as string,
    limitlocale: runtime.VITE_limtlocale as string,
    loginPage: '/auth/login',
    // skip_login_page: SKIP_LOGIN_PAGE
    disable_langselect: runtime.VITE_disable_langselect as boolean,
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
        debugger
        switch (cloudSettings.clientUrlMode) {
            case "SubFolder":
                // eslint-disable-next-line no-case-declarations
                const publicPath = url.pathname.split('/')[1]
                cachedSettings.clientRoot = `${url.origin}/${publicPath}`;
                cachedSettings.routeBase = `/${publicPath}/`

                // eslint-disable-next-line no-case-declarations
                let serverFolder = publicPath

                // if (cloudSettings.tenantNameMapping
                //     && has(cloudSettings.tenantNameMapping, publicPath)) {
                //     serverFolder = cloudSettings.tenantNameMapping[publicPath];
                // }
                cachedSettings.apiBaseUrl = localAppSettings.apiBaseUrl.replace("[tenatName]", serverFolder)
                break;
            case "DomainName"://从正则匹配租户地址
                cachedSettings.clientRoot = window.location.origin
                cachedSettings.routeBase = '/'
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
        window.publicPath = cachedSettings.routeBase
        console.log('cachedSettings: ', cachedSettings);
    }
    return cachedSettings
}
const appSettings = getAppSettings()
export default appSettings

