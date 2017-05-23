import _ from 'lodash/fp'
import request, { getStatus } from '../utils/request'

export function fetch() {
  return request('/api/list')
}

export function remove(hash) {
  return request(`/api/delete/${hash}`)
}

export function checkExist(data) {
  return _.map(_mappingVisible)(data)
}

function _mappingVisible(item) {
  if (item.visible === undefined) {
    getStatus(item.url).then((code) => {
      if (code === 200) {
        item.visible = true
      } else if (code === 404) {
        item.visible = false
      }
      return item
    })
  }
  return item
}
