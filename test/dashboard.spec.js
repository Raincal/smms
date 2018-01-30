import { effects } from 'dva/saga'

import dashboard from '../src/models/dashboard'
import * as fileService from '../src/services/filelist'

describe('Dashboard Model', () => {
  it('loads', () => {
    expect(dashboard).toBeDefined()
  })

  describe('reducer', () => {
    it('save should work', () => {
      const reducers = dashboard.reducers
      const reducer = reducers.save
      const state = {
        filelist: []
      }
      expect(
        reducer(state, {
          payload: {
            data: [{ filename: 'smms' }]
          }
        })
      ).toEqual({ filelist: [{ filename: 'smms' }] })
    })
  })

  describe('effects', () => {
    it('delete should work', () => {
      const { call, put } = effects
      const sagas = dashboard.effects
      const saga = sagas.delete

      const hash = 'QMusNXY7PJ1KIfj'
      const generator = saga(
        { payload: { hash, filename: 'smmstest.jpeg' } },
        { call, put }
      )

      const next = generator.next()
      expect(next.value).toEqual(call(fileService.remove, hash))
    })
  })
})
