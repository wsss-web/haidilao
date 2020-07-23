/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from 'antd-mobile';
import React from 'react';
import axios from 'axios';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => {
          console.log("11111")
          console.log(r1)
          console.log(r2)
          return r1 !== r2
        }
      }),
      isLoading: true
    };
  }
  
  componentDidMount() {
      var that = this
      axios.post('http://localhost:3001/goodsInfoMana',{
          data: {status:4}
      }).then(
          function(res){
            // console.log(res.data)
            that.setState({
              rowData: res.data
            })
          },
          function(err){
            console.log(err)
          }
        )
  }

  onEndReached = (event) => {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
  }

  GoodsDetailFn(item){
		var that = this
		that.props.history.push({pathname:'/goodsdetail',state:{item:item}})
	}

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: 'white',
        }}
      />
    );
    const row = (item, sectionID, rowID) => {
      return (
        <div key={rowID} style={{ padding: '0 15px'}} onClick={()=>this.GoodsDetailFn(item)}>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0', alignItems: 'center' }}>
            <img style={{width:"100px", height: '120px', margin: '0 15px 0 10px' }} src={item.productPicture} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{item.productName}</div>
              <div style={{ width:"200px",height:"12px",marginBottom: '8px',fontSize:"12px",overflow:"hidden" }}>{item.description}</div>
			        <div><span style={{ fontSize: '10px', color: '#FF6E27' }}>库存 {item.stocks}</span></div>
              <div style={{ marginTop: '13px' }}><span style={{ fontSize: '27px', color: 'rgb(255,1,1)' }}>￥ {item.price}</span></div>
            </div>
            {/* <img src={require("../../../assets/icons/add.png")} alt="" style={{ width: '22px',height:'22px',position:"relative",top:"20px",right:"10px"}}></img> */}
          </div>
        </div>
      );
    };


    return (<ListView
        ref={el => this.listView = el}
        dataSource={this.state.dataSource.cloneWithRows(this.state.rowData)}
        useBodyScroll
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: 540,
          overflow: 'scroll',
        }}
        initialListSize={500}
      />
    );
  }
}