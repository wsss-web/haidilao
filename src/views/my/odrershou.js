import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './ordershou.css'
import axios from 'axios';
var createReactClass = require('create-react-class');
var Odrershou = createReactClass({
	getInitialState: function() {
		return {list: []};
	},
	componentDidMount:function(){
		const b = '0001'
		axios.post('http://localhost:3001/myping',{user:b})
			.then((response) => {
				// console.log(response.data)
				var arr = []
				for(var i=0;i<response.data.length;i++){
					if(response.data[i].userId==b){
						arr.push(response.data[i])
					}
				}
				console.log(arr)
				// window.location.reload()
				this.setState({
					list: arr
				})
			})
			.catch(function (error) {
				console.log(error);
			});
	},
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view4'>
		        <div className='my_title4'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>{this.props.location.query.a}</span>
				</div>
				<Ping  aaa={this.state.list}/>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
class Ping extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list: []
		}
	}
	render(){
		return this.props.aaa.map((row,index)=>{
			return  <div className='my_cang' key={index}>
						<div className='my_cang1'>
							<img className='cang_tu' alt='' src={row.productPicture}/>
							{/* require('../../icon/jiu.png') */}
							<div style={{marginLeft:10}}>
								<div>{row.productName}</div>
								<div style={{color:'red',marginTop:12}}>￥{row.price}</div>
							</div>
						</div>
						<div className='pinglun'>{row.content}</div>
		            </div>
		}) 
	}
}
export default Odrershou