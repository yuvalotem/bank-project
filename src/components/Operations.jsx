import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: '',
            vendor: '',
            category: '',
            date: '',
            clicked: false,
            openSuccsess: false,
            openInvalid: false,
            openInsufficient: false
        }
    }

    handleChange = event => {
        const { value } = event.target
        const { name } = event.target
        this.setState({ [name]: value })
    }

    addTransaction = () => {
        const {amount} = this.state
        const {vendor} = this.state
        const {category} = this.state
        const {date} = this.state
        if (!amount || !vendor || !category || !date) {
            this.setState({ openInvalid: true })
            return
        }
        const transaction = {
            amount: amount,
            vendor: vendor,
            category: category,
            date: date
        }
        this.props.addTransaction(transaction)
        this.setState({ 
            clicked: true,
            openSuccsess: true
        })
    }

    addOutcomeTransaction = () => {
        const {amount} = this.state
        if(this.props.balance - amount < 500){
            this.setState({ openInsufficient: true })
            return
        }
        this.setState({ amount: -this.state.amount }, function () {
            this.addTransaction()
        })
    }

    handleClose = () =>{
        this.setState({
            openSuccsess: false,
            openInvalid: false,
            openInsufficient: false
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
                        <input 
                        placeholder='Amount' 
                        name='amount' 
                        value={this.state.amount} 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                        <input 
                        placeholder='Vendor' 
                        name='vendor' 
                        value={this.state.vendor} 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                        <input 
                        placeholder='Category' 
                        name='category' 
                        value={this.state.category} 
                        onChange={this.handleChange} />
                    </div>
                    <div className="input-field col s6">
                        <input 
                        type="date" 
                        name='date' 
                        value={this.state.date} 
                        onChange={this.handleChange} />
                        <label>Date</label>
                    </div>
                    <div className="button-field col s6">
                        <button 
                        className="waves-effect waves-light btn-large blue-grey lighten-1" 
                        onClick={this.addTransaction}>
                            Deposit <i className="fas fa-shekel-sign"></i>
                            </button>
                    </div>
                    <div className="button-field col s6">
                        <button 
                        className="waves-effect waves-light btn-large blue-grey lighten-1" 
                        onClick={this.addOutcomeTransaction}>
                            Withdraw <i className="fas fa-paper-plane"></i>
                            </button>
                    </div>
                </div>

                <Snackbar open={this.state.openInvalid} autoHideDuration={3000} onClose={this.handleClose}>
                <Alert severity="error">Invalid input</Alert>
                </Snackbar>

                <Snackbar open={this.state.openInsufficient} autoHideDuration={3000} onClose={this.handleClose}>
                <Alert severity="error">Insufficient Funds</Alert>
                </Snackbar>

                <Snackbar open={this.state.openSuccsess} autoHideDuration={3000} onClose={this.handleClose}>
                <Alert severity="success">Expense was added</Alert>
                </Snackbar>

            </div>
        );
    }
}


export default Operations;