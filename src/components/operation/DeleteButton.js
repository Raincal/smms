import React from 'react'
import { Button, Modal } from 'antd'

const confirm = Modal.confirm

const styles = {
  marginLeft: 8,
}

const DeleteButton = ({
  hasSelected,
  onSelectedDelete,
  selectedRowKeys,
  selectedRows,
}) => {
  const showConfirm = () => {
    confirm({
      title: 'Want to delete these images?',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk() {
        onSelectedDelete(selectedRowKeys, selectedRows)
      },
    })
  }

  return (
    <Button
      type="danger"
      style={styles}
      disabled={!hasSelected}
      onClick={showConfirm}>
      Delete
    </Button>
  )
}

export default DeleteButton
