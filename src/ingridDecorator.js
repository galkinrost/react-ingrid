import Ingrid from './Ingrid'
import React from 'react'

const ingrid = (mapProps = () => ({})) =>
    (ItemComponent) =>
        props => <Ingrid {...mapProps(props)} ItemComponent={ItemComponent}/>

export default ingrid