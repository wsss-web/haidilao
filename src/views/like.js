import React from 'react'
import Tablebar from '../components/Tablebar.js'
// import { NavBar, Icon } from 'antd-mobile';
import NavBar from '../components/Navbar.js'
export default class Like extends React.Component {
	render() {
		return (
			<div>
				<NavBar name="口碑"/>
				<h1>我是口碑界面</h1>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}