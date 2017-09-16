import React from 'react';
import Loadbar from '../components/Loadbar';

class LoadbarContainer extends React.Component {
  howManyHasFetchedData() {
    return this.props.data.filter(item => item.hasFetchedData === true).length;
  }

  getWidth(n) {
    return n * 100 / this.props.data.length;
  }

  render() {
    const width = this.getWidth(this.howManyHasFetchedData());
    return <Loadbar percentage={width} complete={width === 100} />;
  }
}

export default LoadbarContainer;
