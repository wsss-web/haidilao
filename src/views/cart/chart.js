import React from 'react'
import Tablebar from '../../components/Tablebar.js'
import NavBar from '../../components/Navbar.js'
var createReactClass = require('create-react-class');
var Charts = createReactClass({
  render: function() {
    return  <div>
				<NavBar name="购物车"/>
				<h1>这是购物车界面</h1>;
				<Tablebar history={this.props.history}/>
			</div>
  }
});
export default Charts