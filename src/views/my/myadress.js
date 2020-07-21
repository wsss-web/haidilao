import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './myadress.css'
// import axios from '../../model/axios';
import axios from 'axios';
var createReactClass = require('create-react-class');
var Myadress = createReactClass({
	render: function() {
		// console.log(this.props.location.query)
	  return <div>
		        <div className='my_view1'>
		        <div className='my_title1'>
					<div className='Rorder1' onClick={()=>{this.props.history.push('/my')}}></div><span style={{marginLeft:4}}>收货地址列表</span>
				</div>
				<Address z ={this.props.history}/>
				<div className='shou_wai'><div onClick={()=>{this.props.history.push('/addaddress')}} className='shou_nei'>添加新地址</div></div>
				<div className='add_add'></div>
				</div>
				{/* <Tablebar history={this.props.history}/> */}
			 </div>
	}
})
class Address extends React.Component{
	constructor(props){
		super(props)
		// this.getData=this.getData.bind(this)
		this.state={
			list: []
		}
		this.xxx=this.xxx.bind(this)
		this.yyy=this.yyy.bind(this)
	}
	componentDidMount(){
		axios.post('http://localhost:3001/dizhi',{user:'0001'})
        .then((response) => {
			console.log(response.data[0].mo)
            this.setState({
                list: response.data
			})
        })
        .catch(function (error) {
            console.log(error);
		});
	}
	xxx(a){
		axios.post('http://localhost:3001/moren',{id:a})
        .then((response) => {
			console.log(response)
			window.location.reload()
            // this.setState({
            //     list: response.data
            // })
        })
        .catch(function (error) {
            console.log(error);
		});
	}
	yyy(a){
		axios.post('http://localhost:3001/deleteaddress',{id:a})
        .then((response) => {
			console.log(response)
			window.location.reload()
            // this.setState({
            //     list: response.data
            // })
        })
        .catch(function (error) {
            console.log(error);
		});
	}
	render(){
		// this.getData()
		return this.state.list.map((val,index) => {
					return <div key={index} className='shou_quan'>
					<div className='shou_ordert'><span>收货人：</span><span>{val.receiver}</span><span style={{marginLeft:9}}>{val.receiverTelnumber}</span></div>
					<div className='shou_orderc'>
						<div className='my_soud'>{val.receiverAddress}</div>
					</div>
					<div className='shou_cao'>
						<div onClick={()=>{this.xxx(val.id)}} className={val.mo==1?'shou_bian':'shou_bian2'} style={{marginRight:9}}><img alt='' className='duihao' src={require('../../icon/duihao.png')}/><span>默认地址</span></div>
						<div onClick={()=>{this.yyy(val.id)}} className='shou_di' style={{marginRight:9}}>删除</div>
						<div onClick={()=>{this.props.z.push({pathname:'/bianaddress',query:{val:val}})}} className='shou_di'>编辑</div>
					</div>
				</div>
				})
	}
}
export default Myadress