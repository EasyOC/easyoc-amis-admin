export type TokenResult = {
    access_token: string
    expires_in: number
    id_token: string
    refresh_token: string
    token_type: "Bearer"
}
const TokenKey = "TokenResult";

class TokenManager {

    saveToken(result: TokenResult) {
        sessionStorage.setItem(TokenKey, JSON.stringify(result));
    }

    get authInfo(): TokenResult {
        return JSON.parse(sessionStorage.getItem(TokenKey) || '{}') as TokenResult
    }
    get isExpired(): boolean {
        const { access_token, expires_in } = this.authInfo;
        //检查token过期时间
        if (access_token && expires_in) {
            return new Date() > new Date(new Date().getTime() + expires_in * 1000)
        }
        return false;
    }
    get isAuthenticated(): boolean {
        const { access_token } = this.authInfo;

        return !!access_token;
    }

}
const tokenStore = new TokenManager();
export default tokenStore