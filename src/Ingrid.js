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
        const {buffer, items, itemWidth, itemHeight, load = () => null, loading, more} = this.props

        const total = items.length

        return (
            <Display
                buffer={buffer}
                items={items}
                itemWidth={itemWidth}
                itemHeight={itemHeight}
                total={total}
                load={load}
                loading={loading}
                more={more}
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
    buffer: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.array.isRequired,
    ItemComponent: PropTypes.func.isRequired
}

export default Ingrid