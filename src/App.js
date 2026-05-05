import Axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Breakdown from './components/Breakdown';
import Menu from './components/Menu';
import SideMenu from './components/SideMenu';
import Operations from './components/Operations';
import Transactions from './components/Transactions';

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: [],
      balance: 0,
      showMenu: false
    }
  }

  async getTransactionsFromDB() {
    return Axios.get('http://localhost:4000/transactions')
  }

  async saveTransactionToDB(transaction) {
    return Axios.post('http://localhost:4000/transaction', transaction)
  }

  async deleteTransactionFromDB(id) {
    return Axios.delete('http://localhost:4000/transaction/' + id)
  }

  async componentDidMount() {
    const response = await this.getTransactionsFromDB()
    let newBalance = 0
    response.data.forEach(t => newBalance += t.amount)
    this.setState({ 
      transactions: response.data,
      balance: newBalance
    })
  }

  addTransaction = async (transaction) => {
    const newTransactions = [...this.state.transactions]
    const savedTransaction = await this.saveTransactionToDB(transaction)
    newTransactions.push(savedTransaction.data)
    this.setState({ 
      transactions: newTransactions,
      balance: this.state.balance + parseInt(transaction.amount)
    })
  }

  removeTransaction = async (id) => {
    const newTransactions = [...this.state.transactions.filter(t => t._id !== id)]
    const deletedTrans = this.state.transactions.find(t => t._id === id)
    this.deleteTransactionFromDB(id)
    this.setState({ 
      transactions: newTransactions,
      balance: this.state.balance - deletedTrans.amount
     })
  }

  changeMenu = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Menu changeMenu={this.changeMenu} balance={this.state.balance} />
          {this.state.showMenu ?
            <SideMenu changeMenu={this.changeMenu} /> :
            null
          }
          <Route exact path='/transactions' render={() => <Transactions transactions={this.state.transactions} removeTransaction={this.removeTransaction} />} />
          <Route exact path='/operations' render={() => <Operations transactions={this.state.transactions} addTransaction={this.addTransaction} balance={this.state.balance} />} />
          <Route exact path='/breakdown' render={() => <Breakdown transactions={this.state.transactions} removeTransaction={this.removeTransaction} />} />
        </div>
      </Router>
    );
  }
}

export default App;
