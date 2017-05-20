import React from 'react';
import App from '../components/App';
import data from '../data/movies.json'

class AppContainer extends React.Component {
  componentDidMount() {
    console.log(data);
  }

  render() {
    return <App data={data} />
  }
}

export default AppContainer;
