import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue-grey lighten-1">
                    <Link to='/' className="brand-logo"> Logo </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/transactions'> Transactions </Link></li>
                        <li><Link to='/operations'> Operations </Link></li>
                        <li><Link to='/breakdown'> Breakdown </Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}


export default Menu;