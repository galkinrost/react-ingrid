/* eslint-disable no-magic-numbers */
import GridCalculator, {
    calculateHeight,
    calculateItemsPerRow,
    calculateMaxVisibleIndex,
    calculateMinVisibleIndex,
    calculateOffsetTop
} from '../src/GridCalculator'

import expect from 'expect'

describe(`react-ingrid`, () => {

    describe(`GridCalculator`, () => {

        it(`should correctly calculate items per row`, () => {
            // calculateItemsPerRow(displayWidth: number, itemWidth: number)
            expect(calculateItemsPerRow(800, 400)).toEqual(2)
            expect(calculateItemsPerRow(600, 400)).toEqual(1)
            expect(calculateItemsPerRow(300, 400)).toEqual(1)
        })

        it(`should correctly calculate minimal visible index`, () => {
            // ***
            // ***
            // calculateMinVisibleIndex(scrollTop: number, itemHeight: number, itemsPerRow: number)
            expect(calculateMinVisibleIndex(200, 100, 3)).toEqual(6)

            expect(calculateMinVisibleIndex(250, 100, 3)).toEqual(6)
        })

        it(`should correctly calculate max visible index`, () => {
            // calculateMaxVisibleIndex(displayHeight: number, itemHeight: number, itemsPerRow: number, scrollTop:number, minVisibleIndex: number)
            expect(calculateMaxVisibleIndex(400, 100, 3, 0, 0)).toEqual(14)
            expect(calculateMaxVisibleIndex(50, 100, 3, 0, 0)).toEqual(5)

        })

        it(`should correctly calculate offsetTop`, () => {
            const minVisibleIndex = 6
            const itemsPerRow = 3
            const itemHeight = 100

            expect(calculateOffsetTop(minVisibleIndex, itemsPerRow, itemHeight)).toEqual(200)
        })

        it(`should correctly calculate content height`, () => {
            const total = 31
            const itemsPerRow = 3
            const itemHeight = 100

            expect(calculateHeight(total, itemsPerRow, itemHeight)).toEqual(1100)
        })

        it(`should correctly set calculator\`s state with default initial values`, () => {
            const calculator = new GridCalculator()

            expect(calculator.height).toEqual(0)
            expect(calculator.itemsPerRow).toEqual(0)
            expect(calculator.minVisibleIndex).toEqual(0)
            expect(calculator.maxVisibleIndex).toEqual(0)
        })

        it(`should update calculator\`s state when display size changes`, () => {
            const calculator = new GridCalculator({
                itemHeight: 200,
                itemWidth: 200,
                displayWidth: 0,
                displayHeight: 0,
                scrollTop: 0,
                total: 300
            })

            // GridCalculator.prototype.updateDisplaySize(displayWidth: number, displayHeight: number, scrollTop: number)
            calculator.updateDisplaySize(600, 400, 100)

            expect(calculator.displayHeight).toEqual(400)
            expect(calculator.displayWidth).toEqual(600)
            expect(calculator.scrollTop).toEqual(100)
            expect(calculator.itemsPerRow).toEqual(3)
            expect(calculator.offsetTop).toEqual(0)
            expect(calculator.minVisibleIndex).toEqual(0)
            expect(calculator.maxVisibleIndex).toEqual(8)
            expect(calculator.height).toEqual(20000)

        })

        it(`should update calculator\`s state when scrollTop changes`, () => {
            const calculator = new GridCalculator({
                itemHeight: 200,
                itemWidth: 200,
                displayWidth: 600,
                displayHeight: 400,
                scrollTop: 0
            })

            // GridCalculator.prototype.updateScrollTop(scrollTop: number)
            calculator.updateScrollTop(100)
            expect(calculator.scrollTop).toEqual(100)
            expect(calculator.minVisibleIndex).toEqual(0)
            expect(calculator.maxVisibleIndex).toEqual(8)
            expect(calculator.offsetTop).toEqual(0)

            calculator.updateScrollTop(200)
            expect(calculator.scrollTop).toEqual(200)
            expect(calculator.minVisibleIndex).toEqual(3)
            expect(calculator.maxVisibleIndex).toEqual(11)
            expect(calculator.offsetTop).toEqual(200)
        })

        it(`should update total`, () => {
            const calculator = new GridCalculator({
                itemHeight: 200,
                itemWidth: 200,
                displayWidth: 600,
                displayHeight: 400,
                total: 0,
                itemsPerRow: 3
            })

            calculator.updateTotal(300)

            expect(calculator.height).toEqual(20000)
        })

        it(`should return state`, () => {
            const state = {
                minVisibleIndex: 100,
                maxVisibleIndex: 200,
                offsetTop: 300,
                height: 200
            }

            const calculator = new GridCalculator(state)

            expect(calculator.getState()).toEqual(state)
        })
    })
})
