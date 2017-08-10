import fetch from 'dva/fetch'

function parseJSON(response) {
  const contentType = response.headers.get('content-type')
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json()
  } else if (contentType && contentType.indexOf('text/html') !== -1) {
    return response.text()
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export function getStatus(url) {
  return fetch(url)
    .then((response) => {
      return response.status
    })
    .catch((err) => {
      if (err === 'TypeError: Failed to fetch') {
        return 404
      }
    })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(`${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
}
