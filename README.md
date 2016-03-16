# React Infinite Grid [![Build Status](https://travis-ci.org/babotech/react-ingrid.svg?branch=master)](https://travis-ci.org/babotech/react-ingrid)

![Demo](https://raw.githubusercontent.com/babotech/react-ingrid/master/examples/ingrid_demo.gif)

_Hint: Pay attention to the DOM._

## Installation

```
npm install --save react-ingrid
```

## Features

*  *windowing* - render only visible items
*  relative positioning - all items position relative each other
*  supports Immutable.js

## Usage
```javascript
import Ingrid from 'react-ingrid'

// Regular array or Immutable.js List
const items = [
    {id:1, foo: 'bar'},
    ...
]

// Your component must accept 'data' prop.
const ItemComponent = ({data}) => (
    ...
)

const props = {
    ItemComponent,
    items,
    itemWidth: 100,
    itemHeight: 100
}

...
<Ingrid {...props}/>
// or with decorator
import {ingrid} from 'react-ingrid'

const Grid = ingrid(props => props)(ItemComponent)
```

## Infinite scroll

```javascript
const props = {
    ItemComponent,
    items,
    itemWidth,
    itemHeight,
    load: () => ( /* load more items */ ),
    more: Boolean, // has more
    loading: Boolean
}

<Ingrid {...props} />
```

## Example

[Watch here](http://babotech.github.io/react-ingrid/)

## License

**MIT**
