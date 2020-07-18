import React from 'react'
import { NavBar, Icon, WingBlank } from 'antd-mobile';
import './css/main.css'
import Tablebar from '../../components/Tablebar.js'
import SearchBar from './js/SearchBar.js'
import MyCarousel from './js/Carousel.js'
import MyGrid from './js/Grid.js'

export default class Home extends React.Component {
	state = {
		data: ['1', '2', '3', '4']
	}
	SearchFn(){
		this.props.history.push('/search')
	}
	GoodsDetailFn(){
		this.props.history.push('/goodsdetail')
	}
	render() {
		return (
			<div>
				<HomeNavBar></HomeNavBar>
				<div className="home_content">
					<div style={{ width:"100%", height:"200px", backgroundColor:"#E83538", borderBottomRightRadius:"40px", borderBottomLeftRadius:"40px", overflow:"hidden"}}>
						<div onClick={this.SearchFn.bind(this)}>
							<SearchBar disabled></SearchBar>
						</div>
						<div style={{ position: "relative" }}>
							<img className="user_img" src={require('../../assets/imgs/头像1.jpg')} alt=""></img>
							<span className="user_name">豆一六</span>
							<div className='user_level'>红海会员</div>
							{/* <Button className="user_level" inline size="small">红海会员</Button> */}
						</div>
					</div>
					<MyCarousel></MyCarousel>
					<MyGrid props={this.props}></MyGrid>
					<div className="beer">
						<img className="beer_cover" src={require('../../assets/imgs/啤酒.jpg')} alt=""></img>
						<WingBlank>
							<ul className="goods_list">
								{this.state.data.map(val =>(
									<li className="one_goods" onClick={this.GoodsDetailFn.bind(this)}>
										<img className="goods_img" key={val} src={require(`../../assets/imgs/啤酒${val}.jpg`)} alt=""></img>
										<div className="goods_name">海底捞经典大麦啤酒500ml*12听</div>
										<div className="goods_price">￥ 28.9</div>
									</li>
								))}
							</ul>
						</WingBlank>
					</div>
					<div className="hotpot">
						<img className="hotpot_cover" src={require('../../assets/imgs/火锅.jpg')} alt=""></img>
						<WingBlank>
							<ul className="goods_list">
								{this.state.data.map(val =>(
									<li className="one_goods" onClick={this.GoodsDetailFn.bind(this)}>
										<img className="goods_img" key={val} src={require(`../../assets/imgs/火锅${val}.jpg`)} alt=""></img>
										<div className="goods_name">海底捞番茄牛腩自煮火锅</div>
										<div className="goods_price">￥ 29.9</div>
									</li>
								))}
							</ul>
						</WingBlank>
					</div>
					<div className="hotpot_seasoning">
						<img className="seasoning_cover" src={require('../../assets/imgs/底料.jpg')} alt=""></img>
						<WingBlank>
							<ul className="goods_list">
								{this.state.data.map(val =>(
									<li className="one_goods" onClick={this.GoodsDetailFn.bind(this)}>
										<img className="goods_img" key={val} src={require(`../../assets/imgs/底料${val}.jpg`)} alt=""></img>
										<div className="goods_name">海底捞番茄牛腩火锅底料</div>
										<div className="goods_price">￥ 18.9</div>
									</li>
								))}
							</ul>
						</WingBlank>
					</div>
				</div>
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
			rightContent={[
				<Icon style={{color:"black"}} key="1" type="ellipsis" />,
			]}
			>
				<span style={{ position:"relative" , right:"150px"}}>首页</span>
			</NavBar>
		</div>
	)
}