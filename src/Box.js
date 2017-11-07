import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginLeft: '20px',
	marginBottom: '1.5rem',
	cursor: 'move',
	textAlign: 'center',
	display: 'inline-block',
	width: '80%',
}

const boxSource = {
	beginDrag(props) {
		return {
			name: props.name,
		}
	},
}

@DragSource(props => props.type, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Box extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		isDropped: PropTypes.bool.isRequired,
	}

	render() {
		const { name, isDropped, isDragging, connectDragSource } = this.props
		const opacity = isDragging ? 0.4 : 1

		return connectDragSource(
			<div style={{ ...style, opacity }}>
				{isDropped ? <s>{name}</s> : name}
			</div>,
		)
	}
}
