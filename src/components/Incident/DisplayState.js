import React from 'react'
import { connect } from 'react-redux'

import ErrorMessage from 'components/elements/ErrorMessage'
import LoadingMessage from 'components/elements/LoadingMessage'
import * as incidentStateActions from 'actions/incidentStateActions'

export const DisplayStateComponent = ({
  incidentId,
  state,
  stateIsFetching,
  stateIsError
}) => {
  return stateIsFetching
  ? <LoadingMessage
    message='Fetching Incident State'
    actionForRetry={incidentStateActions.getIncidentState(incidentId)}
  />
  : stateIsError
    ? <ErrorMessage
      message={`Error fetching state for incident: ${incidentId}`}
    />
    : <div>
      {recursiveStateDisplay(state)}
    </div>
}

export const recursiveStateDisplay = (stateSlice, key = 0) =>
  typeof stateSlice === 'object'
  ? Array.isArray(stateSlice)
    ? recursiveStateDisplayForArray(stateSlice)
    : recursiveStateDisplayForObject(stateSlice)
  : <div key={key}>{stateSlice}</div>

export const recursiveStateDisplayForArray = (stateSlice, key = 0) => {
  let localKey = 0
  return <div key={key}>
    {stateSlice.map(child => recursiveStateDisplay(child, localKey++))}
  </div>
}

export const recursiveStateDisplayForObject = (stateSlice, key = 0) => {
  let localKey = 0
  return <div key={key}>
    {stateSlice.children && Object.keys(stateSlice.children).length
      ? recursiveStateDisplay(stateSlice.children, localKey++)
      : stateSlice.values
        ? recursiveStateDisplayForArray(stateSlice.values, localKey++)
        : Object.entries(stateSlice)
        .map(slice => slice[1]
            ? <div key={localKey++}>{slice[0]}:{recursiveStateDisplay(slice[1])}</div>
            : null)
    }
  </div>
}

export const mapStateToDisplayIncidentStateProps = (state, ownProps) => ({
  incidentId: ownProps.incidentId,
  state: state.incidents.state.map[ownProps.incidentId],
  stateIsFetching: state.incidents.state.fetching.includes(ownProps.incidentId),
  stateIsError: state.incidents.state.error.includes(ownProps.incidentId)
})

export default connect(mapStateToDisplayIncidentStateProps)(DisplayStateComponent)
