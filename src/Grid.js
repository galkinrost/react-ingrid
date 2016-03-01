import React, {Component, PropTypes} from 'react'

import Item from './Item'

const defaultScrollHelperStyle = {
    display: `block`,
    position: `relative`,
    width: `100%`,
    height: 0
}

class Grid extends Component {

    render() {
        const {
            offsetTop = 0,
            minVisibleIndex = 0,
            maxVisibleIndex = 0,
            height = 0
            } = this.props

        const {
            items = []
            } = this.context

        const contentStyle = {
            height
        }

        const scrollHelperStyle = {
            ...defaultScrollHelperStyle,
            height: offsetTop
        }

        return (
            <div style={contentStyle}>
                <div style={scrollHelperStyle}/>
                {items
                    .slice(minVisibleIndex, maxVisibleIndex + 1)
                    .map(item => (
                        <Item key={typeof item.get === `function` ? item.get(`id`) : item.id} item={item}/>
                    ))}
            </div>
        )
    }
}

Grid.contextTypes = {
    items: PropTypes.array
}

export default Grid
