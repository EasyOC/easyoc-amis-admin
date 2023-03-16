/**
 * @file 内置 svg 图标
 */

import {Icon, registerIcon} from 'amis';

// // @ts-ignore
// import PCPreview from './pc-preview.svg';
// // @ts-ignore
// import H5Preview from './h5-preview.svg';

const H5PreviewIcon = () => (
    <svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="页面编辑器" stroke="none" fill="none">
        <g id="补充icon" transform="translate(-189.000000, -51.000000)">
          <g id="手机预览" transform="translate(189.000000, 51.000000)">
            <rect id="矩形" x="0" y="0" width="16" height="16"></rect>
            <path
              d="M13,1.5 C13.2761424,1.5 13.5,1.72385763 13.5,2 L13.5,2 L13.5,14 C13.5,14.2761424 13.2761424,14.5 13,14.5 L13,14.5 L3,14.5 C2.72385763,14.5 2.5,14.2761424 2.5,14 L2.5,14 L2.5,2 C2.5,1.72385763 2.72385763,1.5 3,1.5 L3,1.5 Z M12.4995617,2.5 L3.49956174,2.5 L3.49956174,13.5 L12.4995617,13.5 L12.4995617,2.5 Z M9,11.6598373 C9.27614237,11.6598373 9.5,11.8836949 9.5,12.1598373 C9.5,12.4052972 9.32312484,12.6094457 9.08987563,12.6517816 L9,12.6598373 L7,12.6598373 C6.72385763,12.6598373 6.5,12.4359797 6.5,12.1598373 C6.5,11.9143774 6.67687516,11.7102289 6.91012437,11.667893 L7,11.6598373 L9,11.6598373 Z"
              id="形状结合备份"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
  
  const PCPreviewIcon = () => (
    <svg viewBox="0 0 17 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <g id="页面编辑器" stroke="none" fill="none">
        <g id="补充icon" transform="translate(-137.000000, -51.000000)">
          <g id="电脑预览" transform="translate(137.037083, 51.000000)">
            <g
              id="编组-16备份-5"
              transform="translate(8.000000, 8.000000) scale(-1, 1) translate(-8.000000, -8.000000) "
            >
              <rect id="矩形" x="0" y="0" width="16" height="16"></rect>
            </g>
            <path
              d="M6,14 C5.72385763,14 5.5,13.7761424 5.5,13.5 C5.5,13.2545401 5.67687516,13.0503916 5.91012437,13.0080557 L6,13 L7.5,12.9996584 L7.5,11.5 L2,11.5 C1.72385763,11.5 1.5,11.2761424 1.5,11 L1.5,11 L1.5,2.54165837 C1.5,2.265516 1.72385763,2.04165837 2,2.04165837 L2,2.04165837 L14,2.04165837 C14.2761424,2.04165837 14.5,2.265516 14.5,2.54165837 L14.5,2.54165837 L14.5,11 C14.5,11.2761424 14.2761424,11.5 14,11.5 L14,11.5 L8.5,11.5 L8.5,12.9996584 L10,13 C10.2761424,13 10.5,13.2238576 10.5,13.5 C10.5,13.7454599 10.3231248,13.9496084 10.0898756,13.9919443 L10,14 L6,14 Z M13.4999166,3.041 L2.4999166,3.041 L2.4999166,10.5 L13.4999166,10.5 L13.4999166,3.041 Z"
              id="形状结合"
              fill="currentColor"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
  
registerIcon('pc-preview', PCPreviewIcon);
registerIcon('h5-preview', H5PreviewIcon);

export {Icon};
