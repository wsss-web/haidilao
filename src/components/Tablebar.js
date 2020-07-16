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
      <div style={{ position: 'fixed',width: '100%',bottom: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
		  // noRenderContent = {true}
        >
          <TabBar.Item
            title="Life"
            key="Life"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            // selected={this.state.selectedTab === 'blueTab'}
			selected={this.props.history.location.pathname === '/'}
            badge={1}
            onPress={() => {
			// this.setState({
			//   selectedTab: 'yellowTab',
			// });
			  this.props.history.push('/')
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
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="Koubei"
            key="Koubei"
            badge={'new'}
			selected={this.props.history.location.pathname === '/like'}
            // selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
				this.setState({
				  selectedTab: 'yellowTab',
				});
			  this.props.history.push('/like')
			  console.log(this.props)
            }}
            data-seed="logId1"
          >
            {this.renderContent('Koubei')}
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="Friend"
            key="Friend"
            dot
            // selected={this.state.selectedTab === 'greenTab'}
			selected={this.props.history.location.pathname === '/friends'}
            onPress={() => {
              // this.setState({
              //   selectedTab: 'greenTab',
              // });
			  this.props.history.push('/friends')
            }}
          >
            {this.renderContent('Friend')}
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="My"
            key="my"
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