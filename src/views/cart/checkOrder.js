import React from 'react'
import axios from 'axios'
// import NavBar from '../../components/Navbar.js'
import './chart.css'
import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
export default class checkOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jiage2:0,
            ddpeo:null,
            ddaddr:null,
            ddtel:null,
            isAddAddress:false,
            checkedGoods: [
            ]

        }
        this.pushBcak = this.pushBcak.bind(this)
        this.pushAddressList = this.pushAddressList.bind(this)


        //  this.tpa=this.tpa.bind(this)
    }
    componentWillMount(){
        console.log(this.props.location.query)
    
    
    }
    componentDidMount () {
        var tmp_arr = []
        var addessDeArr=[]
        var local_goodsInfo=[]
        if (this.props.location && this.props.location.query && this.props.location.query.id) {
            console.log("1111111")
            console.log(this.props.location.query)
            const { ...otherProps} = this.props.location.query
            const keys = Object.keys(otherProps);
            console.log(this.props.location.query)
            console.log(keys)
            if (keys.length < 1) {
                this.setState({isAddAddress:true})
                console.log(1111111111112)
                throw new Error("可能含有未被定义的属性");
            }else if(this.props.location.query.addressDe!=1){
                console.log(11111111111111113)
                console.log(this.props.location.query.addressDe)
                console.log(this.props.location.query)
                this.setState({ddpeo:this.props.location.query.addressDe[0].receiver})
                this.setState({ddaddr:this.props.location.query.addressDe[0].receiverAddress})
                this.setState({ddtel:this.props.location.query.addressDe[0].receiverTelnumber})

            }else if(this.props.location.query.addressDe==1){
                this.setState({isAddAddress:true})
                console.log(11111111111111114)
            }
            // console.log(this.props.location.query.)
            //只能在判断之后打印
            this.setState({jiage2:this.props.location.query.jiage})
            for (var i = 0; i < this.props.location.query.id.length; i++) {
                tmp_arr.push(this.props.location.query.id[i])
            }
            this.setState({checkedGoods:tmp_arr})
            local_goodsInfo=JSON.stringify(tmp_arr)
            window.localStorage.setItem("local_goodsInfo" , JSON.stringify(tmp_arr))
            window.localStorage.setItem("local_jiage" , JSON.stringify(this.props.location.query.jiage))
        } else {
        ///如果myadress返回一个地址，优先渲染这个地址
            //没有路由的信息
             var lcoal_address = JSON.parse(window.localStorage.getItem("moren"))
            var local_goodsInfo2 = JSON.parse(window.localStorage.getItem("local_goodsInfo"))
            var local_jiage2 = JSON.parse(window.localStorage.getItem("local_jiage"))
            console.log("没有路由的信息")
            if(lcoal_address[0]&&local_goodsInfo2&&local_jiage2){
                console.log(11111111)
                console.log(this.props.location.query)
                this.setState({checkedGoods:local_goodsInfo2})
                this.setState({jiage2:local_jiage2})
                if (this.props.location && this.props.location.query && this.props.location.query.val) {
                    console.log(this.props.location.query.val) 
                    var duxiia=this.props.location.query.val
                    this.setState({ddpeo:duxiia.receiver})
                    this.setState({ddaddr:duxiia.receiverAddress})
                    this.setState({ddtel:duxiia.receiverTelnumber})
                }
                else{
                    this.setState({ddpeo:lcoal_address[0].receiver})
                    this.setState({ddaddr:lcoal_address[0].receiverAddress})
                    this.setState({ddtel:lcoal_address[0].receiverTelnumber})
                }
            }else if(local_goodsInfo2&&local_jiage2){
                console.log(2222222222)
                this.setState({checkedGoods:local_goodsInfo2})
                this.setState({jiage2:local_jiage2}) 
                this.setState({isAddAddress:true})
            }else{
                this.setState({isAddAddress:true})
                
            }
        }
    }

    pushBcak(){
        this.props.history.push('/chart');
    }
    pushAddressList(){
        this.props.history.push({pathname:'/myadress', query:{id:'1'}})
        window.localStorage.setItem("sb" , 1)

    }
    zhifuDialog(){

    }
    render () {

        return (<div props={ this.props } style={ { backgroundColor: "#f0f0f0" } }>
            <div className="navBar">
                <div className="sanjiao" onClick={this.pushBcak}></div>
                <span >确认订单</span>
            </div>
            <div className="order" >
                <div className={this.state.isAddAddress?"dis":"reInfo"}>
                    <div>{this.state.ddpeo} <span>{this.state.ddtel}</span></div>
                    <div>{this.state.ddaddr}</div>
                    <div className="sanjiao" onClick={this.pushAddressList}></div>
                </div>
                <div className={this.state.isAddAddress?"addAddress":"dis"}>
                    <div>+</div>
                    <div>新增地址</div>
                    <div className="sanjiao" onClick={this.pushAddressList}></div>
                </div>
                <div className="goodsInfo">
                    <div className="litte">商品信息</div>
                    {this.state.checkedGoods.map((i, index) => (
                        <div key={ i.index } className="oneGoodsFont">
                            <div className="imgFont">
                                <img src={ i.productPicture } alt=""></img>
                            </div>
                            <div className="ziA">
                                <div className="ziEli">{ i.productName }</div>
                                <div style={ { color: "rgb(209,35,36)", padding: "10px 0px" } }>{ i.price }元</div>
                                <div style={ { fontSize: "10px", color: "#999" } }>产品规格{ i.quantity }：件支付方式：现金购买</div>
                            </div>
                            <div>
                                x{ i.quantity }
                            </div>
                        </div>
                    )) }
                </div>
                <div className="lei">
                    <div><span>买家留言</span><span><input style={{border:0}} placeholder="建议留言前先和卖家沟通"></input></span></div>
                    <div><span>配送方式</span><span>快递到家</span></div>
                    <div><span>商品总金额</span><span>{this.state.jiage2}元</span></div>
                </div>
            </div>
            <div className="zhifu">
                <div className="zfLeft">
                    <div>实付金额：<span style={{color:"red"}}>{this.state.jiage2}元</span></div>
                    <div>非金钱兑换商品不支持退换</div>
                </div>
                <div onClick={()=>{}}><Apptc></Apptc></div>
            </div>
        </div>

        )
    }

}


// var that=this
// function qxOrder(){
//     console.log(that)
//     console.log(this)
// }
// const prompt = Modal.prompt;
// const Apptc = () => (
//     <WingBlank size="lg">
//       <WhiteSpace size="lg" /> 
//       <WhiteSpace size="lg" />
//       <Button onClick={() => prompt(
//         'Password',
//         '请输入微信支付密码',
//         [
//             { text: '取消' ,onPress: () => {
//                     qxOrder()
//                     return console.log(this) 
//                 }
//             },
//             { text: '提交', onPress: password => console.log(`密码为:${password}`) },
//         ],
//         'secure-text',
//       )}
//       >去支付</Button>
//       <WhiteSpace size="lg" />
//     </WingBlank>
//   );
const prompt = Modal.prompt;
 class Apptc extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    qxOrder(){
        axios.post('http://localhost:3001/cartDelete')
            .then(
                function(res){
                    console.log(res.data)
                },
                function(err){
                    console.log(err)
                }
            )
    }
    componentDidMount () {}
    render () {

    return(
    <WingBlank size="lg">
      <WhiteSpace size="lg" /> 
      <WhiteSpace size="lg" />
      <Button onClick={() => prompt(
        'Password',
        '请输入微信支付密码',
        [
            { text: '取消' ,onPress:
            //  () => {
                this.qxOrder
                    // qxOrder()
                    // return console.log(this) 
                // }
            },
            { text: '提交', onPress: 
            // password => console.log(`密码为:${password}`) 
            this.qrOrder
        },
        ],
        'secure-text',
      )}
      style={{color:"white"}} >提交订单</Button>
      <WhiteSpace size="lg" />
    </WingBlank>
  )}

    }
