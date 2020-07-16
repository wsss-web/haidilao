import React from 'react'
import { NavBar, Icon } from 'antd-mobile';
import Tablebar from '../../components/Tablebar.js'
import SearchBar from './SearchBar.js'
import MyCarousel from './Carousel.js'

export default class Home extends React.Component {
	render() {
		return (
			<div>
				<HomeNavBar></HomeNavBar>
				<div style={{ width:"100%", height:"200px", backgroundColor:"#E83538", borderRadius:"20px", overflow:"hidden"}}>
					<SearchBar></SearchBar>
					<div>

					</div>
				</div>
				<MyCarousel></MyCarousel>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}

function HomeNavBar (){
	return(
		<div>
			<NavBar
			mode="light"
			// icon={<Icon type="left" />}
			onLeftClick={() => console.log('onLeftClick')}
			rightContent={[
				<Icon style={{color:"black"}} key="1" type="ellipsis" />,
			]}
			>
				<span style={{ position:"relative" , right:"150px"}}>首页</span>
			</NavBar>
		</div>
	)
}