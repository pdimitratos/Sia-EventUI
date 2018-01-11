import defaultActionDefinitions from './defaultActionDefinitions'
import { emptyNode } from './node'

export const insertSingle = (actionDefinitions, compare, state, action) => {
    const record = actionDefinitions.insertSingleSelector(action)

    if(!state || !state.pivot){ //Uninitialized child node
        return {
            pivot: record,
            array: [record]
        }
    }

    const comparison = compare(record, state.pivot)
    if(!comparison){ //Collision
        return state
    }

    const insertRight = insertRightBuilder(compare)
    const insertLeft = insertLeftBuilder(compare)
    const pushPivotLeft = pushPivotLeftBuilder(compare)
    const pushPivotRight = pushPivotRightBuilder(compare)

    const operationToPerform = comparison < 0
        //record less than pivot
        ? state.left
            ? state.right
                ? state.left.array.length > state.right.array.length
                    //Will inserting left unbalance the tree?
                    ? pushPivotRight
                    : insertLeft
                : pushPivotRight
            : insertLeft
        : state.right
            ? state.left
                ? state.left.array.length < state.right.array.length
                    //Will inserting right unbalance the tree?
                    ? pushPivotLeft
                    : insertRight
                : pushPivotLeft
            : insertRight

    return operationToPerform(state, record)
}

const insertRightBuilder = (compare) => (localState, localRecord) => {
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
        array: left.array.concat(localState.pivot, newRight.array),
        right: newRight
    }
}

const insertLeftBuilder = (compare) => (localState, localRecord) => {
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
        array: newLeft.array.concat(localState.pivot, right.array),
        left: newLeft
    }
}

const pushPivotRightBuilder = (compare) => (localState, localRecord) => {
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
        array: left.array.concat(localRecord, newRight.array),
        right: newRight
    }
}

const pushPivotLeftBuilder = (compare) => (localState, localRecord) => {
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
        array: newLeft.array.concat(localRecord, right.array),
        left: newLeft
    }
}

export default insertSingle