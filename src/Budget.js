import React from 'react'
import { connect } from 'react-router'
import getTransactions from './utils'

class Budget extends React.Component {
  render () {
    return (
      <div>
        Budget
      </div>
            )
  }
}

export default connect()(Budget)