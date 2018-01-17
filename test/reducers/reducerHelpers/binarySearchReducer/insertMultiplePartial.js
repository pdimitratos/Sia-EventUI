'use strict'
import { expect } from 'chai'
import insertMultiple from '../../../../src/reducers/reducerHelpers/binarySearchReducer/insertMultiple'
import defaultActionDefinitions from '../../../../src/reducers/reducerHelpers/binarySearchReducer/defaultActionDefinitions'
import { emptyNode } from '../../../../src/reducers/reducerHelpers/binarySearchReducer/node'

export default () => describe('insert multiple', function () {
    const naiveCompare = (record, pivot) => record - pivot
    const buildAction = (records) => ({
        type: defaultActionDefinitions.insertSingle,
        records
    })

    describe('the returned node', function () {
        describe('When state is an empty node or has no state.pivot', function () {
            const inputRecords = [1, 2, 3]
            const state = emptyNode
            const action = buildAction(inputRecords)
            const result = insertMultiple()
        })
    })
})