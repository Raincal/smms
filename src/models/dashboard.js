import _ from 'lodash/fp'
import { message } from 'antd'

import * as fileService from '../services/filelist'
import { loadState, loadLocalState } from '../utils/localForage'
import { parseHTML } from '../utils'

export default {
  namespace: 'dashboard',

  state: {
    filelist: [],
    selectedRowKeys: [],
    selectedRows: [],
  },

  reducers: {
    save(state, { payload: { data } }) {
      return {
        ...state,
        filelist: _.compose(
          _.uniqBy('hash'),
          _.orderBy(['timestamp'], ['desc']),
        )(data),
      }
    },

    remove(state, { payload: { hash } }) {
      const _setVisible = (item) => {
        if (item.hash === hash) {
          item.visible = false
        }
        return item
      }
      return {
        ...state,
        filelist: _.map(_setVisible)(state.filelist),
      }
    },

    selectChange(state, { payload: { selectedRowKeys, selectedRows } }) {
      return {
        ...state,
        selectedRowKeys,
        selectedRows,
      }
    },

    resetSelect(state) {
      return {
        ...state,
        selectedRowKeys: [],
        selectedRows: [],
      }
    },
  },

  effects: {
    fetch: [
      function* fetch(action, { call, put }) {
        const uploadlist = yield loadLocalState('smms:uploadlist')
        const { filelist = [] } = yield loadState('smms:dashboard')
        const { data: { data } } = yield call(fileService.fetch)
        const responseData = data || []
        yield put({
          type: 'save',
          payload: {
            data: [...uploadlist, ...filelist, ...responseData],
          },
        })
      },
      { type: 'throttle', ms: 1000 },
    ],

    *delete({ payload: { hash, filename } }, { call, put }) {
      const { data } = yield call(fileService.remove, hash)
      const { code } = parseHTML(data)
      if (code === 'success') {
        yield put({ type: 'remove', payload: { hash } })
        yield put({ type: 'uploadlist/remove', payload: { hash } })
      } else {
        message.error(`${filename} delete failed!`)
      }
    },

    *deleteSelected({ payload: { selectedRowKeys, selectedRows } }, { put }) {
      yield _.map(function* _delete(item) {
        const { hash, filename } = item
        yield put({
          type: 'delete',
          payload: { hash, filename },
        })
      })(selectedRows)
      yield put({ type: 'resetSelect' })
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/dashboard') {
          dispatch({ type: 'fetch' })
        }
      })
    },
  },
}
