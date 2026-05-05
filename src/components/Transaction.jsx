import moment from 'moment';
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
        <span className="col s2">amount: {transInfo.amount}₪ </span>
        <span className="col s3">vendor: {transInfo.vendor} </span>
        <span className="col s3">category: {transInfo.category} </span>
        <span className="col s3">date: {moment(transInfo.date).format('L')} </span>
        {this.props.removeTransaction ?
          <i className="fas fa-trash col s1" onClick={this.removeTransaction}></i> :
          null
        }
      </div>
    );
  }
}


export default Transaction;