import React, {Component, PropTypes} from 'react'
import Display from './Display'

class Ingrid extends Component {

    getChildContext() {
        const {
            ItemComponent,
            itemHeight,
            items,
            itemWidth,
            loading,
            PreloaderComponent,
            preloaderOffset
        } = this.props

        return {
            ItemComponent,
            itemHeight,
            items,
            itemWidth,
            loading,
            PreloaderComponent,
            preloaderOffset
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
            paddingTop
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
    loading: PropTypes.bool,
    PreloaderComponent: PropTypes.func,
    preloaderOffset: PropTypes.number
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
