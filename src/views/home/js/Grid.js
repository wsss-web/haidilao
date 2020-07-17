import React from 'react';
import { Grid } from 'antd-mobile';

const name = [
    '代金券',
    '生鲜',
    '啤酒',
    '商品'
]


const data = Array.from(new Array(4)).map((_val, i) => ({
  icon: require(`../../../assets/icons/${name[i]}.png`),
  text: `${name[i]}`,
}));


class MyGrid extends React.Component{ // eslint-disable-next-line 
  constructor(props){
    super(props)
  }
  aaa(index){
    if(index === 0){
      // console.log('0000')
      // console.log(this.props)
      this.props.props.history.push('/vouchers')
    }else if(index === 1){
      this.props.props.history.push('/fresh')
    }else if(index === 2){
      this.props.props.history.push('/beer')
    }else if(index === 3){
      this.props.props.history.push('/goods')
    }
  }
  render(){
    return(
      <div style={{ position:"relative", top:"-50px" }}>
    <Grid data={data} activeStyle={false}
      onClick={(el, index) => this.aaa(index)
        // console.log(el.text,index)
      }
    ></Grid>
  </div>
    )
  }
}

export default MyGrid;