import React from 'react'
import Tablebar from '../../components/Tablebar.js'
import SearchBar from '../home/js/SearchBar.js'
import Head from '../../components/head.js'
import { Tabs, WhiteSpace } from 'antd-mobile';
import './classify.css'
import Demo from './list.js'
import axios from 'axios'
export default class Classify extends React.Component {
	constructor(props) {
	    super(props)
		this.state = {
			index: '',
			title: '',
			goods: [] ,
			searchmsg: '',
			sou: ''
		}
		this.onChange = this.onChange.bind(this)
		this.clear = this.clear.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}
	
	// componentDidMount() {
	// }
	
	componentDidMount(){
	// componentWillMount(){
		var that = this
		axios.post('http://localhost:3001/goodsInfoMana', {data:{status: 4}})
			.then(
				function(res){
					console.log(res)
					that.setState({
						goods: res.data,
					})
					// good_data = res.data
					// console.log(good_data)
					
					
				},
				function(err){
					console.log(err)
				}
			)
	}
	onChange= (value) => {
	  this.setState({ value });
	}
	clear = () => {
	  this.setState({ value: '' });
	}
	handleClick = () => {
	  this.manualFocusInst.focus();
	}
	tabchange = (data,index) => {
		this.setState({
			title: data.title,
			index: index
		})
	}
	getsearch = (searchmsg) => {
		this.setState({
			sou: searchmsg
		})
		console.log(searchmsg)
	}
	
	render111() {
		return (
			<div>
				<Demo xxx={this.state.goods} />
			</div>
		)
	}
	render() {
		const tabs = [
		  { title: '全部商品' },
		  { title: '生鲜' },
		  { title: '火锅' },
		  { title: '火锅底料' },
		  { title: '啤酒' },
		  { title: '调味料' },
		  { title: '佐餐酱' },
		  { title: '方便速食' },
		  { title: '玩具' },
		  { title: '周边用品' },
		  { title: '优惠券' },
		  { title: '代金券' },
		  { title: '其他' },
		  { title: '腾讯会员卡' }
		];
		const Lis = tabs.map((tab,index) =>
			{
				return (<div style={{ display: 'flex', alignItems: 'top', justifyContent: 'left', height: '100%', backgroundColor: '#fff' }}>
						<Demo  goods={this.state.goods} index = {this.state.index} title = {this.state.title} sou = {this.state.sou} history={this.props.history}/>
							
					</div>)
			}
		)
		return (
			<div>
				<Head name="分类" history={this.props.history}/>
				<div style={{marginBottom: '10px'}}>
					  <SearchBar getvalue = {this.getsearch}/>
				</div>
				<div className="left_con" style={{ height: 520, backgroundColor: 'white'}}>
					<Tabs tabs={tabs} initialPage={0} animated={true} useOnPan={false} tabBarPosition={'left'} tabDirection={'vertical'} tabBarActiveTextColor="rgb(255,106,3)" onTabClick={this.tabchange}>
						{Lis}
					</Tabs>
						<WhiteSpace />
				</div>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}