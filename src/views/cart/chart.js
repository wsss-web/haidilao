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
				shuaxin:0,
				lingshiArr:[],
				banjiFlag:"false",
				whetherBianji: "编辑",
				checked: false,
				tipsFlag: 0,
				totalPrice:0,
				gouwuche:1,
				dataSource:[
				  ]
			 }
			 
			 this.tpa=this.tpa.bind(this)
			 this.pushOrder = this.pushOrder.bind(this)
			 this.collectFn = this.collectFn.bind(this)
		}
		deleteFn(){
			var shanchuNum=[]
			var shanchuArr=[]
			shanchuArr=this.state.dataSource.filter((i , index) => {
				if(i.flag==true) 
				{
					shanchuNum.push(i.productNumber)
				}				
			})
			var that=this
			axios.post('http://localhost:3001/cartDelete', {data:{userId:localStorage.getItem('userId'),productArr:shanchuNum}})
							.then(
								function(res){
									console.log(res.data)
								},
								function(err){
									console.log(err)
								}
							)
							window.location.reload(true); 
		}
		collectFn(){
			this.scTips()
			var shoucangArr=[]
			var collectArr=[]
			var productnum=[]
			var productnum2=[]
			shoucangArr=this.state.dataSource.filter((i , index) => {
				if(i.flag==true) 
				{
					collectArr.push(i)
					productnum.push(i.productNumber)
				}				
			})
			this.setState({
				lingshiArr: collectArr
			})
			//axios判断收藏信息里是否有这个收藏商品
			if(collectArr[0]!=undefined){
				var cR=false
				var that = this	
				console.log("777777777")
				axios.post('http://localhost:3001/collectInfo', {data:{status:3,userId:localStorage.getItem('userId'),productArr:collectArr}})
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
									collectArr.splice(j,1)
									console.log(productnum[j]+'此商品已被添加，请勿重复添加')
									productnum.splice(j,1)
									console.log(productnum)
								}
						    }
						}	
					}
					if(collectArr[0]!=undefined){
						console.log(productnum)
						// axios收藏信息添加	
						axios.post('http://localhost:3001/collectInfo2', {data:{userId:localStorage.getItem('userId'),productArr:productnum}})
							.then(
								function(res1){
									console.log("1616161616")
									console.log(res1.data)
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
				console.log(collectArr[0])
				// if(collectArr[0]!=undefined){
				// 	console.log(productnum)
				// 	// axios收藏信息添加	
				// 	axios.post('http://localhost:3001/collectInfo2', {data:{userId:localStorage.getItem('userId'),productArr:productnum}})
				// 		.then(
				// 			function(res){
				// 				console.log("1616161616")
				// 				console.log(res.data)
				// 			},
				// 			function(err){
				// 				console.log(err)
				// 			}
				// 		)
				// }
			}
		}
		//小数点后两位
		xsdLastTwo(x){
			　　var f_x = parseFloat(x);  
			　　if (isNaN(f_x))  
			　　{  
			　　　　return 0;  
			　　}  
			　　var f_x = Math.round(x*100)/100;  
			　　var s_x = f_x.toString();  
			　　var pos_decimal = s_x.indexOf('.');  
			　　if (pos_decimal < 0)  
			　　{  
			　　　　pos_decimal = s_x.length;  
			　　s_x += '.';  
			　　}  
			　　while (s_x.length <= pos_decimal + 2)  
			　　{  
			　　　　s_x += '0';  
			　　}  
			　　return s_x;  
			}
		tpa(e,s,t) {
			// console.log(e,s,t)
			parseInt(s)
			var changeFlag=this.state.dataSource
			if(e!=null){
				this.state.dataSource[e].flag=!this.state.dataSource[e].flag
				console.log(this.state.dataSource[e])
				this.setState({changeFlag:this.state.dataSource[e]})
			}else if(s!=null){
				var a1= parseFloat(this.state.dataSource[s].quantity)-1
				// console.log(a1)
				this.state.dataSource[s].quantity= parseFloat(this.state.dataSource[s].quantity)-1
				if(this.state.dataSource[s].quantity<0){
				 	this.state.dataSource[s].quantity=0 
				}
				this.setState({changeFlag:this.state.dataSource[s]})
			}else if(t!=null){
				var a2= parseFloat(this.state.dataSource[t].quantity)+1
				// console.log(a2)
				this.state.dataSource[t].quantity= parseFloat(this.state.dataSource[t].quantity)+1
				this.setState({changeFlag:this.state.dataSource[t]})
			}
			var totalPrice1=0
			this.state.dataSource.map((i , index) => {
				if(i.flag==true){
					totalPrice1=parseFloat(i.price)*parseFloat(i.quantity)+totalPrice1
				}
				// console.log(totalPrice1)
			})
			totalPrice1=this.xsdLastTwo(totalPrice1)
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
			//请求地址接口
			// console.log
			var addressDefault=[]
			var that=this
			axios.post('http://localhost:3001/chaxunmoren', {id:localStorage.getItem('userId')})
				.then(
					function(res1){
						console.log(res1.data)
						window.localStorage.setItem("moren" , JSON.stringify(res1.data))
						addressDefault=res1.data
						console.log("默认地址")
						console.log(addressDefault)
						that.props.history.push({pathname:'/checkOrder', query:{id: coTrue,jiage:that.state.totalPrice,addressDe:addressDefault||1}})

					},
					function(err){
						console.log(err)
					}
				)
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
                <div className="sanjiao" onClick={() => {this.props.history.push('/home')}} style={{textAlign:"center"}} ></div>
                <span className="carttitle">购物车</span>
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
							<div onClick={
								() => {
									this.deleteFn()
								}
							}>删除</div>
						</div>
					</div>
					<Tablebar history={ this.props.history } />
				</div>
			</div>
			</div>
	}
};
export default Charts