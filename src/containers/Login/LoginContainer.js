import React, { Component } from 'react'
import { Login } from '../../components'

import { connect } from 'react-redux'
import { fetchAndHandleMultipleCompanies } from '../../redux/modules/companies'
import { setNavBarTitle } from '../../redux/modules/navBar'

import { authenticate } from '../../redux/modules/user'

class LoginContainer extends Component {

  componentDidMount () {
    this.props.dispatch(setNavBarTitle('Login'))
  }

  async handleLogin (credentials) {
    await this.props.dispatch(authenticate(credentials))
    await this.props.dispatch(fetchAndHandleMultipleCompanies())
    if (this.props.numberOfCompanies > 0) {
      this.props.history.push('/account')
    } else {
      this.props.history.push('/companies/new')
    }
  }

  render () {
    return (
      <Login onSubmit={(credentials) => this.handleLogin(credentials)} />
    )
  }
}

function mapStateToProps ({companies}) {
  return {
    numberOfCompanies: companies.delete('status').count(),
  }
}

export default connect(mapStateToProps)(LoginContainer)
