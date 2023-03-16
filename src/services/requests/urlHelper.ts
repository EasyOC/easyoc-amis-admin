/**
 * 根据地址栏域名 生成客户端配置
 * @returns 客户端配置
 */
export const getAppConfig = (): { clientRoot: string, apiUrl: string, clientId: string } => {

    // const clientRootUrl = new URL(CLIENT_ROOT )
    const appConfig = {
        clientRoot: CLIENT_ROOT,
        apiUrl: API_BASE_URL,
        clientId: CLIENT_ID
    }
    // 注意：clientRootUrl.hostname 不含端口号，clientRootUrl.host 含端口号
    // 由于只考虑公网情况，此处暂不考虑端口号问题
    // 本地开发不大可能 在不同域名下使用相同端口号
    // if (clientRootUrl.hostname != history.location.hostname) {
    //     const [appId, ...rest] = history.location.hostname.split('.')
    //     serverRootUrl.hostname = rest.join('.')
    //     appConfig.serverRoot = serverRootUrl.origin
    //     appConfig.clientId = appId
    //     appConfig.clientRoot = history.location.origin
    // }
    return appConfig;
}