/**
 * @file 内置 svg 图标
 */

import {Icon, registerIcon} from 'amis';
import PCPreview from './pc-preview.svg';
import H5Preview from './h5-preview.svg';

registerIcon('pc-preview', PCPreview);
registerIcon('h5-preview', H5Preview);

export {Icon};
