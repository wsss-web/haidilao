import React from 'react';
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
    render(){
        return(
            <div>
                <Navbar name="商品列表" props={this.props}></Navbar>
                <div onClick={this.SearchFn.bind(this)}>
                    <SearchBar disabled></SearchBar>
                </div>
                <div>
                    <Demo></Demo>
                </div>
            </div>
        )
    }
}