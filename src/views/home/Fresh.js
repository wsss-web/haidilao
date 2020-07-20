import React from 'react';
import axios from 'axios';
import { WingBlank } from 'antd-mobile';
import Navbar from '..//home/js/Navbar.js';
export default class Vouchers extends React.Component{ // eslint-disable-next-line
    constructor(props) {
		super(props)
    }
    state = {
        fresh:[]
    }
    GoodsDetailFn(item){
		var that = this
        that.props.history.push({pathname:'/goodsdetail',state:{item:item}})
    }
    componentDidMount() {
		var that = this
		axios.post('http://localhost:3001/goodsInfoMana',{
			data: {status:5,goods_type:'生鲜'}
		}).then(
			function(res){
				// console.log(res.data)
				that.setState({
					fresh: res.data
				})
			},
			function(err){
			  	console.log(err)
			}
		  )
	}
    render(){
        return(
            <div>
                <Navbar name="生鲜" props={this.props}></Navbar>
                <div style={{ backgroundColor:"white",height:"620px",position: "relative", overflow:"scroll" }}>
                    <img className="Vouchers_cover" 
                        src={require('../../assets/imgs/生鲜.jpg')} 
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
                            {this.state.fresh.map((item,index) =>(
                                <li onClick={()=>this.GoodsDetailFn(item)}
                                    style={{listStyle: "none",float: "left",width: "172px",marginTop:"18px"}}>
                                    <img key={index}
                                        src={this.state.fresh[index].productPicture}
                                        style={{
                                            width: "130px",
                                            height: "130px",
                                            marginLeft:"20px"}} 
                                        alt=""></img>
                                    <div style={{
                                            width: "130px",
                                            height:"44px",
                                            margin:"0 auto",
                                            fontSize: "14px", 
                                            textAlign: "left", 
                                            lineHeight: "22px"}}> 
                                        {this.state.fresh[index].productName}
                                    </div>
                                    <div style={{
                                            width: "130px",
                                            margin:"0 auto",
                                            color: "#E83538",
                                            fontSize: "18px", 
                                            textAlign: "left", 
                                            lineHeight: "30px"}}> 
                                        ￥ {this.state.fresh[index].price}
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