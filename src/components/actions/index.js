import React from 'react'

import CopyButton from './CopyButton'
import DeleteButton from './DeleteButton'


const Actions = ({ selectedRowKeys, selectedRows, onSelectedDelete }) => {
  const hasSelected = selectedRowKeys.length > 0

  const links = selectedRows.map(item => item.url)

  const deleteButtonProps = {
    hasSelected,
    selectedRowKeys,
    selectedRows,
    onSelectedDelete,
  }

  const copyButtonProps = {
    hasSelected,
    links,
  }

  return (
    <div style={{ margin: '16px 0' }}>
      <DeleteButton {...deleteButtonProps} />

      <CopyButton {...copyButtonProps} type="link">Copy Link</CopyButton>

      <CopyButton {...copyButtonProps} type="markdown">Copy Markdown</CopyButton>

      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `${selectedRowKeys.length} images selected` : ''}
      </span>
    </div>
  )
}
export default Actions
