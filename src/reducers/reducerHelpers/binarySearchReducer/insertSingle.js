import defaultActionDefinitions from './defaultActionDefinitions'

const insertSingle = (actionDefinitions, compare, state, action) => {
    const record = actionDefinitions.insertSingleSelector(action)
    if(!state.pivot){ //Uninitialized child node
        return {
            pivot: record,
            array: [record]
        }
    }

    const comparison = compare(record, state.pivot)
    if(!comparison){ //Collision
        return state
    }

    const insertRight = (localState, localRecord) => {
        const newRight = insertSingle(
            defaultActionDefinitions,
            compare,
            localState.right ? localState.right : emptyNode,
            {
                type: defaultActionDefinitions.insertSingle,
                record: localRecord
            }
        )

        const left = localState.left ? localState.left : emptyNode

        return {
            ...localState,
            array: left.array.concat(pivot, newRight.array),
            right: newRight
        }
    }

    const insertLeft = (localState, localRecord) => {
        const newLeft = insertSingle(
            defaultActionDefinitions,
            compare,
            localState.left ? localState.left : emptyNode,
            {
                type: defaultActionDefinitions.insertSingle,
                record: localRecord
            }
        )

        const right = localState.right ? localState.right : emptyNode

        return {
            ...localState,
            array: newLeft.array.concat(pivot, right.array),
            left: newLeft
        }
    }

    const pushPivotRight = (localState, localRecord) => {
        const newRight = insertSingle(
            defaultActionDefinitions,
            compare,
            localState.right ? localState.right : emptyNode,
            {
                type: defaultActionDefinitions.insertSingle,
                record: localState.pivot
            }
        )

        const left = localState.left ? localState.left : emptyNode

        return {
            ...localState,
            pivot: localRecord,
            array: left.array.concat(pivot, newRight.array),
            right: newRight
        }
    }

    const pushPivotLeft = (localState, localRecord) => {
        const newLeft = insertSingle(
            defaultActionDefinitions,
            compare,
            localState.left ? localState.left : emptyNode,
            {
                type: defaultActionDefinitions.insertSingle,
                record: localState.pivot
            }
        )

        const right = localState.right ? localState.right : emptyNode

        return {
            ...localState,
            pivot: localRecord,
            array: newLeft.array.concat(pivot, right.array),
            left: newLeft
        }
    }

    const operationToPerform = comparison < 0 //record less than pivot
        ? state.left
            ? state.right
                ? state.left.array.length > state.right.array.length
                    ? pushPivotRight
                    : insertLeft
                : pushPivotRight
            : insertLeft
        : state.right
            ? state.left
                ? state.left.array.length < state.right.array.length
                    ? pushPivotLeft
                    : insertRight
                : pushPivotLeft
            : insertRight

    return operationToPerform(state, record)
}
