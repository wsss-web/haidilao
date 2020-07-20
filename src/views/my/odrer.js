import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './order.css'
import TabExample from './TabExample';
var createReactClass = require('create-react-class');
var Odrer = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view3'>
		        <div className='my_title3'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>订单列表</span>
				</div>
				<TabExample bbb={this.props.location.query}/>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
export default Odrer