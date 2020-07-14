import React from 'react'
import Tablebar from '../components/Tablebar.js'
export default class Life extends React.Component {
	render() {
		return (
			<div>
				<h1>我是生活界面 主页面</h1>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}

