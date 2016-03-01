import React, {Component, PropTypes} from 'react'

import {List} from 'immutable'
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
                itemHeight: PropTypes.number,
                items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
                itemWidth: PropTypes.number,
                paddingTop: PropTypes.number
            }

            try {
                const props = {
                    ItemComponent: rndoam.noop(),
                    itemHeight: rndoam.number(),
                    items: rndoam.array(),
                    itemWidth: rndoam.number(),
                    paddingTop: rndoam.number()
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
                buffer: rndoam.number(),
                itemWidth: rndoam.number(),
                itemHeight: rndoam.number(),
                items: rndoam.array(),
                load: rndoam.noop(),
                loading: true,
                more: true
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

        it(`should accept Immutable.js data structures`, () => {
            const props = {
                buffer: rndoam.number(),
                itemWidth: rndoam.number(),
                itemHeight: rndoam.number(),
                items: List(),
                load: rndoam.noop(),
                loading: true,
                more: true
            }

            const tree = TestUtils.renderIntoDocument(
                <Ingrid {...props} />
            )

            const display = TestUtils.findRenderedComponentWithType(tree, DisplayMock)

            const displayProps = {
                ...props,
                total: props.items.count()
            }
            expect(display.props).toEqual(displayProps)
        })
    })
})
