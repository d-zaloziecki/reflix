import React, { Component } from 'react';
import '../styles/catalog.css';
import Movie from './Movie'

class Catalog extends Component {
    constructor() {
        super();
        this.state = {
            budget: 10,
            searchInput: ""
        }
    }

    handleInput = (e) => {
        let inpVal = e.target.value;
        this.setState({ searchInput: inpVal })
    }

    search = (e) => {
        if (e.keyCode === 13) {

        } else {
            return;
        }
    }

    displayRentedMovies = () =>{
        if(this.props.movies.some(m=>{return m.isRented === true})){
            return(
                <div id="rented">
                    <h4>RENTED MOVIES:</h4>
                    {this.props.movies
                        .filter(m=>{return m.isRented === true})
                        .map(m=> {return (<Movie movie={m} key={m.id} />)})}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                <div>
                    <input className="searchInput" placeholder="Search..." value={this.state.searchInput} onChange={this.handleInput} onKeyUp={this.search} />
                    <span id="budget">Budget: ${this.state.budget}</span>
                </div>
                {this.displayRentedMovies()}
                <div id="catalog">
                    { this.props.movies.map(m=> {return (<Movie movie={m} key={m.id} />)})}
                </div>
            </div>
        );
    }
}

export default Catalog;