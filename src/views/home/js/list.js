/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import { ListView } from 'antd-mobile';
import React from 'react'
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

const data = [
  {
    img: 'https://www.haidilao.com/zh/2019/09/2019090416520953297.jpg',
    name: '捞派肥牛',
    des: fontNumber('肥牛是精选谷饲一百天天以上的牛经过一定的温度、湿度、风速的环境下使牛的肌肉纤维发生变化排酸处理后，自然块分割，刨成薄片的牛肉，其口感细腻、化渣，肉味十足。'),
  },
  {
    img: 'https://www.haidilao.com/zh/2019/09/2019090416523393910.jpg',
    name: '捞派麻辣滑牛肉',
    des: fontNumber('使用的牛肉是大小米龙和嫩肩肉，是牛的后腿和前腿中最嫩的部位，形状像黄瓜，俗称：黄瓜条。每份滑牛都要经过解冻、去筋膜、分割、切片、腌制等9道复杂工序，口感滑嫩，久煮不老，是海底捞必点菜品。'),
  },
  {
    img: 'https://www.haidilao.com/english/2019/07/2019072015522482101.jpg',
    name: '兆镇撒尿牛肉丸',
    des: fontNumber('选用牛后腿部位牛霖，经过排酸、绞碎、搅打成的牛肉滑，捏成丸子后，里面裹入用老鸡、火腿等精心熬制的汤冻。锅开后浮起来再煮3分钟左右即可食用。配上丸滑蘸碟，风味更突出。撒尿牛肉丸中心汤汁温度较高，食用时小心被汤汁烫到。'),
  },
];
const NUM_SECTIONS = 0;
const NUM_ROWS_PER_SECTION = 0;
let pageIndex = 0;

const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
  for (let i = 0; i < NUM_SECTIONS; i++) {
    const ii = (pIndex * NUM_SECTIONS) + i;
    const sectionName = `Section ${ii}`;
    sectionIDs.push(sectionName);
    dataBlobs[sectionName] = sectionName;
    rowIDs[ii] = [];

    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
      const rowName = `S${ii}, R${jj}`;
      rowIDs[ii].push(rowName);
      dataBlobs[rowName] = rowName;
    }
  }
  sectionIDs = [...sectionIDs];
  rowIDs = [...rowIDs];
}

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    const guize = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: guize.cloneWithRowsAndSections(data),
      isLoading: true
    };
  }

  // componentDidMount() {
  //   // you can scroll to the specified position
  //   setTimeout(() => this.lv.scrollTo(0, 120), 800);

  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      genData(++pageIndex);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
        isLoading: false,
      });
    }, 1000);
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
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div key={rowID} style={{ padding: '0 15px'}}>
          <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0', alignItems: 'center' }}>
            <img style={{ height: '110px', margin: '0 15px 0 10px' }} src={obj.img} alt="" />
            <div style={{ lineHeight: 1 }}>
              <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.name}</div>
              <div style={{ marginBottom: '8px',fontSize:"12px" }}>{obj.des}</div>
			        <div><span style={{ fontSize: '10px', color: '#FF6E27' }}>已购 11111</span></div>
              <div style={{ marginTop: '13px' }}><span style={{ fontSize: '27px', color: 'rgb(255,1,1)' }}>¥ 35</span></div>
            </div>
            <img src={require("../../../assets/icons/add.png")} alt="" style={{ width: '20px',position:"relative",top:"20px",left:"80px" }}></img>
          </div>
        </div>
      );
    };

    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        // renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
        //   {this.state.isLoading ? 'Loading...' : 'Loaded'}
        // </div>)}
        renderBodyComponent={() => <MyBody />}
        renderRow={row}
        renderSeparator={separator}
        style={{
          height: 540,
          overflow: 'auto',
        }}
        pageSize={4}
      // onScroll={() => { console.log('scroll'); }}}
      />
    );
  }
}