import React from 'react'
import { connect } from 'react-redux'
import { fetchGlobalActions } from 'actions/globalActionActions'
import LoadingMessage from 'components/elements/LoadingMessage'

export class BootstrapGlobalActions extends React.Component {
  componentDidMount () {
    this.props.dispatch(fetchGlobalActions())
  }

  render () {
    return LoadingMessage('Loading incident actions', fetchGlobalActions())
  }
}

export default connect()(BootstrapGlobalActions)
