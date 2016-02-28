import React, {Component} from 'react'

import Ingrid from '../../lib'
import ReactDOM from 'react-dom'

import rndoam from 'rndoam'

let i = 0
const chunkSize = 100
const max = 1000
const generateItems = () =>
    rndoam.collection({
        id: () => i++
    }, chunkSize)

const items = generateItems()

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

const defaultProps = {
    ItemComponent,
    itemWidth: 100,
    itemHeight: 100
}

class Container extends Component {

    constructor() {
        super()
        this.state = {
            loading: false,
            more: true,
            items
        }
    }

    render() {
        const load = () => {
            this.setState({
                loading: true
            })

            setTimeout(() => {
                const moreItems = this
                    .state
                    .items
                    .concat(generateItems())
                this.setState({
                    loading: false,
                    items: moreItems,
                    more: moreItems.length < max
                })
            }, 1000)
        }
        const props = {
            ...defaultProps,
            ...this.state,
            load
        }


        return <Ingrid {...props} />
    }
}

const wrapperStyle = {
    height: `100vh`,
    width: `100vw`
}

document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        <div style={wrapperStyle}>
            <Container />
        </div>,
        document.getElementById(`app`)
    )
})