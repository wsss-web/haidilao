import React from 'react';
import { Carousel, WingBlank } from 'antd-mobile';

class MyCarousel extends React.Component {
  state = {
    data: ['1', '2', '3']
  }
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['1', '2', '3'],
      });
    }, 100);
  }
  render() {
    return (
      <WingBlank>
        <Carousel
          autoplay={true}
          infinite
          style={{ position:"relative", bottom:"60px" }}
        >
          {this.state.data.map(val => (
              <img
                key={val}
                src={require(`../../../assets/imgs/轮播图${val}.jpg`)}
                alt=""
                style={{ width: '100%', height:"160px", verticalAlign: 'top', borderRadius:"10px" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                }}
              />
          ))}
        </Carousel>
      </WingBlank>
    );
  }
}

export default MyCarousel;