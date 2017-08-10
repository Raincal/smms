export const parseHTML = (data) => {
  let code
  if (typeof data === 'string') {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = data
    const result = wrapper.getElementsByClassName('bs-callout')[0].textContent
    code = result && (result === 'File delete success.' || result === 'File already deleted.')
      ? 'success'
      : 'fail'
  } else code = 'fail'
  return {
    code,
  }
}

export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1000,
    dm = decimals || 2,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`
}
