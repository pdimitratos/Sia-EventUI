import React from 'react'
import { connect } from 'react-redux'

import FlatButtonStyled from 'components/elements/FlatButtonStyled'
import * as demoActions from 'actions/essDemoActions'

export const DemoHelperComponent = ({
  incidentId,
  eventIndex,
  dispatch
}) => <FlatButtonStyled
  label='Demo++'
  primary
  onTouchTap={() => dispatch(demoActions.getDemoEvent(eventIndex, incidentId))}
/>

export const mapStateToDemoHelperProps = (state, ownProps) => ({
  incidentId: ownProps.incidentId,
  eventIndex: state.demoIndex
})

export default connect(mapStateToDemoHelperProps)(DemoHelperComponent)
