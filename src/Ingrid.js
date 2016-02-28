import React, {Component, PropTypes} from 'react'
import Display from './Display'

class Ingrid extends Component {

    getChildContext() {
        const {ItemComponent, itemWidth, itemHeight, items} = this.props

        return {
            ItemComponent,
            itemWidth,
            itemHeight,
            items
        }
    }

    render() {
        const {items, itemWidth, itemHeight, total = items.length} = this.props

        return (
            <Display
                items={items}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                total={total}
            />
        )
    }
}

Ingrid.childContextTypes = {
    ItemComponent: PropTypes.func,
    itemWidth: PropTypes.number,
    itemHeight: PropTypes.number,
    items: PropTypes.array
}

Ingrid.propTypes = {
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,
    ItemComponent: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired
}

export default Ingrid