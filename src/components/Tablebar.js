import React from 'react'
import { TabBar } from 'antd-mobile';


class Tablebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  renderContent(pageText) {
    return (
      <div style={{ backgroundColor: 'white', height: 0, textAlign: 'center' }}>
      </div>
    );
  }

  render() {
    return (
      <div style={{ position: 'fixed',width: '100%',bottom: 0,zIndex:1 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#FF393A"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
		      noRenderContent = {true}
        >
          <TabBar.Item
            title="首页"
            key="首页"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${require('../assets/icons/首页.png')}) center center /  21px 21px no-repeat`
            }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: `url(${require('../assets/icons/首页-选中.png')}) center center /  21px 21px no-repeat` }}
            />
            }
            // selected={this.state.selectedTab === 'blueTab'}
			selected={this.props.history.location.pathname === '/home'}
            badge={1}
            onPress={() => {
			// this.setState({
			//   selectedTab: 'yellowTab',
			// });
			  this.props.history.push('/home')
			  console.log(this.props)
            }}
            data-seed="logId"
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${require('../assets/icons/分类.png')}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${require('../assets/icons/分类-选中.png')}) center center /  21px 21px no-repeat` }}
              />
            }
            title="分类"
            key="分类"
            // badge={1}
			      selected={this.props.history.location.pathname === '/classify'}
            // selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
				    this.setState({
				      selectedTab: 'yellowTab',
				    });
			      this.props.history.push('/classify')
			        // console.log(this.props)
            }}
            data-seed="logId1"
          >
            {this.renderContent('Classify')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${require('../assets/icons/购物车.png')}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${require('../assets/icons/购物车-选中.png')}) center center /  21px 21px no-repeat` }}
              />
            }
            title="购物车"
            key="购物车"
            // selected={this.state.selectedTab === 'greenTab'}
			      selected={this.props.history.location.pathname === '/chart'}
            onPress={() => {
              // this.setState({
              //   selectedTab: 'greenTab',
              // });
			      this.props.history.push('/chart')
              }}
            >
            {this.renderContent('Charts')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${require('../assets/icons/我的.png')}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url(${require('../assets/icons/我的-选中.png')}) center center /  21px 21px no-repeat` }}
              />
            }
            title="我的"
            key="我的"
            // selected={this.state.selectedTab === 'yellowTab'}
			      selected={this.props.history.location.pathname === '/my'}
            onPress={() => {
              // this.setState({
              //   selectedTab: 'yellowTab',
              // });
			      this.props.history.push('/my')
              }}
            >
            {this.renderContent('My')}
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}
// ReactDOM.render(<main />, mountNode);
export default Tablebar