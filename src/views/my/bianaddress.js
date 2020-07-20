import React from 'react'
import './bianaddress.css'
import axios from 'axios';
// import Tablebar from '../../components/Tablebar'
import { List, InputItem, Switch, Stepper, Range, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
const Item = List.Item;
var createReactClass = require('create-react-class');
var Bianaddress = createReactClass({
	render: function() {
		console.log(this.props.location.query.val)
	  return <div>
		        <div className='bian_view'>
		        <div className='bian_title'>
					<div className='Rorder' onClick={()=>{this.props.history.push('/myadress')}}></div><span style={{marginLeft:4}}>编辑地址</span>
				</div>
				<BasicInputWrapper c={this.props.history} d={this.props.location.query.val}/>
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
		  a.user = '0001'
		  a.id = this.props.d.id
		  console.log(a);
		  axios.post('http://localhost:3001/bianaddress',{a:a})
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
	componentDidMount(){
		const sb = this.props.d
		this.props.form.setFieldsValue({
			name:sb.receiver,
			tel:sb.receiverTelnumber,
			address:sb.receiverAddress
		})
	}
	onReset = () => {
	  this.props.form.resetFields();
	}
	render() {
	  const { getFieldProps, getFieldError } = this.props.form;
	//   console.log(this.props.d)
	  const sb = this.props.d
	  return (<form>
		<List
		//   renderFooter={() => getFieldError('account') && getFieldError('account').join(',')}
		>
		  <InputItem
			{...getFieldProps('name', {
			  // initialValue: 'little ant',
			})}
			clear
			placeholder={sb.receiver}
		  >收货人姓名</InputItem>
		  <InputItem {...getFieldProps('tel')} placeholder={sb.receiverTelnumber} type="text">
			联系电话
		  </InputItem>
		  <InputItem {...getFieldProps('address')} placeholder={sb.receiverAddress} type="textarea">
			收货地址
		  </InputItem>
		  {/* <List className="my-list">
			<Item extra="请选择所在地区" arrow="horizontal" >所在地区</Item>
		  </List> */}
		  <Item
			extra={<Switch {...getFieldProps('mo', { initialValue:sb.mo=='1'?true:false, valuePropName: 'checked' })} />}
		  >设置为默认地址</Item>
		</List>
		<div className='shou_wai'><div onClick={this.onSubmit} className='shou_nei'>保存地址</div></div>
	  </form>);
	}
  }
const BasicInputWrapper = createForm()(BasicInput);
export default Bianaddress