import { buildUrl, deepMerge, mustEndsWith, mustNotEndsWith, mustNotStartsWith, toMoney } from '@/utils';
import { apiUrl } from '@/utils/urlHelper';
import { registerFilter } from 'amis';

registerFilter('apiUrl', (input: string) => {
    return apiUrl(input)
});
registerFilter('absUrl', (input: string) => {
    return buildUrl(CLIENT_ROOT, input)
});
registerFilter('toApiUrl', (input: string) => buildUrl(API_BASE_URL, input));

registerFilter('deepMerge', (input: any, src: any) => (deepMerge(input, src)));

registerFilter("toMoney", (input: string,
    digits: number = 2, moneyFlag?: string,
    emptyOrNullFlag: string = '-') => toMoney(input, digits, moneyFlag, emptyOrNullFlag))