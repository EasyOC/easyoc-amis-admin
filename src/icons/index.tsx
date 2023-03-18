/**
 * @file 内置 svg 图标
 */

import {Icon, registerIcon} from 'amis';
import PCPreview from './pcpreview.svg';
import H5Preview from './h5preview.svg';
import React from 'react';

registerIcon('pcPreview', () => <PCPreview />);
registerIcon('h5Preview', () => <H5Preview />);

export {Icon};
