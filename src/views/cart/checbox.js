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
        heji:this.props.xx,
        dataSource:[
        // { value: 0, label: '海底捞商城' },
        {
          img:'https://mirror-gold-cdn.xitu.io/168e083f35ac00b6f3c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
          title:'海底捞蜂蜜桂花啤酒330ml*9听',
          price: '19.80元',
          mode:'支付方式：现金',
          quantity:'10',
          flag: false
        },
        {
          img:'https://mirror-gold-cdn.xitu.io/168e083f35ac00b6f3c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
          title:'海底捞蜂蜜桂花啤酒330ml*9听',
          price: '19.80元',
          mode:'支付方式：现金',
          quantity:'10',
          flag: false
        },
        {
          img:'https://mirror-gold-cdn.xitu.io/168e083f35ac00b6f3c?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
          title:'海底捞蜂蜜桂花啤酒330ml*9听(预售7天内发货)',
          price: '19.80元',
          mode:'支付方式：现金',
          quantity:'10',
          flag: false
        }
      ]
    }
  }

  componentWillReceiveProps(a) {
    console.log(a.xx)
    var tmp_data = this.state.dataSource
    var tmp_data2 = tmp_data.map((item , index) => {
      // console.log(val)
       item.flag = a.xx
       return item
    })
    console.log(tmp_data2)
    this.setState({
      dataSource: tmp_data2
    })
    this.state.dataSource.filter((item , index) => {
      item.flag = a.xx
      return item
   })
  }
  componentDidMount (){
  
  }
  toggleChecked = (index) => {
    console.log(index)
    console.log(this.state.dataSource[index].flag)
    let xx=this.state.dataSource
    xx[index].flag=!xx[index].flag
    this.setState({ dataSource: xx });
  }
  onChange = (val) => {
    console.log(val);
  }
  quanxuan (){
   
  }
  render() {
    console.log(this.props.xx)
    console.log(this.state.heji)
    // var that = this
    return <div>
      <List>
        <CheckboxItem key="enabled" onClick={      
          (val)=>{
            console.log(this.state.heji)
            var tmp_data = this.state.dataSource
            var tmp_data2 = tmp_data.map((item , index) => {
              console.log(val)
               item.flag = val.target.checked
               return item
            })
            console.log(tmp_data2)
            this.setState({
              dataSource: tmp_data2
            })
            this.state.dataSource.filter((item , index) => {
              item.flag = val.target.checked
              return item
           })
          }
          // () => this.toggleChecked
        } >
          <List.Item.Brief  style={{fontSize:"12px",color:"black"}}>海底捞商城</List.Item.Brief>
        </CheckboxItem>
        {this.state.dataSource.map((i , index) => (
          <CheckboxItem key={i.index} onClick={() => this.toggleChecked(index)}  checked={i.flag} onChange={() => this.onChange(i.index)} >
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
                  {i.price}
                </div>
                <div style={{fontSize:"12px",color:"#ccc"}}>
                  {i.mode}
                </div>
              </div> 
            </div>
            <div className='count'>
              <div onClick={
                ()=> {
                  var xxx = this.state.dataSource
                  console.log(xxx)
                  console.log(index)
                  xxx[index].quantity--
                  if(xxx[index].quantity>0){
                    this.setState({
                    dataSource: xxx
                  })
                }
                  }              
              }>-</div>
              <div>{i.quantity}</div>
              <div onClick={
                ()=> {
                  var xxx = this.state.dataSource
                  console.log(xxx)
                  console.log(index)
                  xxx[index].quantity++
                  this.setState({
                    datSource: xxx
                  })
                }
              }>+</div>
            </div>
          </CheckboxItem>
        ))}      
      </List>
    </div>;
  }
}

// ReactDOM.render(<Test />, mountNode);