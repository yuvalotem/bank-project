import Axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import './App.css';
import Breakdown from './components/Breakdown';
import Menu from './components/Menu';
import Operations from './components/Operations';
import Transactions from './components/Transactions';

class App extends Component {
  constructor() {
    super()
    this.state = {
      transactions: []
    }
  }

  // changeMenuStatus = () => {
  //   this.setState({ showMenu: !this.state.showMenu })
  // }

  async getTransactionsFromDB (){
    return Axios.get('http://localhost:4000/transactions')
  }

  async saveTransactionToDB (transaction){
    return Axios.post('http://localhost:4000/transaction', transaction)
  }

  async deleteTransactionFromDB (id){
    return Axios.delete('http://localhost:4000/transaction/' + id)
  }

  async componentDidMount(){
    const response = await this.getTransactionsFromDB()
    this.setState({transactions: response.data})
  }

  addTransaction = async (transaction) =>{
    const newTransactions = [...this.state.transactions]
    const savedTransaction = await this.saveTransactionToDB(transaction)
    newTransactions.push(savedTransaction.data)
    this.setState({transactions: newTransactions})
  }

  removeTransaction = async (id) =>{
    const newTransactions = [...this.state.transactions.filter(t => t._id !== id)]
    this.deleteTransactionFromDB(id)
    this.setState({transactions: newTransactions})
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Menu />
          <Route exact path='/transactions' render={() => <Transactions transactions={this.state.transactions} removeTransaction={this.removeTransaction} />} />
          <Route exact path='/operations' render={() => <Operations transactions={this.state.transactions} addTransaction={this.addTransaction} />} />
          <Route exact path='/breakdown' render={() => <Breakdown transactions={this.state.transactions} />} />
        </div>
      </Router>
    );
  }
}

//render={({location})=> <Transactions location={location} state={this.state}/>}
export default App;
