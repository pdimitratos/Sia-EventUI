'use strict'
import { expect } from 'chai'
import insertSingle from '../../../../src/reducers/reducerHelpers/binarySearchReducer/insertSingle'
import defaultActionDefinitions from '../../../../src/reducers/reducerHelpers/binarySearchReducer/defaultActionDefinitions'
import { emptyNode } from '../../../../src/reducers/reducerHelpers/binarySearchReducer/node'

export default () => describe('insert single', function () {
    const naiveCompare = (record, pivot) => record - pivot
    const buildAction = (record) => ({
        type: defaultActionDefinitions.insertSingle,
        record
    })

    describe('the returned node', function () {
        describe('When state is an empty node or has no state.pivot', function () {
            const expectedRecord = 1
            const state = emptyNode
            const action = buildAction(expectedRecord)
            const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)
            it('Should have pivot set to the record', function () {
                expect(result.pivot).to.equal(expectedRecord)
            })
            it('Should have array containing the record', function () {
                expect(result.array[0]).to.equal(expectedRecord)
            })
            it('Should have no other records in array', function () {
                expect(result.array.length).to.equal(1)
            })
        })

        describe('When the incoming record is greater than state.pivot', function () {
            const pivot = 5
            const record = 7
            const action = buildAction(record)

            describe('When state is a node with a pivot and no left or right nodes', function () {
                const state = {
                    pivot,
                    array: [pivot]
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)

                it('Should not change the pivot value', function () {
                    expect(result.pivot).to.equal(pivot)
                })
                describe('right child', function () {
                    it('Should have pivot set to the record', function () {
                        expect(result.right.pivot).to.equal(record)
                    })
                    it('Should have array containing the record', function () {
                        expect(result.right.array[0]).to.equal(record)
                    })
                    it('Should have no other records in array', function () {
                        expect(result.right.array.length).to.equal(1)
                    })
                })
                describe('array', function () {
                    it('Should contain the pivot as the first element', function () {
                        expect(result.array[0]).to.equal(pivot)
                    })
                    it('Should contain the incoming record as the second element', function () {
                        expect(result.array[1]).to.equal(record)
                    })
                    it('Should contain no other elements', function () {
                        expect(result.array.length).to.equal(2)
                    })
                })
            })

            describe('When state is a node with a pivot and balanced left and right children', function () {
                const state = {
                    pivot,
                    array: [2, pivot, 9],
                    left: {
                        pivot: 2,
                        array: [2]
                    },
                    right: {
                        pivot: 9,
                        array: [9]
                    }
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)

                it('Should not change the pivot value', function () {
                    expect(result.pivot).to.equal(pivot)
                })
                describe('right child', function () {
                    it('Should have array containing the record', function () {
                        expect(result.right.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should add only one record to the array', function () {
                        expect(result.right.array.length).to.equal(state.right.array.length + 1)
                    })
                })
                describe('left child', function () {
                    it('Should be entirely unmodified', function () {
                        expect(result.left).to.equal(state.left)
                    })
                })
                describe('array', function () {
                    it('Should have the same elements for elements less than the incoming record', function () {
                        [0, 1].map(index => expect(result.array[index]).to.equal(state.array[index]))
                    })
                    it('Should contain the incoming record', function () {
                        expect(result.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should contain one element more than state.array', function () {
                        expect(result.array.length).to.equal(state.array.length + 1)
                    })
                    it('Should remain sorted', function () {
                        for (let i = 0; i < (result.array.length - 1); i++) {
                            expect(naiveCompare(result.array[i], result.array[i + 1])).to.be.lessThan(0)
                        }
                    })
                })
            })

            describe('When state is a node with a pivot and a left child with a larger array than its right child', function () {
                const state = {
                    pivot,
                    array: [2, 3, pivot, 9],
                    left: {
                        pivot: 3,
                        array: [2, 3],
                        left: {
                            pivot: 2,
                            array: [2]
                        }
                    },
                    right: {
                        pivot: 9,
                        array: [9]
                    }
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)
                it('Should not change the pivot value', function () {
                    expect(result.pivot).to.equal(pivot)
                })
                describe('right child', function () {
                    it('Should have array containing the record', function () {
                        expect(result.right.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should add only one record to the array', function () {
                        expect(result.right.array.length).to.equal(state.right.array.length + 1)
                    })
                })
                describe('left child', function () {
                    it('Should be entirely unmodified', function () {
                        expect(result.left).to.equal(state.left)
                    })
                })
                describe('array', function () {
                    it('Should have the same elements for elements less than the incoming record', function () {
                        [0, 1, 2].map(index => expect(result.array[index]).to.equal(state.array[index]))
                    })
                    it('Should contain the incoming record', function () {
                        expect(result.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should contain one element more than state.array', function () {
                        expect(result.array.length).to.equal(state.array.length + 1)
                    })
                    it('Should remain sorted', function () {
                        for (let i = 0; i < (result.array.length - 1); i++) {
                            expect(naiveCompare(result.array[i], result.array[i + 1])).to.be.lessThan(0)
                        }
                    })
                })
            })

            describe('When state is a node with a pivot and a right child with a larger array than its left child', function () {
                const state = {
                    pivot,
                    array: [2, pivot, 8, 9],
                    left: {
                        pivot: 2,
                        array: [2]
                    },
                    right: {
                        pivot: 9,
                        array: [8, 9],
                        left: {
                            pivot: 8,
                            array: [8]
                        }
                    }
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)
                it('Should use the record as the new pivot value', function () {
                    expect(result.pivot).to.equal(record)
                })
                describe('right child', function () {
                    it('Should be entirely unmodified', function () {
                        expect(result.right).to.equal(state.right)
                    })
                })
                describe('left child', function () {
                    it('Should have array containing the original pivot', function () {
                        expect(result.left.array.find(v => v === state.pivot)).to.equal(state.pivot)
                    })
                    it('Should add only one record to the array', function () {
                        expect(result.left.array.length).to.equal(state.left.array.length + 1)
                    })
                })
                describe('array', function () {
                    it('Should have the same elements for elements less than the incoming record', function () {
                        [0, 1].map(index => expect(result.array[index]).to.equal(state.array[index]))
                    })
                    it('Should contain the incoming record', function () {
                        expect(result.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should contain one element more than state.array', function () {
                        expect(result.array.length).to.equal(state.array.length + 1)
                    })
                    it('Should remain sorted', function () {
                        for (let i = 0; i < (result.array.length - 1); i++) {
                            expect(naiveCompare(result.array[i], result.array[i + 1])).to.be.lessThan(0)
                        }
                    })
                })
            })
        })

        describe('When the incoming record is less than state.pivot', function () {
            const pivot = 7
            const record = 5
            const action = buildAction(record)

            describe('When state is a node with a pivot and no left or right nodes', function () {
                const state = {
                    pivot,
                    array: [pivot]
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)

                it('Should not change the pivot value', function () {
                    expect(result.pivot).to.equal(pivot)
                })
                describe('left child', function () {
                    it('Should have pivot set to the record', function () {
                        expect(result.left.pivot).to.equal(record)
                    })
                    it('Should have array containing the record', function () {
                        expect(result.left.array[0]).to.equal(record)
                    })
                    it('Should have no other records in array', function () {
                        expect(result.left.array.length).to.equal(1)
                    })
                })
                describe('array', function () {
                    it('Should contain the incoming record as the first element', function () {
                        expect(result.array[0]).to.equal(record)
                    })
                    it('Should contain the pivot as the second element', function () {
                        expect(result.array[1]).to.equal(pivot)
                    })
                    it('Should contain no other elements', function () {
                        expect(result.array.length).to.equal(2)
                    })
                })
            })

            describe('When state is a node with a pivot and balanced left and right children', function () {
                const state = {
                    pivot,
                    array: [2, pivot, 9],
                    left: {
                        pivot: 2,
                        array: [2]
                    },
                    right: {
                        pivot: 9,
                        array: [9]
                    }
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)

                it('Should not change the pivot value', function () {
                    expect(result.pivot).to.equal(pivot)
                })
                describe('left child', function () {
                    it('Should have array containing the record', function () {
                        expect(result.left.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should add only one record to the array', function () {
                        expect(result.left.array.length).to.equal(state.left.array.length + 1)
                    })
                })
                describe('right child', function () {
                    it('Should be entirely unmodified', function () {
                        expect(result.right).to.equal(state.right)
                    })
                })
                describe('array', function () {
                    it('Should have the same elements for elements less than the incoming record', function () {
                        [0].map(index => expect(result.array[index]).to.equal(state.array[index]))
                    })
                    it('Should contain the incoming record', function () {
                        expect(result.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should contain one element more than state.array', function () {
                        expect(result.array.length).to.equal(state.array.length + 1)
                    })
                    it('Should remain sorted', function () {
                        for (let i = 0; i < (result.array.length - 1); i++) {
                            expect(naiveCompare(result.array[i], result.array[i + 1])).to.be.lessThan(0)
                        }
                    })
                })
            })

            describe('When state is a node with a pivot and a left child with a larger array than its right child', function () {
                const state = {
                    pivot,
                    array: [2, 3, pivot, 9],
                    left: {
                        pivot: 3,
                        array: [2, 3],
                        left: {
                            pivot: 2,
                            array: [2]
                        }
                    },
                    right: {
                        pivot: 9,
                        array: [9]
                    }
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)

                it('Should use the record as the new pivot value', function () {
                    expect(result.pivot).to.equal(record)
                })
                describe('left child', function () {
                    it('Should be entirely unmodified', function () {
                        expect(result.left).to.equal(state.left)
                    })
                })
                describe('right child', function () {
                    it('Should have array containing the original pivot', function () {
                        expect(result.right.array.find(v => v === state.pivot)).to.equal(state.pivot)
                    })
                    it('Should add only one record to the array', function () {
                        expect(result.right.array.length).to.equal(state.right.array.length + 1)
                    })
                })
                describe('array', function () {
                    it('Should have the same elements for elements less than the incoming record', function () {
                        [0, 1].map(index => expect(result.array[index]).to.equal(state.array[index]))
                    })
                    it('Should contain the incoming record', function () {
                        expect(result.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should contain one element more than state.array', function () {
                        expect(result.array.length).to.equal(state.array.length + 1)
                    })
                    it('Should remain sorted', function () {
                        for (let i = 0; i < (result.array.length - 1); i++) {
                            expect(naiveCompare(result.array[i], result.array[i + 1])).to.be.lessThan(0)
                        }
                    })
                })

            })

            describe('When state is a node with a pivot and a right child with a larger array than its left child', function () {
                const state = {
                    pivot,
                    array: [2, pivot, 8, 9],
                    left: {
                        pivot: 2,
                        array: [2]
                    },
                    right: {
                        pivot: 9,
                        array: [8, 9],
                        left: {
                            pivot: 8,
                            array: [8]
                        }
                    }
                }
                const result = insertSingle(defaultActionDefinitions, naiveCompare, state, action)

                it('Should not change the pivot value', function () {
                    expect(result.pivot).to.equal(pivot)
                })
                describe('left child', function () {
                    it('Should have array containing the record', function () {
                        expect(result.left.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should add only one record to the array', function () {
                        expect(result.left.array.length).to.equal(state.left.array.length + 1)
                    })
                })
                describe('right child', function () {
                    it('Should be entirely unmodified', function () {
                        expect(result.right).to.equal(state.right)
                    })
                })
                describe('array', function () {
                    it('Should have the same elements for elements less than the incoming record', function () {
                        [0].map(index => expect(result.array[index]).to.equal(state.array[index]))
                    })
                    it('Should contain the incoming record', function () {
                        expect(result.array.find(v => v === record)).to.equal(record)
                    })
                    it('Should contain one element more than state.array', function () {
                        expect(result.array.length).to.equal(state.array.length + 1)
                    })
                    it('Should remain sorted', function () {
                        for (let i = 0; i < (result.array.length - 1); i++) {
                            expect(naiveCompare(result.array[i], result.array[i + 1])).to.be.lessThan(0)
                        }
                    })
                })
            })
        })
    })



})