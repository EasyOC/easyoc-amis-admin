import { OCNotifyType } from "@/types"
import { message } from "antd"

export const processResponseMessage = (msg: any) => {

    // const { extras, msg, succeeded, statusCode } = res.data as any
    if (msg) {
        const notifyFn = (notify: any) => {
            switch (notify.type) {
                case OCNotifyType.Success:
                    message.success({
                        title: '成功',
                        content: notify.value,
                    })
                    break
                case OCNotifyType.Information:
                    message.info({
                        title: "提示",
                        content: notify.value,
                    })
                    break
                case OCNotifyType.Warning:
                    message.warn({
                        title: '警告',
                        content: notify.value,
                    })
                    break
                case OCNotifyType.Error:
                    message.error({
                        title: '错误',
                        content: notify.value,
                    })
                    break
            }
        }
        if (msg instanceof Array) {
            msg.forEach(notifyFn)
        } else if (msg.message) {
            notifyFn(msg)
        }
    }
}