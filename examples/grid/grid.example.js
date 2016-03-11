import Ingrid from '../../lib'
import React from 'react'
import ReactDOM from 'react-dom'

import rndoam from 'rndoam'

let i = 0
const itemsCount = 10000
const items = rndoam.collection({
    id: () => i++
}, itemsCount)

const ItemComponent = ({data}) => {
    const {id} = data

    const palletSize = 2
    const color = id % palletSize ? `#039BE5` : `#FF5722`

    const style = {
        fontFamily: `Roboto`,
        fontSize: `50px`,
        color: `#FFFFFF`,
        lineHeight: `100px`,
        textAlign: `center`,
        display: `block`,
        width: `100%`,
        height: `100%`,
        backgroundColor: color
    }
    return (
        <div style={style}>
            {id}
        </div>
    )
}

const props = {
    ItemComponent,
    items,
    itemWidth: 100,
    itemHeight: 100,
    paddingTop: 100
}

const wrapperStyle = {
    height: `100vh`,
    width: `100vw`
}

document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        <div style={wrapperStyle}>
            <Ingrid {...props} />
        </div>,
        document.getElementById(`app`)
    )
})