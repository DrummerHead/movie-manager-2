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

class MovieContainer extends React.Component {
  componentDidMount() {
    if (!this.props.data.hasFetchedData) {
      axios
        .get(
          `http://www.omdbapi.com/?i=${this.props.data.id}&tomatoes=true&apikey=${config.apiKey}`
        )
        .then(response => {
          console.log(response);
          this.props.hydrateItem(this.props.data.id, {
            ...response.data,
            averageScore: averageScores(response.data.Ratings),
            duration: parseInt(response.data.Runtime || 0, 10),
            revenue: parseBoxOffice(response.data.BoxOffice),
          });
        })
        .catch(error => {
          console.error(error);
        });
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
