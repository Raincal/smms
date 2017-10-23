import dva from 'dva'
import { message } from 'antd'
import createHistory from 'history/createBrowserHistory'
import createLoading from 'dva-loading'
import { persistStore, autoRehydrate, createPersistor } from 'redux-persist'
import localForage from 'localforage'

import { config } from './utils/localForage'

// 1. Initialize
const app = dva({
  history: createHistory(),
  extraEnhancers: [autoRehydrate()],
  onError(e) {
    message.error(e.message, 3)
  },
})

// 2. Plugins
app.use(createLoading())

// 3. Model

// 4. Router
app.router(require('./router'))

// 5. Start
app.start('#root')

localForage.config({
  ...config,
})

persistStore(app._store, {
  storage: localForage,
  keyPrefix: 'smms:',
  whitelist: ['dashboard'],
})

// secondaryPersistor
createPersistor(app._store, {
  keyPrefix: 'smms:',
  whitelist: ['uploadlist'],
})
