import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './mycang.css'
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
				<Scang />
				<Scang />
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})

class Scang extends React.Component{
	render(){
		return <div className='my_quan'>
		<div className='my_orderc'>
			<img alt='' src={require('../../icon/jiu.png')}/>
			<div style={{marginLeft:10}}>
				<div>海底捞大麦拉格啤酒500ml*12听</div>
				<div style={{color:'red',marginTop:8}}>99.00元</div>
			</div>
			<div style={{marginLeft:85}}><span className='del_shou'>取消收藏</span></div>
		</div>
	</div>
	}
}
export default Cang 