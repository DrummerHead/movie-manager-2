import React from 'react';
import MovieContainer from '../containers/MovieContainer';
import '../css/baseline.css';
import '../css/billboard.css';

const FilterButton = props => (
  <button onClick={() => props.setFilter(props.target)}>
    {props.target}
  </button>
);

const App = props => (
  <div>
    <header>
      <FilterButton setFilter={props.setFilter} target="All" />
      <FilterButton setFilter={props.setFilter} target="Mom" />
      <FilterButton setFilter={props.setFilter} target="Pablo" />

    </header>
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
