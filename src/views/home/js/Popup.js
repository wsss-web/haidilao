import React from "react";
import { Modal, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import { List, Stepper } from 'antd-mobile';
export default class MyPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal2: false,
      goodsdetail:'',
      val:''
    };
  }
  componentWillReceiveProps(){
      this.setState({
        goodsdetail:this.props.goodsdetail
      })
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  getChildrenMsg = (result, val) => {
    // console.log(result, msg)
    // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
    this.setState({
        val: val
    })
  }
  confirmFn(){
    //   console.log(this.props.history)
    localStorage.setItem('goodsdetail', JSON.stringify(this.props.goodsdetail))
    var goodsdetail = JSON.parse(localStorage.getItem('goodsdetail'))
    // console.log(goodsdetail)
    this.props.history.push({pathname:'/confirmorder',state:{goodsdetail:goodsdetail,goodsNum:this.state.val}})
  }
  render() {
    // console.log(this.state.goodsdetail)
    // console.log(this.state.val)
    return (
      <WingBlank>
        <div onClick={this.showModal('modal2')}>立即购买</div>
        <WhiteSpace />
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
        >
            <div style={{height:"260px"}}>
                <img style={{width:"100px",
                        height:"130px",
                        border:"1px solid silver"}} 
                    src={this.state.goodsdetail.productPicture} 
                    alt=""></img>
                <span style={{position:"relative",
                                left:"20px",
                                bottom:"80px",
                                fontSize:"20px",
                                color:"#E83538"
                }}>￥ {this.state.goodsdetail.price}</span>
                <span style={{position:"relative",
                                right:"50px",
                                bottom:"40px",
                                fontSize:"14px",
                                color:"#383838"
            }}>已选择{this.state.val}件，总价为{(this.state.val * this.state.goodsdetail.price).toFixed(2)}元</span>
                <StepDemo parent={this}></StepDemo>
                <WingBlank>
                    <Button type="primary" style={{marginTop:"10px"}} 
                        onClick={()=>{this.confirmFn()}}>确认</Button>
                </WingBlank>
            </div>
        </Modal>
      </WingBlank>
    );
  }
}

class StepDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 1
    };
  }
  onChange = (val) => {
    this.setState({ val });
  }
  toParent = () => {
    this.props.parent.getChildrenMsg(this, this.state.val)
  }
  componentWillMount(){
    this.props.parent.getChildrenMsg(this, this.state.val)
  }
  render() {
    return (
      <List onClick={this.toParent}>
        <List.Item
          wrap
          extra={
            <Stepper
              style={{ width: '100%', minWidth: '100px' }}
              showNumber
              max={10}
              min={1}
              value={this.state.val}
              onChange={this.onChange}
            />}
        >数量</List.Item>
      </List>
    );
  }
}