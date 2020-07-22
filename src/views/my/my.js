import React from 'react'
import Tablebar from '../../components/Tablebar'
import './my.css'
import axios from 'axios';
import { List } from 'antd-mobile';
const Item = List.Item;
var createReactClass = require('create-react-class');
var My = createReactClass({
	getInitialState: function() {
		return {userinfo: ''};
	},
	componentDidMount:function(){
		var that = this
		var userId = localStorage.getItem('userId')
		// console.log(userId)
		axios.post('http://localhost:3001/user',{
			data: {status: 4, userid: userId}
		}).then(
			function(res){
				console.log(res.data)
				that.setState({
					userinfo:res.data
				})
			},
			function(err){
			  	console.log(err)
			}
		  )
	},
	render: function() {
	  return <div>
		        <div className='my_view'>
		        <div className='my_title'>
					<div  onClick={() => {this.props.history.push('/home')}}  className='Rhome'></div><span style={{marginLeft:20,fontSize:"18px"}}>个人中心</span>
				</div>
				<div className='mytop'>
					<img className='my_head' src={this.state.userinfo.avatar} alt=""/>
					<div className='my_name'>
						<div>{this.state.userinfo.nickname}</div>
						<div style={{marginTop:8}}>{this.state.userinfo.telnumber}</div>
						<div className='my_card'>红海会员</div>
					</div>
				</div>
				<div className='my_ding'>
					<List className="my-list">
					    <Item extra="全部" arrow="horizontal" onClick={() => {this.props.history.push({pathname:'/Order',query:{name:0}})}}>我的订单</Item>
					</List>
					<ul className='my_huo'>
						<li onClick={() => {this.props.history.push({pathname:'/Order',query:{name:1}})}}>
							<img src={require('../../icon/my1.png')} alt=""/>
							<div>待付款</div>
						</li>
						<li onClick={() => {this.props.history.push({pathname:'/Order',query:{name:2}})}}>
						    <img src={require('../../icon/my2.png')} alt=""/>
							<div>待发货</div>
						</li>
						<li onClick={() => {this.props.history.push({pathname:'/Order',query:{name:3}})}}>
						    <img src={require('../../icon/my3.png')} alt=""/>
							<div>待收货</div>
						</li>
						<li onClick={() => {this.props.history.push({pathname:'/Order',query:{name:4}})}}>
						    <img src={require('../../icon/my4.png')} alt=""/>
							<div>已完成</div>
						</li>
						<li onClick={() => {this.props.history.push({pathname:'/odrershou',query:{a:'退款/售后',b:'暂无数据'}})}}>
						    <img src={require('../../icon/my5.png')} alt=""/>
							<div>售后</div>
						</li>
					</ul>
				</div>
				<ListExample aa={this.props.history}/>
				<div className='my_tian'></div>
				</div>
				<Tablebar history={this.props.history}/>
			 </div>
	}
})


class ListExample extends React.Component { // eslint-disable-next-line
	constructor(props){
		super(props)
	}
	state = {
	  disabled: false,
	}
	render() {
	  return (<div>
		<List className="my-list">
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push('/myadress')}}>地址管理</Item>
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push('/mycang')}}>我的收藏</Item>
		  <Item arrow="horizontal" onClick={() => {}}>优惠券</Item>
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push({pathname:'/odrershou',query:{a:'拼团专区',b:'暂无商品'}})}}>拼团入口</Item>
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push({pathname:'/odrershou',query:{a:'砍价专区',b:'暂无砍价商品'}})}}>砍价入口</Item>
		  <Item arrow="horizontal" onClick={() => {}}>抽奖记录</Item>
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push({pathname:'/odrershou',query:{a:'我的砍价',b:'暂无砍价信息'}})}}>我的砍价</Item>
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push({pathname:'/odrershou',query:{a:'我的拼团',b:'暂无拼团信息'}})}}>我的拼团</Item>
		  <Item arrow="horizontal" onClick={() => {this.props.aa.push({pathname:'/odrershou',query:{a:'我的评价',b:'您还没有评价哦'}})}}>我的评价</Item>
		</List>
		<List className="my-list" style={{marginTop:9}}>
		<Item arrow="horizontal" onClick={() => {}}>重新登录</Item>
		</List>
	  </div>);
	}
  }
  
export default My