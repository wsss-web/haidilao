import { List, Checkbox, Flex } from 'antd-mobile';
import React from 'react'
// import './chart.css'
import './chart.css'

const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

export default class Test extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    }
    this.yyy = this.yyy.bind(this)
  }
  yyy(e,s,t){
    this.props.tpa(e,s,t)
  }
 
  upTrueFlag(index){
    // var trueFlageArr=[]
    // trueFlageArr.push(index)
    // console.log(trueFlageArr)
    var flagup=index
    // this.yyy(flagup,)
    var quantityup=null
    var quantityudown=null
    this.yyy(flagup,quantityup,quantityudown)
  }
  upQuantity(index){
    var flagup=null
    // this.yyy(flagup,)
    var quantityup=index
    var quantityudown=null
    this.yyy(flagup,quantityup,quantityudown)
  }
  downQuantity(index){
    var flagup=null
    // this.yyy(flagup,)
    var quantityup=null
    var quantityudown=index
    this.yyy(flagup,quantityup,quantityudown)
  }
  componentWillReceiveProps(a) {
    // console.log(a)
    // console.log(this.props.dsDown)
    //如果传来的props的值需要改变，就需要放在这个生命周期里
  }
  componentDidMount (){
  }
  render() {
    return <div>
      <List>
        {this.props.dsDown.map((i , index) => (
          // {
          //   console.log(i)
          // }
          <CheckboxItem key={i.index} onChange={() => this.upTrueFlag(index)} checked={i.flag} >
            {i.label}
            <div className='oneCartGoods'>
              <div>
                <img src={i.productPicture} alt=""></img>
              </div>
              <div style={{fontSize:"14px",paddingTop:"5px",paddingLeft:"10px"}}>
                 <div style={{wordWrap:"break-word",whiteSpace:'pre-wrap'}}>
                  {i.productName}
                </div>
                <div style={{fontSize:"16px",color:"rgb(209,35,36)",paddingTop:"3px",paddingBottom:"3px"}}>
                  {i.price}元
                </div>
                <div style={{fontSize:"12px",color:"#ccc"}}>
                支付方式：现金
                </div>
              </div> 
            </div>
            <div className='count'>
              <div
                onClick={(e) => {this.upQuantity(index)
                 e.stopPropagation()}}>-</div>
              <div>{i.quantity}</div>
              <div 
               onClick={(e) => {this.downQuantity(index)
                 e.stopPropagation()}}>+</div>
            </div>
          </CheckboxItem>
        ))}      
      </List>
    </div>;
  }
}

// ReactDOM.render(<Test />, mountNode);