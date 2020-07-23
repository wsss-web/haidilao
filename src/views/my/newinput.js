import React from 'react'
// import './login.css'
// import './register.css'
import { List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import axios from 'axios'
import { createForm } from 'rc-form';
var createReactClass = require('create-react-class')
var Newinput = createReactClass({
	getInitialState: function() {
		return{
			flag: false,
		}
	},
	handleClick()  {
		var that = this
		console.log(this.props.form.getFieldsValue())
		if(this.props.form.getFieldsValue().nickname != ''){
			var obj = {
				userId: localStorage.getItem('userId'),
				status: 5,
				nickname: this.props.form.getFieldsValue().nickname
			}
			axios.post('http://localhost:3001/user', {
				data: obj
			})
				.then(
					function(res){
						that.props.getflag(that.state.flag)
					},
					function(err){
						console.log(err)
					}
				)
		}
		
		
		this.props.sb(obj.nickname)
	},
	render: function() {
		const { getFieldProps } = this.props.form;
		return (
				<div className="big" style={{textAlign: 'center',width: '100%'}}>
					<div className="from" style={{marginTop: '0'}}>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							  style = {{width: '310px'}}
							>
								<InputItem
								  {...getFieldProps('nickname')}
								  clear
								  placeholder="请设置新昵称"
								  ref={el => this.autoFocusInst = el}
								>设置昵称:</InputItem>
							</List.Item>
						<div className="btn">
							<Button type="primary" style={{ width: '60%', color: 'white', textAlign: 'center', display: 'block', margin:'0 auto' }} onClick={this.handleClick}>确认</Button><WhiteSpace />
						</div>
					</div>
				</div>
		)
	}
})
var Newinput = createForm()(Newinput);
export default Newinput