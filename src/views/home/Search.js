import React from 'react';
import SearchBar from './js/SearchBar.js'
import Navbar from '..//home/js/Navbar.js'
export default function Search (props){
    // console.log(props)
    return(
        <div>
            <Navbar name="搜索" props={props}></Navbar>
            <SearchBar></SearchBar>
        </div>
    )
}