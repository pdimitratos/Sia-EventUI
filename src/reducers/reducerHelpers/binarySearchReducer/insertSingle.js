import defaultActionDefinitions from './defaultActionDefinitions'
import { emptyNode } from './node'

const defaultArrayCapacity = 128

export const insertSingle = (compare, state, record) => {
  if (!state) { //Uninitialized
    const newlyCreatedArray = new Array(defaultArrayCapacity)
    const recordInsertionIndex = Math.floor(defaultArrayCapacity / 2)
    newlyCreatedArray[recordInsertionIndex] = record
    return {
      firstElementIndex: recordInsertionIndex,
      lastElementIndex: recordInsertionIndex,
      array: newlyCreatedArray
    }
  }

  let floor = state.firstElementIndex
  let ceiling = state.lastElementIndex
  let currentPivot = Math.floor((floor + ceiling) / 2)

  while (floor != ceiling) {
    const comparison = compare(record, state.array[currentPivot])
    if (!comparison) { //Collision
      return state
    }

    if (comparison < 0) {
      ceiling = currentPivot
    } else { //comparison must be > 0
      floor = currentPivot
    }

    currentPivot = Math.floor((floor + ceiling) / 2)
  }

  const openSpacesAtFrontOfArray = state.firstElementIndex
  const openSpacesAtEndOfArray = state.array.length - state.lastElementIndex - 1
  const arrayHasRoom = (openSpacesAtFrontOfArray + openSpacesAtEndOfArray) > 0

  if (arayHasRoom) {
    const newArray = new Array(state.array.length)

    if (openSpacesAtEndOfArray > openSpacesAtFrontOfArray) {
      newArray.splice(state.firstElementIndex, currentPivot)
    }
  }
  const newArray = new Array(arrayHasRoom ? state.array.length : (state.array.length * 2))




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