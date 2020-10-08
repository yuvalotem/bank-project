import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue-grey lighten-1">
                    <Link to='/' className="brand-logo"> Logo </Link>
                    <ul id="nav-mobile" className="right">
                        <li><i className="fas fa-bars" onClick={this.props.changeMenu}></i></li>
                        <li><a href='#'></a></li>
                    </ul>
                    <ul id="nav-mobile" className="left">
                        <li><a href='#'></a></li>
                        <li>Balance: {this.props.balance}₪</li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default Menu;