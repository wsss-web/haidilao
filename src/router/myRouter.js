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
import Cang from '../views/my/mycang.js'
import Order from '../views/my/odrer.js'
import Odrershou from '../views/my/odrershou.js'
import Login from '../views/login/login.js'
import Myadress from '../views/my/myadress.js'
export default function Bar() {
  return (
    <HashRouter>
        <Switch>
            <Route exact path="/classify" component={Classify}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/chart" component={Charts}/>
            <Route exact path="/my" component={My}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/order" component={Order}/>
            <Route exact path="/odrershou" component={Odrershou}/>
            <Route exact path="/myadress" component={Myadress}/>
            <Route exact path="/mycang" component={Cang}/>
        </Switch>
    </HashRouter>
  );
}
