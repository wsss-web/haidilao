import React from 'react'
// import Tablebar from '../../components/Tablebar'
import './myadress.css'
// import axios from '../../model/axios';
import axios from 'axios';
var createReactClass = require('create-react-class');
var Myadress = createReactClass({
	titletiao:function(){
       var a = window.localStorage.getItem('sb')
	   var goodsDetail = JSON.parse(localStorage.getItem('goodsDetail'))
	   var goodsNum = JSON.parse(localStorage.getItem('goodsNum'))
       if(a=='1'){
         this.props.history.push('/checkOrder')
         window.localStorage.setItem('sb','0')
       } else if(a=='2'){
         this.props.history.push({pathname:'/confirmorder',state:{goodsdetail:goodsDetail,goodsNum:goodsNum}})
         window.localStorage.setItem('sb','0')
       }else{
         this.props.history.push('/my')
       }
    },
	render: function() {
		var flag=false
		// console.log(this.props.location.query.id)
		if (this.props.location && this.props.location.query && this.props.location.query.id) {
			if(this.props.location.query.id===1){
				flag=true
				console.log(flag)
				window.localStorage.setItem("gouwucheluyou" , 1)
			}
		}
		if(this.props.location && this.props.location.query && this.props.location.query.id2){
			if(this.props.location.query.id2==1){
				flag=true
				console.log(flag)
				window.localStorage.setItem("gouwucheluyou" , 1)
			}
		}
	  return <div>
		  
		        <div className='my_view1'>
		        <div className={flag?'dis':'my_title1'}>
					<div className='Rorder1' onClick={()=>{this.titletiao()}}></div><span style={{marginLeft:4}}>收货地址列表</span>
				</div>
				<div className={flag?'my_title1':'dis'}>
					<div className='Rorder1' onClick={()=>{this.props.history.push('/checkOrder')}}></div><span style={{marginLeft:4}}>收货地址列表</span>
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
		var userid = window.localStorage.getItem('userId')
		axios.post('http://localhost:3001/dizhi',{user:userid})
        .then((response) => {
			console.log(response.data[0].mo)
            this.setState({
                list: response.data
			})
        })
        .catch(function (error) {
            console.log(error);
		});
		////////////
		
	// }
	}
	xuandi(val){
		var goodsDetail = JSON.parse(localStorage.getItem('goodsDetail'))
	    var goodsNum = JSON.parse(localStorage.getItem('goodsNum'))
        console.log(val)
        var a = window.localStorage.getItem('sb')
        if(a=='1'){
            this.props.z.push({pathname:'/checkOrder',query:{val:val}})
            window.localStorage.setItem('sb','0')
        } else if(a=='2'){
            this.props.z.push({pathname:'/Confirmorder',state:{val:val,goodsdetail:goodsDetail,goodsNum:goodsNum}})
        } else {
            console.log('sb')
            window.localStorage.setItem('sb','0')
        }
    }
	xxx(a){
		console.log(a)
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
					return <div key={index} className='shou_quan' onClick={()=>{this.xuandi(val)}} >
					<div className='shou_ordert'><span>收货人：</span><span>{val.receiver}</span><span style={{marginLeft:9}}>{val.receiverTelnumber}</span></div>
					<div className='shou_orderc'>
						<div className='my_soud'>{val.receiverAddress}</div>
					</div>
					<div className='shou_cao'>
						<div onClick={(event)=>{event.stopPropagation();this.xxx(val)}} className={val.mo==1?'shou_bian':'shou_bian2'} style={{marginRight:9}}><img alt='' className='duihao' src={require('../../icon/duihao.png')}/><span>默认地址</span></div>
						<div onClick={(event)=>{event.stopPropagation();this.yyy(val.id)}} className='shou_di' style={{marginRight:9}}>删除</div>
						<div onClick={(event)=>{event.stopPropagation();this.props.z.push({pathname:'/bianaddress',query:{val:val}})}} className='shou_di'>编辑</div>
					</div>
				</div>
				})
	}
}
export default Myadress