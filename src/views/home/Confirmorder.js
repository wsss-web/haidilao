import React from "react";
import axios from "axios";
import { NavBar, Icon, WingBlank, TabBar, Toast } from 'antd-mobile';
export default class Confirm extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state={
            goodsdetail:'',
            morenadress:[],
            goodsNum:''
        }
    }
    componentWillMount(){
        var val = this.props.location.state.val
        // console.log(val)
        var that = this
        var userId = localStorage.getItem('userId')
        // console.log(userId)
        this.setState({
            goodsdetail:this.props.location.state.goodsdetail,
            goodsNum:this.props.location.state.goodsNum
        })
        if(val === undefined){
            axios.post('http://localhost:3001/moaddress',{
            data: {userId:userId}
            }).then(
            function(res){
                console.log(res.data)
                that.setState({
                    morenadress:res.data
                })
                if(that.state.morenadress.length === 0){
                    that.refs.noadress.style.display = "block"
                }else{
                    that.refs.adress.style.display = "block"
                }  
            },
            function(err){
                console.log(err)
            }
            )
        }else{
            // console.log(val)
            that.setState({
                morenadress:val
            })
            setTimeout(() => {
                that.refs.adress.style.display = "block"
            }, 10);
            
        }     
    }
    addadressFn(){
        // console.log('11111')
        localStorage.setItem('goodsDetail', JSON.stringify(this.state.goodsdetail))
        var goodsDetail = JSON.parse(localStorage.getItem('goodsDetail'))
        localStorage.setItem('goodsNum', JSON.stringify(this.state.goodsNum))
        var goodsNum = JSON.parse(localStorage.getItem('goodsNum'))
        localStorage.setItem('sb','2')
        this.props.history.push({pathname:'/myadress',state:{goodsdetail:goodsDetail,goodsNum:goodsNum}})
    }
    timestampToTime(timestamp){
        // console.log(timestamp)
        var date = new Date(timestamp - 0);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
          var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
          var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
          var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
          
          var strDate = Y+M+D+h+m+s;
          return strDate;
      }
    payFn(){
        var that = this
        var orderNumber = new Date().getTime()
        var generationTime  = this.timestampToTime(orderNumber)
        var userId = localStorage.getItem('userId')
        var quantity = {quantity:this.state.goodsNum}
        var productNumber = Object.assign(this.state.goodsdetail, quantity);
        var totalPrice = ((this.state.goodsdetail.price)*(this.state.goodsNum)).toFixed(2)
        axios.post('http://localhost:3001/submitorder',{
            data: {orderNumber:orderNumber,
                    userId:userId,
                    productNumber:[productNumber],
                    generationTime:generationTime,
                    totalPrice:totalPrice,
                    status:1,
                    shuliang:that.state.goodsNum,
                    shouaddress:that.state.morenadress.receiverAddress,
                    shouperson:that.state.morenadress.receiver,
                    shoutel:that.state.morenadress.receiverTelnumber
                    }
            }).then(
            function(res){
                // console.log(res.data)
                Toast.info('购买成功，等待发货' , 1 );
                that.props.history.push({pathname:'/Order',query:{name:2}})
            },
            function(err){
                console.log(err)
            }
            )
    }
    submitorderFn(){
        var that = this
        var orderNumber = new Date().getTime()
        var generationTime  = this.timestampToTime(orderNumber)
        var userId = localStorage.getItem('userId')
        var quantity = {quantity:this.state.goodsNum}
        var productNumber = Object.assign(this.state.goodsdetail, quantity);
        var totalPrice = ((this.state.goodsdetail.price)*(this.state.goodsNum)).toFixed(2)
        axios.post('http://localhost:3001/submitorder',{
            data: {orderNumber:orderNumber,
                    userId:userId,
                    productNumber:[productNumber],
                    generationTime:generationTime,
                    totalPrice:totalPrice,
                    status:0,
                    shuliang:that.state.goodsNum,
                    shouaddress:that.state.morenadress.receiverAddress,
                    shouperson:that.state.morenadress.receiver,
                    shoutel:that.state.morenadress.receiverTelnumber
                    }
            }).then(
            function(res){
                // console.log(res.data)
                Toast.info('已提交订单，等待付款' , 1 );
                that.props.history.push({pathname:'/Order',query:{name:1}})
            },
            function(err){
                console.log(err)
            }
            )
    }
    render(){
        // console.log(this.state.goodsdetail)
        // console.log(this.state.goodsNum)
        // console.log(this.state.morenadress)
        return(
            <div>
                <Navbar name="确认订单" history={this.props.history} goodsdetail={this.state.goodsdetail}></Navbar>
                <div style={{width:"100%",height:"560px",backgroundColor:"rgb(236, 233, 233)",overflow:"scroll"}}>
                    <WingBlank>
                        <div style={{width:"100%",
                                height:"80px",
                                backgroundColor:"#F60100",
                                borderRadius:"10px",
                                marginTop:"15px"}}>
                            <div ref="adress" style={{display:"none"}}>
                                <span style={{color:"white",position:"relative",left:"15px",top:"18px"}}>{this.state.morenadress.receiver}</span>
                                <span style={{color:"white",position:"relative",left:"35px",top:"18px"}}>{this.state.morenadress.receiverTelnumber}</span>
                                <div style={{color:"white",position:"relative",left:"15px",top:"30px"}}>{this.state.morenadress.receiverAddress}</div>
                                <img style={{width:"20px",height:"20px",position:"relative",left:"300px",bottom:"5px"}} 
                                    src={require("../../assets/icons/右箭头.png")}
                                    onClick={this.addadressFn.bind(this)}
                                    alt=""></img>
                            </div>
                            <div ref="noadress" style={{display:"none"}}>
                                <span style={{color:"white",position:"relative",left:"15px",top:"22px"}}>请先添加收货地址</span>
                                <img style={{width:"20px",height:"20px",position:"relative",left:"188px",top:"28px"}} 
                                    src={require("../../assets/icons/右箭头.png")}
                                    onClick={this.addadressFn.bind(this)}
                                    alt=""></img>
                            </div>
                        </div>
                    </WingBlank>
                    <WingBlank>
                        <div style={{width:"100%",height:"200px",backgroundColor:"white",borderRadius:"10px",marginTop:"15px"}}>
                            <div style={{width:"90%",margin:"0 auto",fontSize:"16px",lineHeight:"50px",fontWeight:"600",borderBottom:"1px solid silver"}}>商品信息</div>
                            <div style={{width:"90%",margin:"0 auto",marginTop:"20px"}}>
                                <img src={this.state.goodsdetail.productPicture} style={{width:"80px",height:"100px"}} alt=""></img>
                                <div style={{position:"relative",left:"100px",bottom:"80px"}}>{this.state.goodsdetail.productName}</div>
                                <div style={{position:"relative",left:"100px",bottom:"60px",color:"#F60100",fontSize:"18px"}}>{this.state.goodsdetail.price} 元</div>
                                <div style={{position:"relative",left:"280px",bottom:"90px"}}>x {this.state.goodsNum}</div>
                            </div>
                        </div>
                    </WingBlank>
                    <WingBlank>
                        <div style={{width:"100%",
                                height:"50px",
                                backgroundColor:"white",
                                borderRadius:"10px",
                                marginTop:"15px"}}>
                            <sapn style={{fontSize:"16px",lineHeight:"50px",fontWeight:"600",marginLeft:"10px"}}>买家留言</sapn>
                            <sapn style={{fontSize:"14px",lineHeight:"50px",marginLeft:"60px"}}>建议留言前先和卖家沟通</sapn>
                        </div>
                    </WingBlank>
                    <WingBlank>
                        <div style={{width:"100%",
                                height:"50px",
                                backgroundColor:"white",
                                borderRadius:"10px",
                                marginTop:"15px"}}>
                            <sapn style={{fontSize:"16px",lineHeight:"50px",fontWeight:"600",marginLeft:"10px"}}>配送方式</sapn>
                            <sapn style={{fontSize:"14px",lineHeight:"50px",marginLeft:"60px"}}>快递到家</sapn>
                        </div>
                    </WingBlank>
                    <WingBlank>
                        <div style={{width:"100%",
                                height:"50px",
                                backgroundColor:"white",
                                borderRadius:"10px",
                                marginTop:"15px"}}>
                            <sapn style={{fontSize:"16px",lineHeight:"50px",fontWeight:"600",marginLeft:"10px"}}>商品总金额</sapn>
                            <sapn style={{fontSize:"14px",color:"#F60100",lineHeight:"50px",marginLeft:"48px"}}>{((this.state.goodsdetail.price)*(this.state.goodsNum)).toFixed(2)} 元</sapn>
                        </div>
                    </WingBlank>
                </div>
                <TabBar>
                    <TabBar.Item 
                        icon={<div style={{
                                width: '200px',
                                height: '50px',
                                lineHeight: '50px',
                                backgroundColor: 'white' }}
                        >支付金额为：{((this.state.goodsdetail.price)*(this.state.goodsNum)).toFixed(2)} 元</div>}></TabBar.Item>
                        <TabBar.Item
                        onPress={()=>{this.payFn()}}
                        icon={<div style={{
                                width: '80px',
                                height: '50px',
                                color: 'white',
                                lineHeight: '50px',
                                backgroundColor: '#F60100' }}
                        >付款</div>}></TabBar.Item>
                        <TabBar.Item
                        onPress={()=>{this.submitorderFn()}}
                        icon={<div style={{
                                width: '95px',
                                height: '50px',
                                color: 'white',
                                lineHeight: '50px',
                                backgroundColor: '#383838' }}
                        >提交订单</div>}></TabBar.Item>
                </TabBar>
            </div>
        )
    }
}


class Navbar extends React.Component { // eslint-disable-next-line
	constructor(props) {
		super(props)

	}
	backFn(){
        // console.log(this.props.goodsdetail)
		this.props.history.push({pathname:'/goodsdetail',state:{item:this.props.goodsdetail,abc:1}})
	}
	render() {
		return (
				<div>
				  <NavBar
					mode="dark"
					icon={<Icon type="left" />}
					style={{ backgroundColor:"white", color:"black" }}
					onLeftClick={this.backFn.bind(this)}
					rightContent={[
					  <Icon key="1" type="ellipsis" />,
					]}
				  >{this.props.name}</NavBar>
				</div>
		)
	}
}