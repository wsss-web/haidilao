import React from 'react'
import { List, InputItem, Button, WhiteSpace, Toast, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import './login.css'
var createReactClass = require('create-react-class');
const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="am-icon am-icon-md">
	<path fillRule="evenodd" d="M59.177 29.5s-1.25 0-1.25 2.5c0 14.47-11.786 26.244-26.253 26.244C17.206 58.244 5.417 46.47 5.417 32c0-13.837 11.414-25.29 25.005-26.26v6.252c0 .622-.318 1.635.198 1.985a1.88 1.88 0 0 0 1.75.19l21.37-8.545c.837-.334 1.687-1.133 1.687-2.384C55.425 1.99 53.944 2 53.044 2h-21.37C15.134 2 1.667 15.46 1.667 32c0 16.543 13.467 30 30.007 30 16.538 0 29.918-13.458 29.993-30 .01-2.5-1.24-2.5-1.24-2.5h-1.25" />
  </svg>
);
var Newword = createReactClass({
	handleClick()  {
		console.log(this.props.form.getFieldsValue())
		if( this.props.form.getFieldsValue().password1 !== this.props.form.getFieldsValue().password2 ) {
			Toast.info('两次密码输入不同', 1);
		}
		if( this.props.form.getFieldsValue().password1 === undefined || this.props.form.getFieldsValue().password2 === undefined ){
			Toast.info('请填写密码', 1);
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
	render: function() {
			const { getFieldProps } = this.props.form;
			    return (
				<div style={{textAlign: 'center'}}>
					<img className="logo" src="https://www.haidilao.com/english/2019/07/2019071713424793214.png" alt="" style={{marginTop: '6em'}}/>
					<img className="logo2" src="http://www.4008107107.com/images/newlast/4.gif" alt="" style={{width: '100%', border: 'none'}}/>
					<div className="from" style={{margin: '0px'}}>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							>
								<InputItem
								  {...getFieldProps('password1')}
								  clear
								  placeholder="请输入新密码"
								  ref={el => this.autoFocusInst = el}
								>新密码:</InputItem>
							</List.Item>
							<List.Item
							  multipleLine
							  style={{border: 'none'}}
							>
								<InputItem
								  {...getFieldProps('password2')}
								  clear
								  placeholder="请重复输入新密码"
								  ref={el => this.autoFocusInst = el}
								>重复密码:</InputItem>
							</List.Item>
						<div className="btn">
							<Button type="primary" style={{ width: '60%', color: 'white', textAlign: 'center', display: 'block', margin:'0 auto' }} onClick={this.handleClick}>确认</Button><WhiteSpace />
						</div>
					</div>
				</div>
			    );
	}
})
var Newword = createForm()(Newword);
export default Newword