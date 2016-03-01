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

        let total

        if (typeof items.count === `function`) {
            total = items.count()
        } else {
            total = items.length
        }

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
    items: PropTypes.oneOf([ PropTypes.array, PropTypes.object ])
}

Ingrid.propTypes = {
    buffer: PropTypes.number,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.oneOf([ PropTypes.array, PropTypes.object ]),
    ItemComponent: PropTypes.func.isRequired
}

export default Ingrid
