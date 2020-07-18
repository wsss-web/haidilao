import React from 'react'
import Tablebar from '../../components/Tablebar.js'
import SearchBar from '../home/js/SearchBar.js'
import Head from '../../components/head.js'
import { Tabs, WhiteSpace } from 'antd-mobile';
import './classify.css'
import Demo from './list.js'
export default class Classify extends React.Component {
	constructor(props) {
	    super(props)
		this.state = {
			value: '美食',
		}
		this.onChange = this.onChange.bind(this)
		this.clear = this.clear.bind(this)
		this.handleClick = this.handleClick.bind(this)
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
	render() {
		const tabs = [
		  { title: '全部商品' },
		  { title: '商品' },
		  { title: '生鲜' },
		  { title: '特惠套餐' },
		  { title: '酒水饮料' },
		  { title: '零食' },
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
		return (
			<div style={{height:"667px"}}>
				<Head name="分类" history={this.props.history} />
				<div style={{position:"relative",bottom:"10px"}}>
					<SearchBar></SearchBar>
				</div>
				<div className="left_con" style={{ height: 520, backgroundColor: 'white'}}>
					<Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false} tabBarPosition={'left'} tabDirection={'vertical'} tabBarActiveTextColor="rgb(255,106,3)">
					  <div style={{ display: 'flex', alignItems: 'top', justifyContent: 'left', height: '100%', backgroundColor: '#fff' }}>
						<Demo />
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'商品'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'生鲜'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'特惠套餐'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'酒水饮料'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'零食'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'调味料'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'佐餐酱'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'方便速食'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'玩具'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'周边用品'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'优惠券'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'代金券'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'其他'
					  </div>
					  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
						'腾讯会员卡'
					  </div>
					  
					</Tabs>
						<WhiteSpace />
				</div>
				<Tablebar history={this.props.history}/>
			</div>
	)
	}
}