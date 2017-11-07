import React, { Component } from 'react'
import Container from './Container'

export default class DustbinMultipleTargets extends Component {
	render() {
		return (
			<div>
				<p>
					<b>
						Gustavo's car page platform v0.1
					</b>
				</p>
				<p>This is a interesting example using drag and drop.</p>
				<p>
					It demonstrates how a single drop target may accept specific type of content,
					and how those types may be derived from props. It also demostrates the fast nature of react rendering
				</p>
				<Container />
			</div>
		)
	}
}
