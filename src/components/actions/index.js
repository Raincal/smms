import React from 'react'
import { Row, Col } from 'antd'

import CopyButton from './CopyButton'
import DeleteButton from './DeleteButton'
import Filter from './Filter'

const ColProps = {
  xs: 24,
  sm: 24,
  style: {
    marginBottom: 16,
  },
}

const Actions = ({ selectedRowKeys, selectedRows, onSelectedDelete, onFilterChange }) => {
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

  const filterProps = {
    onFilterChange,
  }

  return (
    <Row style={{ marginTop: 16 }}>
      <Col {...ColProps} xl={4} md={6}>
        <Filter {...filterProps} />
      </Col>
      <Col {...ColProps} xl={6} md={12}>
        <DeleteButton {...deleteButtonProps} />
        <CopyButton {...copyButtonProps} type="link">Copy Link</CopyButton>
        <CopyButton {...copyButtonProps} type="markdown">Copy Markdown</CopyButton>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `${selectedRowKeys.length} images selected` : ''}
        </span>
      </Col>
    </Row>
  )
}
export default Actions
