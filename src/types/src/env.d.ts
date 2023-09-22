/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_apiRoot: string
    VITE_serverApiPrefix: string
    VITE_clientRoot: string
    VITE_publicPathPrefix: ''
    VITE_clientId: string
    VITE_title: string
    VITE_locale: string
    DevServer: string
    // 更多环境变量...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}