import React from 'react'
import { Modal, Button, WingBlank, Stepper, List, Toast } from 'antd-mobile';
import './popup.css'
import axios from 'axios'
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2: this.props.flag,
	  goods: '',
	  val: 1,
    };
  }
  componentWillReceiveProps(a){
	  console.log(a)
	  this.setState({
		  modal2: a.flag,
		  goods: a.goods
	  })
  }
  onChange = (val) => {
    console.log(val);
    this.setState({ val });
  }
  onClose = key => () => {
	this.setState({
	  [key]: false,
	});
	var cur_good = {
		status: 6,
		userId: localStorage.getItem('userId'),
		productNumber: this.state.goods.productNumber,
		quantity: this.state.val
	}
	axios.post('http://localhost:3001/shoppingCartMana',{
		data: cur_good
	})
		.then(
			function(res){
				// 添加
				if(res.data.length == 0){
					cur_good.status = 1
					console.log(cur_good)
					axios.post('http://localhost:3001/shoppingCartMana', {
						data: cur_good
					})
						.then(
							function(res){
								Toast.info('添加购物车成功', 2);
								// console.log(res)
							},
							function(err){
								// console.log(err)
							}
						)
				}else{
					// 修改
					cur_good.status = 3
					axios.post('http://localhost:3001/shoppingCartMana', {
						data: cur_good
					})
						.then(
							function(res){
								Toast.info('添加购物车成功', 2);
								// console.log(res)
							},
							function(err){
								// console.log(err)
							}
						)
					
				}
			},
			function(err){
				console.log(err)
			}
		)
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  render() {
    return (
      <WingBlank>
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
          <div style={{ padding: '0 15px' }}>
            <div
              style={{
                lineHeight: '30px',
                color: '#888',
                fontSize: 14,
                borderBottom: '1px solid #F6F6F6',
          	  height: '30px'
              }}
            >{this.state.goods.productName}</div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '10px 0', alignItems: 'center'}}>
              <img style={{ height: '110px', width: '80.22px', marginRight: '15px' }} src={this.state.goods.productPicture} alt="" />
              <div style={{ lineHeight: 1, width: '240px' }}>,
				<div style={{marginBottom: '10px'}}>
					<span style={{ fontSize: '10px', color: '#FF6E27' }}>库存: {this.state.goods.stocks}</span>
				</div>
				<div>
					<Stepper
					  style={{ width: '40%', minWidth: '10px' }}
					  showNumber
					  max={10}
					  min={1}
					  value={this.state.val}
					  onChange={this.onChange}
					/>
				</div>
                <div style={{marginTop: '13px'}}><span style={{ fontSize: '27px', color: 'rgb(255,1,1)' }}>¥ {(this.state.goods.price * this.state.val).toFixed(2)}</span></div>,
				<Button type="primary" onClick={this.onClose('modal2')}>购买</Button>
              </div>
            </div>
          </div>
        </Modal>
      </WingBlank>
    );
  }
}
