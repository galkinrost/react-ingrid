import React, {Component, PropTypes} from 'react'

import Item from './Item'

const defaultScrollHelperStyle = {
    display: `block`,
    position: `relative`,
    width: `100%`,
    height: 0
}

class DefaultPreloader extends Component {
    render() {
        const style = {
            color: `#000`,
            fontSize: `20px`,
            fontFamily: `sans-serif`,
            marginLeft: `-70px`,
            marginBottom: `35px`,
            letterSpacing: `1.5px`
        }
        return (
            <div style={style}>
                LOADING...
            </div>
        )
    }
}

class Grid extends Component {

    render() {
        const {
            offsetTop = 0,
            minVisibleIndex = 0,
            maxVisibleIndex = 0,
            height = 0
        } = this.props

        const defaultpreloaderHeight = 200

        const {
            items = [],
            loading,
            paddingTop = 0,
            PreloaderComponent = DefaultPreloader,
            preloaderHeight = defaultpreloaderHeight
        } = this.context

        const contentStyle = {
            position: `relative`,
            height: loading ? preloaderHeight + height : height
        }

        const scrollHelperStyle = {
            ...defaultScrollHelperStyle,
            height: offsetTop + paddingTop
        }

        const preloaderStyle = {
            bottom: 0,
            left: `50%`,
            position: `absolute`
        }

        return (
            <div style={contentStyle}>
                <div style={scrollHelperStyle}/>
                {items
                    .slice(minVisibleIndex, maxVisibleIndex + 1)
                    .map(item => (
                        <Item key={typeof item.get === `function` ? item.get(`id`) : item.id} item={item}/>
                    ))}
                {loading ?
                    <div style={preloaderStyle}>
                        <PreloaderComponent />
                    </div> :
                    ``
                }
            </div>
        )
    }
}

Grid.contextTypes = {
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    loading: PropTypes.bool,
    PreloaderComponent: PropTypes.func,
    preloaderHeight: PropTypes.number
}

export default Grid
