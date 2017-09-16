import React from 'react';
import Movie from '../components/Movie';
import axios from 'axios';
import { averageScores } from '../util';
import config from '../config';

const movieDetails = [
  'Actors',
  'Director',
  'Awards',
  'Genre',
  'Runtime',
  'Country',
  'BoxOffice',
];

const parseBoxOffice = value =>
  value === 'N/A' ? 0 : parseInt(value.replace(/[$,]/g, ''), 10);

const getMovieData = (props, times = 1) =>
  axios
    .get(
      `http://www.omdbapi.com/?i=${props.data.id}&tomatoes=true&apikey=${config.apiKey}`
    )
    .then(response => {
      console.log(response);
      props.hydrateItem(props.data.id, {
        ...response.data,
        averageScore: averageScores(response.data.Ratings),
        duration: parseInt(response.data.Runtime || 0, 10),
        revenue: parseBoxOffice(response.data.BoxOffice),
      });
    })
    .catch(error => {
      if (times <= 11) {
        console.info(
          `There was an error ${times} time(s) trying to fetch http://www.omdbapi.com/?i=${props.data.id}&tomatoes=true&apikey=${config.apiKey}:`
        );
        console.error(error);
        console.info('error.message:');
        console.error(error.message);
        console.info('Trying again...');
        getMovieData(props, times + 1);
      } else {
        console.log(
          `The error repeated too many times. Let's just stop and think about a better solution to this than trying over and over like crazy, alright?`
        );
      }
    });

class MovieContainer extends React.Component {
  componentDidMount() {
    if (!this.props.data.hasFetchedData) {
      getMovieData(this.props);
    }
  }

  render() {
    return (
      <Movie
        {...this.props}
        className={this.props.className}
        movieDetails={movieDetails}
      />
    );
  }
}

export default MovieContainer;
