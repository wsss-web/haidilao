import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './myadress.css'
import { List } from 'antd-mobile';
import Odrer from './odrer';
const Item = List.Item;
const Brief = Item.Brief;
var createReactClass = require('create-react-class');
var Myadress = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view'>
		        <div className='my_title'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>收货地址列表</span>
				</div>
				<Address />
				<Address />
				<Address />
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
class Address extends React.Component{
	render(){
		return <div className='shou_quan'>
		<div className='shou_ordert'><span>收货人：</span><span>二狗子</span><span style={{marginLeft:9}}>13333333333</span></div>
		<div className='shou_orderc'>
			<div className='my_soud'>河南省郑州市高新区二狗培训基地</div>
		</div>
		<div className='shou_cao'>
		    <div className='shou_bian' style={{marginRight:9}}><img className='duihao' src={require('../../icon/duihao.png')}/><span>默认地址</span></div>
			<div className='shou_di' style={{marginRight:9}}>删除</div>
			<div className='shou_di'>编辑</div>
		</div>
	</div>
	}
}
export default Myadress