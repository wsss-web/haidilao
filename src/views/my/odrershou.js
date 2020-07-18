import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './ordershou.css'
var createReactClass = require('create-react-class');
var Odrershou = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view4'>
		        <div className='my_title4'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>{this.props.location.query.a}</span>
				</div>
				<img className='meng' src={require('../../icon/meng.jpg')} alt=""/>
				<div className='memg1' style={{fontSize:13,color:'#aaa'}}>{this.props.location.query.b}</div>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
export default Odrershou