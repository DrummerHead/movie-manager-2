import React from 'react';
import App from '../components/App';
import data from '../data/movies.json'

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
    }
    this.hydrateItem = this.hydrateItem.bind(this);
  }

  hydrateItem(id, payload) {
    this.setState(prevState => {
      return {
        ...prevState,
        data: prevState.data.map(item =>
          item.id === id
            ? { ...item, payload }
            : item
        )
      }
    });
  }

  render() {
    return <App data={this.state.data} hydrateItem={this.hydrateItem} />
  }
}

export default AppContainer;
