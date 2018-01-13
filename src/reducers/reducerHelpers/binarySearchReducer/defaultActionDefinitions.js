export const defaultActionDefinitions = ({
    insertSingle: 'INSERT_SINGLE',
    insertSingleSelector: action => action.record,
    insertMultiple: 'INSERT_MULTIPLE',
    insertMultipleSelector: action => action.records,
    removeMultiple: 'REMOVE_MULTIPLE'
})

export default defaultActionDefinitions
