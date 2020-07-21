import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './pingjia.css'
import axios from 'axios';
import { List, TextareaItem } from 'antd-mobile';
import { createForm } from 'rc-form';
// import axios from 'axios';
var createReactClass = require('create-react-class');
var Ping = createReactClass({
	getInitialState: function() {
		return {message: 'Hello!'};
	},
	componentDidMount:function(){
       console.log(this.props.location.query.a)
	},
	render: function() {
	  return <div>
		        <div className='my_view6'>
		        <div className='my_title2'>
					<div className='Rorder' onClick={()=>{this.props.history.push({pathname:'/Order',query:{name:4}})}}></div><span style={{marginLeft:4}}>评价商品</span>
				</div>
				<div className='my_cang'>
						<div className='my_cang1'>
							<img className='cang_tu' alt='' src={this.props.location.query.a.productPicture}/>
							{/* require('../../icon/jiu.png') */}
							<div style={{marginLeft:10}}>
								<div>{this.props.location.query.a.productName}</div>
								<div style={{color:'red',marginTop:12}}>￥{this.props.location.query.a.price}</div>
							</div>
						</div>
						<div className='my_cang2'>
							<TextareaItemExampleWrapper luyou={this.props.history} bbb={this.props.location.query.a}/>
						</div>
		            </div>
				</div>
			 </div>
	}
})

class TextareaItemExample extends React.Component {
	constructor(props){
		super(props)
		this.xxx=this.xxx.bind(this)
	}
	componentDidMount() {
	//   this.autoFocusInst.focus();
	}
	xxx(){
	   var a = this.props.form.getFieldsValue()
	   var b = this.props.bbb
	   b.ping = a.note1
	   console.log(b)
	   axios.post('http://localhost:3001/pingjia',{a:b})
			.then((response) => {
				console.log(response)
				this.props.luyou.push({pathname:'/Order',query:{name:5}})
				// this.setState({
				// 	list: response.data
				// })
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	render() {
	  const { getFieldProps } = this.props.form;
	  return (
		<div className='sb'>
		  <List>
			<TextareaItem
			  {...getFieldProps('note1')}
			  rows={2}
			  placeholder="此处写评价"
			/>
		    <button className='btn' onClick={()=>{this.xxx()}}>提交评价</button>
		  </List>
		</div>
	  );
	}
  }
  
  const TextareaItemExampleWrapper = createForm()(TextareaItemExample);
export default Ping