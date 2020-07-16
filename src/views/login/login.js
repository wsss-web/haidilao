import React from 'react'
import { List, InputItem,Button, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import './login.css'
var createReactClass = require('create-react-class');
var Login = createReactClass({
	componentDidMount() {
	    // this.autoFocusInst.focus();
	  },
	handleClick()  {
		console.log(this.props.form.getFieldsValue())
	},
	render: function (){
		const { getFieldProps } = this.props.form;
		    return (
			<div>
				<img class="logo" src="https://www.haidilao.com/english/2019/07/2019071713424793214.png" alt="" />
				<div class="from">
								<List>
				    <InputItem
				      {...getFieldProps('userid')}
				      clear
				      placeholder="请输入账号"
				      ref={el => this.autoFocusInst = el}
				    >账号</InputItem>
				    <InputItem
				      {...getFieldProps('password')}
				      clear
				      placeholder="请输入密码"
									type="password"
				      ref={el => this.inputRef = el}
				    >密码</InputItem>
								</List>
								<div class="btn">
									<Button type="primary" style={{ width: '60%', color: 'white', textAlign: 'center', display: 'block', margin:'0 auto' }} onClick={this.handleClick}>确认</Button><WhiteSpace />
								</div>
								<div class="bottom">
									<span>没有账号?</span><span> | </span><span>忘记密码?</span>
								</div>
				</div>
			</div>
		    );
	}
})// eslint-disable-next-line
var Login = createForm()(Login);
export default Login