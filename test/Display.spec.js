import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

import expect from 'expect'
import mockery from 'mockery'

class GridMock extends Component {
    render() {
        return <div />
    }
}

const createSetDisplayClientBoundingRect = (Display) => (displayClientBoundingRectMock) => {
    const spy = expect.spyOn(Display.prototype, `getDisplayBoundingClientRect`)
    spy.andReturn(displayClientBoundingRectMock)
    return spy.restore
}

const createSetContentClientBoundingRect = (Display) => (contentClientBoundingRectMock) => {
    const spy = expect.spyOn(Display.prototype, `getContentBoundingClientRect`)
    spy.andReturn(contentClientBoundingRectMock)
    return spy.restore
}

const simulateScroll = (node) => {
    const event = document.createEvent(`Event`)
    event.initEvent(`scroll`, true, true)
    node.dispatchEvent(event)
    return event
}

const simulateWindowResize = () => {
    const event = document.createEvent(`Event`)
    event.initEvent(`resize`, true, true)
    window.dispatchEvent(event)
    return event
}

describe(`react-ingrid`, () => {

    describe(`Display`, () => {
        let Display, setDisplayClientBoundingRect, setContentClientBoundingRect, mountNode

        before(() => {
            mockery.enable({
                warnOnUnregistered: false
            })

            mockery.registerMock(`./Grid`, GridMock);
            ({default: Display} = require(`../src/Display`))

            setDisplayClientBoundingRect = createSetDisplayClientBoundingRect(Display)
            setContentClientBoundingRect = createSetContentClientBoundingRect(Display)
        })

        after(() => {
            mockery.disable()
            mockery.deregisterAll()
        })

        beforeEach(() => {
            mountNode = document.createElement(`div`)
            document.body.appendChild(mountNode)
        })

        afterEach(() => {
            ReactDOM.unmountComponentAtNode(mountNode)
            expect.restoreSpies()
        })

        it(`should set initial state`, () => {
            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            const display = new Display(props)

            expect(display.state).toEqual({
                minVisibleIndex: 0,
                maxVisibleIndex: 0,
                offsetTop: 0,
                height: 0
            })
        })

        it(`should update state when component did mount`, () => {
            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            const restoreDisplay = setDisplayClientBoundingRect({
                top: 0,
                width: 500,
                height: 200
            })

            const restoreContent = setContentClientBoundingRect({
                top: -200
            })

            const display = TestUtils
                .renderIntoDocument(
                    <Display {...props} />
                )

            expect(display.state).toEqual({
                minVisibleIndex: 10,
                maxVisibleIndex: 24,
                offsetTop: 200,
                height: 0
            })

            restoreDisplay()
            restoreContent()
        })

        it(`should transfer properties into the Grid component`, () => {
            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            const display = TestUtils.renderIntoDocument(
                <Display {...props} />
            )

            const grid = TestUtils.findRenderedComponentWithType(display, GridMock)

            expect(grid.props)
                .toEqual({
                    minVisibleIndex: 0,
                    maxVisibleIndex: 0,
                    offsetTop: 0,
                    height: 0
                })
        })

        it(`should update state on scroll`, () => {
            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            const restoreDisplay = setDisplayClientBoundingRect({
                top: 0,
                width: 100,
                height: 100
            })

            const display = TestUtils.renderIntoDocument(
                <Display {...props} />
            )

            const restoreContent = setContentClientBoundingRect({
                top: -100
            })

            expect(display.state)
                .toEqual({
                    minVisibleIndex: 0,
                    maxVisibleIndex: 1,
                    offsetTop: 0,
                    height: 0
                })

            simulateScroll(display.display)

            expect(display.state)
                .toEqual({
                    minVisibleIndex: 1,
                    maxVisibleIndex: 2,
                    offsetTop: 100,
                    height: 0
                })

            restoreDisplay()
            restoreContent()
        })

        it(`should update state on window resize`, () => {
            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            const display = TestUtils.renderIntoDocument(
                <Display {...props} />
            )

            expect(display.state)
                .toEqual({
                    minVisibleIndex: 0,
                    maxVisibleIndex: 0,
                    offsetTop: 0,
                    height: 0
                })

            const restoreDisplay = setDisplayClientBoundingRect({
                top: 0,
                width: 200,
                height: 100
            })

            simulateWindowResize()

            expect(display.state)
                .toEqual({
                    minVisibleIndex: 0,
                    maxVisibleIndex: 3,
                    offsetTop: 0,
                    height: 0
                })

            restoreDisplay()
        })

        it(`should remove listener from the window after component was unmount`, () => {
            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            const spyAddListener = expect
                .spyOn(window, `addEventListener`)
                .andCallThrough()

            ReactDOM.render(
                <Display {...props} />,
                mountNode
            )

            expect(spyAddListener.calls.length).toEqual(1)

            const spyRemoveListener = expect
                .spyOn(window, `removeEventListener`)
                .andCallThrough()

            ReactDOM.unmountComponentAtNode(mountNode)

            expect(spyRemoveListener.calls.length).toEqual(1)

            expect(spyAddListener.calls[0].arguments[1]).toEqual(spyRemoveListener.calls[0].arguments[1])
        })
    })
})