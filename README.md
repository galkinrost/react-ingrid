# React Infinite Grid [![Build Status](https://travis-ci.org/babotech/react-ingrid.svg?branch=master)](https://travis-ci.org/babotech/react-ingrid)

## Installation

```
npm install --save react-ingrid
```

## Features

*  *windowing* - render only visible items
*  relative positioning - all items position relative each other

## Usage
```javascript
import Ingrid from 'react-ingrid'

const items = [
    {id:1, foo: 'bar'},
    ...
]

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

## Infinit scroll

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

## Examples

[Watch here](https://github.com/babotech/react-ingrid/tree/master/examples)

## License 

**MIT**
