import React from 'react';
import axios from 'axios';
// import { Carousel, WingBlank, TabBar } from 'antd-mobile';
import { TabBar,Toast } from 'antd-mobile';
import Navbar from '../home/js/Navbar.js'
import MyPopup from "../home/js/Popup.js"

export default class GoodsDetail extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
        this.state = {
          goodsdetail:'',
          userId: '',
          collect: '',
          evaluate:[],
          evTime:[],
          modal2: false
        }
        this.collectFn = this.collectFn.bind(this)
    }
    componentDidMount(){
      var that = this
      var userId = localStorage.getItem('userId')
      // console.log(this.props.location.state.item)
      this.setState({
        goodsdetail: this.props.location.state.item,
        userId: userId
      })
      axios.post('http://localhost:3001/collectInfo',{
        data: {
          status: 3}
		  }).then(
			  function(res){
          // console.log(res.data)
          var obj = res.data
          // console.log(obj)
          for (var i = 0; i < obj.length; i++){
            if(obj[i].userId === userId && obj[i].productNumber === that.state.goodsdetail.productNumber){
              that.setState({
                collect: require('../../assets/icons/已收藏.png') 
              })
			  return
            }else{
              that.setState({
                collect: require('../../assets/icons/收藏.png') 
              })
            }
          }
			  },
			  function(err){
			  	console.log(err)
			  }
      )
      // 获取商品评价的数据
      setTimeout(() => {
        axios.post('http://localhost:3001/getpingjia',{
          data: {productNumber:that.state.goodsdetail.productNumber}
        }).then(
          function(res){
            // console.log(res.data)
            that.setState({
              evaluate:res.data
            })
          },
          function(err){
            console.log(err)
          }
        )
      }, 100);
    }
    // 时间戳转换为年月日时分秒
    timestampToTime(timestamp){
      var date = new Date();
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        
        var strDate = Y+M+D+h+m+s;
        return strDate;
    }
    collectFn(){
      // console.log(this.state.userId,this.state.goodsdetail.productNumber)
      axios.post('http://localhost:3001/collectInfo',{
        data: {
          status: 1, 
          userId: this.state.userId, 
          productNumber: this.state.goodsdetail.productNumber}
		  }).then(
			  function(res){
				  console.log(res.data)
			  },
			  function(err){
			  	console.log(err)
			  }
		  )
    }
    uncollectFn(){
      axios.post('http://localhost:3001/collectInfo',{
        data: {
          status: 2, 
          userId: this.state.userId, 
          productNumber: this.state.goodsdetail.productNumber}
		  }).then(
			  function(res){
				  console.log(res.data)
			  },
			  function(err){
			  	console.log(err)
			  }
		  )
    }
    addFn(){
      // console.log(this.state.userId,this.state.goodsdetail.productNumber)
      var that = this
      axios.post('http://localhost:3001/CartMana',{
        data: {
          status: 3,
          userId: this.state.userId, 
          productNumber: this.state.goodsdetail.productNumber}
		  }).then(
			  function(res){
          var cartinfo = res.data
          // console.log(cartinfo)
            if(cartinfo.length !== 0){
              // console.log(cartinfo[0].quantity)
              axios.post('http://localhost:3001/CartMana',{
                data: {
                  status: 2, 
                  userId: that.state.userId, 
                  productNumber: that.state.goodsdetail.productNumber,
                  quantity:cartinfo[0].quantity}
              }).then(
                function(res){
                  console.log(res.data)
                  Toast.info('已加入购物车' , 1 );
                },
                function(err){
                  console.log(err)
                }
              )
            }else if(cartinfo.length === 0){
              axios.post('http://localhost:3001/CartMana',{
                data: {
                  status: 1, 
                  userId: that.state.userId, 
                  productNumber: that.state.goodsdetail.productNumber,
                  quantity:1}
              }).then(
                function(res){
                  console.log(res.data)
                  Toast.info('已加入购物车' , 1 );
                },
                function(err){
                  console.log(err)
                }
              )
            }
			  },
			  function(err){
			  	console.log(err)
			  }
		  )
    }
    render(){
        return(
            <div style={{position:"relative",backgroundColor:"white"}}>
                <Navbar name="商品详情" history={this.props.history}></Navbar>
                <div style={{width:"100%",
                        height:"560px",
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

                <div style={{width:"88%",height:"200px",margin:"0 auto"}}>
                  <span style={{fontSize:"16px",fontWeight:"600"}}>商品评价({this.state.evaluate.length})</span>
                  <span style={{color:"#FF393A",marginLeft:"160px"}}>好评率：98%</span>
                  <ul>
                    {this.state.evaluate.map((item,index) =>(
                      <li key={index} style={{listStyle:"none",width:"100%",height:"100px",marginTop:"20px"}}>
                        <img src={this.state.evaluate[index].avatar}
                          style={{width:"35px",height:"35px",borderRadius:"50%"}}
                          alt=""></img>
                        <span style={{position:"relative",left:"10px",bottom:"12px",color:"#FF393A"}}>{this.state.evaluate[index].nickname}</span>
                        <span></span>
                        <div style={{position:"relative",left:"5px",top:"10px"}}>{this.state.evaluate[index].content}</div>
                        <div style={{position:"relative",left:"5px",top:"26px"}}>{this.timestampToTime(this.state.evaluate[index].evaluationTime)}</div>
                      </li>
                    ))}
                  </ul>
                </div>

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
                          this.collectFn()
                          Toast.info('已收藏' , 1 );
                        }else{
                          this.setState({
                            collect : require('../../assets/icons/收藏.png')
                          })
                          this.uncollectFn()
                          Toast.info('已取消收藏' , 1 );
                        }
                      }}
                      icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: `url(${this.state.collect}) center center /  21px 21px no-repeat` }}
                    ></div>}></TabBar.Item>
                    <TabBar.Item 
                      onPress={()=>{this.addFn()}}
                      icon={<div style={{
                            width: '100px',
                            height: '50px',
                            color: 'white',
                            lineHeight: '50px',
                            backgroundColor: '#E83538' }}
                    >加入购物车</div>}></TabBar.Item>
                    <TabBar.Item
                      icon={<div style={{
                            width: '100px',
                            height: '50px',
                            color: 'white',
                            lineHeight: '50px',
                            backgroundColor: '#383838' }}
                    ><MyPopup goodsdetail={this.state.goodsdetail}></MyPopup>
                    </div>}></TabBar.Item>
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