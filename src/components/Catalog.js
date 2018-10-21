import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/catalog.css';
import Movie from './Movie'

class Catalog extends Component {
    constructor() {
        super();
        this.state = {
            searchInput: "",
            searchFinds: [],
        }
    }

    handleInput = (e) => {
        let inpVal = e.target.value;
        this.setState({ searchInput: inpVal }, this.search(inpVal))
    }

    search = (inputValue) => {
        if (inputValue === "") {
            let searchFinds = [...this.state.searchFinds]
            searchFinds.splice(0)
            this.setState({ searchFinds: searchFinds })
            return
        }
        let searchFinds = this.props.movies.filter(m => m.title.toLowerCase().indexOf(inputValue) > -1)
        this.setState({ searchFinds: searchFinds })
    }

    displaySearchFindes = () => {
        if (this.state.searchFinds.length > 0) {
            return (
                <div id="searchFinds">
                    {this.state.searchFinds
                        .map(m => { return (<div key={m.id}><Link to={"/movieDetail/" + m.id} className="linkSearch">{m.title}</Link></div>) })}
                </div>
            )
        }
    }

    displayRentedMovies = (user) => {
        if (user.rented.length > 0) {
            return (
                <div id="rented">
                    <h4>RENTED MOVIES:</h4>
                    {user.rented
                        .map(m => { return (<Movie movie={m} key={m.id} rentUnrent={this.props.rentUnrent} userId={user.id} rented={user.rented} />) })}
                </div>
            )
        }
    }

    render() {
        if (!this.props.users) {
            return (
                <div className="container">
                    <div>
                        <input className="searchInput" placeholder="Search..." value={this.state.searchInput} onChange={this.handleInput} />
                    </div>
                    {this.displaySearchFindes()}
                    <div id="catalog">
                        <h4>Catalog:</h4>
                        {this.props.movies.map(m => { return (<Movie movie={m} key={m.id} userId={undefined} />) })}
                    </div>
                </div>
            );
        }else {
            let user = this.props.users.find(u => u.id === parseInt(this.props.match.params.id))
            return (
                <div className="container">
                    <div>
                        <input className="searchInput" placeholder="Search..." value={this.state.searchInput} onChange={this.handleInput} />
                        <span id="budget">Budget: ${user.budget}</span>
                    </div>
                    {this.displaySearchFindes()}
                    {this.displayRentedMovies(user)}
                    <div id="catalog">
                        <h4>Catalog:</h4>
                        {this.props.movies.map(m => { return (<Movie movie={m} key={m.id} rentUnrent={this.props.rentUnrent} userId={user.id} rented={user.rented} />) })}
                    </div>
                </div>
            );    
        }
    }
}

export default Catalog;