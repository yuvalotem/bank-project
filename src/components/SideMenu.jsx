import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends Component {
    render() {
        return (
            <div className='collection'>
                     <Link to='/transactions' className="collection-item blue-grey-text" onClick={this.props.changeMenu}> Transactions </Link>
                     <Link to='/operations' className="collection-item blue-grey-text" onClick={this.props.changeMenu}> Operations </Link>
                     <Link to='/breakdown' className="collection-item blue-grey-text" onClick={this.props.changeMenu}> Breakdown </Link>
            </div>
        );
    }
}


export default SideMenu;