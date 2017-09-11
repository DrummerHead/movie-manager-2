import React from 'react';
import MovieContainer from '../containers/MovieContainer';
import Controls from './Controls';
import LoadbarContainer from '../containers/LoadbarContainer';
import '../css/baseline.css';
import '../css/billboard.css';

const App = props => (
  <div>
    <LoadbarContainer data={props.data} />
    <Controls
      setFilter={props.setFilter}
      setSort={props.setSort}
      toggleSortDirection={props.toggleSortDirection}
      filteredBy={props.filteredBy}
      sortedBy={props.sortedBy}
      sortDescending={props.sortDescending}
    />
    <main className="billboard">
      {props.data
        .filter(props.filterPredicate)
        .sort(props.sortingPredicate)
        .map(movie => (
          <MovieContainer
            key={movie.id}
            data={movie}
            className="billboard__item"
            hydrateItem={props.hydrateItem}
          />
        ))}
    </main>
  </div>
);

export default App;
