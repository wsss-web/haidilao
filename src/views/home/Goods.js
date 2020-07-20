import React from 'react';
// import axios from 'axios';
import Navbar from './js/Navbar.js'
import SearchBar from './js/SearchBar.js'
import Demo from './js/list.js'
export default class Goods extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
    }
    state={
    }
    SearchFn(){
		this.props.history.push('/search')
    }
    componentDidMount() {
    }
    render(){
        return(
            <div>
                <Navbar name="商品列表" props={this.props}></Navbar>
                <div onClick={this.SearchFn.bind(this)} style={{height:"38px"}}>
                    <SearchBar disabled></SearchBar>
                </div>
                <div style={{height:"550px",backgroundColor:"white",marginTop:"15px",overflow:"scroll"}}>
                    <Demo props={this.props}></Demo>
                </div>
            </div>

         
        )
    }
}