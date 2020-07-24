import React from 'react'
import axios from 'axios'
import { NavBar, Icon, WingBlank } from 'antd-mobile';
import './css/main.css'
import Tablebar from '../../components/Tablebar.js'
import SearchBar from './js/SearchBar.js'
import MyCarousel from './js/Carousel.js'
import MyGrid from './js/Grid.js'

export default class Home extends React.Component {
	state = {
		data: ['1', '2', '3', '4'],
		userinfo: ''
	}
	SearchFn(){
		this.props.history.push('/search')
	}
	componentDidMount(){
		var that = this
		var userId = localStorage.getItem('userId')
		// console.log(userId)
		axios.post('http://localhost:3001/user',{
			data: {status: 4, userid: userId}
		}).then(
			function(res){
				// console.log(res.data)
				that.setState({
					userinfo:res.data
				})
			},
			function(err){
			  	console.log(err)
			}
		  )
	}
	render() {
		return (
			<div>
				<HomeNavBar></HomeNavBar>
				<div className="home_content">
					<div className="beijing" style={{ width:"100%", height:"200px", borderBottomRightRadius:"40px", borderBottomLeftRadius:"40px", overflow:"hidden"}}>
						<div onClick={this.SearchFn.bind(this)}>
							<SearchBar disabled></SearchBar>
						</div>
						<div style={{ position: "relative" }}>
							<img className="user_img" src={this.state.userinfo.avatar} alt=""></img>
							<span className="user_name">{this.state.userinfo.nickname}</span>
							<div className='user_level'>红海会员</div>
							{/* <Button className="user_level" inline size="small">红海会员</Button> */}
						</div>
					</div>
					<MyCarousel></MyCarousel>
					<MyGrid history={this.props.history}></MyGrid>
					<div className="beer">
						<img className="beer_cover" src={require('../../assets/imgs/啤酒.jpg')} alt=""></img>
						<WingBlank>
							<ul className="goods_list">
								<Beer history={this.props.history}></Beer>
							</ul>
						</WingBlank>
					</div>
					<div className="hotpot">
						<img className="hotpot_cover" src={require('../../assets/imgs/火锅.jpg')} alt=""></img>
						<WingBlank>
							<ul className="goods_list">
								<Hotpot history={this.props.history}></Hotpot>
							</ul>
						</WingBlank>
					</div>
					<div className="hotpot_seasoning">
						<img className="seasoning_cover" src={require('../../assets/imgs/底料.jpg')} alt=""></img>
						<WingBlank>
							<ul className="goods_list">
								<Seasoning history={this.props.history}></Seasoning>
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

// 啤酒类商品
var createReactClass = require('create-react-class');
var Beer = createReactClass({
	getDefaultProps: function() {
		return {
		};
	},
	getInitialState: function() {
		return {
			beer: []
		};
	},
	GoodsDetailFn(item){
		var that = this
		that.props.history.push({pathname:'/goodsdetail',state:{item:item}})
		// console.log(item)
	},
	componentDidMount() {
		var that = this
		axios.post('http://localhost:3001/goodsInfoMana',{
			data: {status:5,goods_type:'啤酒'}
		}).then(
			function(res){
				// console.log(res.data)
				that.setState({
					beer: res.data.slice(0,4)
				})
			},
			function(err){
			  	console.log(err)
			}
		  )
	},
	render(){
		return(
			this.state.beer.map((item,index) =>(
				<li className="one_goods" onClick={()=>this.GoodsDetailFn(item)} key={index}>
					<img className="goods_img" src={this.state.beer[index].productPicture} alt=""></img>
					<div className="goods_name">{this.state.beer[index].productName}</div>
					<div className="goods_price">￥ {this.state.beer[index].price}</div>
				</li>
			))
		)
	}
})

// 自煮小火锅类商品
var Hotpot = createReactClass({
	getDefaultProps: function() {
		return {
		};
	},
	getInitialState: function() {
		return {
			hotpot: []
		};
	},
	GoodsDetailFn(item){
		var that = this
		that.props.history.push({pathname:'/goodsdetail',state:{item:item}})
	},
	componentDidMount() {
		var that = this
		axios.post('http://localhost:3001/goodsInfoMana',{
			data: {status:5,goods_type:'火锅'}
		}).then(
			function(res){
				// console.log(res.data)
				that.setState({
					hotpot: res.data.slice(0,4)
				})
			},
			function(err){
			  	console.log(err)
			}
		  )
	},
	render(){
		return(
			this.state.hotpot.map((item,index) =>(
				<li className="one_goods" onClick={()=>this.GoodsDetailFn(item)} key={index}>
					<img className="goods_img" src={this.state.hotpot[index].productPicture} alt=""></img>
					<div className="goods_name">{this.state.hotpot[index].productName}</div>
					<div className="goods_price">￥ {this.state.hotpot[index].price}</div>
				</li>
			))
		)
	}
})

// 火锅底料类商品
var Seasoning = createReactClass({
	getDefaultProps: function() {
		return {
		};
	},
	getInitialState: function() {
		return {
			seasoning: []
		};
	},
	GoodsDetailFn(item){
		var that = this
		that.props.history.push({pathname:'/goodsdetail',state:{item:item}})
	},
	componentDidMount() {
		var that = this
		axios.post('http://localhost:3001/goodsInfoMana',{
			data: {status:5,goods_type:'火锅底料'}
		}).then(
			function(res){
				// console.log(res.data)
				that.setState({
					seasoning: res.data.slice(0,4)
				})
			},
			function(err){
			  	console.log(err)
			}
		  )
	},
	render(){
		return(
			this.state.seasoning.map((item,index) =>(
				<li className="one_goods" onClick={()=>this.GoodsDetailFn(item)} key={index}>
					<img className="goods_img" src={this.state.seasoning[index].productPicture} alt=""></img>
					<div className="goods_name">{this.state.seasoning[index].productName}</div>
					<div className="goods_price">￥ {this.state.seasoning[index].price}</div>
				</li>
			))
		)
	}
})