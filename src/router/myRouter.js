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
import Search from '../views/home/Search.js'
import Vouchers from '../views/home/Vouchers.js'
import Fresh from '../views/home/Fresh.js'
import Beer from '../views/home/Beer.js'
import Goods from '../views/home/Goods.js'
import GoodsDetail from '../views/home/GoodsDetail.js'
import Myadress from '../views/my/myadress.js'
import Pingjia from '../views/my/pingjia.js'
import Bianadress from '../views/my/bianaddress.js'
import Addadress from '../views/my/addaddress.js'
import Forget from '../views/login/forget.js'
import Newword from '../views/login/newword.js'
import Register from '../views/login/register.js'
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
            <Route exact path="/goods" component={Goods}/>
            <Route exact path="/goodsdetail" component={GoodsDetail}/>
            <Route exact path="/order" component={Order}/>
            <Route exact path="/odrershou" component={Odrershou}/>
            <Route exact path="/myadress" component={Myadress}/>
            <Route exact path="/mycang" component={Cang}/>
            <Route exact path="/forget" component={Forget} />
            <Route exact path="/newword" component={Newword} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/addaddress" component={Addadress} />
            <Route exact path="/bianaddress" component={Bianadress} />
            <Route exact path="/pingjia" component={Pingjia} />
        </Switch>
    </HashRouter>
  );
}
