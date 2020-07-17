import React from 'react'
import { NavBar,Icon } from 'antd-mobile';
export default class Navbar extends React.Component { // eslint-disable-next-line
	constructor(props) {
		super(props)
	}
	render() {
		return (
				<div>
				  <NavBar
					mode="dark"
					icon={<Icon type="left" />}
					style={{ backgroundColor: 'rgb(255,1,1)', color:"black" }}
					onLeftClick={() => console.log('onLeftClick')}
					rightContent={[
					  <Icon key="1" type="ellipsis" />,
					]}
				  >{this.props.name}</NavBar>
				</div>
		)
	}
}