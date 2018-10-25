import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing'
import Catalog from './components/Catalog'
import MovieDetail from './components/MovieDetail'
import MovieModel from './models/movie'
import UserModel from './models/user'


class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [
        new MovieModel(0, "Tarzan", 1999, "https://vignette.wikia.nocookie.net/disney-fan-fiction/images/4/42/Tarzan_2004_cover.jpg/revision/latest?cb=20140331030811", "Tarzan was born into wealth but raised into incredible misfortune. Shiprweck, parents mauled by a jaguar. Luckily, a troop of gorillas took him in, but the Big Daddy gorilla never took a liking to him. That is, until the end when it's too late. Why is it too late? Watch and find out."),
        new MovieModel(1, "The Lion King", 1994, "https://img00.deviantart.net/b782/i/2006/207/e/7/the_lion_king_front_cd_cover_by_peachpocket285.jpg", "A young lion prince named Simba is born into wealth but raised into incredible misfortune. Trickster uncle, dying father, usurpation. Luckily, an unlikely meerkat-warthog pair take him in and teach him The Ways of the Bum Life. Be prepared for ghostly hallucinations, wild baboons, creepy crawlies."),
        new MovieModel(2, "Beauty and the Beast", 1991, "https://images-na.ssl-images-amazon.com/images/I/81etFyb9N-L._SL1500_.jpg", "A kickass woman named Belle who does not succumb to social norms gets crap from a bunch of village idiots, chief amongst them a total tool named Gaston. Belle shows everyone how great she is when she turns a beast (not Gaston) into a man. Love ensues, but then the villagers fall trap to severe group-think mentality led by the main tool himself."),
        new MovieModel(3, "The Sword in the Stone", 1963, "https://www.disneyinfo.nl/images/laserdiscs/229-1-AS-front.jpg", "Arthur is a young boy who just wants to be a knight's squire. Alas, he is dubbed 'Wart' early on, and it was all downhill from there for a while. On a hunting trip he falls in on Merlin, literally. Merlin is a possibly-mentally-unstable-and-ethically-dubious Wizard that turns Arthur into a literate, at-one-point harassed squirrel. Watch to find out what the heck that means."),
        new MovieModel(4, "Beauty and the Beast", 2016, "https://images-na.ssl-images-amazon.com/images/I/51ArFYSFGJL.jpg", "Basically the same as the original, except now Hermi-- Emma Wattson plays Belle, fittingly so some would say, given how actively progressive she is regarding women's rights. Rumor has it that in the bonus scenes she whips out a wand and turns Gaston into a toad, but in order to watch those scenes you need to recite a certain incantation.")
      ],
      users: [
        new UserModel("Alon", "#0099ff", 10),
        new UserModel("Michael", "#ff3300", 10),
        new UserModel("Jasmine", "#99ff33", 10),
        new UserModel("Sharon", "#ffcc00", 10)
      ],
    }
  }

  seperateCurrentUser = (userId) => {
    let currentUser = this.state.users.find(u => u.id === parseInt(userId))
    currentUser = { ...currentUser, rented: [...currentUser.rented] }
    return currentUser
  }

  rent = (users, currentUser, indexOfUser, movieId) => {
    if (currentUser.budget < 3) {
      alert("You don't have eanough money to rent this movie")
    } else {
      let movie = this.state.movies.find(m => m.id === movieId)
      currentUser.rented.push(movie)
      currentUser.budget -= 3
      users[indexOfUser] = currentUser;
      this.setState({ users: users })
    }
  }

  unrent = (users, currentUser, indexOfUser, movieId) => {
    let movieIndex = currentUser.rented.findIndex(m => m.id === movieId)
    currentUser.rented.splice(movieIndex, 1)
    currentUser.budget += 3
    users[indexOfUser] = currentUser;
    this.setState({ users: users })
  }

  isRented = (movieId, currentUser) => {
    return currentUser.rented.some(m => { return m.id === movieId })
  }

  rentUnrent = (movieId, userId) => {
    let users = [...this.state.users]
    let currentUser = this.seperateCurrentUser(parseInt(userId))
    let indexOfUser = users.findIndex(u => u.id === currentUser.id)
    let isRented = this.isRented(parseInt(movieId), currentUser)

    if (isRented) {
      this.unrent(users, currentUser, indexOfUser, parseInt(movieId))
    } else {
      this.rent(users, currentUser, indexOfUser, parseInt(movieId))
    }
  }

  render() {
    return (
      <Router>
        <div>
          <div id="nav">
            <Link to="/">Home</Link>
            <Link to="/Catalog">Catalog</Link>
            <span>REFLIX</span>
          </div>

          <Route exact path="/" render={() => <Landing users={this.state.users} />} />
          <Route exact path="/Catalog" render={() => <Catalog movies={this.state.movies} rentUnrent={this.rentUnrent} users={undefined} />} />
          <Route exact path="/catalog/:id" render={({ match }) => <Catalog match={match} movies={this.state.movies} rentUnrent={this.rentUnrent} users={this.state.users} />} />
          <Route exact path="/movieDetail/:id" render={({ match }) => <MovieDetail match={match} movies={this.state.movies} />} />

        </div>
      </Router>
    );
  }
}

export default App;
