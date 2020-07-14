import React from 'react'
import Tablebar from '../components/Tablebar.js'
import NavBar from '../components/Navbar.js'
var createReactClass = require('create-react-class');
var My = createReactClass({
	render: function() {
	  return <div>
				<NavBar name="我的"/>
				<h1>这是我的界面</h1>;
				<Tablebar history={this.props.history}/>
			 </div>
	}
})
export default My