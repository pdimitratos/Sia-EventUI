import { isObject } from 'util'

export const AddMockDispatch = (state) => (mockDispatchRecorder) => {
    /*
        Action could be:
            an object
            a function that takes dispatch as an argument (thunk middleware action)
        If the action is a function, call it passing in dispatch.
        If the action is an object record it; a single action sets the .action property,
            a second action turns .action into an array.
            Subsequent actions are added to the array.
    */
  const dispatch = (action) => isObject(action)
    ? mockDispatchRecorder.action
        ? Array.isArray(mockDispatchRecorder.action)
            ? mockDispatchRecorder.action.push(action)
            : mockDispatchRecorder.action = [mockDispatchRecorder.action, action]
        : mockDispatchRecorder.action = action
    : action(dispatch)
  return {
    ...state,
    dispatch
  }
}

export default AddMockDispatch
