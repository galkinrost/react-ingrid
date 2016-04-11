import React, {Component} from 'react'

import Grid from './Grid'
import GridCalculator from './GridCalculator'

const defaultDisplayStyle = {
    height: `100%`,
    overflowX: `hidden`,
    overflowY: `scroll`,
    position: `relative`,
    boxSizing: `border-box`,
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
        const {itemWidth, itemHeight, total, buffer, paddingLeft, paddingTop} = props
        this.calculator = new GridCalculator({itemWidth, itemHeight, total, buffer, paddingLeft, paddingTop})

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.total !== this.props.total) {
            this.calculator.updateTotal(nextProps.total)
            this.setState(
                this.calculator.getState()
            )
        }
        if (nextProps.itemWidth !== this.props.itemWidth || nextProps.itemHeight !== this.props.itemHeight) {
            const {itemWidth, itemHeight} = nextProps
            this.calculator.handleItemsSizeChange(itemWidth, itemHeight)
            this.setState(this.calculator.getState())
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const {total, load, loading, more, getPaddingTop, paddingTop, paddingBot, onLoading} = nextProps
        const {maxVisibleIndex, offsetTop, height} = nextState

        if (more && !loading && maxVisibleIndex > total) {
            load()
        }

        if (typeof getPaddingTop === `function`) {
            getPaddingTop(offsetTop + paddingTop)
        }

        if (loading) {
            this.setState({
                height: height + paddingBot
            })
            onLoading()
        }
    }

    getDisplayBoundingClientRect() {
        return this.display.getBoundingClientRect()
    }

    getContentBoundingClientRect() {
        return this.content.getBoundingClientRect()
    }

    render() {

        const {total, paddingLeft} = this.props

        const displayStyle = {
            ...defaultDisplayStyle,
            paddingLeft
        }

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
                    <Grid total={total} {...this.state} />
                </div>
            </div>
        )
    }
}


export default Display
