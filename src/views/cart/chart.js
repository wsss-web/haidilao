import React from 'react'
import Tablebar from '../../components/Tablebar.js'
import NavBar from '../../components/Navbar.js'
import './chart.css'
import axios from 'axios'
import './alichart/iconfont.css'
import Test from './checbox.js'
import { List, Checkbox } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
var createReactClass = require('create-react-class');
// var Charts = createReactClass(
	class Charts extends React.Component{
		constructor(props) {
			super(props)
			this.state = { 
				lingshiArr:[],
				banjiFlag:"false",
				whetherBianji: "编辑",
				checked: false,
				tipsFlag: 0,
				totalPrice:0,
				gouwuche:1,
				dataSource:[
					// {
					//   img:'https://mirror-gold-cdn.xitu.io/168e083f35ac00b6f3c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
					//   title:'海底捞蜂蜜桂花啤酒330ml*9听',
					//   price: '19.80',
					//   mode:'支付方式：现金',
					//   quantity:'10',
					//   flag: false
					// },
					// {
					//   img:'https://mirror-gold-cdn.xitu.io/168e083f35ac00b6f3c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
					//   title:'海底捞蜂蜜桂花啤酒330ml*9听',
					//   price: '19.80',
					//   mode:'支付方式：现金',
					//   quantity:'9',
					//   flag: false
					// },
					// {
					//   img:'https://mirror-gold-cdn.xitu.io/168e083f35ac00b6f3c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
					//   title:'海底捞蜂蜜桂花啤酒330ml*9听(预售7天内发货)',
					//   price: '19.80',
					//   mode:'支付方式：现金',
					//   quantity:'10',
					//   flag: false
					// }
				  ]
			 }
			 
			 this.tpa=this.tpa.bind(this)
			 this.pushOrder = this.pushOrder.bind(this)
			 this.collectFn = this.collectFn.bind(this)
			//  this.tpa2=this.tpa2.bind(this)
		}
		collectFn(){
			this.scTips()
			// console.log(1111)
			var shoucangArr=[]
			var collectArr=[]
			var productnum=[]
			shoucangArr=this.state.dataSource.filter((i , index) => {
				if(i.flag==true) 
				{
					collectArr.push(i)
					productnum.push(i.productNumber)
				}				
			})
			// console.log(collectArr)
			// console.log(productnum)
			this.setState({
				lingshiArr: collectArr
			})
			//axios判断收藏信息里是否有这个收藏商品
			var userId=null
			if(1){
				var that = this	
				console.log("777777777")
				axios.post('http://localhost:3001/collectInfo', {data:{status:3,userId:localStorage.getItem('userId'),productArr:productnum}})
				.then(
					function(res){
						var obj = res.data
						console.log("818181818")
						console.log(obj[0].userId)
						if(obj[0].userId!=null){
							console.log(21212)
							console.log(collectArr)

						for (var i = 0; i < obj.length; i++){
							for(var j=0;j<collectArr.length;j++){
								if(obj[i].userId ==collectArr[j].userId && obj[i].productNumber == collectArr[j].productNumber){
									productnum.splice(j,1)
									console.log(productnum[j]+'此商品已添加')
								}
						    }
						}	
					}			
					},
					function(err){
						console.log(err)
					}
				)
				
			// axios收藏信息添加	
			axios.post('http://localhost:3001/collectInfo2', {data:{userId:localStorage.getItem('userId'),productArr:productnum}})
				.then(
					function(res){
						console.log("1616161616")
						console.log(res.data)
					},
					function(err){
						console.log(err)
					}
				)
			}
		}
		
		tpa(e,s,t) {
			// console.log(e,s,t)
			parseInt(s)
			var changeFlag=this.state.dataSource
			if(e!=null){
				this.state.dataSource[e].flag=!this.state.dataSource[e].flag
				this.setState({changeFlag:this.state.dataSource[e]})
				// changeQ=this.state.dataSource[s].quantity+1
				// this.state.dataSource[s].quantity=this.state.dataSource[s].quantity--
				// this.setState({changeFlag:this.state.dataSource[s].quantity+1})
			}else if(s!=null){
				var a1= parseInt(this.state.dataSource[s].quantity)-1
				// console.log(a1)
				this.state.dataSource[s].quantity= parseInt(this.state.dataSource[s].quantity)-1
				this.setState({changeFlag:this.state.dataSource[s]})
			}else if(t!=null){
				var a2= parseInt(this.state.dataSource[t].quantity)+1
				// console.log(a2)
				this.state.dataSource[t].quantity= parseInt(this.state.dataSource[t].quantity)+1
				this.setState({changeFlag:this.state.dataSource[t]})
			}
			var totalPrice1=0
			this.state.dataSource.map((i , index) => {
				if(i.flag==true){
					totalPrice1=parseInt(i.price)*parseInt(i.quantity)+totalPrice1
				}
				// console.log(totalPrice1)
			})
			this.setState({totalPrice:totalPrice1})	
		}
		totalPriceQuanxuan(){
			if(this.state.checked==true){
				this.setState({checked:false})
				this.state.dataSource.filter((i , index) => {
				return i.flag=false
				})
				this.setState({totalPrice:0})
			}else if(this.state.checked==false){
				this.setState({checked:true})
				this.state.dataSource.filter((i , index) => {
					return i.flag=true
				})
				var totalPrice1=0
				this.state.dataSource.map((i , index) => {
					if(i.flag==true){
						totalPrice1=parseInt(i.price)*parseInt(i.quantity)+totalPrice1
					}
					console.log(totalPrice1)
				})
				this.setState({totalPrice:totalPrice1})		
			}
		
		}
		pushOrder(){
			var coTrue=this.state.dataSource.filter((i , index) => {
				return i.flag==true
			})
			this.props.history.push({pathname:'/checkOrder', query:{id: coTrue}})
		}
		tipF (){
			if(this.state.tipsFlag!=0){
				this.setState({tipsFlag:0})
			}
		}
		scTips =()=>{
			// if()
			var shouCang=this.state.dataSource.filter((i , index) => {
				return i.flag==true

			})
			if(shouCang[0]!=null){
				//有值时
				this.setState({ tipsFlag:1});
				// console.log(this.state.tipsFlag)
			}else{
				this.setState({ tipsFlag:2});
				console.log(this.state.tipsFlag)
			}
		}
		componentDidMount (){
			var userId=localStorage.getItem('userId')
			console.log(userId)
			if(userId==null){
				console.log("请先登录")
			}else if(userId!=null){
				var that = this				
			axios.post('http://localhost:3001/shoppingCartMana', {data:{status: 5,userId:localStorage.getItem('userId')}})
				.then(
					function(res){
						console.log(res)
						console.log(res.data)
						that.setState({
							dataSource:res.data,
						})					
					},
					function(err){
						console.log(err)
					}
			)}
			if(this.state.dataSource!=null){
				// if(1){
				this.setState({gouwuche:2})
				console.log("das")
			}else{
				this.setState({gouwuche:1})
			}
		//每次进入这个界面都会重新渲染数据，请求数据库
		
		}
	render () {
		return <div>
			<div className="navBar" style={{textAlign:"center"}}>
                <div className="sanjiao" onClick={this.pushBcak}style={{textAlign:"center"}} ></div>
                <span style={{fontSize:"16px"}}>购物车</span>
            </div>
			<div>
				<div className="topbackground"></div>
				{/* 购物车为空时 */ }
				<div className={this.state.gouwuche=="1"?'nothing':'dis'}>
					<div className="kongche">
						<i className="iconfont icon-gouwuche"></i>
					</div>
					<div className="description">购物车里没有东西哦</div>
					<div className="goAother">去逛逛</div>
				</div>
				{/* 购物车有商品时 */ }
				<div className={this.state.gouwuche=="2"?'hasGoods':'dis'}>
					<div className="topZiFont" onClick={()=> {						
						  console.log(this.state.banjiFlag)
						  console.log(this.state.whetherBianji)
						  if (this.state.banjiFlag == 'true') {
							this.setState({
								banjiFlag: "false",
								whetherBianji: "编辑"
							})
						  } else {
							this.setState({
								banjiFlag: "true",
								whetherBianji: "完成"
							})
						  }
						  console.log(this.state.banjiFlag)
						  console.log(this.state.whetherBianji)
						}}
						>{this.state.whetherBianji}</div>
					<div className="doodsList">
					<CheckboxItem key="enabled" style={{paddingLeft:"10px"}} onChange={()=>{this.totalPriceQuanxuan()}} >
						<List.Item.Brief  style={{fontSize:"12px",color:"black"}}>海底捞商城</List.Item.Brief>
					</CheckboxItem>
						<Test dsDown={this.state.dataSource} tpa={this.tpa} ></Test>
					</div>
					<div className="totalPrice">
						<div className={this.state.banjiFlag=="false"?'jieSuan':'dis'}>
							<div>
								<div style={{color:"rgb(209,35,36)",whiteSpace:"nowrap"}}>合计：{this.state.totalPrice}元</div>
								<div style={{color:"#ccc",fontSize:"10px",padding:"8px 0px"}}>不含运费</div>
							</div>
							<div onClick={this.pushOrder} >结算</div>
						</div>
						<div className={this.state.banjiFlag=="false"?'dis':'bianJi'}>
							<div>
								<CheckboxItem style={{paddingLeft:"30px"}} key="enabled" checked={this.state.checked} onChange={()=>{this.totalPriceQuanxuan()}} >
										全选
								</CheckboxItem>
							</div>
							
							<div onClick={
								() => {
									this.collectFn()
								}
							}  onChange={this.tipF} >收藏</div>
							<div className={this.state.tipsFlag=="1"?'showTips':'dis'}>收藏成功</div>
							<div className={this.state.tipsFlag==2?'noTips':'dis'} >请选择需要收藏的商品</div>
							<div>删除</div>
						</div>
					</div>
					<Tablebar history={ this.props.history } />
				</div>
			</div>
			</div>
	}
};
export default Charts