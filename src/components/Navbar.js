import React from 'react'
import { NavBar } from 'antd-mobile';
export default class Navbar extends React.Component { // eslint-disable-next-line
	constructor(props) {
		super(props)
	}
	render() {
		return (
				<div>
				  <NavBar
					mode="dark"
					rightContent={[
					]}
					style={{backgroundColor: 'rgb(255,1,1)'}}
				  >{this.props.name}</NavBar>
				</div>
		)
	}
}