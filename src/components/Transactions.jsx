import { MenuItem, Select } from '@material-ui/core';
import React, { Component } from 'react';
import Transaction from './Transaction';
import moment from 'moment';

class Transactions extends Component {
  constructor(){
    super()
    this.state ={
      selectedMonth: 'selected'
    }
  }

  changeMonth = (event) => {
    const value  = event.target.getAttribute('data-value')
    this.setState({ selectedMonth: value })
  }

  getOptions = () =>{
    const optionsArray = []
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    for(let year = 2018; year<= 2020; year++){
      for(let month of months){
        optionsArray.unshift(<MenuItem 
                                        key={month +'/'+ year} 
                                        value={month +'/'+ year} 
                                        onClick={this.changeMonth}>{month +'/'+ year}</MenuItem>)
      }
    }
    return optionsArray
  }
  render() {
    const sorted = [...this.props.transactions]
    sorted.sort(function (a, b) {
      return new Date (a.date).getTime() - new Date (b.date).getTime();
    });
  
    return (
      <div className="transactions">

        <Select labelId="label" id="select" value={this.state.selectedMonth}>
        <MenuItem value='selected' onClick={this.changeMonth}>Show all</MenuItem>
          {this.getOptions()}
        </Select>

        {this.state.selectedMonth === 'selected'? 
        sorted.map(t => <Transaction key={t._id} transInfo={t} removeTransaction={this.props.removeTransaction} />):
        sorted.filter(t => moment(t.date).isSame(this.state.selectedMonth, 'month'))
        .map(t => <Transaction key={t._id} transInfo={t} removeTransaction={this.props.removeTransaction} />) }
      </div>
    );
  }
}

export default Transactions;
