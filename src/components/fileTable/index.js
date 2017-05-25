import React from 'react'
import format from 'date-fns/format'
import { Table, Popconfirm, Button, Icon } from 'antd'

import FileLink from './FileLink'

import { formatBytes } from '../../utils'

const FileTable = ({
  loading,
  filelist,
  selectedRowKeys,
  onSelectChange,
  onDelete,
  filteredFilelist,
}) => {
  const columns = [
    {
      title: 'Filename',
      dataIndex: 'filename',
      key: 'filename',
    },
    {
      title: 'Url ( Domain: https://ooo.0o0.ooo )',
      dataIndex: 'path',
      key: 'url',
      render: (text, record) => <FileLink text={text} record={record} />,
    },
    {
      title: 'Pixels',
      dataIndex: 'pixels',
      key: 'pixels',
      render: (text, record) => <div>{`${record.width}x${record.height}`}</div>,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: text => <div>{formatBytes(text)}</div>,
    },
    {
      title: 'Published Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: text => <div>{format(text * 1000, 'YYYY-MM-DD HH:mm:ss')}</div>,
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <Popconfirm
          title="Delete?"
          onConfirm={() => onDelete(record.hash, record.filename)}
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <Table
      loading={loading}
      scroll={{ x: 768 }}
      rowSelection={rowSelection}
      rowKey={record => record.hash}
      dataSource={filteredFilelist(filelist)}
      columns={columns}
      locale={{
        emptyText: <span><Icon type="frown-o" />No Data</span>,
      }}
    />
  )
}

export default FileTable
