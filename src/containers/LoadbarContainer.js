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
    return <Loadbar percentage={this.getWidth(this.howManyHasFetchedData())} />;
  }
}

export default LoadbarContainer;
