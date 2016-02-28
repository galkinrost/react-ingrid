import React, {Component, PropTypes} from 'react'

import Item from '../src/Item'
import TestUtils from 'react-addons-test-utils'

import contextify from 'react-contextify'
import expect from 'expect'
import rndoam from 'rndoam'

describe(`react-ingrid`, () => {
    describe(`Item`, () => {
        class ItemComponentMock extends Component {
            render() {
                return <div />
            }
        }

        const WithContext = contextify({
            ItemComponent: PropTypes.func,
            itemWidth: PropTypes.number,
            itemHeight: PropTypes.number
        }, ({ItemComponent, itemWidth, itemHeight}) => ({
            ItemComponent,
            itemWidth,
            itemHeight
        }))(Item)

        it(`should receive item props from the context`, () => {

            const props = {
                ItemComponent: ItemComponentMock,
                itemWidth: rndoam.number(),
                itemHeight: rndoam.number()
            }

            const tree = TestUtils.renderIntoDocument(
                <WithContext {...props} />
            )

            const item = TestUtils.findRenderedComponentWithType(tree, Item)

            expect(item.context).toEqual(props)
        })

        it(`should transfer props into the ItemComponent`, () => {
            const props = {
                ItemComponent: ItemComponentMock,
                itemWidth: rndoam.number(),
                itemHeight: rndoam.number(),
                item: rndoam.object()
            }

            const tree = TestUtils.renderIntoDocument(
                <WithContext {...props} />
            )

            const item = TestUtils.findRenderedComponentWithType(tree, ItemComponentMock)

            expect(item.props.data).toEqual(props.item)
        })

        it(`should have correct size`, () => {
            const props = {
                ItemComponent: ItemComponentMock,
                itemWidth: rndoam.number(),
                itemHeight: rndoam.number()
            }

            const tree = TestUtils.renderIntoDocument(
                <WithContext {...props} />
            )

            const divs = TestUtils.scryRenderedDOMComponentsWithTag(tree, `div`)

            expect(divs[0].style.width).toEqual(`${props.itemWidth}px`)
            expect(divs[0].style.height).toEqual(`${props.itemHeight}px`)
        })
    })
})