import React from 'react'
import { connect } from 'dva'
import _ from 'lodash/fp'

import FileTable from '../components/fileTable'
import Actions from '../components/actions'

const Dashboard = ({ dispatch, dashboard, loading }) => {
  const { filelist, selectedRowKeys, selectedRows } = dashboard
  const filelistProps = {
    dispatch,
    filelist,
    selectedRowKeys,
    selectedRows,
    loading: loading.models.dashboard,
    onDelete(hash, filename) {
      dispatch({
        type: 'dashboard/delete',
        payload: { hash, filename },
      })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      dispatch({
        type: 'dashboard/selectChange',
        payload: { selectedRowKeys, selectedRows },
      })
    },
    filteredFilelist(list) {
      return _.filter(item => item.visible !== false)(list)
    },
  }

  const actionsProps = {
    selectedRowKeys,
    selectedRows,
    onSelectedDelete(selectedRowKeys, selectedRows) {
      dispatch({
        type: 'dashboard/selectedDelete',
        payload: { selectedRowKeys, selectedRows },
      })
    },


  }

  return (
    <div>
      <Actions {...actionsProps} />
      <FileTable {...filelistProps} />
    </div>
  )
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
