import type { RendererProps } from 'amis';
import { Renderer } from 'amis';
import React from 'react';

export interface MyRendererProps extends RendererProps {
  target?: string;
}

@Renderer({
  type: 'my-renderer',
  autoVar: true,
})
export default class MyRenderer extends React.Component<MyRendererProps> {
  static defaultProps = {
    target: 'world',
  };

  render() {
    const { target } = this.props;

    return <p>Hello {target}!</p>;
  }
}
