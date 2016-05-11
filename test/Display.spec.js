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
                itemHeight: 100,
                total: 100
            }

            const display = new Display(props)

            expect(display.state).toEqual({
                minVisibleIndex: 0,
                maxVisibleIndex: 100,
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
                itemHeight: 100,
                total: 100
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
                    height: 10000,
                    total: props.total
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

            expect(spyAddListener.calls[ 0 ].arguments[ 1 ]).toEqual(spyRemoveListener.calls[ 0 ].arguments[ 1 ])
        })

        it(`should call the load method when maxVisibleIndex greater than total`, () => {

            const props = {
                total: 100,
                load: expect.createSpy(),
                loading: false,
                more: true
            }

            class Container extends Component {

                componentDidMount() {
                    this.display.setState({
                        maxVisibleIndex: 200
                    })
                }

                render() {
                    return (
                        <Display ref={display => {
                            this.display = display
                        }} {...props}
                        />
                    )
                }
            }

            TestUtils.renderIntoDocument(
                <Container />
            )

            expect(props.load.calls.length).toEqual(1)
        })

        it(`should not call the load method if it has already been called`, () => {

            const props = {
                total: 100,
                load: expect.createSpy(),
                loading: true,
                more: true
            }

            class Container extends Component {

                componentDidMount() {
                    this.display.setState({
                        maxVisibleIndex: 200
                    })
                }

                render() {
                    return (
                        <Display ref={display => {
                            this.display = display
                        }} {...props}
                        />
                    )
                }
            }

            TestUtils.renderIntoDocument(
                <Container />
            )

            expect(props.load.calls.length).toEqual(0)
        })

        it(`should not call the load method if it's no more`, () => {

            const props = {
                total: 100,
                load: expect.createSpy(),
                loading: false,
                more: false
            }

            class Container extends Component {

                componentDidMount() {
                    this.display.setState({
                        maxVisibleIndex: 200
                    })
                }

                render() {
                    return (
                        <Display ref={display => {
                            this.display = display
                        }} {...props}
                        />
                    )
                }
            }

            TestUtils.renderIntoDocument(
                <Container />
            )

            expect(props.load.calls.length).toEqual(0)
        })

        it(`should call the load method when maxVisibleIndex greater than total`, () => {

            const props = {
                itemWidth: 100,
                itemHeight: 100
            }

            class Container extends Component {

                constructor() {
                    super()
                    this.state = {
                        total: 10
                    }
                }

                componentDidMount() {
                    this.setState({
                        total: 20
                    })
                }

                render() {
                    return (
                        <Display {...props} {...this.state}/>
                    )
                }
            }

            const restoreDisplay = setDisplayClientBoundingRect({
                top: 0,
                width: 200,
                height: 100
            })

            const tree = TestUtils.renderIntoDocument(
                <Container />
            )

            const grid = TestUtils.findRenderedComponentWithType(tree, GridMock)

            const expectedHeight = 1000

            expect(grid.props.height).toEqual(expectedHeight)

            restoreDisplay()
        })

        it(`should update state on window&items resize`, () => {
            class DisplayTest extends Component {
                constructor() {
                    super()
                    this.state = {
                        itemWidth: 100,
                        itemHeight: 100,
                        total: 4
                    }
                }

                componentDidMount() {
                    this.setState({
                        itemWidth: 200,
                        itemHeight: 200
                    })
                }

                render() {
                    return (
                        <Display {...this.state} />
                    )
                }
            }

            const restoreDisplay = setDisplayClientBoundingRect({
                width: 400,
                height: 400
            })

            const tree = TestUtils.renderIntoDocument(
                <DisplayTest />
            )

            const display = TestUtils.findRenderedComponentWithType(tree, Display)

            const expectedHeight = 400

            expect(display.state.height)
                .toEqual(expectedHeight)

            restoreDisplay()
        })

        it(`should set correct style`, () => {
            const paddingLeft = 100
            const tree = TestUtils.renderIntoDocument(
                <Display paddingLeft={paddingLeft}/>
            )

            const [ display ] = TestUtils.scryRenderedDOMComponentsWithTag(tree, `div`)

            expect(display.style.paddingLeft).toEqual(`${paddingLeft}px`)
            expect(display.style.boxSizing).toEqual(`border-box`)
        })
    })
})
