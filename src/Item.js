import React, {Component, PropTypes} from 'react'

const defaultItemStyle = {
    display: `inline-block`,
    position: `relative`,
    verticalAlign: `bottom`,
    width: 0,
    height: 0
}

class Item extends Component {
    render() {
        const {item} = this.props
        const {ItemComponent, itemWidth, itemHeight} = this.context

        const itemStyle = {
            ...defaultItemStyle,
            width: itemWidth,
            height: itemHeight
        }

        return (
            <div style={itemStyle}>
                <ItemComponent data={item}/>
            </div>
        )
    }
}

Item.contextTypes = {
    ItemComponent: PropTypes.func,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number
}

export default Item