import React from "react";
import axios from "axios";
import { NavBar, Icon, WingBlank, TabBar } from 'antd-mobile';
export default class Confirm extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state={
            goodsdetail:'',
            morenadress:''
        }
    }
    componentWillMount(){
        var that = this
        var userId = localStorage.getItem('userId')
        // console.log(userId)
        this.setState({
            goodsdetail:this.props.location.state.goodsdetail
        })
        axios.post('http://localhost:3001/morenadress',{
          data: {userId:userId}
        }).then(
          function(res){
            console.log(res.data)
            that.setState({
                morenadress:res.data[0]
            })
          },
          function(err){
            console.log(err)
          }
        )
    }
    render(){
        // console.log(this.state.goodsdetail)
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
                            {/* <div>{this.state.morenadress.receiver}</div> */}
                        </div>
                    </WingBlank>
                    <WingBlank>
                        <div style={{width:"100%",height:"200px",backgroundColor:"white",borderRadius:"10px",marginTop:"15px"}}>
                            <div style={{width:"90%",margin:"0 auto",fontSize:"16px",lineHeight:"50px",fontWeight:"600",borderBottom:"1px solid silver"}}>商品信息</div>
                            <div style={{width:"90%",margin:"0 auto",marginTop:"20px"}}>
                                <img src={this.state.goodsdetail.productPicture} style={{width:"80px",height:"100px"}} alt=""></img>
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
                            <sapn style={{fontSize:"14px",color:"#F60100",lineHeight:"50px",marginLeft:"55px"}}>99.00 元</sapn>
                        </div>
                    </WingBlank>
                </div>
                <TabBar>
                    <TabBar.Item 
                        icon={<div style={{
                                width: '250px',
                                height: '50px',
                                lineHeight: '50px',
                                backgroundColor: 'white' }}
                        >支付金额为：99.00 元</div>}></TabBar.Item>
                        <TabBar.Item
                        icon={<div style={{
                                width: '125px',
                                height: '50px',
                                color: 'white',
                                lineHeight: '50px',
                                backgroundColor: '#F60100' }}
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