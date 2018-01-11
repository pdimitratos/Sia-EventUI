

export const emptyNode = ({
    array: []
})


export const bsrNode = (actionDefinitions = defaultActionDefinitions, compare) =>
(state = emptyNode, action) => {
    switch(action.type){
        case actionDefinitions.insertSingle:
            return insertSingle(actionDefinitions, compare, state, action)
        default:
            return state
    }
}