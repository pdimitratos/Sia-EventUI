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

export const recursiveStateDisplay = (stateSlice, indentationFactor = 0, key = 0) =>
  typeof stateSlice === 'object'
  ? Array.isArray(stateSlice)
    ? recursiveStateDisplayForArray(stateSlice, indentationFactor + 1)
    : recursiveStateDisplayForObject(stateSlice, indentationFactor + 1)
  : <div style={{'text-indent': indentationFactor * 5}} key={key}>{stateSlice}</div>

export const recursiveStateDisplayForArray = (stateSlice, indentationFactor = 0, key = 0) => {
  let localKey = 0
  return <div style={{'text-indent': indentationFactor * 5}} key={key}>
    {stateSlice.map(child => recursiveStateDisplay(child, indentationFactor + 1, localKey++))}
  </div>
}

export const recursiveStateDisplayForObject = (stateSlice, indentationFactor = 0, key = 0) => {
  let localKey = 0
  return <div style={{'text-indent': indentationFactor * 5}} key={key}>
    {stateSlice.branches && Object.keys(stateSlice.branches).length
      ? recursiveStateDisplay(stateSlice.branches, indentationFactor + 1, localKey++)
      : stateSlice.leaves
        ? recursiveStateDisplayForArray(stateSlice.leaves, indentationFactor + 1, localKey++)
        : Object.entries(stateSlice)
          .map(slice => slice[1]
              ? <div style={{'text-indent': (indentationFactor + 1) * 5}} key={localKey++}>
                {slice[0]}:{recursiveStateDisplay(slice[1], indentationFactor + 2)}
              </div>
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
