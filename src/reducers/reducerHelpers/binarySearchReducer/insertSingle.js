import defaultActionDefinitions from './defaultActionDefinitions'
import { emptyNode } from './node'

export const insertSingle = (compare, state, record) => {
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

    return operationToPerform(compare)(state, record)
}

const insertRight = (compare) => (localState, localRecord) => {
    const newRight = insertSingle(
        compare,
        localState.right ? localState.right : emptyNode,
        localRecord
    )

    const left = localState.left ? localState.left : emptyNode

    return {
        ...localState,
        array: left.array.concat(localState.pivot, newRight.array),
        right: newRight
    }
}

const insertLeft = (compare) => (localState, localRecord) => {
    const newLeft = insertSingle(
        compare,
        localState.left ? localState.left : emptyNode,
        localRecord
    )

    const right = localState.right ? localState.right : emptyNode

    return {
        ...localState,
        array: newLeft.array.concat(localState.pivot, right.array),
        left: newLeft
    }
}

const pushPivotRight = (compare) => (localState, localRecord) => {
    const newRight = insertSingle(
        compare,
        localState.right ? localState.right : emptyNode,
        localState.pivot
    )

    const left = localState.left ? localState.left : emptyNode

    return {
        ...localState,
        pivot: localRecord,
        array: left.array.concat(localRecord, newRight.array),
        right: newRight
    }
}

const pushPivotLeft = (compare) => (localState, localRecord) => {
    const newLeft = insertSingle(
        compare,
        localState.left ? localState.left : emptyNode,
        localState.pivot
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