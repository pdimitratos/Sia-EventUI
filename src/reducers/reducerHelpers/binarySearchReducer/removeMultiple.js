import defaultActionDefinitions from './defaultActionDefinitions'
import { emptyNode } from './node';

export const removeMultiple = (state, numToRemove, numToSkip = 0) => {
    if (numToRemove <= 0) {
        return state
    }
    if (!state || !state.pivot) { //Uninitialized child node
        return emptyNode
    }
    const oldLeft = state.left ? state.left : emptyNode
    const oldRight = state.right ? state.right : emptyNode

    const preRemovalRecordCount = state.array.length
    const postRemovalRecordCount = preRemovalRecordCount - numToRemove
}