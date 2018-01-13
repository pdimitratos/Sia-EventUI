
export const initializeTree = (compare, sortedRecords) => {
    const pivotIndex = sortedRecords.length / 2
    const leftInsert = sortedRecords.slice(0, pivotIndex)
    const rightInsert = sortedRecords.slice(pivotIndex + 1, sortedRecords.length)

    const pivot = sortedRecords[pivotIndex]
    const array = leftInsert.concat(pivot, rightInsert)
    const left = initializeTree(
        compare,
        leftInsert
    )
    const right = initializeTree(
        compare,
        rightInsert
    )

    return {
        pivot,
        left,
        right,
        array
    }
}

export default initializeTree