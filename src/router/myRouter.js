import React from 'react'
import {
  Switch,
  Route,
  HashRouter,
  // hashHistory
} from "react-router-dom";
import Like from '../views/like.js'
// import Life from '../views/life.js'
import main from '../views/main.js'
import Friends from '../views/friend.js'
import My from '../views/my.js'
export default function Bar() {
  return (
    <HashRouter>
        <Switch>
            <Route exact path="/like" component={Like}/>
			<Route exact path="/" component={main}/>
			<Route exact path="/friends" component={Friends}/>
			<Route exact path="/my" component={My}/>
        </Switch>
    </HashRouter>
  );
}
