import React from 'react';
import App from '../components/App';
import data from '../data/movies.json';

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
      sortBy: 'averageScore',
      filterBy: 'All',
    };
    this.hydrateItem = this.hydrateItem.bind(this);
    this.sortingPredicate = this.sortingPredicate.bind(this);
    this.filterPredicate = this.filterPredicate.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  hydrateItem(id, payload) {
    this.setState(prevState => {
      return {
        ...prevState,
        data: prevState.data.map(
          item => (item.id === id ? { ...item, payload } : item)
        ),
      };
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

  filterPredicate(item) {
    return (
      this.state.filterBy === 'All' ||
      item.suitable.includes(this.state.filterBy)
    );
  }

  setFilter(target) {
    this.setState({
      filterBy: target,
    });
  }

  render() {
    return (
      <App
        data={this.state.data}
        hydrateItem={this.hydrateItem}
        sortingPredicate={this.sortingPredicate}
        filterPredicate={this.filterPredicate}
        setFilter={this.setFilter}
      />
    );
  }
}

export default AppContainer;
