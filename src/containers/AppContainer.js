import React from 'react';
import App from '../components/App';
import data from '../data/movies.json';

const setSort = (sortDescending, a, b) => property =>
  sortDescending ? b[property] - a[property] : a[property] - b[property];

class AppContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data,
      sortBy: 'averageScore',
      sortDescending: true,
      filterBy: 'All',
    };
    this.hydrateItem = this.hydrateItem.bind(this);
    this.sortingPredicate = this.sortingPredicate.bind(this);
    this.filterPredicate = this.filterPredicate.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.setSort = this.setSort.bind(this);
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
    return setSort(this.state.sortDescending, a.payload, b.payload)(
      this.state.sortBy
    );
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

  setSort(target) {
    this.setState(prevState => ({
      sortBy: target,
      sortDescending: !prevState.sortDescending,
    }));
  }

  render() {
    return (
      <App
        data={this.state.data}
        hydrateItem={this.hydrateItem}
        sortingPredicate={this.sortingPredicate}
        filterPredicate={this.filterPredicate}
        setFilter={this.setFilter}
        setSort={this.setSort}
      />
    );
  }
}

export default AppContainer;
