import Ingrid from './Ingrid'
import React from 'react'

const ingrid = (props = {}) =>
    (ItemComponent) => <Ingrid {...props} ItemComponent={ItemComponent} />

export default ingrid