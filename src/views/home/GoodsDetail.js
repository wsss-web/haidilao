import React from 'react';
import Navbar from '..//home/js/Navbar.js'
export default function GoodsDetail (props){
    // console.log(props)
    return(
        <div>
            <Navbar name="商品详情" props={props}></Navbar>
        </div>
    )
}