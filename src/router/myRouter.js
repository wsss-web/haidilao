import React from 'react'
import {
  Switch,
  Route,
  HashRouter,
  // hashHistory
} from "react-router-dom";
import Classify from '../views/fenlei/classify.js'
import Home from '../views/home/main.js'
import Charts from '../views/cart/chart.js'
import My from '../views/my/my.js'
import Login from '../views/login/login.js'
import Search from '../views/home/Search.js'
import Vouchers from '../views/home/Vouchers.js'
import Fresh from '../views/home/Fresh.js'
import Beer from '../views/home/Beer.js'
import Goods from '../views/home/Goods.js'
import GoodsDetail from '../views/home/GoodsDetail.js'
export default function Bar() {
  return (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/classify" component={Classify}/>
            <Route exact path="/chart" component={Charts}/>
            <Route exact path="/my" component={My}/>
            <Route exact path="/search" component={Search}/>
            <Route exact path="/vouchers" component={Vouchers}/>
            <Route exact path="/fresh" component={Fresh}/>
            <Route exact path="/beer" component={Beer}/>
            <Route exact path="/fresh" component={Fresh}/>
            <Route exact path="/goods" component={Goods}/>
            <Route exact path="/goodsdetail" component={GoodsDetail}/>
        </Switch>
    </HashRouter>
  );
}
