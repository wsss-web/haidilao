import React from 'react'
import { NavBar, Icon } from 'antd-mobile';

export default class Navbar extends React.Component { // eslint-disable-next-line
	constructor(props) {
		super(props)

	}
	backFn(){
		// console.log(this.props)
		// this.props.props.history.push('/home')
		// window.history.back()
		this.props.history.goBack()
	}
	render() {
		return (
				<div>
				  <NavBar
					mode="dark"
					icon={<Icon type="left" />}
					style={{ backgroundColor:"white", color:"black" }}
					onLeftClick={this.backFn.bind(this)}
					rightContent={[
					  <Icon key="1" type="ellipsis" />,
					]}
				  >{this.props.name}</NavBar>
				</div>
		)
	}
}