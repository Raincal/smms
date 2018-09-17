import { connect } from 'dva'
import _ from 'lodash/fp'
import router from 'umi/router'

import FileTable from '../../components/fileTable'
import Operation from '../../components/operation'


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
      router.push({
        pathname: location.pathname,
        query: fields,
      })
    },
  }

  return (
    <>
      <Operation {...operationProps} />
      <FileTable {...filelistProps} />
    </>
  )
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
