import React from 'react'
import { List, InputItem,Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import './login.css'
import axios from 'axios'
var createReactClass = require('create-react-class');
var Login = createReactClass({
	componentDidMount() {
	  },
	handleClick()  {
		var obj = {
			userid: this.props.form.getFieldsValue().userid,
			password: this.props.form.getFieldsValue().password,
			status: 4
		}
		var that = this
		axios.post('http://localhost:3001/user', {
		  data: obj,
		})
		  .then(function (res) {
		    console.log(res)
			obj = res.data
			console.log(obj)
			console.log(that.props.form.getFieldsValue())
			if(obj.userId == that.props.form.getFieldsValue().userid && obj.password == that.props.form.getFieldsValue().password){
				localStorage.setItem('userId', that.props.form.getFieldsValue().userid)
				that.props.history.push('/home')
				console.log('Tiao')
			}else{
				Toast.info('密码错误', 2);
			}
			if(obj == ''){
				Toast.info('账号不存在,请注册', 2);
			}
		  })
	},
	forget() {
		this.props.history.push('/forget')
	},
	register() {
		this.props.history.push('/register')
	},
	render: function (){
		const { getFieldProps } = this.props.form;
		    return (
			<div style={{textAlign: 'center'}}>
				<img className="logo" src="https://www.haidilao.com/english/2019/07/2019071713424793214.png" alt="" />
				<div className="from">
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
								<div className="btn">
									<Button type="primary" style={{ width: '60%', color: 'white', textAlign: 'center', display: 'block', margin:'0 auto' }} onClick={this.handleClick}>确认</Button><WhiteSpace />
								</div>
								<div className="bottom">
									<span onClick={this.register}>没有账号?</span><span> | </span><span onClick={this.forget}>忘记密码?</span>
								</div>
				</div>
			</div>
		    );
	}
})// eslint-disable-next-line
var Login = createForm()(Login);
export default Login