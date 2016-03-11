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
        const {buffer, items, itemWidth, itemHeight, load = () => null, loading, more, paddingTop} = this.props

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
                paddingTop={paddingTop}
            />
        )
    }
}

Ingrid.childContextTypes = {
    ItemComponent: PropTypes.func,
    itemHeight: PropTypes.number,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number
}

Ingrid.propTypes = {
    buffer: PropTypes.number,
    ItemComponent: PropTypes.func.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number.isRequired,
    paddingTop: PropTypes.number
}

export default Ingrid
