import React, {Component, PropTypes} from 'react'

import TestUtils from 'react-addons-test-utils'

import contextify from 'react-contextify'
import expect from 'expect'
import mockery from 'mockery'
import rndoam from 'rndoam/lib/withImmutable'


class ItemMock extends Component {
    render() {
        return <div />
    }
}


describe(`react-ingrid`, () => {

    describe(`Grid`, () => {
        let Grid, GridWithContext

        before(() => {
            mockery.enable({
                warnOnUnregistered: false
            })

            mockery.registerMock(`./Item`, ItemMock);
            ({default: Grid} = require(`../src/Grid`))

            GridWithContext = contextify({
                items: PropTypes.array,
                isLoading: PropTypes.bool,
                PreloaderComponent: PropTypes.func,
                preloaderHeight: PropTypes.number
            }, props => ({
                items: props.items || [],
                isLoading: props.isLoading,
                PreloaderComponent: props.PreloaderComponent,
                preloaderHeight: props.preloaderHeight
            }))(Grid)
        })

        after(() => {
            mockery.disable()
            mockery.deregisterAll()
        })

        it(`should receive props in the context`, () => {

            const context = {
                items: rndoam.array(),
                isLoading: false,
                PreloaderComponent: rndoam.noop(),
                preloaderHeight: rndoam.number()
            }

            const tree = TestUtils
                .renderIntoDocument(
                    <GridWithContext {...context} />
                )

            const grid = TestUtils.findRenderedComponentWithType(tree, Grid)

            expect(grid.context).toEqual(context)
        })

        it(`should render only visible items`, () => {
            const props = {
                minVisibleIndex: 3,
                maxVisibleIndex: 5
            }
            const itemsCount = 100
            const items = rndoam.array(itemsCount)

            const tree = TestUtils
                .renderIntoDocument(
                    <GridWithContext {...props} items={items}/>
                )

            const itemInstances = TestUtils.scryRenderedComponentsWithType(tree, ItemMock)

            expect(itemInstances.length).toEqual(props.maxVisibleIndex - props.minVisibleIndex + 1)
        })

        it(`should set height for scroll helper tag`, () => {
            const props = {
                offsetTop: 100
            }

            const grid = TestUtils
                .renderIntoDocument(
                    <Grid {...props} />
                )

            const divs = TestUtils.scryRenderedDOMComponentsWithTag(grid, `div`)

            expect(divs[1].style.height).toEqual(`${props.offsetTop}px`)
        })

        it(`should set height of the content area`, () => {
            const props = {
                height: 100
            }

            const grid = TestUtils
                .renderIntoDocument(
                    <Grid {...props} />
                )

            const divs = TestUtils.scryRenderedDOMComponentsWithTag(grid, `div`)

            expect(divs[0].style.height).toEqual(`${props.height}px`)
        })

        it(`should set keys from the id`, () => {
            let id = 0
            const itemsCount = 10
            const props = {
                minVisibleIndex: 0,
                maxVisibleIndex: 10,
                items: rndoam.collection({
                    id: () => id++
                }, itemsCount)
            }

            const grid = TestUtils
                .renderIntoDocument(
                    <GridWithContext {...props} />
                )

            const items = TestUtils.scryRenderedComponentsWithType(grid, ItemMock)

            expect(items.length).toEqual(itemsCount)

            items.forEach((item, i) =>
                expect(item._reactInternalInstance._currentElement.key).toEqual(i.toString())
            )
        })

        it(`should set key for Immutable.js items`, () => {
            let id = 0
            const itemsCount = 10
            const props = {
                minVisibleIndex: 0,
                maxVisibleIndex: 10,
                items: rndoam.immutableCollection({
                    id: () => id++
                }, itemsCount)
            }

            const grid = TestUtils
                .renderIntoDocument(
                    <GridWithContext {...props} />
                )

            const items = TestUtils.scryRenderedComponentsWithType(grid, ItemMock)

            expect(items.length).toEqual(itemsCount)

            items.forEach((item, i) =>
                expect(item._reactInternalInstance._currentElement.key).toEqual(i.toString())
            )
        })

        it(`should change height while isLoading`, () => {
            const props = {
                isLoading: true,
                preloaderHeight: 300,
                height: 1000
            }

            const grid = TestUtils
                .renderIntoDocument(
                    <GridWithContext {...props} />
                )

            const divs = TestUtils.scryRenderedDOMComponentsWithTag(grid, `div`)

            expect(divs[0].style.height).toEqual(`${props.height + props.preloaderHeight}px`)
        })
    })
})
