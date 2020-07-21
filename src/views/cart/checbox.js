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
  }
  componentDidMount (){
  }
  render() {
    return <div>
      <List>
        
        {/* //我要做的是将触发的下标发给父组件 */}
        {/* 数据是父组件的数据，将检测为真的下标传给父组件 */}
        {this.props.dsDown.map((i , index) => (
          // {
          //   console.log(i)
          // }
          <CheckboxItem key={i.index} onChange={() => this.upTrueFlag(index)} checked={i.flag} >
            {i.label}
            <div className='oneCartGoods'>
              <div>
                <img src={i.img}></img>
              </div>
              <div style={{fontSize:"14px",paddingTop:"5px",paddingLeft:"10px"}}>
                 <div style={{wordWrap:"break-word",whiteSpace:'pre-wrap'}}>
                  {i.title}
                </div>
                <div style={{fontSize:"16px",color:"rgb(209,35,36)",paddingTop:"3px",paddingBottom:"3px"}}>
                  {i.price}元
                </div>
                <div style={{fontSize:"12px",color:"#ccc"}}>
                  {i.mode}
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