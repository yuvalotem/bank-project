import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: '',
            vendor: '',
            category: '',
            clicked: false
        }
    }

    handleChange = event => {
        const { value } = event.target
        const { name } = event.target
        this.setState({ [name]: value })
    }

    addTransaction = () => {
        const transaction = {
            amount: this.state.amount,
            vendor: this.state.vendor,
            category: this.state.category
        }
        this.props.addTransaction(transaction)
        this.setState({ clicked: true })
    }

    addOutcomeTransaction = () => {
        this.setState({ amount: -this.state.amount }, function () {
            this.addTransaction()
        })
    }

    render() {
        if (this.state.clicked) {
            return <Redirect to='/transactions' />
        }
        return (
            <div className="row">
                <div className="row">
                    <div className="input-field col s6">
                        <input placeholder='Amount' name='amount' value={this.state.amount} onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                        <input placeholder='Vendor' name='vendor' value={this.state.vendor} onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                        <input placeholder='Category' name='category' value={this.state.category} onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                        <input type="date" className="validate" />
                        <label>Date</label>
                    </div>
                    <div className="button-field col s6">
                        <button className="waves-effect waves-light btn-large blue-grey lighten-1" onClick={this.addTransaction}>Deposit <i className="fas fa-shekel-sign"></i></button>
                    </div>
                    <div className="button-field col s6">
                        <button className="waves-effect waves-light btn-large blue-grey lighten-1" onClick={this.addOutcomeTransaction}>Withdraw <i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}


export default Operations;