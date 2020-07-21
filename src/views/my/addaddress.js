import React from 'react'
import './addaddress.css'
import axios from 'axios';
// import Tablebar from '../../components/Tablebar'
import { List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
var createReactClass = require('create-react-class');
var Addaddress = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='add_view'>
		        <div className='add_title'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/myadress')}}></div><span style={{marginLeft:4}}>新增地址</span>
				</div>
				<BasicInputWrapper c={this.props.history}/>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})

class BasicInput extends React.Component {
	state = {
	  value: 1,
	}
	onSubmit = () => {
	  this.props.form.validateFields({ force: true }, (error) => {
		if (!error) {
		  var a = this.props.form.getFieldsValue()
		  var userid = window.localStorage.getItem('userId')
          a.user = userid
		  console.log(a);
		  axios.post('http://localhost:3001/addaddress',{a:a})
			.then((response) => {
				console.log(response)
				this.props.c.push('/myadress')
				// this.setState({
				// 	list: response.data
				// })
			})
			.catch(function (error) {
				console.log(error);
			});
		} else {
		  alert('Validation failed');
		}
	  });
	}
	onReset = () => {
	  this.props.form.resetFields();
	}
	render() {
	  const { getFieldProps, getFieldError } = this.props.form;
  
	  return (<form>
		<List
		//   renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
		>
		  <InputItem
			{...getFieldProps('name', {
			  // initialValue: 'little ant',
			})}
			clear
			placeholder="请输入姓名"
		  >收货人姓名</InputItem>
		  <InputItem {...getFieldProps('tel')} placeholder="请输入电话" type="text">
			联系电话
		  </InputItem>
		  <InputItem {...getFieldProps('address')} placeholder="请输入地址" type="textarea">
			收货地址
		  </InputItem>
		  {/* <List className="my-list">
			<Item extra="请选择所在地区" arrow="horizontal" >所在地区</Item>
		  </List> */}
		  <Item
			extra={<Switch {...getFieldProps('mo', { initialValue: false, valuePropName: 'checked' })} />}
		  >设置为默认地址</Item>
		</List>
		<div className='shou_wai'><div onClick={this.onSubmit} className='shou_nei'>保存地址</div></div>
	  </form>);
	}
  }
const BasicInputWrapper = createForm()(BasicInput);
export default Addaddress