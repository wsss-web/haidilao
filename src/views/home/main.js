import React from 'react'
import Tablebar from '../../components/Tablebar.js'
export default class Home extends React.Component {
	render() {
		return (
			<div>
				<h1>我是主页面</h1>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}

