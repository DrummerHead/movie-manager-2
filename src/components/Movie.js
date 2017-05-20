import React from 'react';
import Scores from './Scores'
import '../css/movie.css'

const parseImageUrl = url =>
  url.replace(/\._V1_SX300/, '')

const Movie = props => {
  const content = props.data.payload
    ?
    <div className={`movie ${props.className}`}>
      <h2 className='movie_title'>{props.data.payload.Title}</h2>
      <p className='movie__year'>{props.data.payload.Year}</p>
      <Scores ratings={props.data.payload.Ratings} average={props.data.payload.averageScore} />
      <img src={parseImageUrl(props.data.payload.Poster)} alt={props.data.payload.Title} className='movie__poster' />
      <p>{props.data.payload.Plot}</p>
    </div>
    :
    <div className={`movie movie--loading ${props.className}`}>Loading...</div>;

  return content;
}

export default Movie;
