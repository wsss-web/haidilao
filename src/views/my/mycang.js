import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './mycang.css'
import axios from 'axios';
var createReactClass = require('create-react-class');
var Cang = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view2'>
		        <div className='my_title2'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>收藏</span>
				</div>
				<Scang />
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})

class Scang extends React.Component{
	constructor(props){
		super(props)
		this.state={
			list: []
		}
		this.xxx=this.xxx.bind(this)
	}
	componentDidMount(){
		const a = '0001'
		axios.post('http://localhost:3001/selectCang',{user:a})
			.then((response) => {
				// console.log(response)
				this.setState({
					list: response.data
				})
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	xxx (a){
		const b = '0001'
		console.log(a)
		axios.post('http://localhost:3001/quCang',{user:b,productNumber:a})
			.then((response) => {
				// console.log(response)
				window.location.reload()
				// this.setState({
				// 	list: response.data
				// })
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	render(){
		return this.state.list.map((row,index)=>{
			return  <div className='my_cang' key={index}>
						<div className='my_cang1'>
							<img className='cang_tu' alt='' src={row.productPicture}/>
							{/* require('../../icon/jiu.png') */}
							<div style={{marginLeft:10}}>
								<div>{row.productName}</div>
								<div style={{color:'red',marginTop:12}}>￥{row.price}</div>
							</div>
							<div className='del_cang'><span className='del_shou' onClick={()=>{this.xxx(row.productNumber)}}>取消收藏</span></div>
						</div>
		            </div>
		}) 
	}
}
export default Cang 