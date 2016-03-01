/**
 *
 * @param displayWidth
 * @param itemWidth
 * @returns {number}
 */
export const calculateItemsPerRow = (displayWidth, itemWidth) => Math.floor(displayWidth / itemWidth) || 1

/**
 *
 * @param scrollTop
 * @param itemHeight
 * @param itemsPerRow
 * @returns {number}
 */
export const calculateMinVisibleIndex = (scrollTop, itemHeight, itemsPerRow) => itemHeight ? Math.floor(scrollTop / itemHeight) * itemsPerRow : 0

/**
 *
 * @param displayHeight
 * @param itemHeight
 * @param itemsPerRow
 * @param minVisibleIndex
 * @param buffer
 * @returns {number}
 */
export const calculateMaxVisibleIndex = (displayHeight, itemHeight, itemsPerRow, minVisibleIndex, buffer) => itemHeight && displayHeight ? minVisibleIndex + Math.ceil(displayHeight / itemHeight) * itemsPerRow + buffer * itemsPerRow + itemsPerRow - 1 : minVisibleIndex

/**
 *
 * @param minVisibleIndex
 * @param itemsPerRow
 * @param itemHeight
 */
export const calculateOffsetTop = (minVisibleIndex, itemsPerRow, itemHeight) => minVisibleIndex / itemsPerRow * itemHeight

/**
 *
 * @param total
 * @param itemsPerRow
 * @param itemHeight
 */
export const calculateHeight = (total, itemsPerRow, itemHeight) => Math.ceil(total / itemsPerRow) * itemHeight

class GridCalculator {
    /**
     *
     * @param displayWidth
     * @param displayHeight
     * @param itemWidth
     * @param itemHeight
     * @param scrollTop
     * @param buffer
     * @param itemsPerRow
     * @param minVisibleIndex
     * @param maxVisibleIndex
     */
    constructor({
        displayWidth = 0,
        displayHeight = 0,
        itemWidth = 0,
        itemHeight = 0,
        offsetTop = 0,
        scrollTop = 0,
        buffer = 0,
        itemsPerRow = 0,
        minVisibleIndex = 0,
        maxVisibleIndex = 0,
        height = 0,
        total = 0
        } = {}) {
        this.displayWidth = displayWidth
        this.displayHeight = displayHeight
        this.itemWidth = itemWidth
        this.itemHeight = itemHeight
        this.offsetTop = offsetTop
        this.scrollTop = scrollTop
        this.buffer = buffer
        this.itemsPerRow = itemsPerRow
        this.minVisibleIndex = minVisibleIndex
        this.maxVisibleIndex = maxVisibleIndex
        this.height = height
        this.total = total
    }

    /**
     *
     * @param displayWidth
     * @param displayHeight
     * @param scrollTop
     */
    updateDisplaySize(displayWidth, displayHeight, scrollTop) {
        this.displayWidth = displayWidth
        this.displayHeight = displayHeight
        this.scrollTop = scrollTop


        this.itemsPerRow = calculateItemsPerRow(displayWidth, this.itemWidth)
        this.height = calculateHeight(this.total, this.itemsPerRow, this.itemHeight)
        this.minVisibleIndex = calculateMinVisibleIndex(scrollTop, this.itemHeight, this.itemsPerRow)
        this.maxVisibleIndex = calculateMaxVisibleIndex(displayHeight, this.itemHeight, this.itemsPerRow, this.minVisibleIndex, this.buffer)
        this.offsetTop = calculateOffsetTop(this.minVisibleIndex, this.itemsPerRow, this.itemHeight)
    }

    /**
     *
     * @param scrollTop
     */
    updateScrollTop(scrollTop) {
        this.scrollTop = scrollTop

        this.itemsPerRow = calculateItemsPerRow(this.displayWidth, this.itemWidth)
        this.minVisibleIndex = calculateMinVisibleIndex(scrollTop, this.itemHeight, this.itemsPerRow)
        this.maxVisibleIndex = calculateMaxVisibleIndex(this.displayHeight, this.itemHeight, this.itemsPerRow, this.minVisibleIndex, this.buffer)
        this.offsetTop = calculateOffsetTop(this.minVisibleIndex, this.itemsPerRow, this.itemHeight)
    }

    /**
     *
     * @param total
     */
    updateTotal(total) {
        this.total = total
        this.height = calculateHeight(this.total, this.itemsPerRow, this.itemHeight)
    }

    /**
     *
     * @returns {{minVisibleIndex: *, maxVisibleIndex: *, offsetTop: *}}
     */
    getState() {
        return {
            minVisibleIndex: this.minVisibleIndex,
            maxVisibleIndex: this.maxVisibleIndex,
            offsetTop: this.offsetTop,
            height: this.height
        }
    }
}

export default GridCalculator
