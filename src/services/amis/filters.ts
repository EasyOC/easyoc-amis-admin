import { buildUrl, deepMerge, mustEndsWith, mustNotEndsWith, mustNotStartsWith, toMoney } from '@/utils';
import { apiUrl } from '@/utils/urlHelper';
import { registerFilter, registerFunction, uuid } from 'amis';
import { pinyin } from 'pinyin-pro';
import { camelCase, lowerFirst, upperFirst } from 'lodash';
import appSettings from '../appsettings';

registerFilter('apiUrl', (input: string) => {
    return apiUrl(input)
});
registerFilter('clientUrl', (input: string) => {
    return buildUrl(appSettings.clientRoot, input)
});
registerFilter('toApiUrl', (input: string) => buildUrl(appSettings.apiBaseUrl
    , input));

registerFilter('deepMerge', (input: any, src: any) => (deepMerge(input, src)));
registerFilter('pinyinCamelCase', (input: any, src: any) => {
    // 获取数组形式不带声调的拼音
    const pyArray = pinyin(input, { toneType: 'none', type: 'array', v: true, nonZh: 'consecutive' }); // ["han", "yu", "pin", "yin"]
    //输入英文则不处理，因为英文会直接转换为单个字母
    const converted = pyArray.map(x => x.length > 1 ? upperFirst(x) : x);
    return lowerFirst(converted.join(''))
});

export const pinyinStartCase = (input: any, conditionVal?: any) => {
    if (conditionVal) {
        return conditionVal
    }
    // 获取数组形式不带声调的拼音
    const pyArray = pinyin(input, { toneType: 'none', type: 'array' }); // ["han", "yu", "pin", "yin"]
    const converted = pyArray.map(x => x.length > 1 ? upperFirst(x) : x);
    return upperFirst(converted.join(''))
}

registerFilter('pinyinStartCase', pinyinStartCase);
registerFilter('uuid', uuid);

registerFunction("我的测试registerFunction", (input) => console.log(input))




registerFilter("toMoney", (input: string,
    digits: number = 2, moneyFlag?: string,
    emptyOrNullFlag: string = '-') => toMoney(input, digits, moneyFlag, emptyOrNullFlag))