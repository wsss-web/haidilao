import React from 'react';
// import { Carousel, WingBlank, TabBar } from 'antd-mobile';
import { TabBar,Toast } from 'antd-mobile';
import Navbar from '..//home/js/Navbar.js'

export default class GoodsDetail extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state = {
          goodsdetail:'',
          collect: require('../../assets/icons/收藏.png')
        }
    }
    componentDidMount(){
      // console.log(this.props.location.query.item)
      this.setState({
        goodsdetail:this.props.location.query.item
      })
    }
    collectFn(){

    }
    render(){
        return(
            <div style={{position:"relative",backgroundColor:"white"}}>
                <Navbar name="商品详情" props={this.props}></Navbar>
                <div style={{width:"100%",
                        height:"570px",
                        overflow:"scroll"}}>
                    {/* <MyCarousel goodsdetail={this.state.goodsdetail}></MyCarousel> */}
                    <img src={this.state.goodsdetail.productPicture} alt=""
                          style={{ width: '48%', 
                          height:"200px",
                          marginLeft:"100px",
                          marginTop:"10px",
                          borderRadius:"10px" }}/>
                    <div style={{
                        width:"88%",
                        margin:"20px auto",
                        textAlign:"center",
                        color:"#FF393A",
                        fontSize:"22px",
                        fontWeight:"600",
                        lineHeight:"40px",
                        letterSpacing:"2px"
                    }}>{this.state.goodsdetail.productName}</div>
                    <div style={{
                        width:"88%",
                        margin:"20px auto",
                        paddingBottom:"20px",
                        textAlign:"center",
                        fontSize:"12px",
                        lineHeight:"20px",
                        borderBottom:"1px dashed silver"
                    }}>{this.state.goodsdetail.description}</div>
                    <div style={{
                        width:"88%",
                        margin:"20px auto",
                        textAlign:"center",
                        color:"#FF393A",
                        fontSize:"26px",
                        fontWeight:"600",
                        lineHeight:"40px",
                        letterSpacing:"2px"
                    }}>{this.state.goodsdetail.price} 元</div>
                </div>
                <TabBar tabBarPosition="bottom">
                    <TabBar.Item
                      title="首页"
                      key="首页"
                      onPress={()=>{
                        this.props.history.push('/home')
                        }
                      }
                      icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${require('../../assets/icons/首页-选中.png')}) center center /  21px 21px no-repeat` }}
                    ></div>}></TabBar.Item>
                    <TabBar.Item
                      title="收藏"
                      key="收藏"
                      onPress={()=>{
                        if(this.state.collect === require('../../assets/icons/收藏.png')){
                          this.setState({
                            collect : require('../../assets/icons/已收藏.png'),
                          })
                          Toast.info('已收藏' , 1 );
                        }else{
                          this.setState({
                            collect : require('../../assets/icons/收藏.png')
                          })
                          Toast.info('已取消收藏' , 1 );
                        }
                      }}
                      icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${this.state.collect}) center center /  21px 21px no-repeat` }}
                    ></div>}></TabBar.Item>
                    <TabBar.Item icon={<div style={{
                            width: '100px',
                            height: '50px',
                            color: 'white',
                            lineHeight: '50px',
                            backgroundColor: '#E83538' }}
                    >加入购物车</div>}></TabBar.Item>
                    <TabBar.Item icon={<div style={{
                            width: '100px',
                            height: '50px',
                            color: 'white',
                            lineHeight: '50px',
                            backgroundColor: '#383838' }}
                    >立即购买</div>}></TabBar.Item>
                </TabBar>
            </div>
        )
    }
}


// 商品轮播图
// class MyCarousel extends React.Component {
//     state = {
//       data: ['1', '2', '3'],
//       goodsdetail:''
//     }
//     componentDidMount(goodsdetail) {
//       // simulate img loading
//       setTimeout(() => {
//         this.setState({
//           data: ['1', '2', '3']
//         });
//       }, 100);
//     }
//     render() {
//       return (
//         <WingBlank>
//           <Carousel
//             autoplay={true}
//             infinite
//             style={{width:"90%",margin:"10px auto"}}
//           >
//             {this.state.data.map(val => (
//                 <img
//                   key={val}
//                   src={this.state.goodsdetail.productPicture}
//                   alt=""
//                   style={{ width: '100%', height:"200px", verticalAlign: 'top', borderRadius:"10px" }}
//                   onLoad={() => {
//                     // fire window resize event to change height
//                     window.dispatchEvent(new Event('resize'));
//                   }}
//                 />
//             ))}
//           </Carousel>
//         </WingBlank>
//       );
//     }
//   }