import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import Navbar from './navbar.js'
import Section from './section.js'
import Footer from './footer.js'

const style = {
	height: '12rem',
	width: '100%',
	marginRight: '1.5rem',
	marginBottom: '0',
	color: 'white',
	textAlign: 'center',
	fontSize: '1rem',
	float: 'right',
	display: 'inline-block',
	overflow: 'hidden'
}

const dustbinTarget = {
	drop(props, monitor) {
		props.onDrop(monitor.getItem())
	},
}

@DropTarget(props => props.accepts, dustbinTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
export default class Dustbin extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
		accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
		lastDroppedItem: PropTypes.object,
		onDrop: PropTypes.func.isRequired,
	}

	render() {
		const {
			accepts,
			isOver,
			canDrop,
			connectDropTarget,
			lastDroppedItem,
		} = this.props
		const isActive = isOver && canDrop
		let backgroundColor = '#222'
		if (isActive) {
			backgroundColor = 'darkgreen'
		} else if (canDrop) {
			backgroundColor = 'darkkhaki'
		}
		if (lastDroppedItem){
			backgroundColor = 'transparent'
		}
		let height = '12rem'
		if (lastDroppedItem){
			height = 'auto'
		}
		let margin = '10px'
		if (lastDroppedItem){
			margin = '0'
		}
		return connectDropTarget(
			<div style={{ ...style, backgroundColor, height, margin }}>
				{!lastDroppedItem && (
					<p style={{marginTop: '40px', fontSize: '16px'}}> coloque {accepts[0]}  </p>
				)}
				{(lastDroppedItem && lastDroppedItem.name == 'Navbar') && (
					<div>
					<Navbar/>
				</div>
				)}
				{(lastDroppedItem && lastDroppedItem.name == 'Banner') && (
					<div>
					<Section/>
				</div>
				)}
				{(lastDroppedItem && lastDroppedItem.name == 'Footer') && (
					<div>
					<Footer/>
				</div>
				)}
			</div>,
		)
	}
}
