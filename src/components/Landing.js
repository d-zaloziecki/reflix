import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/landing.css';

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            users: [{ name: "Alon", rented: [], id: 1, color: "#0099ff" },
            { name: "Michael", rented: [], id: 2, color: "#ff3300" },
            { name: "Jasmine", rented: [], id: 3, color: "#99ff33" },
            { name: "Sharon", rented: [], id: 4, color: "#ffcc00" }
            ]
        }
    }
    render() {
        return (
            <div>
                <h2 className="heading">WHO IS WATCHING?</h2>

                <div>
                    {this.state.users.map(u => {
                        return (<Link to="/catalog" key={u.Id}>
                            <span className="userLink" style={{ backgroundColor: u.color}} >{u.name}</span>
                        </Link>)
                    })}
                </div>
            </div>
        );
    }
}

export default Landing;
