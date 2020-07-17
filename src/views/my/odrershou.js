import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './ordershou.css'
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
var createReactClass = require('create-react-class');
var Odrershou = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view'>
		        <div className='my_title'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>{this.props.location.query.a}</span>
				</div>
				<img className='meng' src={require('../../icon/meng.jpg')} alt=""/>
				<div style={{fontSize:13,color:'#aaa'}}>{this.props.location.query.b}</div>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
export default Odrershou