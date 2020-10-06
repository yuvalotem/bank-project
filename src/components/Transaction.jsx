import React, {Component} from 'react';

class Transaction extends Component {

    removeTransaction = () =>{
        this.props.removeTransaction(this.props.transInfo._id)
    }

  render() {
      const {transInfo} = this.props
      const color = transInfo.amount > 0 ? 'teal' : 'red'
    return (
      <div className={`card-panel ${color} lighten-2 row`}>
        <span className="col s4">amount: {transInfo.amount} </span>
        <span className="col s4">vendor: {transInfo.vendor} </span>
        <span className="col s3">category: {transInfo.category} </span>
        <i className="fas fa-trash col s1" onClick={this.removeTransaction}></i>
      </div>
    );
  }
}


export default Transaction;