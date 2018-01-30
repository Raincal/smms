import React from 'react'
import { Router, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'
import MainLayout from './components/layout'

const RouterConfig = ({ history, app }) => {
  const Home = dynamic({
    app,
    models: () => [import('./models/uploadlist')],
    component: () => import('./routes/Home'),
  })

  const Dashboard = dynamic({
    app,
    models: () => [import('./models/dashboard'), import('./models/uploadlist')],
    component: () => import('./routes/Dashboard'),
  })

  const AboutPage = dynamic({
    app,
    component: () => import('./routes/About'),
  })

  return (
    <Router history={history}>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/about" component={AboutPage} />
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default RouterConfig
