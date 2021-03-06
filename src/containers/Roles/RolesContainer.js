import React, { Component } from 'react'
import { Roles } from '../../components'

import * as roleActionCreators from '../../redux/modules/roles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleRoles } from '../../utils'
import * as navBarActionCreators from '../../redux/modules/navBar'

class RolesContainer extends Component {

  async componentDidMount () {
    if (this.props.noRoles || staleRoles(this.props.lastUpdated)) {
      await this.props.fetchAndHandleMultipleRoles()
    } else {
      const rolesInArray = []
      this.props.roles.map((role) => rolesInArray.push(role.toJS()))
      this.props.loadingMultipleRolesSuccess(rolesInArray)
    }
    this.props.setNavBarTitle('Permissões')
  }

  handleRowClick (selectedRow) {
    const id = this.props.roles.valueSeq().toArray()[selectedRow].get('id')
    this.props.history.push(`/roles/${id}/edit`)
  }

  redirectTo (path) {
    this.props.history.push(path)
  }

  handleDestroyRole (id) {
    this.props.handleDestroyRole(id)
  }

  render () {
    return (
      <Roles
        isLoading={this.props.isLoading}
        roles={this.props.roles}
        redirectTo={(path) => this.redirectTo(path)}
        onRowClick={(selectedRow) => this.handleRowClick(selectedRow)}
        onDestroyRole={(id) => this.handleDestroyRole(id)} />
    )
  }
}

function mapStateToProps ({roles, user}) {
  roles = roles.delete('status')
  const noRoles = (roles.size === 0)
  return {
    noRoles,
    roles,
    currentCompanyName: user.get('currentCompanyName'),
    isLoading: roles.getIn(['status', 'isLoading']),
    lastUpdated: roles.getIn(['status', 'lastUpdated']),
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...roleActionCreators,
                             ...navBarActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RolesContainer)
