/**
 * @file Echarts title 的配置
 */

import { buildOptions } from './Common';
import angleAxisOptions from './option-parts/option.angleAxis.json';
import polarOptions from './option-parts/option.polar.json';
import radiusAxisOptions from './option-parts/option.radiusAxis.json';

export default {
  type: 'tabs',
  tabs: [
    {
      title: '坐标系',
      body: buildOptions('polar.', polarOptions),
    },
    {
      title: '径向轴',
      body: buildOptions('radiusAxis.', radiusAxisOptions),
    },
    {
      title: '角度轴',
      body: buildOptions('angleAxis.', angleAxisOptions),
    },
  ],
};
