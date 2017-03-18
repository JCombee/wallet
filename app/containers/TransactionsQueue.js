import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function TransactionsQueue (transactions) {
  return <table>
    <thead>
      <tr>
        <th>From</th>
        <th>To</th>
        <th>Currency</th>
        <th>Ammount</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(transaction => <tr>
        <td>{transaction.accountIban}</td>
        <td>{transaction.opposingAccountIban}</td>
        <td>{transaction.currency}</td>
        <td>{transaction.ammount}</td>
      </tr>)}
    </tbody>
  </table>;
}

const mapStateToProps = (state) => {
  const { transactions: transactionsQueue } = state
  return { transactions }
}

export default connect(mapStateToProps)(TransactionsQueue)
