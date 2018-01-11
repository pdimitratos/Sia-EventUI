export const defaultActionDefinitions = ({
    insertSingle: INSERT_SINGLE,
    insertSingleSelector: action => action.record,
    insertMultiple: INSERT_MULTIPLE,
    insertMultipleSelector: action => action.records
})

export default defaultActionDefinitions
