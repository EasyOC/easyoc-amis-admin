import { currentLocale } from 'i18n-runtime';
import { makeTranslator } from 'amis';


const currentLang = currentLocale();
/**
 * 翻译函数，使用当前选定语言
 */
const _t = makeTranslator(currentLang);

export default _t