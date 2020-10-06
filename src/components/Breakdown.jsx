import React, { Component } from 'react';

class Breakdown extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }
    getBreakdown = () => {
        const { transactions } = this.props
        const breakdownObj = {}
        const sumObj = {}
        transactions.forEach(t => {
            if (breakdownObj[t.category]) {
                breakdownObj[t.category].push(t)
                sumObj[t.category] += t.amount
            } else {
                breakdownObj[t.category] = [t]
                sumObj[t.category] = t.amount
            }
        });
        return { breakdownObj, sumObj }
    }

    getTransactions = (breakdownObj, key) => {
        return breakdownObj[key].map(t => <div className={`card-panel ${t.amount > 0 ? 'teal' : 'red'} lighten-2 row`}>vendor: {t.vendor} amount: ${t.amount}</div>)
    }

    showTransactions= () =>{
        this.setState({show: !this.state.show})
    }

    render() {
        const { breakdownObj, sumObj } = this.getBreakdown()
        let count = 0
        return (
            <div>
                {Object.keys(sumObj).map(key =>
                    <><div className="card-panel indigo lighten-5 row" onClick={this.showTransactions}>
                        {key}: ${sumObj[key]}
                    </div>
                        {this.state.show ? this.getTransactions(breakdownObj, key): null}
                    </>)}
            </div>
        );
    }
}


export default Breakdown;