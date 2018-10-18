import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/movie.css';

class Movie extends Component {
    render(){
        let movie = this.props.movie
        return (
            <Link to={"/movie/"+movie.id}>
                <div style={{ backgroundImage: "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811"}} className="catalogMovie"></div>
            </Link>
        );
    }
}

export default Movie;