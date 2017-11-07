import React, {Component} from 'react'
import update from 'immutability-helper'
import {DragDropContext} from 'react-dnd'
import HTML5Backend, {NativeTypes} from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import ItemTypes from './ItemTypes'

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dustbins: [
        {
          accepts: [ItemTypes.NAVBAR],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.BANNER],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.FOOTER],
          lastDroppedItem: null
        }
      ],
      boxes: [
        {
          name: 'Navbar',
          type: ItemTypes.NAVBAR
        }, {
          name: 'Banner',
          type: ItemTypes.BANNER
        }, {
          name: 'Footer',
          type: ItemTypes.FOOTER
        }
      ],
      droppedBoxNames: []
    }
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1
  }

  render() {
    const {boxes, dustbins} = this.state

    return (
      <div>
        <div style={{
          overflow: 'hidden',
          display: 'inline-block',
          width: '80%',
          float: 'right',
					height: '600px',
					overflowY: 'scroll',
					overflowX: 'hidden',
					paddingRight: '15px'
        }}>
          {dustbins.map(({
            accepts,
            lastDroppedItem
          }, index) => (<Dustbin accepts={accepts} lastDroppedItem={lastDroppedItem} onDrop={item => this.handleDrop(index, item)} key={index}/>))}
        </div>

        <div style={{
          overflow: 'hidden',
          display: 'inline-block',
          width: '18%',
					backgroundColor: '#333',
					height: '100vh',
					paddingTop: '25px'

        }}>
          {boxes.map(({
            name,
            type
          }, index) => (<Box name={name} type={type} isDropped={this.isDropped(name)} key={index}/>))}
        </div>
      </div>
    )
  }

  handleDrop(index, item) {
    const {name} = item
    const droppedBoxNames = name
      ? {
        $push: [name]
      }
      : {}

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      },
      droppedBoxNames
    }),)
  }
}
