/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_apiRoot: string
    VITE_serverApiPrefix: string
    VITE_clientRoot: string
    VITE_publicPathPrefix: ''
    VITE_clientId: string
    VITE_title: string
    VITE_limtlocale: string
    DevServer: string
    VITE_URLMode: 'DomainName' | 'SubFolder'
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

type CloudSettings = {
    /**
     * 子菜单模式,正则模式，或服务端模式
     */
    clientUrlMode: 'DomainName' | 'SubFolder' //| "fromServer",
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