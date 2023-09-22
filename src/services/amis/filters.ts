import { buildUrl, deepMerge, toMoney } from '@/utils';
import { apiUrl } from '@/utils/urlHelper';
import { registerFilter } from 'amis';
import AppSettings from '../appSettings';

registerFilter('apiUrl', (input: string) => {
    return apiUrl(input)
});
registerFilter('absUrl', (input: string) => {
    return buildUrl(AppSettings.clientRoot, input)
});
registerFilter('toApiUrl', (input: string) => buildUrl(AppSettings.apiBaseUrl, input));

registerFilter('deepMerge', (input: any, src: any) => (deepMerge(input, src)));

registerFilter("toMoney", (input: string,
    digits: number = 2, moneyFlag?: string,
    emptyOrNullFlag: string = '-') => toMoney(input, digits, moneyFlag, emptyOrNullFlag))