import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { DEVTOOLS_IS_ENABLED } from "./config";

import DevTools from "./containers/DevTools";
import LayoutContainer from "./containers/layout/LayoutContainer";
import asyncComponent from "./hoc/AsyncComponentHoc";

export const routes = [
  // {
  //   type: "redirect",
  //   from: "/",
  //   to: "/dashboard"
  // },
  {
    name: "index-new",
    path: "/",
    component: asyncComponent(
      import("./containers/modules/User/pages/DashBoardPage").then(
        cmp => cmp.default
      )
    )
  },
  {
    name: "dashboard",
    path: "/dashboard",
    component: asyncComponent(
      import("./containers/modules/User/pages/DashBoardPage").then(
        cmp => cmp.default
      )
    )
  },
  {
    name: "login",
    path: "/login",
    component: asyncComponent(
      import("./containers/modules/User/pages/AuthPage").then(
        cmp => cmp.default
      )
    )
  },
  {
    name: "notfound",
    path: "*",
    component: asyncComponent(
      import("./containers/modules/User/pages/NotFoundPage").then(
        cmp => cmp.default
      )
    )
  }
];

const makeRoute = (parent, store, level) => route => {
  const isNotComponentRoute = route.type === "redirect";
  const RouteComponent = isNotComponentRoute ? Redirect : Route;
  const nextLevel = level + 1;
  route.key = [level, parent, route.path].join("-");

  if (route.children) {
    route.children = makeRoutes(route.children, store, route.path, nextLevel);
  }

  if (!isNotComponentRoute && !route.component) {
    route.component = props => (
      <div>
        <h1>Empty Route</h1> {JSON.stringify(route, null, 2)}
        <hr /> {JSON.stringify(props, null, 2)}
      </div>
    );
  }

  return <RouteComponent {...route} />;
};

const makeRoutes = (list, store, parent, level) => {
  return list.map(makeRoute(parent, store, level));
};

export const makeRouter = (store, history) => {
  return (
    <div>
      <ConnectedRouter history={history}>
        <div>
          {DEVTOOLS_IS_ENABLED && <DevTools />}
          <LayoutContainer>
            <Switch>{makeRoutes(routes, store, "root", 0)}</Switch>
          </LayoutContainer>
        </div>
      </ConnectedRouter>
    </div>
  );
};
