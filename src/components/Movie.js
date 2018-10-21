import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/movie.css';

class Movie extends Component {
    constructor(){
        super(); 
        this.state = {
            minusIcon: "https://cdn.iconscout.com/icon/premium/png-256-thumb/minus-159-628616.png",
            plusIcon: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ambox_plus.svg/1024px-Ambox_plus.svg.png"
        }
    }

    addRemoveBtn = (e) => {
        let movieId = e.target.id
        this.props.rentUnrent(movieId, this.props.userId)
    }

    render(){
        let movie = this.props.movie
        if(!this.props.userId){
            return(
                <div className="catalogMovie">
                <Link to={"/movieDetail/"+movie.id}>
                    <div style={{ backgroundImage: "url("+movie.img+")"}} className="movieLink"></div>
                </Link>
            </div>
    
            );
        }else{
            let rented = this.props.rented
            return (
                <div className="catalogMovie">
                    <Link to={"/movieDetail/"+movie.id}>
                        <div style={{ backgroundImage: "url("+movie.img+")"}} className="movieLink"></div>
                    </Link>
                    <img className="addRemoveBtn" id={movie.id} onClick={this.addRemoveBtn} src={rented.some(r=>r.id===movie.id) ? this.state.minusIcon : this.state.plusIcon} alt="" />
                </div>
            );
        }
    }
}

export default Movie;