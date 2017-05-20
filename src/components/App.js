import React from 'react';
import MovieContainer from '../containers/MovieContainer'
import '../css/baseline.css'
import '../css/billboard.css'

const App = props =>
  <div className='billboard'>
    {props.data.map(movie =>
      <MovieContainer key={movie.id} data={movie} className='billboard__item' />
    )}
  </div>

export default App;
