import React, {Component, PropTypes} from 'react'
import Display from './Display'

class Ingrid extends Component {

    getChildContext() {
        const {ItemComponent, itemWidth, itemHeight, items, preloaderOffset, loading} = this.props

        return {
            ItemComponent,
            itemWidth,
            itemHeight,
            items,
            preloaderOffset,
            loading
        }
    }

    render() {
        const {
            buffer,
            getPaddingTop,
            itemHeight,
            items,
            itemWidth,
            load = () => null,
            loading,
            more,
            paddingLeft,
            paddingTop,
            preloaderOffset
        } = this.props

        let total

        if (typeof items.count === `function`) {
            total = items.count()
        } else {
            total = items.length
        }

        return (
            <Display
                buffer={buffer}
                getPaddingTop={getPaddingTop}
                itemHeight={itemHeight}
                items={items}
                itemWidth={itemWidth}
                load={load}
                loading={loading}
                more={more}
                paddingLeft={paddingLeft}
                paddingTop={paddingTop}
                preloaderOffset={preloaderOffset}
                total={total}
            />
        )
    }
}

Ingrid.childContextTypes = {
    ItemComponent: PropTypes.func,
    itemHeight: PropTypes.number,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number,
    preloaderOffset: PropTypes.number,
    loading: PropTypes.bool
}

Ingrid.propTypes = {
    buffer: PropTypes.number,
    getPaddingTop: PropTypes.func,
    ItemComponent: PropTypes.func.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number.isRequired,
    paddingTop: PropTypes.number,
    preloaderOffset: PropTypes.number
}

export default Ingrid
