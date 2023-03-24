import { OCNotifyType } from "@/types"
import { toast } from "amis-ui"
import { message } from "antd"

const useAmis = true;

export const processResponseMessage = (msg: any) => {

    if (msg) {
        const notifyFn = (notify: any) => {
            const notifyType = notify.type;
            const notifyValue = notify.value;
            switch (notifyType) {
                case OCNotifyType.Success:
                    useAmis ? toast.success(notifyValue) : message.success({title: '成功', content: notifyValue})
                    break
                case OCNotifyType.Information:
                    useAmis ? toast.info(notifyValue) : message.info({title: "提示", content: notifyValue})
                    break
                case OCNotifyType.Warning:
                    useAmis ? toast.warning(notifyValue) : message.warning({title: '警告', content: notifyValue})
                    break
                case OCNotifyType.Error:
                    useAmis ? toast.error(notifyValue) : message.error({title: '错误', content: notifyValue})
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
