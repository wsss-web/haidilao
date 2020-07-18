import React from 'react'
import Tablebar from '../../components/Tablebar.js'
import NavBar from '../../components/Navbar.js'
import './chart.css'
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
				banjiFlag:"false",
				whetherBianji: "编辑",
				checked: false,
				tipsFlag: false
			 }
		}
		toggleChecked = () => {
			this.setState({ checked: !this.state.checked });
		}
		scTips =()=>{
			this.setState({ tipsFlag: true });
			console.log(this.state.tipsFlag)
		}
		handleClick() {
			alert('you click me!');
		}
		// handleChange(event){
		// 	// 通过React.findDOMNode()拿到真实的DOM对象
		// 	var node = React.findDOMNode(this.refs.inputContent);
		// 	node.innerHTML = event.target.value;
		// }
		componentDidMount (){
		}
	render () {
		return <div>
			<NavBar name="购物车" />
			<div>
				<div className="topbackground"></div>
				{/* 购物车为空时 */ }
				{/* <div className="nothing">
					<div className="kongche">
						<i className="iconfont icon-gouwuche"></i>
					</div>
					<div className="description">购物车里没有东西哦</div>
					<div className="goAother">去逛逛</div>
				</div> */}
				{/* 购物车有商品时 */ }
				<div className="hasGoods">
					<div className="topZiFont" onClick={()=> {
						
						  console.log(this.state.banjiFlag)
						  console.log(this.state.whetherBianji)
						  // this.setState({
							// 	banjiFlag: 'banjiFlag'? "false":"true",
							// 	whetherBianji: 'banjiFlag'? "完成":"编辑"
							// })

						  if (this.state.banjiFlag == 'false') {
							this.setState({
								banjiFlag: "true",
								whetherBianji: "编辑"
							})
						  } else {
							this.setState({
								banjiFlag: "false",
								whetherBianji: "完成"
							})
						  }
						  console.log(this.state.banjiFlag)
						  console.log(this.state.whetherBianji)
						}}
						>{this.state.whetherBianji}</div>
					<div className="doodsList">
						<Test xx={this.state.checked}></Test>
					</div>
					<div className="totalPrice">
						<div className={this.state.banjiFlag=="false"?'jieSuan':'dis'}>
							<div>
								<div style={{color:"rgb(209,35,36)",whiteSpace:"nowrap"}}>合计：0.00元</div>
								<div style={{color:"#ccc",fontSize:"10px",padding:"8px 0px"}}>不含运费</div>
							</div>
							<div>结算</div>
						</div>
						<div className={this.state.banjiFlag=="false"?'dis':'bianJi'}>
							<div>
								<CheckboxItem key="enabled" onClick={this.toggleChecked} checked={this.state.checked}>
									<List.Item.Brief style={ { fontSize: "12px", color: "black" } }>全选</List.Item.Brief>
								</CheckboxItem>
							</div>
							<div onClick={this.scTips}>收藏</div>
							<div className={this.state.tipsFlag?'showTips':'dis'} >收藏成功</div>
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