import React from 'react';
import App from '../components/App';
import data from '../data/movies.json';

const setSort = (sortDescending, a, b) => property =>
  sortDescending
    ? b[property] - a[property] || b.averageScore - a.averageScore
    : a[property] - b[property] || b.averageScore - a.averageScore;

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
    this.toggleSortDirection = this.toggleSortDirection.bind(this);
  }

  hydrateItem(id, payload) {
    this.setState(prevState => {
      return {
        ...prevState,
        data: prevState.data.map(
          item =>
            item.id === id
              ? { ...item, ...payload, hasFetchedData: true }
              : item
        ),
      };
    });
  }

  sortingPredicate(a, b) {
    if (!a.hasFetchedData || !b.hasFetchedData) {
      return 0;
    }
    return setSort(this.state.sortDescending, a, b)(this.state.sortBy);
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
    this.setState({
      sortBy: target,
    });
  }

  toggleSortDirection() {
    this.setState(prevState => ({
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
        filteredBy={this.state.filterBy}
        setSort={this.setSort}
        toggleSortDirection={this.toggleSortDirection}
        sortedBy={this.state.sortBy}
        sortDescending={this.state.sortDescending}
      />
    );
  }
}

export default AppContainer;
