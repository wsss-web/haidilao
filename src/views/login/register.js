import React from 'react'
import './login.css'
import './register.css'
import { List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios'
var createReactClass = require('create-react-class')
var Register = createReactClass({
	componentDidMount() {
	    Toast.loading('Loading...', 30, () => {
	      console.log('Load complete !!!');
	    });
	
	    setTimeout(() => {
	      Toast.hide();
	    }, 1000);
	  },
	handleClick()  {
		console.log(this.props.form.getFieldsValue())
		if( this.props.form.getFieldsValue().password1 !== this.props.form.getFieldsValue().password2 ) {
			Toast.info('两次密码输入不同', 1);
		}else if(this.props.form.getFieldsValue().password1 !== undefined && this.props.form.getFieldsValue().password2 !== undefined && this.props.form.getFieldsValue().userid !== undefined && this.props.form.getFieldsValue().address !== undefined){
			var obj = {
				userId: this.props.form.getFieldsValue().userid,
				mailbox: this.props.form.getFieldsValue().address,
				password: this.props.form.getFieldsValue().password1,
				status: 1
			}
			var that = this
			axios.post('http://localhost:3001/user',{
				data: obj
			})
				.then(
					function(res){
						console.log(res.data)
						that.props.history.push('/')
					},
					function(err){
						console.log(err)
					}
				)
		}else{
			Toast.info('请把信息填写完整', 1);
		}
	},
	render: function() {
		const { getFieldProps } = this.props.form;
		return (
				<div className="big" style={{textAlign: 'center'}}>
					<img className="logo" src="https://www.haidilao.com/english/2019/07/2019071713424793214.png" alt="" style={{marginTop: '3rem'}} />
					<img className="logo2" src="http://www.4008107107.com/images/newlast/2.gif" alt="" style={{width: '100%'}}/>
					<div className="from" style={{marginTop: '0'}}>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							>
								<InputItem
								  {...getFieldProps('userid')}
								  clear
								  placeholder="请设置账号"
								  ref={el => this.autoFocusInst = el}
								>设置账号:</InputItem>
							</List.Item>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							>
								<InputItem
								  {...getFieldProps('address')}
								  clear
								  placeholder="请输入您的邮箱"
								  ref={el => this.autoFocusInst = el}
								>输入邮箱:</InputItem>
							</List.Item>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							>
								<InputItem
								  {...getFieldProps('password1')}
								  clear
								  placeholder="请设置密码"
								  ref={el => this.autoFocusInst = el}
								>设置密码:</InputItem>
							</List.Item>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							>
								<InputItem
								  {...getFieldProps('password2')}
								  clear
								  placeholder="请重复输入密码"
								  ref={el => this.autoFocusInst = el}
								>重复密码:</InputItem>
							</List.Item>
						<div className="btn">
							<Button type="primary" style={{ width: '60%', color: 'white', textAlign: 'center', display: 'block', margin:'0 auto' }} onClick={this.handleClick}>确认</Button><WhiteSpace />
						</div>
					</div>
				</div>
		)
	}
})
var Register = createForm()(Register);
export default Register