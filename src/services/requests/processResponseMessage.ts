import { toast } from "amis-ui"

export enum OCNotifyType {
    Success = 0,
    Information = 1,
    Warning = 2,
    Error = 3,
}

/**
 * 
 * @param responseData
 * @param onlyProcessAmisExcept 只处理amis 默认拦截之外的逻辑
 * @returns 
 */
export const processResponseMessage = (responseData, onlyProcessAmisExcept: boolean = false) => {

    const { msg, success } = responseData
    const errorMsgs: string[] = [];
    if (msg) {
        /**
        接口返回格式（重要）
        https://aisuda.bce.baidu.com/amis/zh-CN/docs/types/api#%E6%8E%A5%E5%8F%A3%E8%BF%94%E5%9B%9E%E6%A0%BC%E5%BC%8F-%E9%87%8D%E8%A6%81-
        为了方便更多场景使用，还兼容了以下这些错误返回格式：

         errorCode 作为 status、errorMessage 作为 msg

        errno 作为 status、errmsg/errstr 作为 msg
        error 作为 status、errmsg 作为 msg
        error.code 作为 status、error.message 作为 msg
        message 作为 msg        

        正确的格式
        {
            "status": 0,
            "msg": "",
            "data": {
            // 正确
            "text": "World!"
            }
        }
         */

        if (typeof msg == 'string') {
            if (success === false) {
                notifyFn(errorMsgs, { type: OCNotifyType.Error, value: msg })
            } else
                //排除amis 默认规则
                if (!onlyProcessAmisExcept) {
                    notifyFn(errorMsgs, { type: OCNotifyType.Success, value: msg })
                }
        } else if (msg instanceof Array) {
            msg.forEach(x => notifyFn(errorMsgs, x))
        } else if (msg.message) {
            if (msg.success) {
                notifyFn(errorMsgs, { type: OCNotifyType.Success, value: msg.message })
            } else {
                notifyFn(errorMsgs, { type: OCNotifyType.Error, value: msg.message })
            }
        }
    }
    return errorMsgs.join(';')
}

const notifyFn = (errorMsgs, notify: { type: OCNotifyType, value: string }) => {
    const notifyType = notify.type;
    const notifyValue = notify.value;
    switch (notifyType) {
        case OCNotifyType.Success:
            toast.success(notifyValue)
            break
        case OCNotifyType.Information:
            toast.info(notifyValue)
            break
        case OCNotifyType.Warning:
            toast.warning(notifyValue)
            break
        case OCNotifyType.Error:
        default:
            toast.error(notifyValue)
            errorMsgs.push(notifyValue as string)
            break
    }
}
