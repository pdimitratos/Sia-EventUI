import defaultActionDefinitions from './defaultActionDefinitions'
import insertSingle from './insertSingle'
import initializeTree from './initializeTree'
import { emptyNode } from './node'


export const insertMultiple = (compare, state, records, isKnownSorted = false) => {
    if (!records || !Array.isArray(records) || records.length === 0)
    {
        return state
    }

    if (records.length === 1)
    {
        return insertSingle(
            compare,
            state,
            records[0]
        )
    }

    const sortedRecords = isKnownSorted ? records : [...records].sort(compare)

    if(!state || !state.pivot){ //Uninitialized child node
        return initializeTree(compare, sortedRecords)
    }

    const oldLeft = state.left ? state.left : emptyNode
    const oldRight = state.right ? state.right : emptyNode

    const relativeIndexOfOldPivotInRecords = findIndexNotPast(compare, sortedRecords, state.pivot)

    const preBalanceLeftCount = oldLeft.array.length + relativeIndexOfOldPivotInRecords
    const preBalanceRightCount = oldRight.array.length + sortedRecords.length - relativeIndexOfOldPivotInRecords
    const countOfRightElementsToBalanceLeft = Math.floor((preBalanceRightCount - preBalanceLeftCount) / 2)


    if (countOfRightElementsToBalanceLeft === 0) { //tree requires no balancing
        const newLeft = insertMultiple(
            compare,
            oldLeft,
            toAddBeforePivot,
            true
        )

        const newRight = insertMultiple(
            compare,
            oldRight,
            toAddAfterPivot,
            true
        )

        return {
            ...state,
            array: newLeft.array.concat(state.pivot, newRight.array),
            left: newLeft,
            right: newRight
        }
    }
    if (countOfRightElementsToBalanceLeft > 0) {
        const newPivot = oldRight.array[countOfRightElementsToBalanceLeft - 1]
        const relativeIndexOfNewPivotInRecords = findIndexNotPast(compare, sortedRecords, newPivot)

        const toAddBeforePivot = sortedRecords.slice(0, relativeIndexOfNewPivotInRecords)
        const toAddAfterPivot = sortedRecords.slice(relativeIndexOfNewPivotInRecords, sortedRecords.length)

        const preBalancedLeft = insertMultiple(
            compare,
            oldLeft,
            [state.pivot].concat(oldRight.array.slice(0, countOfRightElementsToBalanceLeft - 1)),
            true
        )

        const truncatedRight = initializeTree(
            compare,
            oldRight.array.slice(countOfRightElementsToBalanceLeft, oldRight.array.length)
        )

        const newLeft = insertMultiple(
            compare,
            preBalancedLeft,
            toAddBeforePivot,
            true
        )

        const newRight = insertMultiple(
            compare,
            truncatedRight,
            toAddAfterPivot,
            true
        )

        return {
            pivot: newPivot,
            array: newLeft.array.concat(newPivot, newRight.array),
            left: newLeft,
            right: newRight
        }
    } else {
        const countOfLeftElementsToBalanceRight = -countOfRightElementsToBalanceLeft

        const newPivot = oldLeft.array[oldLeft.array.length - countOfLeftElementsToBalanceRight]
        const relativeIndexOfNewPivotInRecords = findIndexNotPast(compare, sortedRecords, newPivot)

        const toAddBeforePivot = sortedRecords.slice(0, relativeIndexOfNewPivotInRecords)
        const toAddAfterPivot = sortedRecords.slice(relativeIndexOfNewPivotInRecords, sortedRecords.length)

        const truncatedLeft = initializeTree(
            compare,
            oldLeft.array.slice(0, oldLeft.array.length - countOfLeftElementsToBalanceRight)
        )

        const preBalancedRight = insertMultiple(
            compare,
            oldLeft,
            [state.pivot].concat(oldRight.array.slice(0, countOfRightElementsToBalanceLeft - 1)),
            true
        )

        const newLeft = insertMultiple(
            compare,
            truncatedLeft,
            toAddBeforePivot,
            true
        )

        const newRight = insertMultiple(
            compare,
            preBalancedRight,
            toAddAfterPivot,
            true
        )

        return {
            pivot: newPivot,
            array: newLeft.array.concat(newPivot, newRight.array),
            left: newLeft,
            right: newRight
        }
    }
}


const findIndexNotPast = (compare, sortedRecords, toFind) => {
    let min = 0
    let max = sortedRecords.length
    let testIndex = 0

    while (max > min) {
        testIndex = Math.floor((min + max) / 2)
        const comparisonResult = compare(sortedRecords[testIndex], toFind)

        if(comparisonResult === 0) {
            return testIndex
        }
        if(comparisonResult < 0) {
            max = testIndex
        } else {
            min = testIndex
        }
    }
    return testIndex
}


const insertMultiple