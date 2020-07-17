import React from 'react'
import './head.css'
export default class Head extends React.Component {
	constructor(props) {
	    super(props)
		this.btnback = this.btnback.bind(this)
	}
	btnback(){
		console.log('666')
		this.props.history.push('/home')
	}
	render() {
		return (
			<div className="head">
				<div className="left" onClick = {this.btnback} style={{ width: '30px', height: '30px', border: '1px solid rgb(214,214,214)', textAlign: 'center', position: 'relative', borderRadius: '100%', display: 'inlineBlock'}}>
					<img src={require("../assets/icons/home.png")} alt="" style={{ width: '18px', position: 'absolute', top:'0', bottom: '0', left: '0', right: '0', margin: 'auto' }}/>
				</div>
					<p style={{paddingLeft: '10px', fontSize: '15px'}}>{this.props.name}</p>
			</div>
		)
	}
}