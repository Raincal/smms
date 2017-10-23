import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import _ from 'lodash/fp'

import FileTable from '../components/fileTable'
import Operation from '../components/operation'

const Dashboard = ({ location, dispatch, dashboard, loading }) => {
  const { queryList, selectedRowKeys, selectedRows } = dashboard
  const filelistProps = {
    dispatch,
    queryList,
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

  const operationProps = {
    selectedRowKeys,
    selectedRows,
    onSelectedDelete(selectedRowKeys, selectedRows) {
      dispatch({
        type: 'dashboard/selectedDelete',
        payload: { selectedRowKeys, selectedRows },
      })
    },
    onFilterChange(fields) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...fields,
        },
      }))
    },
  }

  return (
    <div>
      <Operation {...operationProps} />
      <FileTable {...filelistProps} />
    </div>
  )
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
