import React from 'react'
import NavBar from '../../components/Navbar.js'
import './chart.css'
export default class checkOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedGoods: [
            ]

        }
        this.pushBcak = this.pushBcak.bind(this)


        //  this.tpa=this.tpa.bind(this)
    }
    componentDidMount () {
        var tmp_arr = []
        if (this.props.location && this.props.location.query && this.props.location.query.id) {
            console.log(this.props.location.query.id)
            
            for (var i = 0; i < this.props.location.query.id.length; i++) {
                tmp_arr.push(this.props.location.query.id[i])
            }
            this.setState({checkedGoods:tmp_arr})
        }
    }
    pushBcak(){
        this.props.history.goBack();
    }
    render () {
        return (<div props={ this.props } style={ { backgroundColor: "#f0f0f0" } }>

            {/* <NavBar name="确认订单" style={ { backgroundColor: "white!important" } }
            ></NavBar> */}
            <div className="navBar">
                <div className="sanjiao" onClick={this.pushBcak}></div>
                <span>确认订单</span>
            </div>
            <div className="order" >
                <div className="reInfo">
                    <div>滚可能 <span>132465786</span></div>
                    <div>说如果符合时代发错款式设计的</div>
                    <div className="sanjiao" onClick={this.pushBcak}></div>
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
                    <div><span>买家留言</span><span><input placeholder="建议留言前先和卖家沟通"></input></span></div>
                    <div><span>配送方式</span><span>快递到家</span></div>
                    <div><span>商品总金额</span><span>0元</span></div>
                </div>
            </div>
        </div>

        )
    }

}

// export default checkOrder
