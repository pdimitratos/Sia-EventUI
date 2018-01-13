import defaultActionDefinitions from './defaultActionDefinitions'
import insertSingle from './insertSingle'
import insertMultiple from './insertMultiple'

export const emptyNode = ({
    array: []
})


export const bsrNode = (actionDefinitions = defaultActionDefinitions, compare) =>
(state = emptyNode, action) => {
    switch (action.type){
        case actionDefinitions.insertSingle:
            return insertSingle(
                compare,
                state,
                actionDefinitions.insertSingleSelector(action)
            )
        case actionDefinitions.insertMultiple:
            return insertMultiple(
                compare,
                state,
                actionDefinitions.insertMultipleSelector(action),
                action.recordsKnownSorted
            )
        default:
            return state
    }
}