import React, { Component } from 'react';
import Transaction from './Transaction';

class Breakdown extends Component {
    constructor() {
        super()
        this.state = {
            summary: {},
            breakdown: {}
        }
    }

    componentDidMount = () => {
        const { transactions } = this.props
        transactions.sort(function (a, b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        const breakdownObj = {}
        const sumObj = {}
        transactions.forEach(t => {
            if (breakdownObj[t.category]) {
                breakdownObj[t.category].push(t)
                sumObj[t.category].amount += t.amount
            } else {
                breakdownObj[t.category] = [t]
                sumObj[t.category] = { amount: t.amount, show: false }
            }
        });
        this.setState({
            summary: sumObj,
            breakdown: breakdownObj
        })
    }

    showTransactions = (key) => {
        let newSummary = { ...this.state.summary }
        newSummary[key].show = !newSummary[key].show
        this.setState({ summary: newSummary })
    }

    render() {
        return (
            <div>
                {Object.keys(this.state.summary).map(key =>
                    <span key={key}>
                        <div id='summary'
                            className="card-panel indigo lighten-5 row"
                            onMouseOver={() => this.showTransactions(key)}
                            onMouseOut={() => this.showTransactions(key)}>
                            {this.state.breakdown[key][0].category}: {this.state.summary[key].amount}₪
                        </div>
                        <div className="mini-trans">
                            {this.state.summary[key].show ?
                                this.state.breakdown[key]
                                    .map(t => <Transaction key={t._id} transInfo={t} />) :
                                null}
                        </div>
                    </span>
                )}
            </div>
        );
    }
}

export default Breakdown;