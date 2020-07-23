import React from 'react'
import './head.css'
export default class Head extends React.Component {
	constructor(props) {
	    super(props)
		this.btnback = this.btnback.bind(this)
	}
	btnback(){
		this.props.history.push('/home')
	}
	render() {
		return (
			<div className="head">
				<div className="left" onClick = {this.btnback}>
					<img src={require("../icon/Rhome.png")} alt="" style={{ width: '28px',height:"28px",marginTop:"2px"}}/>
				</div>
					<p style={{paddingLeft: '10px', fontSize: '15px'}}>{this.props.name}</p>
			</div>
		)
	}
}