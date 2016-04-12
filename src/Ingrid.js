import React, {Component, PropTypes} from 'react'
import Display from './Display'

class Ingrid extends Component {

    getChildContext() {
        const {
            ItemComponent,
            itemHeight,
            items,
            itemWidth,
            isLoading,
            PreloaderComponent,
            preloaderHeight,
            isShowingPreloader
        } = this.props

        return {
            ItemComponent,
            itemHeight,
            items,
            itemWidth,
            isLoading,
            PreloaderComponent,
            preloaderHeight,
            isShowingPreloader
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
            isLoading,
            hasMore,
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
                isLoading={isLoading}
                hasMore={hasMore}
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
    isLoading: PropTypes.bool,
    PreloaderComponent: PropTypes.func,
    preloaderHeight: PropTypes.number,
    isShowingPreloader: PropTypes.bool
}

Ingrid.propTypes = {
    buffer: PropTypes.number,
    getPaddingTop: PropTypes.func,
    ItemComponent: PropTypes.func.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number.isRequired,
    paddingTop: PropTypes.number,
    preloaderHeight: PropTypes.number
}

export default Ingrid
