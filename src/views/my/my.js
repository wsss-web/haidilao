import React from 'react'
import Tablebar from '../../components/Tablebar'
import './my.css'
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
var createReactClass = require('create-react-class');
var My = createReactClass({
	render: function() {
	  return <div>
		        <div className='my_view'>
		        <div className='my_title'>
					<div className='Rhome'></div><span style={{marginLeft:8}}>个人中心</span>
				</div>
				<div className='mytop'>
					<img className='my_head' src={require('../../icon/my_header.png')} />
					<div className='my_name'>
						<div>去海滩捉鱼</div>
						<div style={{marginTop:8}}>15890175670</div>
						<div className='my_card'>红海会员</div>
					</div>
				</div>
				<div className='my_ding'>
					<div className='my_dan'>我的订单</div>
					<ul className='my_huo'>
						<li>
							<img src={require('../../icon/my1.png')} />
							<div>待付款</div>
						</li>
						<li>
						    <img src={require('../../icon/my2.png')} />
							<div>待发货</div>
						</li>
						<li>
						    <img src={require('../../icon/my3.png')} />
							<div>待收货</div>
						</li>
						<li>
						    <img src={require('../../icon/my4.png')} />
							<div>已完成</div>
						</li>
						<li>
						    <img src={require('../../icon/my5.png')} />
							<div>售后</div>
						</li>
					</ul>
				</div>
				<ListExample />
				<div className='my_tian'></div>
				</div>
				<Tablebar history={this.props.history}/>
			 </div>
	}
})


class ListExample extends React.Component {
	state = {
	  disabled: false,
	}
  
	render() {
	  return (<div>
		<List className="my-list">
		  <Item arrow="horizontal" onClick={() => {}}>地址管理</Item>
		  <Item arrow="horizontal" onClick={() => {}}>我的收藏</Item>
		  <Item arrow="horizontal" onClick={() => {}}>优惠券</Item>
		  <Item arrow="horizontal" onClick={() => {}}>拼团入口</Item>
		  <Item arrow="horizontal" onClick={() => {}}>砍价入口</Item>
		  <Item arrow="horizontal" onClick={() => {}}>抽奖记录</Item>
		  <Item arrow="horizontal" onClick={() => {}}>我的砍价</Item>
		  <Item arrow="horizontal" onClick={() => {}}>我的拼团</Item>
		  <Item arrow="horizontal" onClick={() => {}}>我的评价</Item>
		</List>
		<List className="my-list" style={{marginTop:9}}>
		<Item arrow="horizontal" onClick={() => {}}>重新登录</Item>
		</List>
	  </div>);
	}
  }
  
export default My