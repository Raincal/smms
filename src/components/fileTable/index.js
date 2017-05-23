import React, { Component } from 'react'
import format from 'date-fns/format'
import { Table, Popconfirm, Button, Modal } from 'antd'
import _ from 'lodash/fp'

import FileLink from './FileLink'

import { formatBytes } from '../../utils'

const confirm = Modal.confirm

class FileTable extends Component {
  onDelete = (hash, filename) => {
    this.props.dispatch({
      type: 'dashboard/delete',
      payload: { hash, filename },
    })
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.props.dispatch({
      type: 'dashboard/selectChange',
      payload: { selectedRowKeys, selectedRows },
    })
  }

  showConfirm = () => {
    const self = this
    const { selectedRowKeys, selectedRows } = this.props
    confirm({
      title: 'Want to delete these images?',
      onOk() {
        self.props.dispatch({
          type: 'dashboard/deleteSelected',
          payload: { selectedRowKeys, selectedRows },
        })
      },
    })
  }

  filteredFilelist = (list) => {
    return _.filter(item => item.visible !== false)(list)
  }

  renderActions = (text, record) => {
    return (
      <Popconfirm
        title="Delete?"
        onConfirm={() => this.onDelete(record.hash, record.filename)}
      >
        <Button type="danger">Delete</Button>
      </Popconfirm>
    )
  }

  render() {
    const columns = [
      {
        title: 'Filename',
        dataIndex: 'filename',
        key: 'filename',
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'url',
        render: (text, record) => <FileLink text={text} record={record} />,
      },
      {
        title: 'Pixels',
        dataIndex: 'pixels',
        key: 'pixels',
        render: (text, record) => (
          <div>{`${record.width}x${record.height}`}</div>
        ),
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
        render: (text, record) => this.renderActions(text, record),
      },
    ]

    const { loading, filelist, selectedRowKeys } = this.props
    const hasSelected = selectedRowKeys.length > 0

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    return (
      <div>
        <div style={{ margin: '16px 0' }}>
          <Button
            type="danger"
            disabled={!hasSelected}
            onClick={this.showConfirm}
          >
            Delete
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} images` : ''}
          </span>
        </div>
        <Table
          loading={loading}
          rowSelection={rowSelection}
          rowKey={record => record.hash}
          dataSource={this.filteredFilelist(filelist)}
          columns={columns}
        />
      </div>
    )
  }
}

export default FileTable
