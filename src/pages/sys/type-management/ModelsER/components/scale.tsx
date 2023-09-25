import React, { FC, useEffect, useState } from 'react';
import { Slider, Card, Row, Col, Button } from 'antd';
import { ExpandOutlined, PlusOutlined } from '@ant-design/icons';
export interface Props {
  onChange: (state: ScaleSettingsState) => void;
  center: () => void;
  parentScale: number;
}

export interface ScaleSettingsState {
  scale: number;
  tx: number;
  ty: number;
}
export const defaults: ScaleSettingsState = {
  scale: 1,
  tx: 0,
  ty: 0,
};

export const ScaleSettings: FC<Props> = (props) => {
  const [state, setState] = useState<ScaleSettingsState>({ ...defaults, scale: props.parentScale });

  const onScaleChanged = (scale: number) => {
    const newState = { ...state, scale: scale };
    setState(newState);
    props.onChange(newState);
  };

  useEffect(() => {
    setState((s) => ({ ...state, scale: props.parentScale }));
  }, [props.parentScale]);

  return (
    <div style={{ width: '180px', marginLeft: '5px' }}>
      <Button icon={<ExpandOutlined />} onClick={props.center} />
    </div>
  );
};
