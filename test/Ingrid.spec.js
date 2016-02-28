import React, {Component, PropTypes} from 'react'

import TestUtils from 'react-addons-test-utils'

import expect from 'expect'
import mockery from 'mockery'
import rndoam from 'rndoam'

describe(`react-ingrid`, () => {
    describe(`Ingrid`, () => {
        let Ingrid

        class DisplayMock extends Component {
            render() {
                return <div />
            }
        }

        before(() => {
            mockery.enable({
                warnOnUnregistered: false
            })

            mockery.registerMock(`./Display`, DisplayMock);
            ({default: Ingrid} = require(`../src/Ingrid`))
        })

        after(() => {
            mockery.disable()
            mockery.deregisterAll()
        })

        it(`should transfer props into the context`, () => {
            DisplayMock.contextTypes = {
                ItemComponent: PropTypes.func,
                itemWidth: PropTypes.number,
                itemHeight: PropTypes.number,
                items: PropTypes.array
            }

            try {
                const props = {
                    ItemComponent: rndoam.noop(),
                    itemWidth: rndoam.number(),
                    itemHeight: rndoam.number(),
                    items: rndoam.array()
                }

                const tree = TestUtils.renderIntoDocument(
                    <Ingrid {...props} />
                )

                const display = TestUtils.findRenderedComponentWithType(tree, DisplayMock)

                expect(display.context).toEqual(props)

            } finally {
                DisplayMock.contextTypes = {}
            }
        })

        it(`should transfer props into the Display component`, () => {
            const props = {
                ItemComponent: rndoam.noop(),
                itemWidth: rndoam.number(),
                itemHeight: rndoam.number(),
                items: rndoam.array()
            }

            const tree = TestUtils.renderIntoDocument(
                <Ingrid {...props} />
            )

            const display = TestUtils.findRenderedComponentWithType(tree, DisplayMock)

            const {ItemComponent, ...restProps} = props

            const displayProps = {
                ...restProps,
                total: props.items.length
            }
            expect(display.props).toEqual(displayProps)
        })
    })
})