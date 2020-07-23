import React from 'react'
import NavBar from '../../components/Navbar.js'
import './chart.css'
export default class checkOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            jiage2:0,
            ddpeo:null,
            ddaddr:null,
            ddtel:null,
            checkedGoods: [
            ]

        }
        this.pushBcak = this.pushBcak.bind(this)
        this.pushAddressList = this.pushAddressList.bind(this)


        //  this.tpa=this.tpa.bind(this)
    }
    componentDidMount () {
        var tmp_arr = []
        var addessDeArr=[]
        var local_goodsInfo=[]
        if (this.props.location && this.props.location.query && this.props.location.query.id) {

            console.log("1111111")
            //只能在判断之后打印
            this.setState({jiage2:this.props.location.query.jiage})
            for (var i = 0; i < this.props.location.query.id.length; i++) {
                tmp_arr.push(this.props.location.query.id[i])
            }
            this.setState({ddpeo:this.props.location.query.addressDe[0].receiver})
            this.setState({ddaddr:this.props.location.query.addressDe[0].receiverAddress})
            this.setState({ddtel:this.props.location.query.addressDe[0].receiverTelnumber})
            this.setState({checkedGoods:tmp_arr})
            local_goodsInfo=JSON.stringify(tmp_arr)
            window.localStorage.setItem("local_goodsInfo" , JSON.stringify(tmp_arr))
            window.localStorage.setItem("local_jiage" , JSON.stringify(this.props.location.query.jiage))


        } else {
            var lcoal_address = JSON.parse(window.localStorage.getItem("moren"))
            var local_goodsInfo2 = JSON.parse(window.localStorage.getItem("local_goodsInfo"))
            var local_jiage2 = JSON.parse(window.localStorage.getItem("local_jiage"))
            this.setState({checkedGoods:local_goodsInfo2})
            this.setState({jiage2:local_jiage2})
            this.setState({ddpeo:lcoal_address[0].receiver})
            this.setState({ddaddr:lcoal_address[0].receiverAddress})
            this.setState({ddtel:lcoal_address[0].receiverTelnumber})
        }
    }
   
    pushBcak(){
        this.props.history.goBack();
    }
    pushAddressList(){
        // var gouwuc=1
        this.props.history.push({pathname:'/myadress', query:{id:'1'}})
        // that.props.history.push({pathname:'/checkOrder', query:{id: coTrue,jiage:that.state.totalPrice,addressDe:addressDefault}})

    }
    render () {
        console.log(this.state.ddpeo)

        return (<div props={ this.props } style={ { backgroundColor: "#f0f0f0" } }>

            {/* <NavBar name="确认订单" style={ { backgroundColor: "white!important" } }
            ></NavBar> */}
            <div className="navBar">
                <div className="sanjiao" onClick={this.pushBcak}></div>
                <span>确认订单</span>
            </div>
            <div className="order" >
                <div className="reInfo">
                    <div>{this.state.ddpeo} <span>{this.state.ddtel}</span></div>
                    <div>{this.state.ddaddr}</div>
                    <div className="sanjiao" onClick={this.pushAddressList}></div>
                </div>
                <div className="goodsInfo">
                    <div className="litte">商品信息</div>
                    {this.state.checkedGoods.map((i, index) => (
                        <div key={ i.index } className="oneGoodsFont">
                            <div className="imgFont">
                                <img src={ i.productPicture }></img>
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
        </div>

        )
    }

}

// export default checkOrder
