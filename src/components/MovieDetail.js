import React, { Component } from 'react';
import '../styles/movieDetail.css';


class MovieDetail extends Component {

    render(){
        let movies = this.props.movies;
        let movieId = parseInt(this.props.match.params.id)
        let currentMovie = movies.find(m => m.id===movieId)

        return (
            <div className="movieDetail" id={currentMovie.id}>
                <h4 className="center">{currentMovie.title + " (" + currentMovie.year + ")"}</h4>
                <div className="center"><img src={currentMovie.img} alt="" className="movieImg" /></div>
                <p className="descrShort">{currentMovie.descrShort}</p>
            </div>
        );
    }
}

export default MovieDetail;
