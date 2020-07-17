import React from 'react';
import { WingBlank } from 'antd-mobile';
import Navbar from '..//home/js/Navbar.js'
export default class Vouchers extends React.Component{ // eslint-disable-next-line
    constructor(props) {
		super(props)
    }
    state = {
        data: ['1', '2', '3', '4', '5', '6'],
        fresh_name:['海底捞澳洲原切牛后胸肉卷', '海底捞丸子', '海底捞虾滑', '海底捞秘制孜然嫩羊肉', '海底捞小丸子', '海底捞芝士虾丸'],
        fresh_price:['46.8', '38.8', '42.8', '68.8', '40.8', '58.8']
    }
    GoodsDetailFn(){
		this.props.history.push('/goodsdetail')
	}
    render(){
        return(
            <div>
                <Navbar name="啤酒" props={this.props}></Navbar>
                <div style={{ backgroundColor:"white",height:"620px",position: "relative", overflow:"scroll" }}>
                    <img className="Vouchers_cover" 
                        src={require('../../assets/imgs/啤酒.jpg')} 
                        style={{
                                width: "88%",
                                height: "150px",
                                position: "absolute",
                                top:"20px",
                                right:"22px"}}
                            alt="">
                    </img>
                    <WingBlank>
                        <ul style={{margin:"0 0 20px 0", padding:"0",position: "absolute",top:"178px"}}>
                            {this.state.data.map(val =>(
                                <li onClick={this.GoodsDetailFn.bind(this)}
                                    style={{listStyle: "none",float: "left",width: "172px",marginTop:"18px"}}>
                                    <img key={val}
                                        src={require(`../../assets/imgs/啤酒${val}.jpg`)}
                                        style={{
                                            width: "130px",
                                            height: "130px"}} 
                                        alt=""></img>
                                    <div style={{
                                            width: "130px",
                                            height:"44px",
                                            margin:"0 auto",
                                            fontSize: "14px", 
                                            textAlign: "left", 
                                            lineHeight: "22px"}}> 
                                        {this.state.fresh_name[val-1]}
                                    </div>
                                    <div style={{
                                            width: "130px",
                                            margin:"0 auto",
                                            color: "#E83538",
                                            fontSize: "18px", 
                                            textAlign: "left", 
                                            lineHeight: "30px"}}> 
                                        ￥ {this.state.fresh_price[val-1]}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </WingBlank>
                </div>
            </div>
        )
    }
}