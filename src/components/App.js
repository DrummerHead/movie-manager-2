import React from 'react';
import MovieContainer from '../containers/MovieContainer';
import '../css/baseline.css';
import '../css/billboard.css';

const Button = props => (
  <button onClick={() => props.onClick(props.option)}>
    {props.option}
  </button>
);

const App = props => (
  <div>
    <header>
      <Button onClick={props.setFilter} option="All" />
      <Button onClick={props.setFilter} option="Mom" />
      <Button onClick={props.setFilter} option="Pablo" />
      <Button onClick={props.setSort} option="averageScore" />
      <Button onClick={props.setSort} option="duration" />
      <Button onClick={props.setSort} option="revenue" />
      <Button onClick={props.setSort} option="Year" />
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
