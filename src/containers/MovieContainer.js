import React from 'react';
import Movie from '../components/Movie'
import axios from 'axios'
import { averageScores } from '../util';

class MovieContainer extends React.Component {
  componentDidMount() {
    console.log(this.props.data.id);
    axios
      .get(`http://www.omdbapi.com/?i=${this.props.data.id}&tomatoes=true`)
      .then(response => {
        console.log(response);
        this.props.hydrateItem(this.props.data.id, { ...response.data, averageScore: averageScores(response.data.Ratings)});
      })
      .catch(error => {
        console.error(error);
      });
  }


  render() {
    return (
      <Movie {...this.props} className={this.props.className} />
    );
  }
}

export default MovieContainer;
