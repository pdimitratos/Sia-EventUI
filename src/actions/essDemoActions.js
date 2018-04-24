import { DateTime } from 'luxon'

import * as eventActions from 'actions/eventActions'
import { reduxBackedPromise } from 'actions/actionHelpers'

export const DEMO_NEXT_EVENT = 'DEMO_NEXT_EVENT'
export const TRY_GET_NEXT_DEMO_EVENT = 'TRY_GET_NEXT_DEMO_EVENT'
export const SUCCEED_GET_NEXT_DEMO_EVENT = 'SUCCEED_GET_NEXT_DEMO_EVENT'
export const FAIL_GET_NEXT_DEMO_EVENT = 'FAIL_GET_NEXT_DEMO_EVENT'

export const demoNextEvent = () => ({
  type: DEMO_NEXT_EVENT
})

export const getDemoEvent = (eventIndex, incidentId) => reduxBackedPromise(
  ['demo/' + eventIndex],
  getDemoEventActionSet(eventIndex, incidentId)
)

export const getDemoEventActionSet = (eventIndex, incidentId) => ({
  try: () => ({
    type: TRY_GET_NEXT_DEMO_EVENT,
    eventIndex,
    incidentId
  }),

  succeed: (event) => (dispatch) => {
    dispatch(demoNextEvent())

    dispatch(eventActions.postEvent(incidentId, event.eventTypeId, event.data, DateTime.utc(), true))
  },

  fail: (reason) => ({
    type: FAIL_GET_NEXT_DEMO_EVENT,
    eventIndex,
    incidentId
  })
})
