import React from 'react'
import Tablebar from '../components/Tablebar.js'
import NavBar from '../components/Navbar.js'
var createReactClass = require('create-react-class');
var Friends = createReactClass({
  render: function() {
    return  <div>
				<NavBar name="朋友"/>
				<h1>这是朋友界面</h1>;
				<Tablebar history={this.props.history}/>
			</div>
  }
});
export default Friends