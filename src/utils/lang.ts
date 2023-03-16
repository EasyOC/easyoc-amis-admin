import { addLocale as umiAddLocale } from '@umijs/max';

export const addLocale = (name: string,
    messages: any,
    extraLocales?: {
        momentLocale: string;
        antd: string
    },) => {
    umiAddLocale(name, messages, extraLocales || {
        momentLocale: name.toLowerCase(),
        antd: name
    })
}