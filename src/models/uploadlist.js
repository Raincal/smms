import _ from 'lodash/fp'
import { loadLocalState } from '../utils/localForage'

export default {
  namespace: 'uploadlist',

  state: [],

  reducers: {
    init(state, { payload: { data } }) {
      return data
    },

    save(state, { payload: { data } }) {
      return [...state, ...data]
    },

    remove(state, { payload: { hash } }) {
      return _.filter(item => item.hash !== hash)(state)
    },
  },

  effects: {
    *upload({ payload: { data } }, { put }) {
      yield put({
        type: 'save',
        payload: {
          data: [data],
        },
      })
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/' || '/dashboard') {
          const uploadlist = loadLocalState('smms:uploadlist')
          dispatch({
            type: 'init',
            payload: {
              data: uploadlist,
            },
          })
        }
      })
    },
  },
}
