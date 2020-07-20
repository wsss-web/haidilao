/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView, Toast } from 'antd-mobile';
import React from 'react'
// import ReactDOM from 'react-dom'
import './classify.css'
import axios from 'axios'
function MyBody(props) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}
function fontNumber(date) {
  const length = date.length
  if (length > 10) {
    var str = ''
    str = date.substring(0, 10) + '...'
    return str
  } else {
    return date
  }
}

const NUM_SECTIONS = 0;
const NUM_ROWS_PER_SECTION = 0;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];


const guize = new ListView.DataSource({
					  rowHasChanged: (row1, row2) => row1 !== row2,
					  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
					});

export default class XXX extends React.Component{
	constructor(props){
		console.log("9999999")
		// console.log(props)
		super(props)
		this.state = {
			goods: [],
			title: '',
			index: ''
		}
		this.addgoods = this.addgoods.bind(this)
	}
	componentWillReceiveProps(a){
		console.log('7777')
		console.log(a)
	var goods = a.goods.filter(function(item){
		 return item.category == a.title; 
	})
		console.log(goods)
		if( goods.length != 0 ){
			console.log(44444)
			this.setState({
				goods: goods,
				title: a.title,
				index: a.index
			})
		}else if(goods.length == 0){
			console.log(66666)
			this.setState({
				goods: a.goods,
				title: a.title,
				index: a.index
			})
		}
		if(a.sou != ''){
			console.log(55555)
			var sougoods = a.goods.filter(function(item){
				if(item.productName.indexOf(a.sou) == -1){
					return false
				}else{
					return true
				}
			})
			console.log(sougoods)
			if( sougoods.length != 0 ){
				this.setState({
					goods: sougoods
				})
			}else{
				this.setState({
					goods: a.goods
				})
			}
		}
	}
	addgoods = () => {
		console.log(66666)
	}
	row(rowData, sectionID, rowID) {
	  return (
	    <div key={rowID} style={{ padding: '0 15px' }}>
	      <div
	        style={{
	          lineHeight: '30px',
	          color: '#888',
	          fontSize: 14,
	          borderBottom: '1px solid #F6F6F6',
			  height: '30px'
	        }}
	      >{rowData.productName}</div>
	      <div style={{ display: '-webkit-box', display: 'flex', padding: '10px 0', alignItems: 'center'}}>
	        <img style={{ height: '110px', width: '80.22px', marginRight: '15px' }} src={rowData.productPicture} alt="" />
	        <div style={{ lineHeight: 1, width: '120px'}}>
	          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{fontNumber(rowData.description)}</div>
			  <div><span style={{ fontSize: '10px', color: '#FF6E27' }}>已换购 11111</span></div>
	          <div style={{marginTop: '13px'}}><span style={{ fontSize: '27px', color: 'rgb(255,1,1)' }}>¥ 35</span></div>
	        </div>
			<div className = "add">
				<img src={require("../../assets/icons/add.png")} alt="" style={{width: '20px', marginLeft: '10px', marginRight: '10px'}}></img>
			</div>
				
	      </div>
	    </div>
	  );
	};
	render() {
		return (
			<div>
				<ListView
				  ref={el => this.lv = el}
				  dataSource={guize.cloneWithRows(this.state.goods)}
				  // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
				  //   {this.state.isLoading ? 'Loading...' : 'Loaded'}
				  // </div>)}
				  renderBodyComponent={() => <MyBody />}
				  renderRow={
					  this.row
				  }
				  // renderSeparator={separator}
				  style={{
				    height: "500px",
				    overflow: 'auto',
				  }}
				/>
				
			</div>
		)
	}
}