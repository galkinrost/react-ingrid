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
        const {
            buffer,
            getPaddingTop,
            itemHeight,
            items,
            itemWidth,
            load = () => null,
            loading,
            more,
            onLoading,
            paddingBot,
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
                onLoading={onLoading}
                paddingBot={paddingBot}
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
    itemWidth: PropTypes.number
}

Ingrid.propTypes = {
    buffer: PropTypes.number,
    getPaddingTop: PropTypes.func,
    ItemComponent: PropTypes.func.isRequired,
    itemHeight: PropTypes.number.isRequired,
    items: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    itemWidth: PropTypes.number.isRequired,
    onLoading: PropTypes.func,
    paddingBot: PropTypes.number,
    paddingTop: PropTypes.number
}

export default Ingrid
