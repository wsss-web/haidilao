import React from 'react'
import { Tabs, WhiteSpace, Badge } from 'antd-mobile';
var createReactClass = require('create-react-class');

const tabs = [
  { title: <Badge>全部</Badge> },
  { title: <Badge>待付款</Badge> },
  { title: <Badge>待发货</Badge> },
  { title: <Badge>待收货</Badge> },
  { title: <Badge>已完成</Badge> },
];
var TabExample = createReactClass({
	getInitialState: function() {
		return {aaa: 0};
	  },
	xxx :function(){
		if(this.props.bbb){
			return this.props.bbb.name
		} else{
			return 0
		}
	},
	render: function() {
		return <div>
		<Tabs tabs={tabs}
		  initialPage={this.xxx()}
		  onChange={(tab, index) => { console.log('onChange', index, tab); }}
		  onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
		>
		  <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order />
			<Order />
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order />
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order />
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order />
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order />
		  </div>
		</Tabs>
		<WhiteSpace />
	  </div>
	}
})

class Order extends React.Component{
	render(){
		return <div className='order_quan'>
		<div className='order_ordert'><span>快递订单：</span><span>666666666666</span><span className='order_dai'>待付款</span></div>
		<div className='order_orderc'>
			<img className='' src={require('../../icon/jiu.png')} alt=""/>
			<div style={{marginLeft:10}}>
				<div>海底捞大麦拉格啤酒500ml*12听</div>
				<div style={{color:'red',marginTop:8}}>99.00元</div>
				<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
			</div>
			<div style={{marginLeft:94}}>x1</div>
		</div>
		<div className='order_orderb'>
			<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>34.9</span><span>元</span></div>
			<div className='order_qu1 order_qu' style={{marginRight:12}}>取消订单</div>
			<div className='order_qu'>立即付款</div>
		</div>
	</div>
	}
}
export default TabExample