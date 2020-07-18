import React from 'react';
import { WingBlank } from 'antd-mobile';
import Navbar from '..//home/js/Navbar.js'
export default class Vouchers extends React.Component{ // eslint-disable-next-line
    constructor(props) {
		super(props)
    }
    state = {
        data: ['1', '2', '3', '4', '5', '6'],
        vouchers:['10', '20', '50', '100', '200', '300'],
        price:['8.9', '16.9', '42.8', '88.8', '168.8', '228.8']
    }
    GoodsDetailFn(){
		this.props.history.push('/goodsdetail')
	}
    render(){
        return(
            <div>
                <Navbar name="代金券" props={this.props}></Navbar>
                <div style={{ backgroundColor:"white",height:"620px",position: "relative", overflow:"scroll" }}>
                    <img className="Vouchers_cover" 
                        src={require('../../assets/imgs/代金券.jpg')} 
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
                                        src={require(`../../assets/imgs/代金券${val}.jpg`)}
                                        style={{
                                            width: "130px",
                                            height: "130px",
                                            marginLeft:"20px"}} 
                                        alt=""></img>
                                    <div style={{
                                            width: "130px",
                                            margin:"0 auto",
                                            fontSize: "14px", 
                                            textAlign: "left", 
                                            lineHeight: "36px"}}> 
                                        {this.state.vouchers[val-1]} 元代金券
                                    </div>
                                    <div style={{
                                            width: "130px",
                                            margin:"0 auto",
                                            color: "#E83538",
                                            fontSize: "18px", 
                                            textAlign: "left", 
                                            lineHeight: "30px"}}> 
                                        ￥ {this.state.price[val-1]}
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