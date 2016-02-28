import React, {Component} from 'react'

import Grid from './Grid'
import GridCalculator from './GridCalculator'

const displayStyle = {
    height: `100%`,
    overflowX: `hidden`,
    overflowY: `scroll`,
    position: `relative`,
    width: `100%`
}

const contentStyle = {}

const getDisplaySize = (inst) => {
    const {top: displayTop, width, height} = inst.getDisplayBoundingClientRect()
    const {top: contentTop} = inst.getContentBoundingClientRect()
    const scrollTop = displayTop - contentTop

    return {
        scrollTop,
        width,
        height
    }
}

const createScrollListener = inst =>
    () => {
        const {scrollTop} = getDisplaySize(inst)
        inst.calculator.updateScrollTop(scrollTop)

        inst.setState(inst.calculator.getState())
    }

const createWindowResizeListener = inst => {
    inst.windowResizeListener = () => {
        const {scrollTop, width, height} = getDisplaySize(inst)
        inst.calculator.updateDisplaySize(width, height, scrollTop)
        inst.setState(inst.calculator.getState())
    }

    return inst.windowResizeListener
}

class Display extends Component {

    constructor(props) {
        super()
        const {itemWidth, itemHeight, total} = props
        this.calculator = new GridCalculator({itemWidth, itemHeight, total})

        this.state = this.calculator.getState()
    }

    componentDidMount() {
        const {scrollTop, width, height} = getDisplaySize(this)
        this.calculator.updateDisplaySize(width, height, scrollTop)

        this.setState(this.calculator.getState())

        this.display.addEventListener(`scroll`, createScrollListener(this))
        window.addEventListener(`resize`, createWindowResizeListener(this))
    }

    componentWillUnmount() {
        window.removeEventListener(`resize`, this.windowResizeListener)
    }

    getDisplayBoundingClientRect() {
        return this.display.getBoundingClientRect()
    }

    getContentBoundingClientRect() {
        return this.content.getBoundingClientRect()
    }

    render() {

        return (
            <div ref={display => {
                this.display = display
            }}
                 style={displayStyle}
            >
                <div ref={content => {
                    this.content = content
                }} style={contentStyle}
                >
                    <Grid {...this.state} />
                </div>
            </div>
        )
    }
}


export default Display