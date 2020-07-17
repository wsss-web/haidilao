import React from 'react';
import { Carousel, WingBlank, TabBar, Grid } from 'antd-mobile';
import Navbar from '..//home/js/Navbar.js'

export default class GoodsDetail extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{position:"relative",backgroundColor:"white"}}>
                <Navbar name="商品详情" props={this.props}></Navbar>
                <div style={{width:"100%",
                        height:"560px",
                        overflow:"scroll"}}>
                    <MyCarousel></MyCarousel>
                    <div style={{
                        width:"88%",
                        margin:"20px auto",
                        textAlign:"center",
                        color:"#FF393A",
                        fontSize:"22px",
                        fontWeight:"600",
                        lineHeight:"40px",
                        letterSpacing:"2px"
                    }}>海底捞大麦拉格啤酒500ml*12听</div>
                    <div style={{
                        width:"88%",
                        margin:"20px auto",
                        paddingBottom:"20px",
                        textAlign:"center",
                        fontSize:"12px",
                        lineHeight:"20px",
                        borderBottom:"1px dashed silver"
                    }}>冰镇后口感更佳！新老日期随机发货，至少三个月保质期</div>
                    <div style={{
                        width:"88%",
                        margin:"20px auto",
                        textAlign:"center",
                        color:"#FF393A",
                        fontSize:"26px",
                        fontWeight:"600",
                        lineHeight:"40px",
                        letterSpacing:"2px"
                    }}>39.8 元</div>
                    <img src={require('../../assets/icons/加入购物车.png')} 
                    style={{width:"40px",height:"40px",position:"fixed",marginLeft:"20px"}}
                    alt="" />
                </div>
                <TabBar>
                    <TabBar.Item icon={<div style={{
                            width: '25px',
                            height: '25px',
                            background: `url(${require('../../assets/icons/加入购物车.png')}) center center /  21px 21px no-repeat` }}
                    />}></TabBar.Item>
                </TabBar>
            </div>
        )
    }
}

// 商品轮播图
class MyCarousel extends React.Component {
    state = {
      data: ['1', '2', '3'],
      imgs:[
        require('../../assets/imgs/商品详情1.jpg'),
        require('../../assets/imgs/商品详情2.jpg'),
        require('../../assets/imgs/商品详情3.jpg')
      ]
    }
    componentDidMount() {
      // simulate img loading
      setTimeout(() => {
        this.setState({
          data: ['1', '2', '3']
        });
      }, 100);
    }
    render() {
      return (
        <WingBlank>
          <Carousel
            infinite
            style={{width:"90%",margin:"10px auto"}}
          >
            {this.state.data.map(val => (
                <img
                  key={val}
                  src={this.state.imgs[val-1]}
                  alt=""
                  style={{ width: '100%', height:"200px", verticalAlign: 'top', borderRadius:"10px" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                  }}
                />
            ))}
          </Carousel>
        </WingBlank>
      );
    }
  }