import React from 'react';
import axios from 'axios';
import { SearchBar } from 'antd-mobile';

class SearchBarExample extends React.Component {
	constructor(props) {
	    super(props)
		this.state = {
      value: '',
      goodsinfo:[]
		}
		this.onChange = this.onChange.bind(this)
  }
  onChange= (value) => {
    this.setState({ value:value });
    setTimeout(() => {
      var that = this
      axios.post('http://localhost:3001/goodsInfoMana',{
        data: {status:5,goods_type:this.state.value}
      }).then(
        function(res){
          // console.log(res.data)
          that.setState({ goodsinfo:res.data })
          setTimeout(() => {
            that.refs.goodsList.style.display = "block"
          }, 100);
        },
        function(err){
            console.log(err)
        }
        )
    }, 100);
  }
  render() {
    // console.log(this.state.goodsinfo)
    return (
      <div>
        <SearchBar 
        className="searchbar" 
        placeholder="搜索商品"
        maxLength={8}
        style={{ height: "35px",
          borderRadius: "20px",
          backgroundColor: "white",
          margin: "20px 20px 0 20px"
        }}
        onSubmit = {this.onChange}></SearchBar>
        <div ref='goodsList' 
            style={{display:"none",
              width:"90%",
              height:"550px",
              margin:"0 auto",
              overflow:"scroll"}}>
            <ul>
              <Goodslist goodsinfo = {this.state.goodsinfo} history={this.props.history}></Goodslist>
            </ul>
        </div>
      </div>
    );
  }
}

class Goodslist extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      goodsinfo: [],

    }
  }
  componentWillReceiveProps(aaa){
    // console.log(aaa.goodsinfo)
    this.setState({
      goodsinfo:aaa.goodsinfo
    })

  }
  GoodsDetailFn(item){
    var that = this
		that.props.history.push({pathname:'/goodsdetail',state:{item:item}})
		// console.log(item)
	}
  render(){
    // console.log(this.state.goodsinfo)
    return(
      this.state.goodsinfo.map((item,index) =>(
				<li onClick={()=>this.GoodsDetailFn(item)} key={index}>
					<img src={this.state.goodsinfo[index].productPicture} alt=""
              style={{
                width: "90px",
                height: "120px",
                marginTop:"20px",
                marginLeft: "20px"
              }}
          ></img>
          <div style={{position:"relative",left:"130px",top:"-100px"}}>
            <div style={{
              fontSize:"14px",
              lineHeight:"30px",
              position:"absolute"
            }}>{this.state.goodsinfo[index].productName}</div>
            <div style={{
              fontSize:"24px",
              color:"red",
              lineHeight:"48px",
              position:"absolute",
              top:"30px"
            }}>￥ {this.state.goodsinfo[index].price}</div>
          </div>
				</li>
      ))
    )
  }
}

export default SearchBarExample;
