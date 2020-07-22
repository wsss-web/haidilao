import React from 'react';
import SearchBar from './js/SearchBar.js'
import Navbar from '..//home/js/Navbar.js'
export default class Search extends React.Component{ // eslint-disable-next-line
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Navbar name="搜索" history={this.props.history}></Navbar>
                <SearchBar history={this.props.history}></SearchBar>
            </div>
        )
    }
}