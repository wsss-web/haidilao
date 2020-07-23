import React from 'react'
import { Modal, Button, WingBlank, Stepper, List, Toast } from 'antd-mobile';
import '../fenlei/popup.css'
import axios from 'axios'
import Newinput from './newinput.js'
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
	  val: 1
    };
	this.yyy = this.yyy.bind(this)
  }
  componentWillReceiveProps(a){
	  console.log(a)
	  this.setState({
		  modal2: a.flag,
	  })
  }
  onChange = (val) => {
    console.log(val);
    this.setState({ val });
  }
  onClose_oth = key => () => {
	  this.setState({
	    [key]: false,
	  });
  }
  onClose = key => () => {
	this.setState({
	  [key]: false,
	});
  }
  getflag = (msg) => {
	  this.setState({
		  modal2: msg
	  })
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
  yyy(a) {
	  this.props.newNameFn(a)
  }

  render() {
    return (
      <WingBlank>
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose_oth('modal2')}
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
            >设置新昵称</div>
            <div style={{ display: '-webkit-box', display: 'flex', padding: '10px 0', alignItems: 'center'}}>
              <Newinput  sb={this.yyy} getflag = {this.getflag}/>
            </div>
          </div>
        </Modal>
      </WingBlank>
    );
  }
}
