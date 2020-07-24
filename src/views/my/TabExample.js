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
  { title: <Badge>待评价</Badge> },
];
var TabExample = createReactClass({
	getInitialState: function() {
		return {
			aaa: 0,
			sb: 3,
			list:[],
			list0:[],
			list1:[],
			list2:[],
			list3:[]
		};
	  },
	componentWillMount:function(){
		if (this.props.bbb) {
			if(this.props.bbb.name==5){
				this.setState({
					sb: 4
				})
			} else{
                this.setState({
					sb: this.props.bbb.name
				})
			}
		} else {
			this.setState({
				sb: 0
			})
		}
	},
	componentDidMount () {
		console.log('组件挂载。。。。。')
		var userid = window.localStorage.getItem('userId')
		const a = userid
		axios.post('http://localhost:3001/orderlist',{user:a})
			.then((response) => {
				// console.log(response.data)
				const bb = response.data
				this.setState({
					list:bb
				})
				var arr = []
				for (var i = 0;i < bb.length;i++){
					if(bb[i].userId == a){
						arr.push(bb[i])
					}
				}
				console.log(arr)
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
			})
			.catch(function (error) {
				console.log(error);
			});
	},
	xxx :function(a,b){
		var tmp_list = this.state.list2
		var tmp_list3 = this.state.list3
		var big_list = this.state.list

		var dele_index = "aaa"
		for (var i = 0; i < tmp_list.length; i++) {
			if (b.orderNumber == tmp_list[i].orderNumber) {
				dele_index = i
			}
		}


		if (dele_index != "aaa") {
			tmp_list.splice(dele_index , 1)
			b.status = "3"
			tmp_list3.push(b)
		}

		for (var i = 0; i < big_list.length; i++) {
			if (b.orderNumber == big_list[i].orderNumber) {
				big_list[i].status = "3"
			}
		}
		this.setState(
			{
				list2: tmp_list,
				list3: tmp_list3,
				list:big_list,
				sb: a

			}
		)
	},
	fukuan:function(a,b){
		alert('付款成功')
		var tmp_list0 = this.state.list0
		var tmp_list1 = this.state.list1
		var dele_index = "aaa"
		for (var i = 0; i < tmp_list0.length; i++) {
			if (b.orderNumber == tmp_list0[i].orderNumber) {
				dele_index = i
			}
		}
		if (dele_index != "aaa") {
			tmp_list0.splice(dele_index , 1)
			b.status = "3"
			tmp_list1.push(b)
		}
		this.setState(
			{
				list0: tmp_list0,
				list1: tmp_list1,
				sb: a
			}
		)
          
	},
	delding:function(a){
		var tmp_list0 = this.state.list0
		var del_index = "aaa"
		for (var i = 0; i < tmp_list0.length; i++) {
			if (a.orderNumber == tmp_list0[i].orderNumber) {
				del_index = i
			}
		}
		if (del_index != "aaa") {
			tmp_list0.splice(del_index , 1)
		}
		this.setState({
			list0:tmp_list0
		})
	},
	pingjia:function(){
       console.log("大傻逼")
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
		  swipeable={false}
		//   onChange={(tab, index) => { console.log('onChange', index, tab); }}
		  onTabClick={(tab, index) => { 
			this.setState({
				sb: index
			})
		   }}
		>
		  <div style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
		    <Order aaa='0' fukuan={this.fukuan} delding={this.delding} list={this.state.list0}/>
			<Order aaa='1' list={this.state.list1}/>
			<Order aaa='2' bbb={this.xxx} list={this.state.list2}/>
			<Order aaa='3' list={this.state.list3}  ping={this.props.tiao}/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='0' fukuan={this.fukuan} delding={this.delding} list={this.state.list0}/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='1' list={this.state.list1}/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='2' bbb={this.xxx} list={this.state.list2}/>
		  </div>
		  <div style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
			<Order aaa='3' list={this.state.list3} ping={this.props.tiao} pingjia={this.pingjia}/>
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
		}
		this.deldan=this.deldan.bind(this)
		this.queshou=this.queshou.bind(this)
		this.fukuan=this.fukuan.bind(this)
	}
	// 取消订单
	deldan (a){
		console.log(a.orderNumber)
		axios.post('http://localhost:3001/delorder',{danhao:a.orderNumber})
			.then((response) => {
				console.log(response)
				this.props.delding(a)
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	// 确认收货
	queshou (a){
		this.props.bbb(4,a)
		console.log(a.orderNumber)
		axios.post('http://localhost:3001/queshou',{danhao:a.orderNumber})
			.then((response) => {
				console.log(response)
				// this.props.bbb(4,a.orderNumber)
			})
			.catch(function (error) {
				console.log(error);
			});
		// window.location.reload()
	}
	// 立即付款
	fukuan (a){
		this.props.fukuan(2,a)
	   axios.post('http://localhost:3001/fukuan',{danhao:a.orderNumber})
			.then((response) => {
				console.log(response)
				// this.props.bbb(4,a.orderNumber)
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	render(){
		if(this.props.aaa == '0'){
			return this.props.list.map((row,index)=>{
			return <div key={index} className='order_quan'>
			<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待付款</span></div>
			<div className='order_orderc'>
				<img className='goods_img111' src={row.productPicture} alt=""/>
				<div style={{width:"200px",marginLeft:10}}>
					<div>{row.productName}</div>
					<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
					<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
				</div>
				<div style={{position:"relative",left:"50px"}}>x {row.shuliang}</div>
			</div>
			<div className='order_orderb'>
				<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
				<div className='order_qu1 order_qu' style={{marginRight:12}} onClick={()=>{this.deldan(row)}}>取消订单</div>
				<div className='order_qu' onClick={()=>{this.fukuan(row)}}>立即付款</div>
			</div>
		</div>
		})
		} else if(this.props.aaa == '1'){
			return this.props.list.map((row,index)=>{
			return <div key={index} className='order_quan'>
			<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待发货</span></div>
			<div className='order_orderc'>
				<img className='goods_img111' src={row.productPicture} alt=""/>
				<div style={{width:"200px",marginLeft:10}}>
					<div>{row.productName}</div>
					<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
					<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
				</div>
				<div style={{position:"relative",left:"50px"}}>x {row.shuliang}</div>
			</div>
			<div className='order_orderb'>
				<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
				<div className='order_qu1 order_qu order_ti' style={{marginRight:12}}></div>
				<div className='order_qu' onClick={()=>{alert('提醒发货成功')}}>提醒发货</div>
			</div>
		</div>
		})
		} else if(this.props.aaa == '2') {
			return this.props.list.map((row,index)=>{
			return <div key={index} className='order_quan'>
			<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待收货</span></div>
			<div className='order_orderc'>
				<img className='goods_img111' src={row.productPicture} alt=""/>
				<div style={{width:"200px",marginLeft:10}}>
					<div>{row.productName}</div>
					<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
					<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
				</div>
				<div style={{position:"relative",left:"50px"}}>x {row.shuliang}</div>
			</div>
			<div className='order_orderb'>
				<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
				<div className='order_qu1 order_qu order_ti' style={{marginRight:12}}></div>
				<div className='order_qu' onClick={()=>{this.queshou(row)}}>确认收货</div>
			</div>
		</div>
		})
		} else if(this.props.aaa == '3') {
			return this.props.list.map((row,index)=>{
				return <div className='order_quan' key={index}>
				<div className='order_ordert'><span>快递订单：</span><span>{row.orderNumber}</span><span className='order_dai'>待评价</span></div>
				<div className='order_orderc'>
					<img className='goods_img111' src={row.productPicture} alt=""/>
					<div style={{width:"200px",marginLeft:10}}>
						<div>{row.productName}</div>
						<div style={{color:'red',marginTop:8}}>￥{row.price}</div>
						<div style={{marginTop:5,fontSize:9}}>支付方式:现金购买</div>
					</div>
					<div style={{position:"relative",left:"50px"}}>x {row.shuliang}</div>
				</div>
				<div className='order_orderb'>
					<div className='order_zong' style={{marginLeft:2}}><span>合计：</span><span>{row.totalPrice}</span><span>元</span></div>
					<div className='order_qu1 order_qu order_ti' style={{marginRight:12}}></div>
					<div className='order_qu' onClick={()=>{this.props.ping.push({pathname:'/pingjia',query:{a:row,pingjia:this.props.pingjia}})}}>评价</div>
				</div>
			</div>
			})
		}
	}
}
export default TabExample