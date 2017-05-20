import React from 'react';
import Movie from '../components/Movie'
import axios from 'axios'

class MovieContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      render: false,
    };
  }

  componentDidMount() {
    console.log(this.props.data.id);
    axios
      .get(`http://www.omdbapi.com/?i=${this.props.data.id}&tomatoes=true`)
      .then(response => {
        console.log(response);
        this.setState({
          data: response.data,
          render: true,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }


  render() {
    return (
      <Movie {...this.state} className={this.props.className} />
    );
  }
}

export default MovieContainer;
