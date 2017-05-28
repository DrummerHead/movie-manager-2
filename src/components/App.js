import React from 'react';
import MovieContainer from '../containers/MovieContainer';
import Controls from './Controls';
import '../css/baseline.css';
import '../css/billboard.css';

const App = props => (
  <div>
    <Controls
      setFilter={props.setFilter}
      setSort={props.setSort}
      filteredBy={props.filteredBy}
      sortedBy={props.sortedBy}
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
