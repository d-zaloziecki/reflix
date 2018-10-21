import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/landing.css';

class Landing extends Component {
    render() {
        return (
            <div>
                <h2 className="heading">WHO IS WATCHING?</h2>

                <div>
                    {this.props.users.map(u => {
                        return (<Link to={"/catalog/"+u.id} key={u.id}>
                            <span className="userLink" style={{ backgroundColor: u.color}} >{u.name}</span>
                        </Link>)
                    })}
                </div>
            </div>
        );
    }
}

export default Landing;
