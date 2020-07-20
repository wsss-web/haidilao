import React from 'react'
import { List, InputItem,Button, WhiteSpace, Toast, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import './login.css'
import axios from 'axios'
var createReactClass = require('create-react-class');
var Forget = createReactClass({
	getInitialState: function() {
		return{
			btnText: '发送验证码',
			btnBool: false,
			code: ''
		}
	},
	componentDidMount() {
	    Toast.loading('Loading...', 30, () => {
	      console.log('Load complete !!!');
	    });
	
	    setTimeout(() => {
	      Toast.hide();
	    }, 1000);
	},
	handleClick()  {
		var obj = {
			userid: this.props.form.getFieldsValue().userid,
			address: this.props.form.getFieldsValue().address,
			status: 4
		}
		console.log(this.props.form.getFieldsValue())
		var that = this
		console.log(this.state.code)
		if(this.props.form.getFieldsValue().code == this.state.code){
			axios.post('http://localhost:3001/user',{
				data: obj
			})
				.then(
					function(res){
						console.log(res)
						// obj = res.data
						if(res.data == '' || that.props.form.getFieldsValue().address != res.data.mailbox){
							Toast.info('账号或邮箱不存在！', 2);
						}else{
							localStorage.setItem('userId', that.props.form.getFieldsValue().userid)
							that.props.history.push('/newword')
						}
					},
					function(err){
						console.log(err)
					}
				)
		}else{
			Toast.info('验证码错误！', 2);
		}
	},
	SendVerCode() {
		var maxTime  = 10
		console.log('666')
	    this.timer = setInterval(() => {
	        if (maxTime > 0) {
	          --maxTime
	          this.setState({
	            btnText: '重新获取' + maxTime + 's',
	            btnBool: true
	          })
	        }
	        else {
	          this.setState({
	            btnText: '发送验证码',
	            btnBool: false
	          })
	        }
	      }, 1000)
		var obj = {
			userid: this.props.form.getFieldsValue().userid,
			address: this.props.form.getFieldsValue().address,
			status: 4
		}
		var that = this
		axios.post('http://localhost:3001/identify',{
			data: obj
		})
			.then(
				function(res){
					console.log(res.data)
					obj = res.data
					that.setState({
						code: obj.code
					})
					if(obj.status == 0){
						Toast.info('账号或邮箱不存在！', 2);
					}else{
						Toast.info('验证码发送成功！', 2);
					}
				},
				function(err){
					console.log(err)
				}
			)
	},
	render: function (){
		const { getFieldProps } = this.props.form;
		    return (
			<div style={{textAlign: 'center'}}>
				<img className="logo" src="https://www.haidilao.com/english/2019/07/2019071713424793214.png" alt="" style={{marginTop: '4rem'}}/>
				<img className="logo2" src="http://www.4008107107.com/images/newlast/6.gif" alt="" style={{width: '100%'}}/>
				<div className="from" style={{marginTop: '0px'}}>
						<List.Item
						  multipleLine
						  style={{border: 'none'}}
						>
							<InputItem
							  {...getFieldProps('userid')}
							  clear
							  placeholder="请输入账号"
							  ref={el => this.autoFocusInst = el}
							>账号</InputItem>
						</List.Item>
						<List.Item
						  multipleLine
						  style={{border: 'none'}}
						>
							<InputItem
							  {...getFieldProps('address')}
							  clear
							  placeholder="请输入邮箱"
							  ref={el => this.autoFocusInst = el}
							>邮箱</InputItem>
						</List.Item>
						<List.Item
						  extra={<Button type="primary" inline  onClick={this.SendVerCode} disabled={this.state.btnBool} style={{ marginRight: '4px', background: 'rgb(16,142,233)', width: '100px', fontSize: '15px' }}>{this.state.btnText}</Button>}
						  multipleLine
						>
							<InputItem
							  {...getFieldProps('code')}
							  clear
							  placeholder="验证码"
							  ref={el => this.inputRef = el}
							>验证码</InputItem>
						</List.Item>
					<div className="btn">
						<Button type="primary" style={{ width: '60%', color: 'white', textAlign: 'center', display: 'block', margin:'0 auto' }} onClick={this.handleClick}>确认</Button><WhiteSpace />
					</div>
				</div>
			</div>
		    );
	}
})
var Forget = createForm()(Forget);
export default Forget