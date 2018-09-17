import { message } from 'antd'
import localForage from 'localforage'
import { createPersistoid, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { config as localForageConfig } from './utils/localForage'

localForage.config({
  ...localForageConfig,
})

const persistConfig = {
  key: 'dashboard',
  keyPrefix: 'smms:',
  storage: localForage,
  whitelist: ['dashboard'],
}

const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer)
  const persist = persistStore(store)

  let persistoid = createPersistoid({
    key: 'uploadlist',
    keyPrefix: 'smms:',
    storage,
    whitelist: ['uploadlist'],
  })

  store.subscribe(() => {
    persistoid.update(store.getState())
  })

  return { ...store, persist }
}

export function config() {
  return {
    onError(err) {
      err.preventDefault()
      message.error(err.message)
    },
    extraEnhancers: [persistEnhancer()],
  }
}
