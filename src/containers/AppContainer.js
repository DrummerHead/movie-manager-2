import React from 'react';
import App from '../components/App';
import data from '../data/movies.json'

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
      sortBy: 'averageScore',
    }
    this.hydrateItem = this.hydrateItem.bind(this);
    this.sortingPredicate = this.sortingPredicate.bind(this);
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

  sortingPredicate(a, b) {
    if (!a.payload || !b.payload) {
      return 0;
    }
    switch (this.state.sortBy) {
      case 'averageScore':
        return b.payload.averageScore - a.payload.averageScore;
      default:
        return b.payload.averageScore - a.payload.averageScore;
    }
  }

  render() {
    return <App data={this.state.data} hydrateItem={this.hydrateItem} sortingPredicate={this.sortingPredicate} />
  }
}

export default AppContainer;
