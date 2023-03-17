import { buildOptions, objectOrArray } from './Common';
import xAxisOptions from './option-parts/option.xAxis.json';
import yAxisOptions from './option-parts/option.yAxis.json';

export default (axis = 'x') => {
  return objectOrArray(
    axis === 'x' ? 'xAxis' : 'yAxis',
    '多轴模式',
    buildOptions('', axis === 'x' ? xAxisOptions : yAxisOptions),
  );
};
