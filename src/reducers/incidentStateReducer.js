import { combineReducers } from 'redux'

import * as incidentStateActions from 'actions/incidentStateActions'
import buildFetching from 'reducers/reducerHelpers/fetching'
import buildError from 'reducers/reducerHelpers/error'

export const stateMapReducer = (state = {}, action) => {
  switch (action.type) {
    case incidentStateActions.SUCCEED_GET_INCIDENT_STATE:
      return {
        ...state,
        [action.incidentId]: action.state
      }
    default:
      return state
  }
}

const actionSet = {
  try: incidentStateActions.TRY_GET_INCIDENT_STATE,
  succeed: incidentStateActions.SUCCEED_GET_INCIDENT_STATE,
  fail: incidentStateActions.FAIL_GET_INCIDENT_STATE
}

export const fetching = buildFetching(
  actionSet,
  [],
  (action) => action.incidentId
)

export const error = buildError(
  actionSet,
  [],
  (action) => action.incidentId
)

export default combineReducers({
  map: stateMapReducer,
  fetching,
  error
})
