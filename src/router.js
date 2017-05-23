import React from 'react'
import { Router } from 'dva/router'

import App from './routes/App'

const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

const RouterConfig = ({ history, app }) => {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/uploadlist'));
          cb(null, { component: require('./routes/Home') })
        }, 'index')
      },
      childRoutes: [
        {
          path: '/dashboard',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dashboard'));
              registerModel(app, require('./models/uploadlist'));
              cb(null, require('./routes/Dashboard'))
            }, 'dashboard')
          },
        },
        {
          path: '/about',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/About'))
            }, 'about')
          },
        },
      ],
    },
  ]

  return <Router history={history} routes={routes} />
}

export default RouterConfig
