import React from 'react';

export default class BackTop extends React.PureComponent {
  state = {
    show: false
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e: any) => {
    this.setState({
      show: e.target.scrollingElement?.scrollTop > 350
    });
  };

  render() {
    return (
      <div
        className={`Backtop ${this.state.show ? 'visible' : ''}`}
        onClick={() => scrollTo({top: 0})}
      >
        <i className="fa fa-rocket"></i>
      </div>
    );
  }
}
