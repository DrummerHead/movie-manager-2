import React from 'react';
import Scores from './Scores'
import '../css/movie.css'

const parseImageUrl = url =>
  url.replace(/\._V1_SX300/, '')

const Movie = props => {
  const content = props.render
    ?
    <div className={`movie ${props.className}`}>
      <h2 className='movie_title'>{props.data.Title}</h2>
      <p>{props.data.Year}</p>
      <Scores ratings={props.data.Ratings} />
      <img src={parseImageUrl(props.data.Poster)} alt={props.data.Title} className='movie__poster' />
      <p>{props.data.Plot}</p>
    </div>
    :
    <div className={`movie movie--loading ${props.className}`}>Loading...</div>;

  return content;
}

export default Movie;
