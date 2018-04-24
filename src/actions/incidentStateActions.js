
import { reduxBackedPromise } from 'actions/actionHelpers'

export const UPDATE_INCIDENT_STATE = 'UPDATE_INCIDENT_STATE'
export const TRY_GET_INCIDENT_STATE = 'TRY_GET_INCIDENT_STATE'
export const SUCCEED_GET_INCIDENT_STATE = 'SUCCEED_GET_INCIDENT_STATE'
export const FAIL_GET_INCIDENT_STATE = 'FAIL_GET_INCIDENT_STATE'

export const updateIncidentState = (incidentId, newState) => ({
  type: UPDATE_INCIDENT_STATE,
  newState,
  incidentId
})

export const getIncidentState = incidentId => reduxBackedPromise(
  ['incidents/' + incidentId + '/state'],
  getIncidentStateActionSet(incidentId)
)

export const getIncidentStateActionSet = incidentId => ({
  try: () => ({
    type: TRY_GET_INCIDENT_STATE,
    incidentId
  }),

  succeed: (state) => ({
    type: SUCCEED_GET_INCIDENT_STATE,
    incidentId,
    state
  }),

  fail: (reason) => ({
    type: FAIL_GET_INCIDENT_STATE,
    incidentId,
    reason
  })
})
