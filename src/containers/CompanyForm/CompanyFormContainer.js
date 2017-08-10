import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initialize } from 'redux-form'
import { CompanyForm } from '../../components'
import * as companiesActionCreators from '../../redux/modules/companies'
import * as navBarActionCreators from '../../redux/modules/navBar'

class CompanyFormContainer extends Component {

  async componentDidMount () {
    this.props.setNavBarTitle('Nova Empresa')
    if (this.props.id) {
      await this.props.fetchAndHandleCompany(this.props.id)
      if (this.props.company) {
        this.props.initialize('CompanyForm', {company: this.props.company})
      }
    }
  }

  handleSubmitCompany (company) {
    this.props.id
      ? this.props.handleUpdateCompany(this.props.id, company)
      : this.props.handleCreateCompany(company)
  }

  render () {
    return (
      <CompanyForm isCompany={true} resourceName='company'
          onSubmit={(company) => this.handleSubmitCompany(company)} />
    )
  }
}

function mapStateToProps ({user, companies}, {match}) {
  const { id } = match.params
  if (id) {
    return {
      id,
      company: companies.get(id),
    }
  }
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...navBarActionCreators,
    ...companiesActionCreators,
    ...{initialize},
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFormContainer)