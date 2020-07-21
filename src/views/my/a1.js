import React from 'react'
import './TabExample.css'
import axios from 'axios';
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
		return {
			aaa: 0,
			sb: 3
		};
	  },
	componentWillMount:function(){
		if (this.props.bbb) {
			this.setState({
				sb: this.props.bbb.name
			})
		} else {
			this.setState({
				sb: 0
			})
		}
	},
	componentDidMount:function(){

	},
	xxx :function(a){
		console.log("555555" , a)
		// if(this.props.bbb){
		// 	return this.props.bbb.name
		// } else if(a!=undefined){
		// 	return a
		// } else {
		// 	return 0
		// }
		// console.log(a)
		this.setState({
			sb: a
		})
		// window.location.reload()
	},
	// yyy:function(a){
    //    this.setState({
	// 	 sb: a
	//    })
	// },
	render: function() {
		return <div>
		<Tabs tabs={tabs}
		  initialPage={this.state.sb}
		  page={this.state.sb}
		//   onChange={(tab, index) => { console.log('onChange', index, tab); }}
		  onTabClick={(tab, index) => { 
			this.setState({
				sb: index
			})
		   }}
		>
		  <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
		    <Order aaa='0'/>
			<Order aaa='1'/>
			<Order aaa='2' bbb={this.xxx}/>
			<Order aaa='3'/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='0'/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='1'/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='2' bbb={this.xxx}/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='3'/>
		  </div>
		</Tabs>
		<WhiteSpace />
	  </div>
	}
})

class Order extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list0:[],
			list1:[],
			list2:[],
			list3:[]
		}
		this.deldan=this.deldan.bind(this)
		this.queshou=this.queshou.bind(this)
	}
	// 取消订单
	deldan (a){
		console.log(a.orderNumber)
		axios.post('http://localhost:3001/delorder',{danhao:a.orderNumber})
			.then((response) => {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error);
			});
		window.location.reload()
	}
	// 确认收货
	queshou (a){
		console.log(a.orderNumber)
		axios.post('http://localhost:3001/queshou',{danhao:a.orderNumber})
			.then((response) => {
				console.log(response)
			})
			.catch(function (error) {
				console.log(error);
			});
		// window.location.reload()
		this.props.bbb(4)
	}
	componentDidMount () {
		const a = '0001'
		axios.post('http://localhost:3001/orderlist',{user:a})
			.then((response) => {
				// console.log(response.data)
				const bb = response.data
				var arr = []
				for (var i = 0;i < bb.length;i++){
					if(bb[i].userId == a){
						arr.push(bb[i])
					}
				}
				// console.log(arr)
				var list0 = []
				var list1 = []
				var list2 = []
				var list3 = []
				for (var i = 0;i < arr.length;i++){
					if(arr[i].status == '0'){
						list0.push(arr[i])
					} else if(arr[i].status == '1'){
						list1.push(arr[i])
					} else if(arr[i].status == '2'){
						list2.push(arr[i])
					} else if(arr[i].status == '3'){
						list3.push(arr[i])
					}
				}
				this.setState({
					list0: list0,
					list1: list1,
					list2: list2,
					list3: list3,
				})
				this.setState({
					list: response.data
				})
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	render(){
		if(this.props.aaa == '0'){
			return this.state.list0.map((row,index)=>{
			return <div key={index} className='order_quan'>
			<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待付款</span></div>
			<div className='order_orderc'>
				<img className='goods_img111' src={row.productPicture} alt=""/>
				<div style={{marginLeft:10}}>
					<div>{row.productName}</div>
					<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
					<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
				</div>
				<div style={{marginLeft:94}}>x1</div>
			</div>
			<div className='order_orderb'>
				<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
				<div className='order_qu1 order_qu' style={{marginRight:12}} onClick={()=>{this.deldan(row)}}>取消订单</div>
				<div className='order_qu'>立即付款</div>
			</div>
		</div>
		})
		} else if(this.props.aaa == '1'){
			return this.state.list1.map((row,index)=>{
			return <div key={index} className='order_quan'>
			<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待发货</span></div>
			<div className='order_orderc'>
				<img className='goods_img111' src={row.productPicture} alt=""/>
				<div style={{marginLeft:10}}>
					<div>{row.productName}</div>
					<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
					<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
				</div>
				<div style={{marginLeft:94}}>x1</div>
			</div>
			<div className='order_orderb'>
				<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
				<div className='order_qu1 order_qu order_ti' style={{marginRight:12}}></div>
				<div className='order_qu' onClick={()=>{alert('提醒发货成功')}}>提醒发货</div>
			</div>
		</div>
		})
		} else if(this.props.aaa == '2') {
			return this.state.list2.map((row,index)=>{
			return <div key={index} className='order_quan'>
			<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待收货</span></div>
			<div className='order_orderc'>
				<img className='goods_img111' src={row.productPicture} alt=""/>
				<div style={{marginLeft:10}}>
					<div>{row.productName}</div>
					<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
					<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
				</div>
				<div style={{marginLeft:94}}>x1</div>
			</div>
			<div className='order_orderb'>
				<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
				<div className='order_qu1 order_qu order_ti' style={{marginRight:12}}></div>
				<div className='order_qu' onClick={()=>{this.queshou(row)}}>确认收货</div>
			</div>
		</div>
		})
		} else if(this.props.aaa == '3') {
			return this.state.list3.map((row,index)=>{
				return <div className='order_quan' key={index}>
				<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>已完成</span></div>
				<div className='order_orderc'>
					<img className='goods_img111' src={row.productPicture} alt=""/>
					<div style={{marginLeft:10}}>
						<div>{row.productName}</div>
						<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
						<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
					</div>
					<div style={{marginLeft:94}}>x1</div>
				</div>
				<div className='order_orderb'>
					<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
					<div className='order_qu1 order_qu order_ti' style={{marginRight:12}}></div>
					<div className='order_qu'>评价</div>
				</div>
			</div>
			})
		}
	}
}
export default TabExample