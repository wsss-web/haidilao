import React from 'react'
import Tablebar from '../../components/Tablebar.js'
import NavBar from '../../components/Navbar.js'
export default class Classify extends React.Component {
	render() {
		return (
			<div>
				<NavBar name="分类"/>
				<h1>我是分类界面</h1>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}