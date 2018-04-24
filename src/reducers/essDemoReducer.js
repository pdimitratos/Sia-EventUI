import * as demoActions from 'actions/essDemoActions'

export const demoIndexReducer = (state = 0, action) => {
  switch (action.type) {
    case demoActions.DEMO_NEXT_EVENT:
      return state + 1
    default:
      return state
  }
}

export default demoIndexReducer
