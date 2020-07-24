import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './ordershou.css'
import axios from 'axios';
var createReactClass = require('create-react-class');
var Odrershou = createReactClass({
	getInitialState: function() {
		return {list: []};
	},
	// componentDidMount:function(){
	// 	var userid = window.localStorage.getItem('userId')
	// 	const b = userid 
	// },
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view4'>
		        <div className='my_title4'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>{this.props.location.query.a}</span>
				</div>
				<img className='meng' src={require('../../icon/meng.jpg')}/>
	            <div className='meng1'>{this.props.location.query.b}</div>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
// class Ping extends React.Component{
// 	constructor(props){
// 		super(props)
// 		this.state={
// 			list: []
// 		}
// 	}
// 	render(){
// 		return this.props.aaa.map((row,index)=>{
// 			return  <div className='my_cang' key={index}>
// 						<div className='my_cang1'>
// 							<img className='cang_tu' alt='' src={row.productPicture}/>
// 							{/* require('../../icon/jiu.png') */}
// 							<div style={{marginLeft:10}}>
// 								<div>{row.productName}</div>
// 								<div style={{color:'red',marginTop:12}}>￥{row.price}</div>
// 							</div>
// 						</div>
// 						<div className='pinglun'>{row.content}</div>
// 		            </div>
// 		}) 
// 	}
// }
export default Odrershou